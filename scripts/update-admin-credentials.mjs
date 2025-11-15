#!/usr/bin/env node

/**
 * Update Admin Credentials Script
 * 
 * This script:
 * 1. Generates new admin credentials
 * 2. Updates .env.local with new password
 * 3. Updates password hash in Supabase database
 * 4. Provides SQL query if direct update fails
 */

import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const envPath = join(rootDir, '.env.local');

// Load environment variables from .env.local
function loadEnv() {
  if (existsSync(envPath)) {
    const envContent = readFileSync(envPath, 'utf8');
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

// Generate secure password
function generateSecurePassword() {
  const adjectives = ['strong', 'secure', 'powerful', 'robust', 'dynamic', 'swift', 'clever', 'brilliant'];
  const nouns = ['tiger', 'eagle', 'wolf', 'bear', 'lion', 'fox', 'hawk', 'panther'];
  const numbers = Math.floor(Math.random() * 9999) + 1000;

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective}-${noun}-${numbers}`;
}

async function updateEnvFile(newPassword) {
  console.log('📝 Updating .env.local file...');
  
  if (!existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    return false;
  }

  let envContent = readFileSync(envPath, 'utf8');
  
  // Update ADMIN_PASSWORD
  const passwordRegex = /^ADMIN_PASSWORD=.*$/m;
  if (passwordRegex.test(envContent)) {
    envContent = envContent.replace(passwordRegex, `ADMIN_PASSWORD=${newPassword}`);
  } else {
    // Add if doesn't exist
    envContent += `\nADMIN_PASSWORD=${newPassword}\n`;
  }

  writeFileSync(envPath, envContent);
  console.log('✅ .env.local updated successfully!\n');
  return true;
}

async function updateSupabaseUser(newPassword) {
  console.log('🔄 Attempting to update Supabase database...');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminEmail = process.env.ADMIN_EMAIL || 'support@vyaptix.com';

  if (!supabaseUrl || !serviceKey) {
    console.log('⚠️  Supabase credentials not found, skipping direct update');
    return false;
  }

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Create Supabase client with service role
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        fetch: async (url, options = {}) => {
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

    // Check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id, username')
      .eq('username', adminUsername)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingUser) {
      // Update existing user
      console.log(`   Found existing user: ${existingUser.username} (ID: ${existingUser.id})`);
      console.log('   Updating password hash...');
      
      const { error: updateError } = await supabase
        .from('users')
        .update({
          password_hash: hashedPassword,
          email: adminEmail,
          is_active: true,
          role: 'admin'
        })
        .eq('id', existingUser.id);

      if (updateError) {
        throw updateError;
      }

      console.log('✅ Password updated successfully in Supabase!\n');
      return true;
    } else {
      // Create new user
      console.log(`   User '${adminUsername}' not found, creating new admin user...`);
      
      const { error: createError } = await supabase
        .from('users')
        .insert({
          username: adminUsername,
          email: adminEmail,
          password_hash: hashedPassword,
          role: 'admin',
          is_active: true
        });

      if (createError) {
        throw createError;
      }

      console.log('✅ Admin user created successfully in Supabase!\n');
      return true;
    }
  } catch (error) {
    console.error('❌ Failed to update Supabase:', error.message);
    console.log('   Will provide SQL query for manual update\n');
    return false;
  }
}

function generateSQL(newPassword) {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminEmail = process.env.ADMIN_EMAIL || 'support@vyaptix.com';
  
  // Generate hash synchronously for SQL (we'll use bcrypt in Node.js)
  return `
-- Update Admin User Password Hash
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- First, check if user exists
SELECT id, username, email FROM users WHERE username = '${adminUsername}';

-- If user exists, update password hash (replace HASH_HERE with the bcrypt hash)
-- UPDATE users 
-- SET password_hash = 'HASH_HERE',
--     email = '${adminEmail}',
--     is_active = true,
--     role = 'admin'
-- WHERE username = '${adminUsername}';

-- If user doesn't exist, insert new user (replace HASH_HERE with the bcrypt hash)
-- INSERT INTO users (username, email, password_hash, role, is_active)
-- VALUES ('${adminUsername}', '${adminEmail}', 'HASH_HERE', 'admin', true)
-- ON CONFLICT (username) DO UPDATE SET
--   password_hash = EXCLUDED.password_hash,
--   email = EXCLUDED.email,
--   is_active = EXCLUDED.is_active,
--   role = EXCLUDED.role;
`;
}

async function main() {
  console.log('🔐 Admin Credentials Update Script');
  console.log('===================================\n');

  // Generate new password
  const newPassword = generateSecurePassword();
  console.log('✅ Generated new admin password:');
  console.log(`   Password: ${newPassword}\n`);

  // Update .env.local
  const envUpdated = await updateEnvFile(newPassword);
  if (!envUpdated) {
    console.error('❌ Failed to update .env.local');
    process.exit(1);
  }

  // Try to update Supabase
  const supabaseUpdated = await updateSupabaseUser(newPassword);

  // Generate password hash for SQL
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  console.log('='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));
  console.log(`✅ New Admin Password: ${newPassword}`);
  console.log(`✅ Password Hash: ${hashedPassword}`);
  console.log(`✅ .env.local Updated: ${envUpdated ? 'Yes' : 'No'}`);
  console.log(`✅ Supabase Updated: ${supabaseUpdated ? 'Yes' : 'No'}`);
  console.log('='.repeat(60));

  if (!supabaseUpdated) {
    console.log('\n📋 Manual SQL Update Required:');
    console.log('='.repeat(60));
    console.log('Please run the following SQL in Supabase SQL Editor:');
    console.log('Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql\n');
    console.log('-- Update admin user password hash');
    console.log(`UPDATE users SET password_hash = '${hashedPassword}' WHERE username = '${process.env.ADMIN_USERNAME || 'admin'}';`);
    console.log('\n-- Or if user doesn\'t exist, create it:');
    console.log(`INSERT INTO users (username, email, password_hash, role, is_active)`);
    console.log(`VALUES ('${process.env.ADMIN_USERNAME || 'admin'}', '${process.env.ADMIN_EMAIL || 'support@vyaptix.com'}', '${hashedPassword}', 'admin', true)`);
    console.log(`ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;`);
    console.log('='.repeat(60));
  }

  console.log('\n🧪 Next Steps:');
  console.log('1. If Supabase update failed, run the SQL query above in Supabase SQL Editor');
  console.log('2. Restart your development server: npm run dev');
  console.log('3. Test login at: http://localhost:3000/admin/login');
  console.log(`4. Use credentials: ${process.env.ADMIN_USERNAME || 'admin'} / ${newPassword}`);
  console.log('\n🎉 Credentials update complete!');
}

main().catch(console.error);

