#!/usr/bin/env node

/**
 * Verify Admin User in Supabase
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminUsername = process.env.ADMIN_USERNAME || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD;

console.log('🔍 Verifying Admin User in Supabase');
console.log('='.repeat(60));

if (!supabaseUrl || !serviceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

if (!adminPassword) {
  console.error('❌ ADMIN_PASSWORD not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    fetch: async (url, options = {}) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    }
  }
});

async function verifyUser() {
  try {
    console.log(`\n1️⃣ Checking if user '${adminUsername}' exists...`);
    
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', adminUsername)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('❌ User not found in database!');
        console.log('\n💡 You need to run the SQL query in Supabase SQL Editor');
        return false;
      }
      throw error;
    }
    
    if (!user) {
      console.log('❌ User not found');
      return false;
    }
    
    console.log('✅ User found!');
    console.log(`   ID: ${user.id}`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Active: ${user.is_active}`);
    console.log(`   Password Hash: ${user.password_hash.substring(0, 30)}...`);
    
    console.log(`\n2️⃣ Verifying password hash...`);
    const isValid = await bcrypt.compare(adminPassword, user.password_hash);
    
    if (isValid) {
      console.log('✅ Password hash matches!');
      console.log('\n🎉 Admin user is correctly configured in Supabase!');
      console.log('\n💡 If login still fails, restart your dev server:');
      console.log('   1. Stop the current server (Ctrl+C)');
      console.log('   2. Run: npm run dev');
      console.log('   3. Try logging in again');
      return true;
    } else {
      console.log('❌ Password hash does NOT match!');
      console.log('\n💡 The password hash in database is incorrect.');
      console.log('   Run the SQL update query again in Supabase SQL Editor');
      return false;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return false;
  }
}

verifyUser().catch(console.error);

