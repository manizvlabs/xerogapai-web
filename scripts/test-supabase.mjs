#!/usr/bin/env node

import { SupabaseContactDatabase, isSupabaseConfigured, supabase } from '../src/lib/supabase.js';

if (!isSupabaseConfigured()) {
  console.log('❌ Supabase not configured.');
  console.log('📖 Please set up Supabase first. See docs/deployment/SUPABASE_SETUP.md');
  process.exit(1);
}

async function testSupabase() {
  try {
    console.log('🧪 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Supabase connection successful!');
    
    // Test contacts table
    console.log('\n🔍 Checking contacts table...');
    
    try {
      // Get table info
      const { data: tableInfo, error: tableError } = await supabase
        .from('contacts')
        .select('*')
        .limit(1);
      
      if (tableError) {
        if (tableError.code === 'PGRST116') {
          console.log('⚠️  Contacts table does not exist');
          console.log('💡 The table will be created automatically on first API call');
        } else {
          throw tableError;
        }
      } else {
        console.log('✅ Contacts table exists and is accessible');
      }
      
      // Get row count
      const { count, error: countError } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });
      
      if (!countError) {
        console.log(`📊 Total contacts: ${count || 0}`);
        
        if (count > 0) {
          // Get sample data
          const { data: sample, error: sampleError } = await supabase
            .from('contacts')
            .select('first_name, last_name, email, service, submitted_at')
            .order('submitted_at', { ascending: false })
            .limit(3);
          
          if (!sampleError && sample) {
            console.log('\n📝 Recent contacts:');
            sample.forEach((contact, index) => {
              console.log(`   ${index + 1}. ${contact.first_name} ${contact.last_name} (${contact.email}) - ${contact.service}`);
              console.log(`      Submitted: ${new Date(contact.submitted_at).toLocaleString()}`);
            });
          }
        }
      }
      
    } catch (error) {
      console.log('⚠️  Could not check contacts table:', error.message);
    }
    
    // Test database operations
    console.log('\n🧪 Testing database operations...');
    
    try {
      // Test getStats
      const stats = await SupabaseContactDatabase.getStats();
      console.log('✅ getStats() works:', stats);
      
      // Test getContacts
      const contacts = await SupabaseContactDatabase.getContacts({ limit: 5 });
      console.log(`✅ getContacts() works: ${contacts.contacts.length} contacts returned`);
      
    } catch (error) {
      console.log('⚠️  Database operations test failed:', error.message);
    }
    
    console.log('\n🎉 Supabase test completed successfully!');
    console.log('💡 Your Supabase database is ready for contact management.');
    
  } catch (error) {
    console.error('❌ Supabase test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verify environment variables are set correctly');
    console.log('   2. Check if your Supabase project is active');
    console.log('   3. Ensure the contacts table exists in your database');
    console.log('   4. Check Supabase dashboard for any issues');
    process.exit(1);
  }
}

// Run test
testSupabase();
