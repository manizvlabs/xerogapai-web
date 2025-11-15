'use client';
import Link from 'next/link';

import { CpuChipIcon, ShieldCheckIcon, GlobeAltIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function VyaptIXSpecs() {
  const specs = [
    {
      category: 'AI & Performance',
      icon: CpuChipIcon,
      items: [
        { label: 'AI Model Accuracy', value: '99.5%' },
        { label: 'Processing Speed', value: '< 2 seconds' },
        { label: 'Automation Reliability', value: '99.9% uptime' },
        { label: 'Concurrent Workflows', value: 'Unlimited' },
        { label: 'Data Processing', value: '10,000+ items/minute' },
        { label: 'Learning Adaptation', value: 'Continuous' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: ShieldCheckIcon,
      items: [
        { label: 'Data Encryption', value: 'End-to-end AES-256' },
        { label: 'GDPR Compliance', value: 'Fully compliant' },
        { label: 'DPDP Compliance', value: 'Indian regulations' },
        { label: 'SOC 2 Type II', value: 'Certified' },
        { label: 'ISO 27001', value: 'Certified' },
        { label: 'Audit Logs', value: 'Complete trail' }
      ]
    },
    {
      category: 'Integration & Scalability',
      icon: GlobeAltIcon,
      items: [
        { label: 'API Endpoints', value: 'REST & GraphQL' },
        { label: 'Webhook Support', value: 'Real-time events' },
        { label: 'Rate Limits', value: '10,000 requests/hour' },
        { label: 'Data Retention', value: 'Customizable' },
        { label: 'Backup Frequency', value: 'Real-time' },
        { label: 'Multi-region', value: 'Global CDN' }
      ]
    },
    {
      category: 'Support & SLA',
      icon: ClockIcon,
      items: [
        { label: 'Response Time', value: '< 1 hour priority' },
        { label: 'Resolution Time', value: '< 4 hours critical' },
        { label: 'Uptime SLA', value: '99.9% guaranteed' },
        { label: 'Support Channels', value: 'Chat, email, phone' },
        { label: 'Documentation', value: 'Complete API docs' },
        { label: 'Training Resources', value: 'Video tutorials' }
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Specifications
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Built for scale, security, and reliability with specifications that match enterprise requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {specs.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {spec.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {spec.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                      <span className="text-gray-700 dark:text-white font-medium">
                        {item.label}
                      </span>
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready for Enterprise Deployment?
          </h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Our enterprise-grade specifications ensure VyaptIX AI can handle your most demanding automation requirements.
          </p>
          <Link
            href="/demo"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Schedule Enterprise Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
