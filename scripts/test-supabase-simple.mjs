#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

// Check environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🧪 Testing Supabase Connection Locally');
console.log('=====================================\n');

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Supabase environment variables not found');
  console.log('📖 Please add to .env.local:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Key: ${supabaseKey.substring(0, 20)}...\n`);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    console.log('🔌 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  Contacts table does not exist');
        console.log('💡 Please create the table in Supabase dashboard first');
        console.log('📖 See docs/deployment/SUPABASE_SETUP.md for SQL schema');
        return;
      } else {
        throw error;
      }
    }
    
    console.log('✅ Supabase connection successful!');
    
    // Test table access
    console.log('\n🔍 Testing contacts table...');
    
    const { count, error: countError } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      throw countError;
    }
    
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
    
    console.log('\n🎉 Supabase test completed successfully!');
    console.log('💡 Your local Supabase setup is working correctly.');
    
  } catch (error) {
    console.error('❌ Supabase test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verify environment variables in .env.local');
    console.log('   2. Check if your Supabase project is active');
    console.log('   3. Ensure the contacts table exists in your database');
    console.log('   4. Check Supabase dashboard for any issues');
  }
}

// Run test
testSupabase();
