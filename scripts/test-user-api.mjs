#!/usr/bin/env node

// Using built-in fetch (Node.js 18+)
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

const BASE_URL = 'http://localhost:3000';

// First, let's login to get a token
async function login() {
  try {
    console.log('🔐 Logging in to get auth token...');

    const loginData = {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    };

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (!data.success) {
      console.error('❌ Login failed:', data.error);
      return null;
    }

    console.log('✅ Login successful');
    return data.token;
  } catch (error) {
    console.error('❌ Login error:', error.message);
    return null;
  }
}

// Test getting all users
async function testGetUsers(token) {
  try {
    console.log('\n📋 Testing GET /api/admin/users...');

    const response = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: {
        'Cookie': `auth-token=${token}`,
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!data.success) {
      console.error('❌ Get users failed:', data.error);
      return null;
    }

    console.log(`✅ Got ${data.users.length} users`);
    return data.users;
  } catch (error) {
    console.error('❌ Get users error:', error.message);
    return null;
  }
}

// Test creating a user
async function testCreateUser(token) {
  try {
    console.log('\n➕ Testing POST /api/admin/users (create user)...');

    const testUserData = {
      username: `testuser_${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'TestPass123!',
      role: 'user'
    };

    const response = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `auth-token=${token}`,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testUserData)
    });

    const data = await response.json();

    if (!data.success) {
      console.error('❌ Create user failed:', data.error);
      return null;
    }

    console.log('✅ User created successfully:', data.user.id);
    return data.user;
  } catch (error) {
    console.error('❌ Create user error:', error.message);
    return null;
  }
}

// Test deleting a user
async function testDeleteUser(token, userId) {
  try {
    console.log(`\n🗑️  Testing DELETE /api/admin/users/${userId}...`);

    const response = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Cookie': `auth-token=${token}`,
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!data.success) {
      console.error('❌ Delete user failed:', data.error);
      return false;
    }

    console.log('✅ User deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Delete user error:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Testing User API Endpoints');
  console.log('==============================\n');

  // Check if server is running
  try {
    await fetch(`${BASE_URL}/api/health`);
  } catch (error) {
    console.error('❌ Server not running at', BASE_URL);
    console.log('💡 Make sure to run: npm run dev');
    return;
  }

  // Login
  const token = await login();
  if (!token) {
    console.error('❌ Cannot proceed without auth token');
    return;
  }

  // Get users
  const users = await testGetUsers(token);
  if (!users) {
    console.error('❌ Cannot proceed without user list');
    return;
  }

  console.log('📊 Current users:');
  users.forEach(user => {
    console.log(`   - ${user.username} (${user.email}) - ${user.role} - ${user.isActive ? 'Active' : 'Inactive'}`);
  });

  // Create a test user with a valid password
  const testUser = await testCreateUser(token);
  if (!testUser) {
    console.error('❌ Cannot test delete without a test user');
    return;
  }

  // Delete the test user
  const deleteSuccess = await testDeleteUser(token, testUser.id);

  if (deleteSuccess) {
    console.log('\n🎉 All user API operations work correctly!');
    console.log('✅ The issue might be in the frontend or browser-specific.');
    console.log('💡 Check browser console for JavaScript errors.');
  } else {
    console.log('\n❌ User deletion failed.');
    console.log('🔧 Check server logs and database permissions.');
  }
}

runTests().catch(console.error);
