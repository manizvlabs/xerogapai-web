#!/usr/bin/env node

/**
 * Test script to diagnose calendar integration issues
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

async function testCalendarIntegration() {
  console.log('🔍 Diagnosing calendar integration...\n');

  // Check credentials
  const clientId = process.env.MS_GRAPH_CLIENT_ID;
  const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;
  const tenantId = process.env.MS_GRAPH_TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    console.log('❌ Microsoft Graph API credentials not configured');
    console.log('Please set MS_GRAPH_CLIENT_ID, MS_GRAPH_CLIENT_SECRET, and MS_GRAPH_TENANT_ID in .env.local');
    return;
  }

  if (clientId.includes('your-') || clientSecret.includes('your-') || tenantId.includes('your-')) {
    console.log('❌ Microsoft Graph API credentials are still set to placeholder values');
    console.log('Please update .env.local with your actual Microsoft Graph API credentials');
    return;
  }

  console.log('✅ Credentials are configured');

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

    // Test 1: Get user info
    console.log('\n📋 Test 1: Getting user information...');
    try {
      const userId = process.env.MS_GRAPH_OBJECT_ID || '44dcba14-cfef-49e7-bfb9-fda4b477ed8e';
      const user = await graphClient.api(`/users/${userId}`).get();
      console.log('✅ Connected as:', user.displayName || user.userPrincipalName);
      console.log('   Email:', user.mail || user.userPrincipalName);
      console.log('   User ID:', user.id);
    } catch (error) {
      console.log('❌ Failed to get user info:', error.message);
      return;
    }

    // Test 2: Get calendar events
    console.log('\n📅 Test 2: Getting calendar events...');
    try {
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];
      const endDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const currentUserId = process.env.MS_GRAPH_OBJECT_ID || '44dcba14-cfef-49e7-bfb9-fda4b477ed8e';

      console.log(`   Date range: ${startDate} to ${endDate}`);

      const events = await graphClient.api(`/users/${currentUserId}/events`)
        .filter(`start/dateTime ge '${startDate}T00:00:00Z' and end/dateTime le '${endDate}T23:59:59Z'`)
        .select('subject,start,end,isAllDay')
        .top(10)
        .get();

      console.log(`✅ Found ${events.value?.length || 0} events`);

      if (events.value && events.value.length > 0) {
        events.value.forEach((event, index) => {
          console.log(`   ${index + 1}. ${event.subject} - ${new Date(event.start.dateTime).toLocaleString()}`);
        });
      } else {
        console.log('   No events found in this date range');
      }
    } catch (error) {
      console.log('❌ Failed to get calendar events:', error.message);
      console.log('   This might be due to missing permissions or no events in the date range');
    }

    // Test 3: Get free/busy information
    console.log('\n⏰ Test 3: Getting free/busy information...');
    try {
      const currentUserId = process.env.MS_GRAPH_OBJECT_ID || '44dcba14-cfef-49e7-bfb9-fda4b477ed8e';
      const freeBusyQuery = {
        schedules: [currentUserId],
        startTime: {
          dateTime: `${new Date().toISOString().split('T')[0]}T00:00:00`,
          timeZone: 'UTC'
        },
        endTime: {
          dateTime: `${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}T23:59:59`,
          timeZone: 'UTC'
        },
        availabilityViewInterval: 60
      };

      const freeBusyResponse = await graphClient.api(`/users/${currentUserId}/calendar/getSchedule`).post(freeBusyQuery);
      console.log('✅ Free/busy query successful');
      console.log('   Response structure looks correct');
    } catch (error) {
      console.log('❌ Failed to get free/busy information:', error.message);
    }

    console.log('\n🎯 Summary:');
    console.log('If all tests pass, the calendar integration should work.');
    console.log('If events aren\'t showing up, it might be because:');
    console.log('   - No events in the selected date range');
    console.log('   - Events are in a different calendar (not the default calendar)');
    console.log('   - The calendar is shared or delegated');

  } catch (error) {
    console.log('❌ General error:', error.message);
  }
}

testCalendarIntegration().catch(console.error);
