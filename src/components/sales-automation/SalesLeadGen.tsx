'use client';
import Link from 'next/link';

import { MagnifyingGlassIcon, FunnelIcon, BoltIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function SalesLeadGen() {
  const leadGenMethods = [
    {
      icon: MagnifyingGlassIcon,
      title: 'AI-Powered Prospecting',
      description: 'Intelligent search algorithms that find prospects based on your ideal customer profile and buying signals.',
      methods: [
        'Company size & industry matching',
        'Technology stack analysis',
        'Job posting & hiring signals',
        'Funding & investment tracking'
      ],
      results: '3x more qualified prospects'
    },
    {
      icon: FunnelIcon,
      title: 'Advanced Lead Qualification',
      description: 'Automatically score and prioritize leads based on their likelihood to convert and buying potential.',
      methods: [
        'Intent data analysis',
        'Engagement scoring',
        'Budget & timeline assessment',
        'Decision maker identification'
      ],
      results: '85% higher conversion rates'
    },
    {
      icon: BoltIcon,
      title: 'Real-Time Lead Enrichment',
      description: 'Automatically gather and update prospect information from multiple sources for complete profiles.',
      methods: [
        'Contact information updates',
        'Company news & changes',
        'Social media activity',
        'Technology adoption tracking'
      ],
      results: '60% more complete profiles'
    },
    {
      icon: UsersIcon,
      title: 'Account-Based Marketing',
      description: 'Target and nurture specific accounts with personalized messaging and multi-channel outreach.',
      methods: [
        'Account scoring & prioritization',
        'Personalized content delivery',
        'Multi-touch campaign orchestration',
        'Account journey tracking'
      ],
      results: '40% higher engagement rates'
    }
  ];

  const leadSources = [
    {
      category: 'Digital Footprint',
      sources: ['Company websites', 'Job postings', 'Press releases', 'Social media', 'Blog content']
    },
    {
      category: 'Business Intelligence',
      sources: ['Funding data', 'Financial reports', 'Industry news', 'Competitor analysis', 'Market trends']
    },
    {
      category: 'Professional Networks',
      sources: ['LinkedIn profiles', 'Professional events', 'Industry associations', 'Alumni networks']
    },
    {
      category: 'Technology Signals',
      sources: ['App usage data', 'Technology stack', 'Software purchases', 'API integrations']
    }
  ];

  const successMetrics = [
    { label: 'Lead Quality Score', value: '95%', description: 'Average lead score improvement' },
    { label: 'Conversion Rate', value: '+150%', description: 'Sales qualified leads' },
    { label: 'Sales Cycle Time', value: '-40%', description: 'Faster deal closure' },
    { label: 'Cost Per Lead', value: '-60%', description: 'Lower acquisition costs' }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Never Run Out of Qualified Leads
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            AI-driven lead generation that finds, qualifies, and nurtures prospects automatically,
            so your sales team can focus on closing deals.
          </p>
        </div>

        {/* Lead Generation Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {leadGenMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {method.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {method.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    How it works:
                  </h4>
                  <ul className="space-y-2">
                    {method.methods.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    Result: {method.results}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lead Sources Matrix */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Lead Sources
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Aggregate prospect data from 50+ sources to build complete, actionable lead profiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadSources.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h4>
                <ul className="space-y-2">
                  {category.sources.map((source, sourceIndex) => (
                    <li key={sourceIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Proven Lead Generation Results
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              See how our AI-powered lead generation transforms sales performance
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-green-100">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Qualification Workflow */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Complete Lead Qualification Workflow
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  1
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Discovery</div>
                <div className="text-xs text-gray-600 dark:text-white">Find prospects</div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-green-600"></div>
                <div className="text-green-600 mx-2">→</div>
                <div className="w-8 h-0.5 bg-green-600"></div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  2
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Enrichment</div>
                <div className="text-xs text-gray-600 dark:text-white">Gather data</div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-8 h-0.5 bg-green-600"></div>
                <div className="text-green-600 mx-2">→</div>
                <div className="w-8 h-0.5 bg-green-600"></div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3">
                  3
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Qualification</div>
                <div className="text-xs text-gray-600 dark:text-white">Score & prioritize</div>
              </div>
            </div>

            <p className="text-gray-600 dark:text-white text-sm">
              Automated lead qualification workflow that scores prospects based on 50+ data points and intent signals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
