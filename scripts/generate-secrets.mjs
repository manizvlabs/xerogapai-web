#!/usr/bin/env node

/**
 * Environment Secrets Generator for XeroGap AI Website
 *
 * This script generates secure environment variables and creates a .env.local template
 * for both local development and Vercel deployment.
 *
 * Usage: npm run generate-secrets
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const envPath = join(rootDir, '.env.local');

// Generate secure random strings
function generateSecureToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function generateSecurePassword() {
  const adjectives = ['strong', 'secure', 'powerful', 'robust', 'dynamic', 'swift', 'clever', 'brilliant'];
  const nouns = ['tiger', 'eagle', 'wolf', 'bear', 'lion', 'fox', 'hawk', 'panther'];
  const numbers = Math.floor(Math.random() * 9999) + 1000;

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}-${noun}-${numbers}`;
}

// Get current version from package.json
function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
    const version = packageJson.version;
    const dateSuffix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `${version}-${dateSuffix}`;
  } catch (error) {
    console.warn('Could not read package.json version, using default');
    return `1.0.3-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;
  }
}

console.log('🔐 XeroGap AI Environment Secrets Generator');
console.log('===========================================\n');

// Generate secrets
const secrets = {
  // JWT Configuration
  JWT_SECRET: generateSecureToken(64),
  JWT_EXPIRES_IN: '24h',

  // Admin Credentials (generate secure ones)
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: generateSecurePassword(),
  ADMIN_EMAIL: 'admin@zerodigital.ai',

  // Site Configuration
  NEXT_PUBLIC_SITE_NAME: 'XeroGap AI',
  NEXT_PUBLIC_SITE_TAGLINE: 'AI-Powered Digital Transformation',
  NEXT_PUBLIC_SITE_DOMAIN: 'zerodigital.ai',
  NEXT_PUBLIC_LOCATION: '',
  NEXT_PUBLIC_PHONE: '+917702661991',
  NEXT_PUBLIC_EMAIL: 'info@zerodigital.ai',
  NEXT_PUBLIC_APP_VERSION: getCurrentVersion(),
  NEXT_PUBLIC_COPYRIGHT_YEAR: new Date().getFullYear().toString(),

  // Social Media
  NEXT_PUBLIC_LINKEDIN_URL: 'https://linkedin.com/company/zerodigital',
  NEXT_PUBLIC_TWITTER_URL: 'https://twitter.com/zerodigital',
  NEXT_PUBLIC_INSTAGRAM_URL: 'https://instagram.com/zerodigital',

  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-XXXXXXXXXX',

  // Contact Form
  CONTACT_EMAIL: 'info@zerodigital.ai',

  // Rate Limiting
  RATE_LIMIT_API_WINDOW_MS: '900000',
  RATE_LIMIT_API_MAX_REQUESTS: '100',
  RATE_LIMIT_CONTACT_WINDOW_MS: '3600000',
  RATE_LIMIT_CONTACT_MAX_REQUESTS: '5',
  RATE_LIMIT_ADMIN_WINDOW_MS: '900000',
  RATE_LIMIT_ADMIN_MAX_REQUESTS: '200',
  RATE_LIMIT_LOGIN_WINDOW_MS: '900000',
  RATE_LIMIT_LOGIN_MAX_REQUESTS: '50',

  // Database (placeholders - you'll need to set these up)
  POSTGRES_URL: 'postgresql://username:password@localhost:5432/database',
  DATABASE_URL: 'postgresql://username:password@localhost:5432/database',

  // Supabase (placeholders - you'll need to set these up)
  NEXT_PUBLIC_SUPABASE_URL: 'https://your-project.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your-anon-key',
  SUPABASE_SERVICE_ROLE_KEY: 'your-service-role-key',

  // Vercel Configuration (you'll need to replace these with actual values)
  VERCEL_TOKEN: 'your-vercel-token',
  VERCEL_ORG_ID: 'your-org-id',
  VERCEL_PROJECT_ID: 'your-project-id',

  // GitHub Configuration
  GITHUB_CLI_OAUTH_TOKEN: 'your-github-cli-token',
  GITHUB_PAT: 'your-github-pat',

  // Development
  NODE_ENV: 'development'
};

console.log('✅ Generated secure secrets:');
console.log('• JWT_SECRET: [Generated secure token]');
console.log('• ADMIN_PASSWORD: [Generated secure password]');
console.log('• JWT_EXPIRES_IN: 24h');
console.log('• And many more...\n');

// Check if .env.local already exists
if (existsSync(envPath)) {
  console.log('⚠️  .env.local already exists!');
  console.log('📋 Creating backup and updating...\n');

  // Create backup
  const backupPath = `${envPath}.backup.${Date.now()}`;
  writeFileSync(backupPath, readFileSync(envPath, 'utf8'));
  console.log(`✅ Backup created: ${backupPath}`);
}

// Create .env.local file
let envContent = '# XeroGap AI Website Environment Variables\n';
envContent += '# Generated on: ' + new Date().toISOString() + '\n';
envContent += '# ⚠️  SECURITY: Change default credentials before production!\n\n';

Object.entries(secrets).forEach(([key, value]) => {
  envContent += `${key}=${value}\n`;
});

envContent += '\n# Additional Notes:\n';
envContent += '# - Replace placeholder values (marked with "your-") with actual credentials\n';
envContent += '# - Never commit this file to version control\n';
envContent += '# - Use different values for production vs development\n\n';

try {
  writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created/updated successfully!');
  console.log(`📁 Location: ${envPath}\n`);
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  process.exit(1);
}

// Display next steps
console.log('🚀 Next Steps:');
console.log('=============\n');

console.log('1. 📝 Edit .env.local file:');
console.log('   • Replace placeholder values with actual credentials');
console.log('   • Set up your database URLs');
console.log('   • Configure Supabase credentials');
console.log('   • Add your Vercel project details\n');

console.log('2. 🔧 Set up Vercel Environment Variables:');
console.log('   a) Go to https://vercel.com/dashboard');
console.log('   b) Select your project');
console.log('   c) Go to Settings → Environment Variables');
console.log('   d) Add these variables:');
console.log('      - JWT_SECRET');
console.log('      - ADMIN_USERNAME');
console.log('      - ADMIN_PASSWORD');
console.log('      - CONTACT_EMAIL');
console.log('      - And other sensitive variables\n');

console.log('3. 🛡️ Security Checklist:');
console.log('   • Change ADMIN_PASSWORD to something unique');
console.log('   • Use strong JWT_SECRET');
console.log('   • Set up proper database credentials');
console.log('   • Configure rate limiting values');
console.log('   • Set up Google Analytics ID\n');

console.log('4. 🧪 Test your setup:');
console.log('   npm run dev');
console.log('   Visit http://localhost:4010');
console.log('   Test admin login and other features\n');

console.log('5. 📋 GitHub Actions Setup:');
console.log('   Run: ./scripts/setup-github-secrets.sh');
console.log('   This will help you set up deployment secrets\n');

console.log('🎉 Environment setup complete!');
console.log('💡 Remember: Never commit .env.local to version control!');
