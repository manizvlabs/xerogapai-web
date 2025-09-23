'use client';
import Link from 'next/link';

import { ShieldCheckIcon, CpuChipIcon, GlobeAltIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function WhatsAppSpecs() {
  const specs = [
    {
      category: 'Technical Specifications',
      icon: CpuChipIcon,
      items: [
        { label: 'API Response Time', value: '< 2 seconds' },
        { label: 'Uptime SLA', value: '99.9%' },
        { label: 'Message Processing', value: '10,000+ per minute' },
        { label: 'AI Model Accuracy', value: '95%+' },
        { label: 'Supported Formats', value: 'Text, Images, Documents' },
        { label: 'Real-time Sync', value: 'Yes' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: ShieldCheckIcon,
      items: [
        { label: 'End-to-End Encryption', value: 'Yes' },
        { label: 'GDPR Compliance', value: 'Yes' },
        { label: 'DPDP Compliance', value: 'Yes' },
        { label: 'ISO 27001 Certified', value: 'Yes' },
        { label: 'Audit Trails', value: 'Yes' },
        { label: 'Data Residency', value: 'MEA & Global' }
      ]
    },
    {
      category: 'Language & Localization',
      icon: GlobeAltIcon,
      items: [
        { label: 'Supported Languages', value: '20+' },
        { label: 'Arabic Support', value: 'RTL & Local Dialects' },
        { label: 'Cultural Adaptation', value: 'Yes' },
        { label: 'Timezone Handling', value: 'Auto-detect' },
        { label: 'Business Hours', value: 'Region-specific' },
        { label: 'Local Compliance', value: 'Region-specific' }
      ]
    },
    {
      category: 'Performance & Scalability',
      icon: ClockIcon,
      items: [
        { label: 'Concurrent Users', value: 'Unlimited' },
        { label: 'Message Queue', value: 'Auto-scaling' },
        { label: 'Database Performance', value: '< 100ms queries' },
        { label: 'Backup Frequency', value: 'Real-time' },
        { label: 'Failover Time', value: '< 30 seconds' },
        { label: 'Load Balancing', value: 'Auto-scaling' }
      ]
    }
  ];

  const integrations = [
    'WhatsApp Business API',
    'HubSpot CRM',
    'Zoho CRM',
    'Salesforce',
    'QuickBooks',
    'Xero',
    'Slack',
    'Microsoft Teams',
    'Google Workspace',
    'Zapier',
    'Make.com',
    'Custom APIs'
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Specifications
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Built for scale, security, and reliability with specifications that match enterprise requirements.
          </p>
        </div>

        {/* Technical Specs Grid */}
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

        {/* Integrations */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Seamless Integrations
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with your existing tools and workflows for a unified customer experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {integration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">
              Enterprise Architecture
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              Built on cloud-native architecture with microservices, auto-scaling, and enterprise-grade security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-4">☁️</div>
              <h4 className="text-xl font-semibold mb-2">Cloud Native</h4>
              <p className="text-green-100 text-sm">
                Deployed on AWS/GCP with Kubernetes orchestration for maximum scalability and reliability
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2">Bank-Level Security</h4>
              <p className="text-green-100 text-sm">
                End-to-end encryption, SOC 2 compliance, and regular security audits
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-2">Real-Time Analytics</h4>
              <p className="text-green-100 text-sm">
                Advanced monitoring and analytics with custom dashboards and alerting
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See It In Action
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
