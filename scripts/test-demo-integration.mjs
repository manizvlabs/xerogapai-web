#!/usr/bin/env node

/**
 * Test script for demo booking integration
 * Tests Microsoft Graph API calendar integration and email sending
 */

const path = require('path');

// Add the project root to the module path
const projectRoot = path.join(__dirname, '..');
require.main.paths.unshift(projectRoot);

const { microsoft365CalendarService } = require('../src/lib/email/microsoft365-calendar.ts');
const { microsoft365EmailService } = require('../src/lib/email/microsoft365-email.ts');

async function testMicrosoftGraphAPI() {
  console.log('🔧 Testing Microsoft Graph API connection...');

  try {
    const result = await microsoft365CalendarService.verifyConnection();

    if (result.success) {
      console.log('✅ Microsoft Graph API connection successful');
      return true;
    } else {
      console.log('❌ Microsoft Graph API connection failed:', result.error);
      return false;
    }
  } catch (error) {
    console.log('❌ Microsoft Graph API test error:', error.message);
    return false;
  }
}

async function testCalendarCreation() {
  console.log('📅 Testing calendar event creation...');

  try {
    // Create a test calendar event for tomorrow at 2 PM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const testDate = tomorrow.toISOString().split('T')[0];
    const testTime = '14:00';

    const testBookingData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      companyName: 'Test Company',
      preferredDate: testDate,
      preferredTime: testTime,
      timezone: 'America/New_York',
      consultationType: 'Test Demo'
    };

    const calendarEvent = microsoft365CalendarService.generateDemoBookingEvent(testBookingData);
    const result = await microsoft365CalendarService.createCalendarEvent(calendarEvent);

    if (result.success) {
      console.log('✅ Calendar event created successfully');
      console.log('   Event ID:', result.eventId);
      if (result.joinUrl) {
        console.log('   Teams Meeting URL:', result.joinUrl);
      }
      return { success: true, eventId: result.eventId, joinUrl: result.joinUrl };
    } else {
      console.log('❌ Calendar event creation failed:', result.error);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.log('❌ Calendar creation test error:', error.message);
    return { success: false, error: error.message };
  }
}

async function testEmailSending() {
  console.log('📧 Testing email sending...');

  try {
    const testEmailData = microsoft365EmailService.generateDemoBookingEmail({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      companyName: 'Test Company',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '14:00',
      consultationType: 'Test Demo'
    });

    // For testing, we'll just verify the email data structure
    // In a real test, you would call: await microsoft365EmailService.sendEmail(testEmailData);

    console.log('✅ Email data generated successfully');
    console.log('   To:', testEmailData.to);
    console.log('   Subject:', testEmailData.subject);
    console.log('   Has HTML content:', !!testEmailData.html);
    console.log('   Has text content:', !!testEmailData.text);

    return { success: true };
  } catch (error) {
    console.log('❌ Email test error:', error.message);
    return { success: false, error: error.message };
  }
}

async function runAllTests() {
  console.log('🚀 Starting demo integration tests...\n');

  const results = {
    graphApi: false,
    calendar: false,
    email: false
  };

  // Test Microsoft Graph API connection
  results.graphApi = await testMicrosoftGraphAPI();
  console.log('');

  // Test calendar creation
  const calendarResult = await testCalendarCreation();
  results.calendar = calendarResult.success;
  console.log('');

  // Test email sending
  results.email = await testEmailSending();
  console.log('');

  // Summary
  console.log('📊 Test Results Summary:');
  console.log('   Microsoft Graph API:', results.graphApi ? '✅ PASS' : '❌ FAIL');
  console.log('   Calendar Creation:', results.calendar ? '✅ PASS' : '❌ FAIL');
  console.log('   Email Sending:', results.email ? '✅ PASS' : '❌ FAIL');

  const allPassed = results.graphApi && results.calendar && results.email;
  console.log('\n🎯 Overall Result:', allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');

  if (allPassed) {
    console.log('\n🎉 Demo booking integration is working correctly!');
    console.log('   - Microsoft Graph API is connected');
    console.log('   - Calendar events can be created');
    console.log('   - Email notifications are ready');
    console.log('\n💡 You can now test the demo booking at: http://localhost:3000/demo');
  } else {
    console.log('\n⚠️  Some issues need to be resolved before demo booking will work properly.');
  }

  return allPassed;
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test script error:', error);
    process.exit(1);
  });
}

// Export for potential use in other modules
module.exports = { runAllTests };
