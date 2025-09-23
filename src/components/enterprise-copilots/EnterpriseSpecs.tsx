'use client';

import { ServerIcon, ShieldCheckIcon, CpuChipIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function EnterpriseSpecs() {
  const specs = [
    {
      category: 'Scalability & Performance',
      icon: ServerIcon,
      items: [
        { label: 'Concurrent Users', value: 'Unlimited' },
        { label: 'Documents Processed', value: 'Unlimited' },
        { label: 'Query Response Time', value: '< 2 seconds' },
        { label: 'API Rate Limits', value: 'Custom' },
        { label: 'Data Processing', value: 'Real-time' },
        { label: 'Auto-scaling', value: 'Yes' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: ShieldCheckIcon,
      items: [
        { label: 'Encryption', value: 'AES-256 end-to-end' },
        { label: 'GDPR Compliance', value: 'Fully compliant' },
        { label: 'DPDP Compliance', value: 'Indian regulations' },
        { label: 'SOC 2 Type II', value: 'Certified' },
        { label: 'ISO 27001', value: 'Certified' },
        { label: 'Audit Trails', value: 'Complete logs' }
      ]
    },
    {
      category: 'AI & Intelligence',
      icon: CpuChipIcon,
      items: [
        { label: 'Model Accuracy', value: '95%+' },
        { label: 'Language Support', value: '20+ languages' },
        { label: 'Context Understanding', value: 'Advanced NLP' },
        { label: 'Learning Capability', value: 'Continuous' },
        { label: 'Custom Training', value: 'Available' },
        { label: 'Multi-modal', value: 'Text, Images, Docs' }
      ]
    },
    {
      category: 'Global Infrastructure',
      icon: GlobeAltIcon,
      items: [
        { label: 'Data Centers', value: 'Global regions' },
        { label: 'CDN Coverage', value: 'Worldwide' },
        { label: 'Uptime SLA', value: '99.9%' },
        { label: 'Backup Frequency', value: 'Real-time' },
        { label: 'Disaster Recovery', value: '< 4 hours' },
        { label: 'Local Compliance', value: 'Region-specific' }
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
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Built to handle the most demanding enterprise workloads with world-class performance and security.
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

        <div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Enterprise Architecture Overview
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Multi-region, multi-tenant architecture designed for scale, security, and compliance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🏗️</div>
              <h4 className="text-lg font-semibold mb-2">Microservices</h4>
              <p className="text-green-100 text-sm">
                Modular architecture for scalability
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="text-lg font-semibold mb-2">Zero Trust</h4>
              <p className="text-green-100 text-sm">
                Security-first design principles
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="text-lg font-semibold mb-2">Real-time Analytics</h4>
              <p className="text-green-100 text-sm">
                Live monitoring and insights
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="text-lg font-semibold mb-2">Global CDN</h4>
              <p className="text-green-100 text-sm">
                Worldwide content delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
