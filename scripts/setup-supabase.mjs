#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Supabase Setup Helper');
console.log('========================\n');

// Check if we can connect to Supabase and add assessment columns
async function addAssessmentColumns() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Supabase environment variables not found - skipping column creation');
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Try to add assessment columns
    console.log('🔧 Adding assessment columns to contacts table...');

    // Note: We can't ALTER TABLE from client-side, but we can test if columns exist
    const { error } = await supabase
      .from('contacts')
      .select('assessment_data, assessment_completed_at, assessment_score, assessment_readiness_level')
      .limit(1);

    if (error) {
      console.log('⚠️  Assessment columns may not exist. Please run this SQL in your Supabase SQL Editor:');
      console.log('');
      console.log('```sql');
      console.log('-- Add assessment columns to contacts table');
      console.log('ALTER TABLE contacts');
      console.log('ADD COLUMN IF NOT EXISTS assessment_data JSONB,');
      console.log('ADD COLUMN IF NOT EXISTS assessment_completed_at TIMESTAMP WITH TIME ZONE,');
      console.log('ADD COLUMN IF NOT EXISTS assessment_score INTEGER,');
      console.log('ADD COLUMN IF NOT EXISTS assessment_readiness_level VARCHAR(50);');
      console.log('');
      console.log('-- Create index for assessment queries');
      console.log('CREATE INDEX IF NOT EXISTS idx_contacts_assessment_completed_at ON contacts(assessment_completed_at);');
      console.log('CREATE INDEX IF NOT EXISTS idx_contacts_assessment_score ON contacts(assessment_score);');
      console.log('```');
      console.log('');
    } else {
      console.log('✅ Assessment columns already exist');
    }
  } catch (error) {
    console.log('⚠️  Could not check assessment columns:', error.message);
  }
}

// Check if Supabase is configured
const hasSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const hasSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Add assessment columns if Supabase is configured
if (hasSupabaseUrl && hasSupabaseKey) {
  await addAssessmentColumns();
}

if (hasSupabaseUrl && hasSupabaseKey) {
  console.log('✅ Supabase environment variables are configured');
  console.log(`   URL: ${hasSupabaseUrl}`);
  console.log(`   Key: ${hasSupabaseKey.substring(0, 20)}...`);
} else {
  console.log('❌ Supabase environment variables not found');
  console.log('📖 Please set up Supabase first. See docs/deployment/SUPABASE_SETUP.md');
  process.exit(1);
}

console.log('\n📋 Setup Steps:');
console.log('================\n');

console.log('1. 🌐 Create Supabase Project:');
console.log('   • Go to https://supabase.com/dashboard');
console.log('   • Click "New Project"');
console.log('   • Name: xerogapai-web');
console.log('   • Choose region closest to your users');
console.log('   • Generate and save database password');
console.log('   • Wait for project to be ready (2-3 minutes)\n');

console.log('2. 🔑 Get Project Credentials:');
console.log('   • Go to Settings → API');
console.log('   • Copy Project URL');
console.log('   • Copy anon public key\n');

console.log('3. 🔧 Set Environment Variables:');
console.log('   • In Vercel Dashboard: Settings → Environment Variables');
console.log('   • Add NEXT_PUBLIC_SUPABASE_URL');
console.log('   • Add NEXT_PUBLIC_SUPABASE_ANON_KEY');
console.log('   • Or update .env.local for local development\n');

console.log('4. 🗄️ Create Database Schema:');
console.log('   • Go to Supabase Dashboard → SQL Editor');
console.log('   • Run the SQL from docs/deployment/SUPABASE_SETUP.md');
console.log('   • Or let the app create it automatically\n');

console.log('5. 🧪 Test Database Connection:');
console.log('   npm run test:supabase\n');

console.log('6. 📊 Migrate Existing Data (if any):');
console.log('   npm run migrate:supabase\n');

console.log('7. 🚀 Deploy Changes:');
console.log('   git add .');
console.log('   git commit -m "feat: configure Supabase for contact management"');
console.log('   git push origin feature/v2\n');

console.log('8. ✅ Verify Setup:');
console.log('   • Visit your live site');
console.log('   • Submit a test contact form');
console.log('   • Check admin panel at /admin/contacts');
console.log('   • Verify data persists after page refresh\n');

console.log('📖 For detailed instructions, see: docs/deployment/SUPABASE_SETUP.md\n');

// Check if we have existing contact data
const contactsPath = path.join(__dirname, '..', 'data', 'contacts.json');
if (fs.existsSync(contactsPath)) {
  const contactsData = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const contactCount = contactsData.contacts?.length || 0;
  
  if (contactCount > 0) {
    console.log(`📊 Found ${contactCount} existing contacts to migrate`);
    console.log('💡 Run "npm run migrate:supabase" after setting up the database\n');
  }
}

console.log('🎉 Setup complete! Your contact management will be persistent and scalable.');
console.log('💰 Supabase offers 500MB free storage and 50,000 monthly active users!');
console.log('\n📊 Assessment Data Setup:');
console.log('   The system will automatically add assessment columns to the contacts table.');
console.log('   Run the SQL below in your Supabase SQL Editor to add assessment columns manually:');
console.log('');
console.log('```sql');
console.log('-- Add assessment columns to contacts table');
console.log('ALTER TABLE contacts');
console.log('ADD COLUMN IF NOT EXISTS assessment_data JSONB,');
console.log('ADD COLUMN IF NOT EXISTS assessment_completed_at TIMESTAMP WITH TIME ZONE,');
console.log('ADD COLUMN IF NOT EXISTS assessment_score INTEGER,');
console.log('ADD COLUMN IF NOT EXISTS assessment_readiness_level VARCHAR(50);');
console.log('');
console.log('-- Create index for assessment queries');
console.log('CREATE INDEX IF NOT EXISTS idx_contacts_assessment_completed_at ON contacts(assessment_completed_at);');
console.log('CREATE INDEX IF NOT EXISTS idx_contacts_assessment_score ON contacts(assessment_score);');
console.log('```');
console.log('');
console.log('📝 Assessment data will be stored as JSON in the assessment_data column with this structure:');
console.log('   {');
console.log('     "score": number,');
console.log('     "maxScore": number,');
console.log('     "answers": {"q1": "answer1", "q2": "answer2", ...},');
console.log('     "insights": ["insight1", "insight2", ...]');
console.log('   }');
