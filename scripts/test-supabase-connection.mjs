#!/usr/bin/env node

/**
 * Simple script to test Supabase connection without timeout issues
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Testing Supabase Connection\n');
console.log('='.repeat(60));

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

console.log(`✅ Supabase URL: ${supabaseUrl}`);
console.log(`✅ Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);
console.log(`✅ Service Key: ${supabaseServiceKey ? supabaseServiceKey.substring(0, 20) + '...' : 'Not set'}\n`);

// Create client with longer timeout for testing
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    fetch: async (url, options = {}) => {
      // Use longer timeout for testing (10 seconds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    }
  }
});

async function testConnection() {
  console.log('🔌 Testing basic connection...');
  
  try {
    // Simple query to test connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  Users table does not exist');
        return false;
      }
      throw error;
    }
    
    console.log('✅ Connection successful!\n');
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

async function checkUsers() {
  console.log('👤 Checking users table...');
  
  try {
    const client = supabaseServiceKey 
      ? createClient(supabaseUrl, supabaseServiceKey, {
          auth: { persistSession: false, autoRefreshToken: false }
        })
      : supabase;
    
    const { data: users, error } = await client
      .from('users')
      .select('id, username, email, role, is_active')
      .limit(10);
    
    if (error) {
      throw error;
    }
    
    if (users && users.length > 0) {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach(user => {
        console.log(`   - ${user.username} (${user.email})`);
        console.log(`     Role: ${user.role}, Active: ${user.is_active}`);
      });
      console.log();
      return users;
    } else {
      console.log('⚠️  No users found in database\n');
      return [];
    }
  } catch (error) {
    console.error('❌ Error checking users:', error.message);
    return null;
  }
}

async function testLoginAPI() {
  console.log('🔐 Testing login API...');
  
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.log('⚠️  ADMIN_PASSWORD not set, skipping API test\n');
    return false;
  }
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: adminPassword
      })
    });
    
    const data = await response.json();
    
    if (data.success && data.token) {
      console.log('✅ Login API successful!');
      console.log(`   User: ${data.user?.username}`);
      console.log(`   Role: ${data.user?.role}\n`);
      return true;
    } else {
      console.error(`❌ Login failed: ${data.error || 'Unknown error'}\n`);
      return false;
    }
  } catch (error) {
    console.error(`❌ API request failed: ${error.message}`);
    console.log('   Make sure the app is running on port 3000\n');
    return false;
  }
}

async function main() {
  const connected = await testConnection();
  const users = await checkUsers();
  const loginOk = await testLoginAPI();
  
  console.log('='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   Connection: ${connected ? '✅' : '❌'}`);
  console.log(`   Users Found: ${users ? users.length : 0}`);
  console.log(`   Login API: ${loginOk ? '✅' : '❌'}`);
  console.log('='.repeat(60));
}

main().catch(console.error);

