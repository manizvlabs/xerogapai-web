'use client';

import { StarIcon, ChatBubbleLeftIcon, HeartIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function ContactScoring() {
  const scoringCategories = [
    {
      icon: ChatBubbleLeftIcon,
      title: 'Communication Skills',
      description: 'Evaluates clarity, tone, active listening, and professional communication throughout the interaction.',
      criteria: [
        'Greeting & introduction',
        'Active listening skills',
        'Clarity of communication',
        'Professional tone & empathy',
        'Questioning techniques',
        'Closing the conversation'
      ],
      weight: '30%'
    },
    {
      icon: StarIcon,
      title: 'Problem Resolution',
      description: 'Assesses the agent\'s ability to understand issues, provide solutions, and ensure customer satisfaction.',
      criteria: [
        'Issue identification',
        'Solution accuracy',
        'First-call resolution',
        'Escalation appropriateness',
        'Follow-up commitments',
        'Customer satisfaction'
      ],
      weight: '25%'
    },
    {
      icon: HeartIcon,
      title: 'Customer Experience',
      description: 'Measures customer satisfaction, emotional intelligence, and relationship-building skills.',
      criteria: [
        'Empathy & understanding',
        'Patience & courtesy',
        'Personalization',
        'Relationship building',
        'Positive attitude',
        'Satisfaction confirmation'
      ],
      weight: '20%'
    },
    {
      icon: LightBulbIcon,
      title: 'Product Knowledge',
      description: 'Evaluates the agent\'s understanding of products, services, and company policies.',
      criteria: [
        'Product information accuracy',
        'Policy knowledge',
        'Up-selling opportunities',
        'Technical proficiency',
        'Resource utilization',
        'Knowledge application'
      ],
      weight: '15%'
    }
  ];

  const scoringFeatures = [
    {
      title: 'Real-Time Scoring',
      description: 'Continuous evaluation during live calls with instant feedback',
      benefits: ['Immediate improvement', 'Live coaching opportunities', 'Trend identification']
    },
    {
      title: 'Automated Analysis',
      description: 'AI analyzes 100% of calls automatically, no manual review needed',
      benefits: ['100% coverage', 'Consistent evaluation', 'Scalable QA process']
    },
    {
      title: 'Custom Scoring Models',
      description: 'Tailored scoring criteria based on your industry and business needs',
      benefits: ['Industry-specific', 'Business-aligned', 'Flexible customization']
    },
    {
      title: 'Performance Insights',
      description: 'Deep analytics on individual and team performance patterns',
      benefits: ['Data-driven insights', 'Performance trends', 'Improvement opportunities']
    }
  ];

  const sampleScorecard = {
    overall: 87,
    categories: [
      { name: 'Communication', score: 92, max: 100 },
      { name: 'Resolution', score: 85, max: 100 },
      { name: 'Experience', score: 88, max: 100 },
      { name: 'Knowledge', score: 83, max: 100 }
    ],
    strengths: ['Excellent greeting', 'Strong empathy', 'Clear communication'],
    improvements: ['Product knowledge depth', 'Up-selling opportunities']
  };

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Intelligent Call Scoring & Evaluation
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Comprehensive AI-powered scoring that evaluates every aspect of customer interactions
            with detailed feedback and actionable insights.
          </p>
        </div>

        {/* Scoring Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {scoringCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {category.weight}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {category.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Scoring Criteria:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.criteria.map((criterion, criterionIndex) => (
                      <div key={criterionIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scoring Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {scoringFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sample Scorecard */}
        <div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Sample Call Scorecard
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              See how our AI provides detailed, actionable feedback on every customer interaction
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">{sampleScorecard.overall}/100</div>
                <div className="text-green-100">Overall Call Quality Score</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {sampleScorecard.categories.map((category, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold mb-1">{category.score}</div>
                    <div className="text-sm text-green-100">{category.name}</div>
                    <div className="w-full bg-green-900/30 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${(category.score / category.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-300 mb-3">Strengths Identified:</h4>
                  <ul className="space-y-1">
                    {sampleScorecard.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-green-100">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-300 mb-3">Improvement Areas:</h4>
                  <ul className="space-y-1">
                    {sampleScorecard.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-orange-100">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Accuracy */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <StarIcon className="w-12 h-12 text-yellow-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Scoring Accuracy & Consistency
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI scoring system maintains 95% accuracy and perfect consistency,
              eliminating human bias and ensuring fair evaluation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Scoring Accuracy</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Industry leading precision</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Call Coverage</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Every interaction scored</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">0%</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Bias in Scoring</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Consistent evaluation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
