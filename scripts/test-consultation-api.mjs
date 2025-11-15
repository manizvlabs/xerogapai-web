#!/usr/bin/env node

/**
 * Test script for consultation form API submission
 * Tests both success and error scenarios
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

console.log('🧪 Testing Consultation Form API Submission');
console.log('==========================================');
console.log('📊 Rate Limits: 1000 submissions per 24 hours per IP');
console.log('⏱️  Test will run multiple scenarios...\n');

// Test data for consultation form submission
const validConsultationData = {
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@consultation-test.com',
  countryCode: '1', // US
  phoneNumber: '5551234567',
  company: 'TechCorp Solutions',
  jobTitle: 'Chief Technology Officer',
  companySize: '51-200',
  industry: 'Technology',
  website: 'https://techcorp.com',
  preferredDate: '2025-10-20',
  preferredTime: '10:00 AM',
  timezone: 'America/New_York',
  consultationGoals: 'Understand AI capabilities and get implementation roadmap',
  currentChallenges: 'Manual processes, customer service bottlenecks',
  budget: '$50,000 - $100,000',
  timeline: '3-6 months',
  additionalNotes: 'Looking for quick wins and long-term transformation',
  consultationType: 'Business Strategy Consultation'
};

const invalidConsultationData = {
  firstName: '', // Missing required field
  lastName: 'Doe',
  email: 'invalid-email', // Invalid email
  countryCode: '1',
  phoneNumber: '123', // Too short for US
  company: 'Test Company'
};

async function testConsultationSubmission(testName, data, expectedStatus = 200) {
  console.log(`📋 Testing: ${testName}`);
  console.log('─'.repeat(50));

  try {
    const response = await fetch(`${BASE_URL}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Consultation-API-Test/1.0'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    console.log(`📡 Status: ${response.status} ${response.statusText}`);

    if (response.status === expectedStatus) {
      console.log('✅ Expected status received');

      if (response.status === 200) {
        console.log(`🆔 Contact ID: ${responseData.data?.id || 'N/A'}`);
        console.log('📝 Response Message:', responseData.message);

        // Verify required fields are present in response
        if (responseData.success === true && responseData.data?.id) {
          console.log('✅ Submission successful - data saved');
        } else {
          console.log('⚠️  Unexpected response structure');
        }
      } else {
        console.log('📝 Error Message:', responseData.error);
      }
    } else {
      console.log(`❌ Unexpected status: expected ${expectedStatus}, got ${response.status}`);
      console.log('📝 Response:', JSON.stringify(responseData, null, 2));
    }

  } catch (error) {
    console.log('❌ Network Error:', error.message);
  }

  console.log(''); // Empty line for spacing
}

async function runTests() {
  // Test 1: Valid consultation submission
  await testConsultationSubmission(
    'Valid Consultation Form Submission',
    validConsultationData,
    200
  );

  // Test 2: Invalid consultation submission
  await testConsultationSubmission(
    'Invalid Consultation Form Submission (Missing Required Fields)',
    invalidConsultationData,
    400
  );

  // Test 3: Minimal valid submission (only required fields)
  const minimalValidData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@minimal-test.com',
    countryCode: '91', // India
    phoneNumber: '9876543210',
    company: 'Minimal Corp',
    preferredDate: '2025-10-25',
    preferredTime: '2:00 PM',
    consultationType: 'Technical Consultation'
  };

  await testConsultationSubmission(
    'Minimal Valid Consultation Submission',
    minimalValidData,
    200
  );

  // Test 4: Edge case - very long text fields
  const longTextData = {
    ...validConsultationData,
    firstName: 'Alexandria',
    lastName: 'VeryLongLastNameThatMightCauseIssues',
    email: 'alexandria.verylonglastname@example-company-with-long-domain.co.uk',
    consultationGoals: 'A'.repeat(1000), // Very long text
    currentChallenges: 'B'.repeat(1000), // Very long text
    additionalNotes: 'C'.repeat(1000) // Very long text
  };

  await testConsultationSubmission(
    'Long Text Fields Test',
    longTextData,
    200
  );

  // Test 5: Different country codes
  const internationalData = {
    ...validConsultationData,
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    email: 'ahmed.alrashid@uae-test.com',
    countryCode: '971', // UAE
    phoneNumber: '501234567',
    timezone: 'Asia/Dubai',
    consultationType: 'Compliance & Security Consultation'
  };

  await testConsultationSubmission(
    'International Phone Number Test (UAE)',
    internationalData,
    200
  );

  console.log('🎉 Consultation API Testing Complete!');
  console.log('========================================');
  console.log('\n💡 Next Steps:');
  console.log('1. Check your Supabase dashboard to verify data was saved');
  console.log('2. Test the actual form at /consultation');
  console.log('3. Check admin panel at /admin/contacts');
  console.log('4. Verify email notifications are working (if configured)');
}

async function checkServerHealth() {
  try {
    console.log('🏥 Checking server health...');
    const response = await fetch(`${BASE_URL}/api/contacts?limit=1`, {
      headers: {
        'User-Agent': 'Consultation-API-Test/1.0'
      }
    });

    if (response.ok) {
      console.log('✅ Server is responding');
      console.log('');
      return true;
    } else {
      console.log('❌ Server health check failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Cannot connect to server:', error.message);
    console.log(`💡 Make sure the server is running on ${BASE_URL}`);
    return false;
  }
}

// Main execution
async function main() {
  const serverHealthy = await checkServerHealth();

  if (!serverHealthy) {
    console.log('\n❌ Tests aborted due to server issues');
    process.exit(1);
  }

  await runTests();
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Run the tests
main().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
