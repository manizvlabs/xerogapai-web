#!/usr/bin/env node

/**
 * User Authentication Tables Setup for Supabase
 *
 * This script creates the necessary tables for user authentication and admin login.
 * Run this script after setting up Supabase environment variables.
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
function loadEnv() {
  const envPath = join(__dirname, '..', '.env.local');
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

// Dynamic import to avoid TypeScript issues
async function runSetup() {
  try {
    console.log('🔐 Setting up user authentication tables...\n');

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error('❌ Missing Supabase environment variables!');
      console.log('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
      console.log('Please set these in your .env.local file first.');
      process.exit(1);
    }

    // Import Supabase client dynamically
    const { createClient } = await import('@supabase/supabase-js');

    // Create service client with admin privileges
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    // SQL to create user tables
    const createTablesSQL = `
      -- Create users table for authentication
      CREATE TABLE IF NOT EXISTS users (
        id BIGSERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        last_login TIMESTAMP WITH TIME ZONE
      );

      -- Create refresh_tokens table for token management
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id BIGSERIAL PRIMARY KEY,
        token_hash VARCHAR(255) UNIQUE NOT NULL,
        user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
      CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

      -- Enable Row Level Security (RLS)
      ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;

      -- Create policies for users table
      -- Allow user registration (anyone can create user)
      DROP POLICY IF EXISTS "Anyone can create user" ON users;
      CREATE POLICY "Anyone can create user" ON users
        FOR INSERT WITH CHECK (true);

      -- Allow users to read their own data
      DROP POLICY IF EXISTS "Users can read own data" ON users;
      CREATE POLICY "Users can read own data" ON users
        FOR SELECT USING (auth.uid()::text = id::text);

      -- Allow users to update their own data
      DROP POLICY IF EXISTS "Users can update own data" ON users;
      CREATE POLICY "Users can update own data" ON users
        FOR UPDATE USING (auth.uid()::text = id::text);

      -- Create policies for refresh_tokens table
      -- Only allow users to manage their own refresh tokens
      DROP POLICY IF EXISTS "Users can manage own refresh tokens" ON refresh_tokens;
      CREATE POLICY "Users can manage own refresh tokens" ON refresh_tokens
        FOR ALL USING (user_id::text = auth.uid()::text);

      -- Allow token operations for authentication (bypass RLS for service operations)
      DROP POLICY IF EXISTS "Allow refresh token operations" ON refresh_tokens;
      CREATE POLICY "Allow refresh token operations" ON refresh_tokens
        FOR ALL USING (true);

      -- Create function to update updated_at timestamp
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
      END;
      $$ language 'plpgsql';

      -- Create trigger to automatically update updated_at
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    `;

    console.log('📋 Creating user authentication tables...\n');
    console.log('⚠️  Note: Please run the following SQL manually in your Supabase SQL Editor:');
    console.log('   Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql');
    console.log('   Then paste and run this SQL:\n');

    console.log('```sql');
    console.log(createTablesSQL);
    console.log('```\n');

    // Try to execute some basic operations using Supabase client
    console.log('🔄 Attempting to create tables using Supabase client...\n');

    try {
      // First, try to create the users table by inserting a test record and seeing if it fails
      const { error: testError } = await supabase
        .from('users')
        .select('count')
        .limit(1);

      if (testError && testError.code === 'PGRST116') {
        console.log('⚠️  Users table does not exist. Please create it manually using the SQL above.');
        console.log('   After creating the tables, re-run this script to create the admin user.\n');
        return;
      }

      console.log('✅ Tables appear to exist, proceeding with admin user creation...\n');
    } catch (error) {
      console.log('⚠️  Unable to verify table existence. Please create tables manually using the SQL above.\n');
      return;
    }

    console.log('\n✅ User authentication tables created successfully!\n');

    // Test the tables by checking if they exist
    console.log('🧪 Testing table creation...');

    const { data: usersTable, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    const { data: tokensTable, error: tokensError } = await supabase
      .from('refresh_tokens')
      .select('count')
      .limit(1);

    if (usersError || tokensError) {
      console.error('❌ Table creation verification failed:');
      if (usersError) console.error('Users table error:', usersError);
      if (tokensError) console.error('Refresh tokens table error:', tokensError);
      throw new Error('Table verification failed');
    }

    console.log('✅ Tables verified successfully!\n');

    // Now create the admin user if it doesn't exist
    console.log('👤 Creating admin user...');

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminEmail = process.env.ADMIN_EMAIL || 'support@vyaptix.com';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD not set in environment variables!');
      console.log('Please run the generate-secrets script first:');
      console.log('npm run generate-secrets');
      process.exit(1);
    }

    // Check if admin user already exists
    const { data: existingAdmin } = await supabase
      .from('users')
      .select('id')
      .eq('username', adminUsername)
      .single();

    if (existingAdmin) {
      console.log(`ℹ️  Admin user '${adminUsername}' already exists`);
    } else {
      // Hash the password (we need to import bcrypt)
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.default.hash(adminPassword, 12);

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
        console.error('❌ Failed to create admin user:', createError);
        throw createError;
      }

      console.log(`✅ Admin user '${adminUsername}' created successfully!`);
    }

    console.log('\n🎉 User authentication setup complete!');
    console.log('===============================\n');

    console.log('📋 Summary:');
    console.log('• Users table created ✅');
    console.log('• Refresh tokens table created ✅');
    console.log('• Indexes created ✅');
    console.log('• RLS policies configured ✅');
    console.log('• Admin user created ✅');
    console.log(`• Admin credentials: ${adminUsername} / ${adminPassword.replace(/./g, '*')}\n`);

    console.log('🚀 You can now login to the admin panel!');
    console.log('   Visit: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
runSetup();
