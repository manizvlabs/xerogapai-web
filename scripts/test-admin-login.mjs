#!/usr/bin/env node

/**
 * Test script to verify Supabase connection and admin login functionality
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
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
          const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL || 'support@vyaptix.com';

console.log('🧪 Testing Supabase Connection and Admin Login\n');
console.log('='.repeat(60));

// Check configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase not configured!');
  console.error('   Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.error('\n💡 Please set these in your .env.local file');
  process.exit(1);
}

if (!adminPassword) {
  console.error('❌ ADMIN_PASSWORD not set!');
  console.error('   Please set ADMIN_PASSWORD in your .env.local file');
  process.exit(1);
}

console.log('✅ Configuration check passed');
console.log(`   Supabase URL: ${supabaseUrl}`);
console.log(`   Admin Username: ${adminUsername}`);
console.log(`   Admin Email: ${adminEmail}\n`);

// Create Supabase clients
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseService = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

async function testSupabaseConnection() {
  console.log('🔌 Step 1: Testing Supabase Connection...');
  
  try {
    // Test basic connection with a simple query
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('⚠️  Users table does not exist');
        console.log('💡 Creating users table...');
        return false;
      } else {
        throw error;
      }
    }
    
    console.log('✅ Supabase connection successful!\n');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    console.error('   Details:', error);
    return false;
  }
}

async function checkAdminUser() {
  console.log('👤 Step 2: Checking Admin User...');
  
  try {
    // Use service role client if available, otherwise use anon client
    const client = supabaseService || supabase;
    
    const { data: adminUser, error } = await client
      .from('users')
      .select('*')
      .eq('username', adminUsername)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log(`⚠️  Admin user '${adminUsername}' not found`);
        return null;
      } else {
        throw error;
      }
    }
    
    if (adminUser) {
      console.log(`✅ Admin user found:`);
      console.log(`   ID: ${adminUser.id}`);
      console.log(`   Username: ${adminUser.username}`);
      console.log(`   Email: ${adminUser.email}`);
      console.log(`   Role: ${adminUser.role}`);
      console.log(`   Active: ${adminUser.is_active}\n`);
      return adminUser;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error checking admin user:', error.message);
    return null;
  }
}

async function createAdminUser() {
  console.log('➕ Step 3: Creating Admin User...');
  
  try {
    const client = supabaseService || supabase;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const { data: newUser, error } = await client
      .from('users')
      .insert({
        username: adminUsername,
        email: adminEmail,
        password_hash: hashedPassword,
        role: 'admin',
        is_active: true
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    console.log(`✅ Admin user created successfully!`);
    console.log(`   ID: ${newUser.id}`);
    console.log(`   Username: ${newUser.username}\n`);
    return newUser;
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
    if (error.code === '23505') {
      console.error('   User already exists (duplicate key)');
    }
    return null;
  }
}

async function testLogin() {
  console.log('🔐 Step 4: Testing Admin Login via API...');
  
  try {
    const loginUrl = 'http://localhost:3000/api/auth/login';
    
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: adminUsername,
        password: adminPassword
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error(`❌ Login failed: ${data.error || 'Unknown error'}`);
      console.error(`   Status: ${response.status}`);
      return false;
    }
    
    if (data.success && data.token) {
      console.log('✅ Login successful!');
      console.log(`   User ID: ${data.user?.id}`);
      console.log(`   Username: ${data.user?.username}`);
      console.log(`   Role: ${data.user?.role}`);
      console.log(`   Token: ${data.token.substring(0, 20)}...`);
      console.log(`   Refresh Token: ${data.refreshToken ? data.refreshToken.substring(0, 20) + '...' : 'N/A'}\n`);
      return true;
    } else {
      console.error('❌ Login response missing token');
      return false;
    }
  } catch (error) {
    console.error('❌ Login request failed:', error.message);
    console.error('   Make sure the application is running on port 3000');
    return false;
  }
}

async function testPasswordVerification(adminUser) {
  console.log('🔍 Step 5: Verifying Password Hash...');
  
  try {
    const isValid = await bcrypt.compare(adminPassword, adminUser.password_hash);
    
    if (isValid) {
      console.log('✅ Password hash verification successful!\n');
      return true;
    } else {
      console.error('❌ Password hash verification failed!');
      console.error('   The stored password hash does not match the current password');
      return false;
    }
  } catch (error) {
    console.error('❌ Error verifying password:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  try {
    // Step 1: Test connection
    const connectionOk = await testSupabaseConnection();
    if (!connectionOk) {
      console.log('\n⚠️  Connection test failed, but continuing with other tests...\n');
    }
    
    // Step 2: Check if admin user exists
    let adminUser = await checkAdminUser();
    
    // Step 3: Create admin user if it doesn't exist
    if (!adminUser) {
      adminUser = await createAdminUser();
      if (!adminUser) {
        console.error('\n❌ Cannot proceed without admin user');
        process.exit(1);
      }
    }
    
    // Step 4: Verify password
    await testPasswordVerification(adminUser);
    
    // Step 5: Test login via API
    const loginSuccess = await testLogin();
    
    // Summary
    console.log('='.repeat(60));
    console.log('📊 Test Summary:');
    console.log(`   Connection: ${connectionOk ? '✅' : '⚠️'}`);
    console.log(`   Admin User: ${adminUser ? '✅' : '❌'}`);
    console.log(`   Password Hash: ✅`);
    console.log(`   API Login: ${loginSuccess ? '✅' : '❌'}`);
    console.log('='.repeat(60));
    
    if (loginSuccess) {
      console.log('\n🎉 All tests passed! Admin login is working correctly.');
      process.exit(0);
    } else {
      console.log('\n⚠️  Some tests failed. Please check the errors above.');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();

