#!/usr/bin/env node

/**
 * Final login test script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');

    envLines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

async function testLogin() {
  console.log('🧪 Testing Admin Login');
  console.log('='.repeat(60));
  
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD;
  
  if (!password) {
    console.error('❌ ADMIN_PASSWORD not found in .env.local');
    process.exit(1);
  }
  
  console.log(`Username: ${username}`);
  console.log(`Password: ${password.substring(0, 10)}...\n`);
  
  try {
    console.log('🔐 Attempting login...');
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success && data.token) {
      console.log('✅ Login successful!');
      console.log(`   User ID: ${data.user?.id}`);
      console.log(`   Username: ${data.user?.username}`);
      console.log(`   Email: ${data.user?.email}`);
      console.log(`   Role: ${data.user?.role}`);
      console.log(`   Token: ${data.token.substring(0, 30)}...`);
      console.log('\n🎉 Admin login is working correctly!');
      return true;
    } else {
      console.error(`❌ Login failed: ${data.error || 'Unknown error'}`);
      console.log('\n💡 Make sure you have run the SQL query in Supabase SQL Editor');
      return false;
    }
  } catch (error) {
    console.error(`❌ Request failed: ${error.message}`);
    console.log('   Make sure the app is running on port 3000');
    return false;
  }
}

testLogin().catch(console.error);

