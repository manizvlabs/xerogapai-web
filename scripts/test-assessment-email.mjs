#!/usr/bin/env node

async function testAssessmentEmail() {
  console.log('🧪 Testing Assessment Email Functionality\n');

  const assessmentData = {
    score: 75,
    totalScore: 100,
    maxScore: 100,
    answers: {
      'q1': 'We have basic digital tools but limited automation',
      'q2': 'Some team members have basic AI awareness',
      'q3': 'Budget available for AI pilot projects',
      'q4': '6-12 months timeline for implementation',
      'q5': 'Customer service and data processing',
      'q6': 'Medium priority for AI adoption',
      'q7': 'Basic data infrastructure exists',
      'q8': 'Some resistance to change from team',
      'q9': 'Looking for measurable ROI within 6 months',
      'q10': 'Need guidance on AI vendor selection'
    },
    insights: [
      'Your business shows strong potential for AI automation in customer service',
      'Consider starting with customer service automation to see quick wins',
      'Focus on process optimization in the next quarter with pilot projects',
      'Your team readiness is moderate - consider AI training programs'
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
