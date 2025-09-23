#!/usr/bin/env node

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
          const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase environment variables not found');
  console.log('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAndCreateUsersTable() {
  try {
    console.log('🔍 Checking users table...');

    // Check if users table exists by trying to query it
    const { error: checkError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (checkError && checkError.code === 'PGRST116') {
      console.log('⚠️  Users table does not exist. Creating...');

      // Create users table
      const createUsersSQL = `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
          is_active BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          last_login TIMESTAMP WITH TIME ZONE
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

        -- Create refresh_tokens table
        CREATE TABLE IF NOT EXISTS refresh_tokens (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          token TEXT UNIQUE NOT NULL,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create indexes for refresh_tokens
        CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);
        CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
        CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

        -- Enable Row Level Security
        ALTER TABLE users ENABLE ROW LEVEL SECURITY;
        ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;

        -- Create policies for users table (service role can do everything)
        CREATE POLICY "Service role can manage users" ON users
          FOR ALL USING (true);

        -- Create policies for refresh_tokens table
        CREATE POLICY "Service role can manage refresh tokens" ON refresh_tokens
          FOR ALL USING (true);
      `;

      const { error: createError } = await supabase.rpc('exec_sql', { sql: createUsersSQL });

      if (createError) {
        // If rpc doesn't work, try direct SQL execution
        console.log('💡 Trying direct SQL execution...');

        const { error: sqlError } = await supabase.from('users').select('count').limit(0);
        if (sqlError) {
          console.error('❌ Failed to create users table via SQL. Please run this manually in Supabase dashboard:');
          console.log('\n--- SQL TO RUN IN SUPABASE DASHBOARD ---');
          console.log(createUsersSQL);
          console.log('--- END SQL ---');
          return false;
        }
      }

      console.log('✅ Users table created successfully!');
      return true;
    } else if (checkError) {
      console.error('❌ Error checking users table:', checkError.message);
      return false;
    } else {
      console.log('✅ Users table already exists');

      // Check table structure
      const { data: sampleUser, error: sampleError } = await supabase
        .from('users')
        .select('*')
        .limit(1);

      if (!sampleError && sampleUser && sampleUser.length > 0) {
        console.log('📊 Sample user found:', {
          id: sampleUser[0].id,
          username: sampleUser[0].username,
          email: sampleUser[0].email,
          role: sampleUser[0].role,
          is_active: sampleUser[0].is_active
        });
      }

      // Get user count
      const { count, error: countError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      if (!countError) {
        console.log(`📊 Total users: ${count || 0}`);
      }

      return true;
    }
  } catch (error) {
    console.error('❌ Error in checkAndCreateUsersTable:', error);
    return false;
  }
}

async function testUserOperations() {
  try {
    console.log('\n🧪 Testing user operations...');

    // Test creating a test user
    const testUser = {
      username: `test_user_${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password_hash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj7VXHqHkZa6', // "password123" hashed
      role: 'user',
      is_active: true
    };

    console.log('➕ Creating test user...');
    const { data: createdUser, error: createError } = await supabase
      .from('users')
      .insert(testUser)
      .select()
      .single();

    if (createError) {
      console.error('❌ Failed to create test user:', createError.message);
      return false;
    }

    console.log('✅ Test user created:', createdUser.id);

    // Test updating the user
    console.log('✏️  Updating test user...');
    const { error: updateError } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', createdUser.id);

    if (updateError) {
      console.error('❌ Failed to update test user:', updateError.message);
    } else {
      console.log('✅ Test user updated successfully');
    }

    // Test deleting the user
    console.log('🗑️  Deleting test user...');
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('id', createdUser.id);

    if (deleteError) {
      console.error('❌ Failed to delete test user:', deleteError.message);
      return false;
    }

    console.log('✅ Test user deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Error in testUserOperations:', error);
    return false;
  }
}

// Run the check
async function main() {
  console.log('🚀 Checking Users Table Setup');
  console.log('=============================\n');

  console.log('📋 Supabase Connection:');
  console.log(`   URL: ${supabaseUrl}`);
  console.log(`   Service Key: ${supabaseServiceKey.substring(0, 20)}...`);
  console.log('');

  const tableExists = await checkAndCreateUsersTable();

  if (tableExists) {
    const operationsWork = await testUserOperations();

    if (operationsWork) {
      console.log('\n🎉 Users table is ready and CRUD operations work!');
      console.log('✅ Your admin panel should now be able to manage users.');
    } else {
      console.log('\n⚠️  Users table exists but CRUD operations failed.');
      console.log('🔧 Check Row Level Security policies in Supabase dashboard.');
    }
  } else {
    console.log('\n❌ Users table setup failed.');
    console.log('📖 Please create the table manually using the SQL provided above.');
  }
}

main().catch(console.error);
