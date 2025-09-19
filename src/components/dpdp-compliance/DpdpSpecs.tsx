'use client';

import { ShieldCheckIcon, DatabaseIcon, GlobeIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function DpdpSpecs() {
  const specs = [
    {
      category: 'Assessment & Analysis',
      icon: ShieldCheckIcon,
      items: [
        { label: 'Assessment Accuracy', value: '98%' },
        { label: 'Risk Detection', value: '95%' },
        { label: 'Automated Scanning', value: '50+ data sources' },
        { label: 'Report Generation', value: 'Real-time' },
        { label: 'Compliance Scoring', value: 'Detailed metrics' },
        { label: 'Gap Analysis', value: 'Comprehensive' }
      ]
    },
    {
      category: 'Implementation & Automation',
      icon: DatabaseIcon,
      items: [
        { label: 'Template Library', value: '100+ templates' },
        { label: 'Automation Workflows', value: 'Customizable' },
        { label: 'Integration APIs', value: 'REST & GraphQL' },
        { label: 'Multi-language Support', value: 'English & Hindi' },
        { label: 'Version Control', value: 'Complete history' },
        { label: 'Collaboration Tools', value: 'Team features' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: GlobeIcon,
      items: [
        { label: 'Data Encryption', value: 'AES-256' },
        { label: 'Access Controls', value: 'Role-based' },
        { label: 'Audit Trails', value: 'Complete logs' },
        { label: 'DPDP Compliance', value: '100%' },
        { label: 'Data Residency', value: 'India servers' },
        { label: 'Backup Frequency', value: 'Real-time' }
      ]
    },
    {
      category: 'Support & Monitoring',
      icon: ClockIcon,
      items: [
        { label: 'Expert Support', value: '24/7 available' },
        { label: 'Response Time', value: '< 4 hours' },
        { label: 'Implementation Guidance', value: 'Dedicated team' },
        { label: 'Progress Tracking', value: 'Real-time dashboard' },
        { label: 'Compliance Monitoring', value: 'Ongoing' },
        { label: 'Update Notifications', value: 'Automatic' }
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Compliance Platform
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Built for Indian businesses with world-class technology and DPDP expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {specs.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-orange-600" />
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
                      <span className="text-orange-600 dark:text-orange-400 font-semibold">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Complete Compliance Ecosystem
          </h3>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Everything you need for DPDP compliance in one integrated platform
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="text-lg font-semibold mb-2">Assessment Engine</h4>
              <p className="text-orange-100 text-sm">
                AI-powered gap analysis and risk assessment
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="text-lg font-semibold mb-2">Policy Framework</h4>
              <p className="text-orange-100 text-sm">
                Complete documentation and policy management
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="text-lg font-semibold mb-2">Security Controls</h4>
              <p className="text-orange-100 text-sm">
                Technical and organizational security measures
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="text-lg font-semibold mb-2">Monitoring Dashboard</h4>
              <p className="text-orange-100 text-sm">
                Real-time compliance monitoring and reporting
              </p>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/demo"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Experience the Platform
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
