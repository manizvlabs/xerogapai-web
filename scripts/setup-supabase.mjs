#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Supabase Setup Helper');
console.log('========================\n');

// Check if Supabase is configured
const hasSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const hasSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
console.log('   • Name: zero-digital-website');
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
