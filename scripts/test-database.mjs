#!/usr/bin/env node

import { sql } from '@vercel/postgres';

// Check if we have database environment variables
const hasDbConfig = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!hasDbConfig) {
  console.log('❌ No database configuration found.');
  console.log('📖 Please set up Vercel Postgres first. See docs/deployment/VERCEL_POSTGRES_SETUP.md');
  process.exit(1);
}

async function testDatabase() {
  try {
    console.log('🧪 Testing Vercel Postgres connection...');
    
    // Test basic connection
    const result = await sql`SELECT NOW() as current_time, version() as postgres_version`;
    const { current_time, postgres_version } = result.rows[0];
    
    console.log('✅ Database connection successful!');
    console.log(`   Current time: ${current_time}`);
    console.log(`   PostgreSQL version: ${postgres_version}`);
    
    // Test contacts table
    console.log('\n🔍 Checking contacts table...');
    
    try {
      const tableExists = await sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'contacts'
        )
      `;
      
      if (tableExists.rows[0].exists) {
        console.log('✅ Contacts table exists');
        
        // Get table info
        const tableInfo = await sql`
          SELECT column_name, data_type, is_nullable
          FROM information_schema.columns
          WHERE table_name = 'contacts'
          ORDER BY ordinal_position
        `;
        
        console.log('📋 Table structure:');
        tableInfo.rows.forEach(col => {
          console.log(`   ${col.column_name}: ${col.data_type} ${col.is_nullable === 'NO' ? '(NOT NULL)' : ''}`);
        });
        
        // Get row count
        const countResult = await sql`SELECT COUNT(*) as count FROM contacts`;
        const count = parseInt(countResult.rows[0].count);
        console.log(`📊 Total contacts: ${count}`);
        
        if (count > 0) {
          // Get sample data
          const sample = await sql`
            SELECT first_name, last_name, email, service, submitted_at
            FROM contacts 
            ORDER BY submitted_at DESC 
            LIMIT 3
          `;
          
          console.log('\n📝 Recent contacts:');
          sample.rows.forEach((contact, index) => {
            console.log(`   ${index + 1}. ${contact.first_name} ${contact.last_name} (${contact.email}) - ${contact.service}`);
            console.log(`      Submitted: ${new Date(contact.submitted_at).toLocaleString()}`);
          });
        }
        
      } else {
        console.log('⚠️  Contacts table does not exist');
        console.log('💡 The table will be created automatically on first API call');
      }
      
    } catch (error) {
      console.log('⚠️  Could not check contacts table:', error.message);
    }
    
    // Test indexes
    console.log('\n🔍 Checking indexes...');
    try {
      const indexes = await sql`
        SELECT indexname, indexdef
        FROM pg_indexes
        WHERE tablename = 'contacts'
      `;
      
      if (indexes.rows.length > 0) {
        console.log('✅ Indexes found:');
        indexes.rows.forEach(idx => {
          console.log(`   ${idx.indexname}`);
        });
      } else {
        console.log('⚠️  No indexes found (will be created automatically)');
      }
    } catch (error) {
      console.log('⚠️  Could not check indexes:', error.message);
    }
    
    console.log('\n🎉 Database test completed successfully!');
    console.log('💡 Your Vercel Postgres is ready for contact management.');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verify environment variables are set correctly');
    console.log('   2. Check if database is in the same region as your functions');
    console.log('   3. Ensure database is not paused in Vercel dashboard');
    console.log('   4. Check Vercel function logs for detailed error messages');
    process.exit(1);
  }
}

// Run test
testDatabase();
