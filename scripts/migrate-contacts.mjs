#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sql } from '@vercel/postgres';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we have database environment variables
const hasDbConfig = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!hasDbConfig) {
  console.log('❌ No database configuration found. Please set up Vercel Postgres first.');
  console.log('📖 See docs/deployment/VERCEL_POSTGRES_SETUP.md for instructions.');
  process.exit(1);
}

async function migrateContacts() {
  try {
    console.log('🚀 Starting contact data migration...');
    
    // Read existing contacts from JSON file
    const contactsPath = path.join(__dirname, '..', 'data', 'contacts.json');
    
    if (!fs.existsSync(contactsPath)) {
      console.log('⚠️  No existing contacts.json file found. Nothing to migrate.');
      return;
    }
    
    const contactsData = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
    const contacts = contactsData.contacts || [];
    
    if (contacts.length === 0) {
      console.log('⚠️  No contacts found in JSON file. Nothing to migrate.');
      return;
    }
    
    console.log(`📊 Found ${contacts.length} contacts to migrate`);
    
    // Initialize database schema
    console.log('🔧 Initializing database schema...');
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        service VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address INET,
        user_agent TEXT
      )
    `;
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_contacts_submitted_at ON contacts(submitted_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_contacts_service ON contacts(service)`;
    
    console.log('✅ Database schema initialized');
    
    // Check if contacts already exist
    const existingCount = await sql`SELECT COUNT(*) as count FROM contacts`;
    const count = parseInt(existingCount.rows[0].count);
    
    if (count > 0) {
      console.log(`⚠️  Database already contains ${count} contacts.`);
      console.log('🔄 This will add new contacts without duplicating existing ones.');
    }
    
    // Migrate contacts
    let migrated = 0;
    let skipped = 0;
    
    for (const contact of contacts) {
      try {
        // Check if contact already exists (by email and submitted_at)
        const existing = await sql`
          SELECT id FROM contacts 
          WHERE email = ${contact.email} 
          AND submitted_at = ${new Date(contact.submittedAt)}
        `;
        
        if (existing.rows.length > 0) {
          console.log(`⏭️  Skipping duplicate contact: ${contact.firstName} ${contact.lastName} (${contact.email})`);
          skipped++;
          continue;
        }
        
        // Insert contact
        await sql`
          INSERT INTO contacts (
            first_name, last_name, email, phone, company, service, message, 
            submitted_at, ip_address, user_agent
          ) VALUES (
            ${contact.firstName}, ${contact.lastName}, ${contact.email}, 
            ${contact.phone || null}, ${contact.company || null}, 
            ${contact.service}, ${contact.message}, 
            ${new Date(contact.submittedAt)}, 
            ${contact.ipAddress || null}, 
            ${contact.userAgent || null}
          )
        `;
        
        console.log(`✅ Migrated: ${contact.firstName} ${contact.lastName} (${contact.email})`);
        migrated++;
        
      } catch (error) {
        console.error(`❌ Failed to migrate contact ${contact.firstName} ${contact.lastName}:`, error.message);
      }
    }
    
    // Final statistics
    const finalCount = await sql`SELECT COUNT(*) as count FROM contacts`;
    const totalInDb = parseInt(finalCount.rows[0].count);
    
    console.log('\n📊 Migration Summary:');
    console.log(`   Total contacts in JSON: ${contacts.length}`);
    console.log(`   Successfully migrated: ${migrated}`);
    console.log(`   Skipped (duplicates): ${skipped}`);
    console.log(`   Total in database: ${totalInDb}`);
    
    if (migrated > 0) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('💡 You can now safely remove the data/contacts.json file if desired.');
    } else {
      console.log('\n⚠️  No new contacts were migrated.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateContacts();
