#!/usr/bin/env node

/**
 * Simple test to check Microsoft Graph API connection
 */

import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables from .env.local manually
const envPath = join(process.cwd(), '.env.local');
try {
  const envContent = readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#') && trimmedLine.includes('=')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      const value = valueParts.join('=').replace(/"/g, '');
      process.env[key] = value;
    }
  }
} catch (error) {
  console.log('Could not load .env.local file');
}

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

async function testGraphAPIConnection() {
  console.log('🔧 Testing Microsoft Graph API connection...');

  // Get credentials from environment
  const clientId = process.env.MS_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;
  const tenantId = process.env.MS_GRAPH_TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    console.log('❌ Microsoft Graph API credentials not configured');
    console.log('Please set MS_GRAPH_CLIENT_ID, MS_GRAPH_CLIENT_SECRET, and MS_GRAPH_TENANT_ID in .env.local');
    return false;
  }

  if (clientId.includes('your-') || clientSecret.includes('your-') || tenantId.includes('your-')) {
    console.log('❌ Microsoft Graph API credentials are still set to placeholder values');
    console.log('Please update .env.local with your actual Microsoft Graph API credentials');
    return false;
  }

  try {
    // Initialize Microsoft Graph client
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const graphClient = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token.token;
        }
      }
    });

    // Test basic connection by getting user info (using Object ID)
    const userId = '44dcba14-cfef-49e7-bfb9-fda4b477ed8e';
    const user = await graphClient.api(`/users/${userId}`).get();
    console.log('✅ Microsoft Graph API connection successful');
    console.log('   Connected as:', user.displayName || user.userPrincipalName);
    return true;

  } catch (error) {
    console.log('❌ Microsoft Graph API connection failed:', error.message);

    if (error.message.includes('unauthorized') || error.message.includes('401')) {
      console.log('💡 This usually means:');
      console.log('   - Client ID/Secret/Tenant ID are incorrect');
      console.log('   - The Azure app registration is not configured properly');
      console.log('   - The app does not have the required permissions');
    } else if (error.message.includes('forbidden') || error.message.includes('403')) {
      console.log('💡 This usually means:');
      console.log('   - The app does not have Calendars.ReadWrite permission');
      console.log('   - Admin consent has not been granted');
    }

    return false;
  }
}

// Run test if executed directly
testGraphAPIConnection().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
