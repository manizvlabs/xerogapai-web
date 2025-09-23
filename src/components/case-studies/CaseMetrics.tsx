'use client';
import Link from 'next/link';

import { ArrowTrendingUpIcon, ClockIcon, UsersIcon, CurrencyDollarIcon, CursorArrowRaysIcon, TrophyIcon } from '@heroicons/react/24/outline';

export default function CaseMetrics() {
  const metrics = [
    {
      icon: ArrowTrendingUpIcon,
      title: 'Average Efficiency Improvement',
      value: '150%',
      description: 'Across all automation implementations',
      color: 'text-green-600'
    },
    {
      icon: ClockIcon,
      title: 'Time Saved Per Week',
      value: '20+ hours',
      description: 'Per team member on average',
      color: 'text-green-600'
    },
    {
      icon: UsersIcon,
      title: 'Companies Served',
      value: '1,000+',
      description: 'From startups to Fortune 500',
      color: 'text-purple-600'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Revenue Generated',
      value: '$50M+',
      description: 'Total revenue impact across clients',
      color: 'text-green-600'
    },
    {
      icon: CursorArrowRaysIcon,
      title: 'ROI Achieved',
      value: '300%',
      description: 'Average return on investment',
      color: 'text-orange-600'
    },
    {
      icon: TrophyIcon,
      title: 'Client Satisfaction',
      value: '4.9/5',
      description: 'Average rating from our clients',
      color: 'text-yellow-600'
    }
  ];

  const industryBreakdown = [
    { industry: 'Technology', percentage: 35, companies: 350 },
    { industry: 'Healthcare', percentage: 20, companies: 200 },
    { industry: 'Finance', percentage: 15, companies: 150 },
    { industry: 'Manufacturing', percentage: 10, companies: 100 },
    { industry: 'Retail & E-commerce', percentage: 8, companies: 80 },
    { industry: 'Consulting & Professional Services', percentage: 7, companies: 70 },
    { industry: 'Other Industries', percentage: 5, companies: 50 }
  ];

  const solutionBreakdown = [
    { solution: 'XeroGap AI', percentage: 40, implementations: 400 },
    { solution: 'Sales Automation', percentage: 25, implementations: 250 },
    { solution: 'DPDP Compliance', percentage: 15, implementations: 150 },
    { solution: 'Contact Center QA', percentage: 12, implementations: 120 },
    { solution: 'Enterprise Copilots', percentage: 8, implementations: 80 }
  ];

  const successTimeline = [
    { month: 'Month 1', achievement: 'Initial setup and integration', percentage: 20 },
    { month: 'Month 2', achievement: 'First measurable results', percentage: 50 },
    { month: 'Month 3', achievement: 'Full optimization achieved', percentage: 80 },
    { month: 'Month 6', achievement: 'Maximum ROI realized', percentage: 100 }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Proven Results Across Industries
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Our track record speaks for itself. Here's what our clients have achieved with XeroGap AI solutions.
          </p>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-white">
                      {metric.title}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-white text-sm">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Industry Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Industry Distribution */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Industry Distribution
            </h3>
            <div className="space-y-4">
              {industryBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.industry}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-white">
                        {item.companies} companies
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-semibold text-green-600 dark:text-green-400">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Distribution */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Solution Adoption
            </h3>
            <div className="space-y-4">
              {solutionBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.solution}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-white">
                        {item.implementations} implementations
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-semibold text-green-600 dark:text-green-400">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Timeline */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Typical Success Timeline
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              Most clients see significant improvements within the first few months of implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {successTimeline.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{milestone.percentage}%</div>
                <div className="text-lg font-semibold mb-2">{milestone.month}</div>
                <div className="text-sm text-green-100 mb-4">
                  {milestone.achievement}
                </div>
                <div className="w-full bg-blue-800/50 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${milestone.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-600 dark:text-white mb-8 max-w-2xl mx-auto">
              See how XeroGap AI can transform your business with measurable results and ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your Success Story
              </Link>
              <Link
                href="/assessment"
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Get Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
