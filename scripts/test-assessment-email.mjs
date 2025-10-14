#!/usr/bin/env node

async function testAssessmentEmail() {
  console.log('🧪 Testing Assessment Email Functionality\n');

  const assessmentData = {
    score: 75,
    totalScore: 100,
    maxScore: 100,
    answers: {
      'q1': 'option_a',
      'q2': 'option_b',
      'q3': 'option_c'
    },
    insights: [
      'Your business shows strong potential for AI automation',
      'Consider starting with customer service automation',
      'Focus on process optimization in the next quarter'
    ]
  };

  const userEmail = 'manish.08.hbti@gmail.com';

  console.log(`📧 Sending assessment report to: ${userEmail}`);
  console.log('📊 Assessment data:', JSON.stringify(assessmentData, null, 2));

  try {
    const response = await fetch('http://localhost:4010/api/assessment/send-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assessmentData,
        userEmail,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Assessment report sent successfully!');
      console.log('📨 Message ID:', result.messageId);
    } else {
      console.error('❌ Failed to send assessment report:', result.error);
    }
  } catch (error) {
    console.error('💥 Error testing assessment email:', error.message);
  }

  console.log('\n🎉 Assessment email test completed!');
}

// Run the test
testAssessmentEmail().catch(error => {
  console.error('💥 Test failed with error:', error.message);
  process.exit(1);
});
