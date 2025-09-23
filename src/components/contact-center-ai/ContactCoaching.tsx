'use client';
import Link from 'next/link';

import { UserGroupIcon, LightBulbIcon, ArrowTrendingUpIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function ContactCoaching() {
  const coachingFeatures = [
    {
      icon: UserGroupIcon,
      title: 'Personalized Coaching Plans',
      description: 'AI creates customized development plans for each agent based on their performance data and identified skill gaps.',
      benefits: [
        'Individual learning paths',
        'Skill-specific training',
        'Progress tracking',
        'Adaptive recommendations'
      ]
    },
    {
      icon: LightBulbIcon,
      title: 'Real-Time Guidance',
      description: 'Live suggestions during calls help agents handle complex situations and improve customer interactions instantly.',
      benefits: [
        'Contextual suggestions',
        'Live intervention support',
        'Confidence building',
        'Immediate improvement'
      ]
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Performance Analytics',
      description: 'Detailed insights into individual and team performance with trend analysis and predictive improvement metrics.',
      benefits: [
        'Performance forecasting',
        'Trend identification',
        'Goal setting',
        'Progress monitoring'
      ]
    },
    {
      icon: AcademicCapIcon,
      title: 'Automated Training',
      description: 'Intelligent training assignments based on performance data, with automated progress tracking and certification.',
      benefits: [
        'Smart course recommendations',
        'Automated assessments',
        'Certification tracking',
        'Knowledge reinforcement'
      ]
    }
  ];

  const coachingWorkflow = [
    {
      step: '1',
      title: 'Performance Analysis',
      description: 'AI analyzes call recordings and performance data to identify strengths and areas for improvement.',
      duration: 'Real-time'
    },
    {
      step: '2',
      title: 'Skill Gap Assessment',
      description: 'Detailed evaluation of specific skills and competencies that need development.',
      duration: 'Daily'
    },
    {
      step: '3',
      title: 'Personalized Plan',
      description: 'Custom coaching plan with specific training modules and improvement goals.',
      duration: 'Weekly'
    },
    {
      step: '4',
      title: 'Guided Training',
      description: 'Interactive training sessions with AI feedback and progress monitoring.',
      duration: 'Ongoing'
    },
    {
      step: '5',
      title: 'Performance Tracking',
      description: 'Continuous monitoring of improvement and adjustment of coaching plans.',
      duration: 'Real-time'
    }
  ];

  const coachingTypes = [
    {
      type: 'Real-Time Coaching',
      description: 'Live guidance during active calls',
      examples: [
        'Script suggestions',
        'Objection handling',
        'Empathy cues',
        'Product recommendations'
      ]
    },
    {
      type: 'Post-Call Coaching',
      description: 'Detailed feedback after call completion',
      examples: [
        'Performance summary',
        'Improvement areas',
        'Best practices',
        'Training recommendations'
      ]
    },
    {
      type: 'Proactive Coaching',
      description: 'Preventive guidance before potential issues',
      examples: [
        'Trend alerts',
        'Skill gap warnings',
        'Preparation tips',
        'Confidence boosters'
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            AI-Powered Agent Coaching
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Intelligent coaching that helps your agents improve performance, build confidence,
            and deliver exceptional customer experiences.
          </p>
        </div>

        {/* Coaching Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {coachingFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Benefits:
                  </h4>
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Coaching Workflow */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Intelligent Coaching Workflow
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Continuous improvement cycle that ensures agents receive the right coaching at the right time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {coachingWorkflow.map((step, index) => (
              <div key={index} className="text-center relative">
                {index > 0 && (
                  <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-green-200 dark:bg-green-800 -translate-x-full translate-y-2" />
                )}
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {step.description}
                </p>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaching Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {coachingTypes.map((type, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border border-green-200 dark:border-gray-600">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {type.type}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {type.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Examples:
                </h4>
                {type.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-300">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coaching Impact */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Measurable Coaching Impact
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            See the real results of AI-powered coaching on agent performance and customer satisfaction
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">40%</div>
              <div className="text-sm text-green-100">Performance Improvement</div>
              <div className="text-xs text-green-200 mt-1">Average increase</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">60%</div>
              <div className="text-sm text-green-100">Faster Onboarding</div>
              <div className="text-xs text-green-200 mt-1">Training time reduction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">25%</div>
              <div className="text-sm text-green-100">Higher Retention</div>
              <div className="text-xs text-green-200 mt-1">Agent retention rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">90%</div>
              <div className="text-sm text-green-100">Agent Satisfaction</div>
              <div className="text-xs text-green-200 mt-1">Coaching program rating</div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Experience AI Coaching
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
