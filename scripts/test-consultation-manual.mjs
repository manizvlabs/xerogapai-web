#!/usr/bin/env node

/**
 * Manual test script for consultation form submission
 * Run individual tests or submit custom data
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

console.log('🔧 Manual Consultation Form Tester');
console.log('===================================\n');

// Predefined test data
const testData = {
  valid: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.com',
    countryCode: '1',
    phoneNumber: '5559876543',
    company: 'TechCorp Solutions',
    jobTitle: 'VP of Engineering',
    companySize: '201-500',
    industry: 'Technology',
    website: 'https://techcorp.com',
    preferredDate: '2025-10-25',
    preferredTime: '11:00 AM',
    timezone: 'America/Los_Angeles',
    consultationGoals: 'Digital transformation strategy, AI implementation roadmap',
    currentChallenges: 'Legacy systems, manual processes, scaling challenges',
    budget: '$100,000 - $250,000',
    timeline: '6-12 months',
    additionalNotes: 'Prefer remote consultation, available for follow-up calls',
    consultationType: 'Business Strategy Consultation'
  },

  minimal: {
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike.chen@startup.io',
    countryCode: '1',
    phoneNumber: '4151234567',
    company: 'StartupIO',
    preferredDate: '2025-11-01',
    preferredTime: '3:00 PM',
    timezone: 'America/New_York',
    consultationType: 'Technical Consultation'
  },

  international: {
    firstName: 'Fatima',
    lastName: 'Al-Zahra',
    email: 'fatima.alzahra@riyadh-tech.sa',
    countryCode: '966',
    phoneNumber: '501234567',
    company: 'Riyadh Technology Group',
    jobTitle: 'Chief Digital Officer',
    industry: 'Financial Services',
    preferredDate: '2025-10-22',
    preferredTime: '9:00 AM',
    timezone: 'Asia/Riyadh',
    consultationType: 'Compliance & Security Consultation'
  }
};

async function submitConsultation(data, description = 'Custom submission') {
  console.log(`📤 Submitting: ${description}`);
  console.log('─'.repeat(40));

  try {
    const response = await fetch(`${BASE_URL}/api/consultation-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Manual-Consultation-Test/1.0'
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phoneNumber ? `+${data.countryCode}${data.phoneNumber}` : undefined,
        companyName: data.company,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        timezone: data.timezone || 'America/New_York',
        consultationType: data.consultationType
      })
    });

    const responseData = await response.json();

    console.log(`📡 Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      console.log('✅ Consultation booked successfully!');

      if (responseData.contactId) {
        console.log(`🆔 Contact ID: ${responseData.contactId}`);
      }

      if (responseData.calendarEventId) {
        console.log(`📅 Calendar Event Created: ${responseData.calendarEventId}`);
      }

      if (responseData.joinUrl) {
        console.log(`🔗 Teams Meeting URL: ${responseData.joinUrl}`);
        console.log('📧 Email with Teams invite sent to client');
      }

      console.log(`📝 Message: ${responseData.message}`);
      console.log('\n📋 Submitted Data:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Error!');
      console.log(`📝 Error: ${responseData.error}`);
    }

  } catch (error) {
    console.log('❌ Network Error:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('📖 Usage:');
    console.log('  npm run test:consultation:manual valid     # Test valid submission');
    console.log('  npm run test:consultation:manual minimal   # Test minimal submission');
    console.log('  npm run test:consultation:manual intl      # Test international submission');
    console.log('  npm run test:consultation:manual custom    # Submit custom data from JSON file');
    console.log('\n📋 Available test presets:');
    console.log('  • valid     - Complete consultation booking');
    console.log('  • minimal   - Required fields only');
    console.log('  • intl      - International user (Saudi Arabia)');
    console.log('\n💡 Custom data: Create consultation-data.json in project root');
    return;
  }

  const testType = args[0];

  switch (testType) {
    case 'valid':
      await submitConsultation(testData.valid, 'Valid Complete Consultation');
      break;

    case 'minimal':
      await submitConsultation(testData.minimal, 'Minimal Required Fields Only');
      break;

    case 'intl':
    case 'international':
      await submitConsultation(testData.international, 'International User (Saudi Arabia)');
      break;

    case 'custom':
      // Try to load custom data from consultation-data.json
      try {
        const fs = await import('fs');
        const customData = JSON.parse(fs.readFileSync('consultation-data.json', 'utf8'));
        await submitConsultation(customData, 'Custom Data from consultation-data.json');
      } catch (error) {
        console.log('❌ Could not load consultation-data.json');
        console.log('💡 Create a JSON file with your test data in the project root');
        console.log('📝 Example:');
        console.log(JSON.stringify(testData.valid, null, 2));
      }
      break;

    default:
      console.log(`❌ Unknown test type: ${testType}`);
      console.log('💡 Use: valid, minimal, intl, or custom');
  }
}

// Handle errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Run the test
main().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
