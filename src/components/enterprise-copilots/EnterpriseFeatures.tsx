'use client';

import { DocumentTextIcon, GlobeAltIcon, ShieldCheckIcon, CpuChipIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function EnterpriseFeatures() {
  const features = [
    {
      icon: DocumentTextIcon,
      title: 'Document Intelligence',
      description: 'Advanced AI that understands context, extracts insights, and provides accurate answers from your enterprise documents.',
      capabilities: [
        'PDF, Word, and web page processing',
        'Context-aware Q&A generation',
        'Document relationship mapping',
        'Real-time content updates'
      ],
      benefit: 'Reduce time to find information by 90%'
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Language Support',
      description: 'Serve your global workforce with automatic translation and culturally-aware responses in 20+ languages.',
      capabilities: [
        '20+ languages supported',
        'Automatic translation',
        'Cultural adaptation',
        'Regional compliance'
      ],
      benefit: 'Support global teams seamlessly'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access control, audit trails, and compliance certifications.',
      capabilities: [
        'End-to-end encryption',
        'Role-based permissions',
        'Complete audit trails',
        'Compliance reporting'
      ],
      benefit: 'Meet the highest security standards'
    },
    {
      icon: UserGroupIcon,
      title: 'Team Collaboration',
      description: 'Enable seamless knowledge sharing across teams with shared workspaces and collaborative features.',
      capabilities: [
        'Shared knowledge bases',
        'Team permissions',
        'Collaboration tools',
        'Usage analytics'
      ],
      benefit: 'Break down knowledge silos'
    },
    {
      icon: CpuChipIcon,
      title: 'Advanced AI Models',
      description: 'Powered by enterprise-grade AI models with continuous learning and customization capabilities.',
      capabilities: [
        'Custom AI training',
        'Domain-specific models',
        'Continuous learning',
        'Performance optimization'
      ],
      benefit: 'Get more accurate, relevant answers'
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics on usage patterns, knowledge gaps, and system performance metrics.',
      capabilities: [
        'Usage analytics',
        'Performance metrics',
        'Knowledge gap identification',
        'ROI tracking'
      ],
      benefit: 'Make data-driven improvements'
    }
  ];

  const useCases = [
    {
      title: 'HR Policies & Benefits',
      description: 'Employees get instant answers about company policies, benefits, and procedures.',
      impact: '75% reduction in HR inquiries'
    },
    {
      title: 'Product Documentation',
      description: 'Technical teams access product docs, APIs, and troubleshooting guides instantly.',
      impact: '60% faster issue resolution'
    },
    {
      title: 'Compliance & Legal',
      description: 'Legal and compliance questions answered with up-to-date regulatory information.',
      impact: '90% faster compliance queries'
    },
    {
      title: 'Customer Support',
      description: 'Support teams access knowledge base for accurate, consistent customer responses.',
      impact: '50% improvement in response quality'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Knowledge Management
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Transform your enterprise documents into an intelligent knowledge system that scales with your organization.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Capabilities:
                  </h4>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capabilityIndex) => (
                      <li key={capabilityIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{capability}</span>
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

        {/* Use Cases */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real Enterprise Use Cases
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how leading enterprises are using AI coplots to transform their knowledge management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {useCase.title}
                  </h4>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                    {useCase.impact}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Enterprise Architecture
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Built for scale, security, and compliance with enterprise-grade infrastructure
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">🏢</div>
              <div className="font-semibold mb-1">Multi-Tenant</div>
              <div className="text-sm text-blue-100">Isolated knowledge bases</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">🔒</div>
              <div className="font-semibold mb-1">Zero Trust</div>
              <div className="text-sm text-blue-100">End-to-end security</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold mb-1">Enterprise Analytics</div>
              <div className="text-sm text-blue-100">Advanced reporting</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
