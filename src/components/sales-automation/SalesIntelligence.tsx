'use client';
import Link from 'next/link';

import { EyeIcon, ChartBarIcon, MagnifyingGlassIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function SalesIntelligence() {
  const intelligenceFeatures = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Prospect Discovery',
      description: 'AI-powered search across multiple data sources to find high-quality prospects that match your ideal customer profile.',
      capabilities: [
        'Company data enrichment',
        'Contact information discovery',
        'Intent signal analysis',
        'Competitor intelligence'
      ],
      benefit: 'Find 3x more qualified prospects'
    },
    {
      icon: ChartBarIcon,
      title: 'Lead Scoring & Qualification',
      description: 'Automatically score and prioritize leads based on their likelihood to convert and buying potential.',
      capabilities: [
        'Predictive lead scoring',
        'Buying intent analysis',
        'Company fit assessment',
        'Engagement tracking'
      ],
      benefit: 'Focus on leads with 85% higher conversion potential'
    },
    {
      icon: EyeIcon,
      title: 'Account Intelligence',
      description: 'Deep insights into target accounts including organizational changes, technology stack, and buying signals.',
      capabilities: [
        'Technology stack detection',
        'Organizational changes',
        'Budget and timeline insights',
        'Decision maker identification'
      ],
      benefit: 'Understand prospects before outreach'
    },
    {
      icon: LightBulbIcon,
      title: 'Sales Forecasting',
      description: 'AI-driven predictions of deal velocity, close probability, and revenue forecasting with high accuracy.',
      capabilities: [
        'Deal velocity prediction',
        'Close probability scoring',
        'Revenue forecasting',
        'Risk assessment'
      ],
      benefit: 'Predict sales outcomes with 75% accuracy'
    }
  ];

  const dataSources = [
    'LinkedIn Company Pages',
    'Job Postings & Career Sites',
    'Company Websites & Blogs',
    'Industry News & Publications',
    'Social Media Activity',
    'Public Financial Data',
    'Technology Stack Detection',
    'Email & Communication Patterns'
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            AI-Powered Sales Intelligence
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Get a competitive edge with intelligent insights that help you identify, qualify, and close deals faster.
          </p>
        </div>

        {/* Intelligence Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {intelligenceFeatures.map((feature, index) => {
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

                <p className="text-gray-600 dark:text-white mb-6">
                  {feature.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Capabilities:
                  </h4>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capabilityIndex) => (
                      <li key={capabilityIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    {feature.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Sources */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Data Sources
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Aggregate intelligence from 50+ data sources to build complete prospect profiles
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dataSources.map((source, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-white">
                  {source}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Dashboard Preview */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Real-Time Sales Intelligence Dashboard
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Get instant insights on your prospects, deals, and market opportunities with our AI-powered dashboard
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold mb-1">Lead Scoring</div>
              <div className="text-sm text-green-100">Predict conversion probability</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold mb-1">Pipeline Analytics</div>
              <div className="text-sm text-green-100">Track deal velocity & health</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold mb-1">Account Insights</div>
              <div className="text-sm text-green-100">Deep company intelligence</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold mb-1">Revenue Forecasting</div>
              <div className="text-sm text-green-100">Predict quarterly performance</div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See Intelligence Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
