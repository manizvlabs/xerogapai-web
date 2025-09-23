'use client';
import Link from 'next/link';

import { CpuChipIcon, CircleStackIcon, GlobeAltIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactSpecs() {
  const specs = [
    {
      category: 'AI & Performance',
      icon: CpuChipIcon,
      items: [
        { label: 'Call Analysis Speed', value: '< 5 seconds' },
        { label: 'Scoring Accuracy', value: '95%+' },
        { label: 'Real-time Processing', value: 'Yes' },
        { label: 'Multi-language Support', value: '25+ languages' },
        { label: 'Emotion Detection', value: 'Advanced NLP' },
        { label: 'Intent Recognition', value: '95% accuracy' }
      ]
    },
    {
      category: 'Scalability & Integration',
      icon: CircleStackIcon,
      items: [
        { label: 'Concurrent Calls', value: 'Unlimited' },
        { label: 'Agent Support', value: 'Unlimited' },
        { label: 'CRM Integrations', value: '20+ platforms' },
        { label: 'API Endpoints', value: 'REST & GraphQL' },
        { label: 'Webhook Support', value: 'Real-time' },
        { label: 'Data Retention', value: 'Customizable' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: GlobeAltIcon,
      items: [
        { label: 'Data Encryption', value: 'AES-256' },
        { label: 'GDPR Compliance', value: 'Fully compliant' },
        { label: 'HIPAA Ready', value: 'Healthcare standard' },
        { label: 'PCI DSS', value: 'Payment security' },
        { label: 'Audit Trails', value: 'Complete logs' },
        { label: 'Access Controls', value: 'Granular RBAC' }
      ]
    },
    {
      category: 'Analytics & Reporting',
      icon: ClockIcon,
      items: [
        { label: 'Real-time Dashboards', value: 'Live updates' },
        { label: 'Custom Reports', value: 'Advanced filtering' },
        { label: 'Trend Analysis', value: 'Historical data' },
        { label: 'Predictive Analytics', value: 'ML-powered' },
        { label: 'Export Formats', value: 'PDF, CSV, Excel' },
        { label: 'Scheduled Reports', value: 'Automated' }
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Contact Center Specifications
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Built for high-volume contact centers with world-class AI accuracy, scalability, and enterprise security.
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
                      <span className="text-gray-700 dark:text-white font-medium">
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

        <div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Contact Center AI Architecture
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Multi-layered AI system designed for maximum contact center efficiency and customer satisfaction
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold mb-2">Quality Engine</h4>
              <p className="text-green-100 text-sm">
                Advanced scoring algorithms
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🎓</div>
              <h4 className="text-lg font-semibold mb-2">Coaching AI</h4>
              <p className="text-green-100 text-sm">
                Personalized training system
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="text-lg font-semibold mb-2">Analytics Hub</h4>
              <p className="text-green-100 text-sm">
                Real-time performance insights
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h4 className="text-lg font-semibold mb-2">Integration Layer</h4>
              <p className="text-green-100 text-sm">
                Seamless system connectivity
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See Technical Architecture
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
