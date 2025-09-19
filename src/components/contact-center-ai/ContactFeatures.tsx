'use client';
import Link from 'next/link';

import { MicrophoneIcon, EyeIcon, AcademicCapIcon, ChartBarIcon, SpeakerWaveIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ContactFeatures() {
  const features = [
    {
      icon: MicrophoneIcon,
      title: 'Automated Call Scoring',
      description: 'AI analyzes every customer interaction in real-time, scoring calls based on your quality standards and providing instant feedback.',
      capabilities: [
        'Real-time call analysis',
        'Custom scoring criteria',
        'Instant feedback delivery',
        'Compliance monitoring'
      ],
      benefit: '95% call quality score improvement'
    },
    {
      icon: EyeIcon,
      title: 'Real-Time Coaching',
      description: 'Live guidance during calls with AI-powered suggestions to improve customer interactions and handle complex situations.',
      capabilities: [
        'Live call monitoring',
        'Contextual suggestions',
        'Real-time interventions',
        'Performance tracking'
      ],
      benefit: '40% improvement in agent performance'
    },
    {
      icon: AcademicCapIcon,
      title: 'AI-Powered Training',
      description: 'Personalized training programs based on individual agent performance data and identified improvement areas.',
      capabilities: [
        'Personalized learning paths',
        'Skill gap identification',
        'Automated training assignments',
        'Progress tracking'
      ],
      benefit: '60% faster agent onboarding'
    },
    {
      icon: ChartBarIcon,
      title: 'Performance Analytics',
      description: 'Comprehensive dashboards and reports on team performance, individual metrics, and customer satisfaction trends.',
      capabilities: [
        'Real-time dashboards',
        'Trend analysis',
        'Performance forecasting',
        'Custom reporting'
      ],
      benefit: 'Data-driven performance improvements'
    },
    {
      icon: SpeakerWaveIcon,
      title: 'Multi-Channel Support',
      description: 'Consistent quality assurance across voice, chat, email, and social media customer interactions.',
      capabilities: [
        'Omnichannel monitoring',
        'Unified scoring system',
        'Cross-channel insights',
        'Consistent quality standards'
      ],
      benefit: 'Unified customer experience quality'
    },
    {
      icon: DocumentTextIcon,
      title: 'Compliance & Risk Management',
      description: 'Automated monitoring for regulatory compliance, risk identification, and audit-ready documentation.',
      capabilities: [
        'Compliance monitoring',
        'Risk identification',
        'Audit trail generation',
        'Regulatory reporting'
      ],
      benefit: 'Zero compliance violations'
    }
  ];

  const qaProcess = [
    {
      step: '1',
      title: 'Call Recording & Transcription',
      description: 'Automatically record and transcribe all customer interactions with high accuracy.'
    },
    {
      step: '2',
      title: 'AI Analysis & Scoring',
      description: 'Advanced AI analyzes conversations for quality, compliance, and performance metrics.'
    },
    {
      step: '3',
      title: 'Automated Feedback',
      description: 'Instant feedback is delivered to agents with specific improvement suggestions.'
    },
    {
      step: '4',
      title: 'Coaching & Training',
      description: 'Personalized coaching programs help agents improve their performance over time.'
    },
    {
      step: '5',
      title: 'Performance Tracking',
      description: 'Continuous monitoring ensures sustained improvement and quality standards.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Complete Contact Center QA Solution
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            AI-powered quality assurance that transforms your contact center performance
            and customer satisfaction scores.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Capabilities:
                  </h4>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capabilityIndex) => (
                      <li key={capabilityIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    {feature.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* QA Process Flow */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Automated QA Process Flow
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              End-to-end automated quality assurance that ensures consistent, high-quality customer interactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {qaProcess.map((step, index) => (
              <div key={index} className="text-center relative">
                {index > 0 && (
                  <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-blue-200 dark:bg-blue-800 -translate-x-full translate-y-2" />
                )}
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Quality Assurance Metrics
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Comprehensive quality metrics that ensure every customer interaction meets your standards
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold mb-1">Call Quality Score</div>
              <div className="text-sm text-blue-100">95% average score</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold mb-1">Response Time</div>
              <div className="text-sm text-blue-100">Instant feedback</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold mb-1">Performance Tracking</div>
              <div className="text-sm text-blue-100">Real-time monitoring</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎓</div>
              <div className="font-semibold mb-1">Training Effectiveness</div>
              <div className="text-sm text-blue-100">60% improvement rate</div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/demo"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See QA Dashboard Live
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
