#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Vercel Postgres Setup Helper');
console.log('================================\n');

// Check if Vercel CLI is available
try {
  execSync('npx vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI is available');
} catch (error) {
  console.log('❌ Vercel CLI not found');
  console.log('📦 Install it with: npm i -g vercel or use npx vercel');
  process.exit(1);
}

// Check if project is linked
try {
  const projectInfo = execSync('npx vercel ls', { stdio: 'pipe', encoding: 'utf8' });
  console.log('✅ Vercel project is linked');
} catch (error) {
  console.log('⚠️  Project not linked to Vercel');
  console.log('🔗 Run: npx vercel link');
  process.exit(1);
}

console.log('\n📋 Setup Steps:');
console.log('================\n');

console.log('1. 🌐 Create Vercel Postgres Database:');
console.log('   • Go to https://vercel.com/dashboard');
console.log('   • Select your project: xerogapai-web');
console.log('   • Go to Storage tab');
console.log('   • Click "Create Database"');
console.log('   • Select "Postgres"');
console.log('   • Name: zero-digital-db');
console.log('   • Region: iad1 (US East) or closest to your users');
console.log('   • Click "Create"\n');

console.log('2. 🔧 Environment Variables:');
console.log('   Vercel will automatically add these variables:');
console.log('   • POSTGRES_URL');
console.log('   • POSTGRES_USER');
console.log('   • POSTGRES_HOST');
console.log('   • POSTGRES_PASSWORD');
console.log('   • POSTGRES_DATABASE\n');

console.log('3. 🧪 Test Database Connection:');
console.log('   npm run test:db\n');

console.log('4. 📊 Migrate Existing Data (if any):');
console.log('   npm run migrate:contacts\n');

console.log('5. 🚀 Deploy Changes:');
console.log('   git add .');
console.log('   git commit -m "feat: configure Vercel Postgres for contact management"');
console.log('   git push origin feature/v2\n');

console.log('6. ✅ Verify Setup:');
console.log('   • Visit your live site');
console.log('   • Submit a test contact form');
console.log('   • Check admin panel at /admin/contacts');
console.log('   • Verify data persists after page refresh\n');

console.log('📖 For detailed instructions, see: docs/deployment/VERCEL_POSTGRES_SETUP.md\n');

// Check if we have existing contact data
const contactsPath = path.join(__dirname, '..', 'data', 'contacts.json');
if (fs.existsSync(contactsPath)) {
  const contactsData = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const contactCount = contactsData.contacts?.length || 0;
  
  if (contactCount > 0) {
    console.log(`📊 Found ${contactCount} existing contacts to migrate`);
    console.log('💡 Run "npm run migrate:contacts" after setting up the database\n');
  }
}

console.log('🎉 Setup complete! Your contact management will be persistent and scalable.');
