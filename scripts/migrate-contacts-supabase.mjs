#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SupabaseContactDatabase, isSupabaseConfigured } from '../src/lib/supabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!isSupabaseConfigured()) {
  console.log('❌ Supabase not configured. Please set up environment variables first.');
  console.log('📖 See docs/deployment/SUPABASE_SETUP.md for instructions.');
  process.exit(1);
}

async function migrateContacts() {
  try {
    console.log('🚀 Starting contact data migration to Supabase...');
    
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
    
    // Migrate contacts
    let migrated = 0;
    let skipped = 0;
    let errors = 0;
    
    for (const contact of contacts) {
      try {
        // Check if contact already exists (by email and submitted_at)
        const existing = await SupabaseContactDatabase.getContacts({
          search: contact.email,
          limit: 1
        });
        
        const isDuplicate = existing.contacts.some(existingContact => 
          existingContact.email === contact.email && 
          new Date(existingContact.submitted_at).getTime() === new Date(contact.submittedAt).getTime()
        );
        
        if (isDuplicate) {
          console.log(`⏭️  Skipping duplicate contact: ${contact.firstName} ${contact.lastName} (${contact.email})`);
          skipped++;
          continue;
        }
        
        // Convert to Supabase format
        const supabaseContact = {
          first_name: contact.firstName,
          last_name: contact.lastName,
          email: contact.email,
          phone: contact.phone || null,
          company: contact.company || null,
          service: contact.service,
          message: contact.message,
          ip_address: contact.ipAddress || null,
          user_agent: contact.userAgent || null
        };
        
        // Insert contact
        await SupabaseContactDatabase.createContact(supabaseContact);
        
        console.log(`✅ Migrated: ${contact.firstName} ${contact.lastName} (${contact.email})`);
        migrated++;
        
      } catch (error) {
        console.error(`❌ Failed to migrate contact ${contact.firstName} ${contact.lastName}:`, error.message);
        errors++;
      }
    }
    
    // Final statistics
    const finalStats = await SupabaseContactDatabase.getStats();
    
    console.log('\n📊 Migration Summary:');
    console.log(`   Total contacts in JSON: ${contacts.length}`);
    console.log(`   Successfully migrated: ${migrated}`);
    console.log(`   Skipped (duplicates): ${skipped}`);
    console.log(`   Errors: ${errors}`);
    console.log(`   Total in Supabase: ${finalStats.total}`);
    
    if (migrated > 0) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('💡 You can now safely remove the data/contacts.json file if desired.');
    } else if (skipped > 0) {
      console.log('\n⚠️  All contacts were already migrated (duplicates skipped).');
    } else {
      console.log('\n❌ No contacts were migrated due to errors.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateContacts();
