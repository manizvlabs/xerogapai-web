'use client';
import Link from 'next/link';

import { CpuChipIcon, CircleStackIcon, GlobeAltIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function SalesSpecs() {
  const specs = [
    {
      category: 'AI & Performance',
      icon: CpuChipIcon,
      items: [
        { label: 'Lead Scoring Accuracy', value: '95%' },
        { label: 'Email Response Prediction', value: '87%' },
        { label: 'Deal Close Forecasting', value: '82%' },
        { label: 'Prospect Enrichment', value: 'Real-time' },
        { label: 'Multi-language Support', value: '15+ languages' },
        { label: 'API Response Time', value: '< 200ms' }
      ]
    },
    {
      category: 'Data & Integrations',
      icon: CircleStackIcon,
      items: [
        { label: 'CRM Platforms', value: '15+ supported' },
        { label: 'Email Platforms', value: '10+ integrated' },
        { label: 'Calendar Systems', value: '8+ connected' },
        { label: 'Data Sources', value: '50+ available' },
        { label: 'Real-time Sync', value: 'Yes' },
        { label: 'Data Retention', value: 'Customizable' }
      ]
    },
    {
      category: 'Scalability & Reliability',
      icon: GlobeAltIcon,
      items: [
        { label: 'Concurrent Users', value: 'Unlimited' },
        { label: 'Monthly Leads', value: 'Unlimited' },
        { label: 'Uptime SLA', value: '99.9%' },
        { label: 'Data Processing', value: '10M+ records/day' },
        { label: 'Global CDN', value: 'Worldwide' },
        { label: 'Auto-scaling', value: 'Yes' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: ClockIcon,
      items: [
        { label: 'Data Encryption', value: 'AES-256' },
        { label: 'GDPR Compliance', value: 'Fully compliant' },
        { label: 'SOC 2 Type II', value: 'Certified' },
        { label: 'Audit Logs', value: 'Complete trails' },
        { label: 'Access Controls', value: 'Granular' },
        { label: 'Backup Frequency', value: 'Real-time' }
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Sales Automation
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Built for high-performance sales teams with world-class AI accuracy, scalability, and security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {specs.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {spec.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {spec.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {item.label}
                      </span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Sales Automation Architecture
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Multi-layered AI system designed for maximum sales performance and reliability
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="text-lg font-semibold mb-2">AI Engine</h4>
              <p className="text-green-100 text-sm">
                Advanced ML models for intelligent automation
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h4 className="text-lg font-semibold mb-2">Integration Hub</h4>
              <p className="text-green-100 text-sm">
                Seamless connection to 50+ business tools
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="text-lg font-semibold mb-2">Analytics Engine</h4>
              <p className="text-green-100 text-sm">
                Real-time insights and performance tracking
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="text-lg font-semibold mb-2">Security Layer</h4>
              <p className="text-green-100 text-sm">
                Enterprise-grade security and compliance
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See Technical Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
