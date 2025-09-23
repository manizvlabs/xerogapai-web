'use client';
import Link from 'next/link';

import { ChartBarIcon, ArrowTrendingUpIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactAnalytics() {
  const analyticsFeatures = [
    {
      icon: ChartBarIcon,
      title: 'Real-Time Dashboards',
      description: 'Live monitoring of contact center performance with instant updates and alerts.',
      metrics: ['Call volume trends', 'Quality scores', 'Agent performance', 'Customer satisfaction']
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Performance Trends',
      description: 'Historical analysis and forecasting to identify patterns and predict future performance.',
      metrics: ['Quality improvement', 'Training effectiveness', 'Seasonal patterns', 'Performance forecasting']
    },
    {
      icon: UserGroupIcon,
      title: 'Agent Analytics',
      description: 'Individual and team performance metrics with detailed insights and comparisons.',
      metrics: ['Personal performance', 'Team comparisons', 'Skill development', 'Improvement tracking']
    },
    {
      icon: ClockIcon,
      title: 'Time-Based Analysis',
      description: 'Performance analysis by time periods, peak hours, and seasonal variations.',
      metrics: ['Peak performance', 'Off-peak analysis', 'Time-based trends', 'Capacity planning']
    }
  ];

  const keyMetrics = [
    { label: 'Average Call Quality Score', value: '87%', trend: '+12%', status: 'improving' },
    { label: 'First Call Resolution', value: '78%', trend: '+8%', status: 'improving' },
    { label: 'Customer Satisfaction', value: '4.6/5', trend: '+0.3', status: 'improving' },
    { label: 'Average Handle Time', value: '6.2 min', trend: '-0.8 min', status: 'improving' },
    { label: 'Agent Utilization', value: '82%', trend: '+5%', status: 'improving' },
    { label: 'Quality Monitoring Coverage', value: '100%', trend: 'Consistent', status: 'excellent' }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Advanced Contact Center Analytics
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Comprehensive analytics that provide deep insights into performance, trends, and opportunities for improvement.
          </p>
        </div>

        {/* Analytics Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {analyticsFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Metrics:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white">{metric}</span>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Performance Metrics */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Key Performance Metrics
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Track the most important contact center metrics with real-time updates and trend analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyMetrics.map((metric, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {metric.label}
                  </h4>
                  <div className={`text-sm font-semibold ${
                    metric.status === 'improving' ? 'text-green-600' : 'text-green-600'
                  }`}>
                    {metric.trend}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {metric.value}
                </div>
                <div className={`text-xs font-medium ${
                  metric.status === 'improving' ? 'text-green-600' : 'text-green-600'
                }`}>
                  {metric.status === 'improving' ? '↗ Improving' : '✓ Excellent'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Dashboard Preview */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Real-Time Analytics Dashboard
            </h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Comprehensive dashboard that provides instant insights into your contact center performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-sm mb-1">Live Metrics</div>
              <div className="text-xs text-purple-100">Real-time performance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold text-sm mb-1">Trend Analysis</div>
              <div className="text-xs text-purple-100">Historical insights</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-sm mb-1">Quality Scores</div>
              <div className="text-xs text-purple-100">Call evaluation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-semibold text-sm mb-1">Agent Performance</div>
              <div className="text-xs text-purple-100">Individual metrics</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-purple-100 text-sm mb-6">
              Customizable dashboards with alerts, reports, and predictive analytics
            </p>
            <Link
              href="/demo"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Analytics Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
