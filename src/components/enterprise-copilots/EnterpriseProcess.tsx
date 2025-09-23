'use client';
import Link from 'next/link';

import { DocumentIcon, CpuChipIcon, PlayIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function EnterpriseProcess() {
  const steps = [
    {
      step: '01',
      title: 'Knowledge Assessment',
      description: 'We analyze your existing knowledge base, document types, and user needs to design the optimal AI solution.',
      icon: DocumentIcon,
      duration: '1-2 weeks',
      deliverables: ['Knowledge audit report', 'User needs analysis', 'Solution architecture', 'Project roadmap']
    },
    {
      step: '02',
      title: 'AI Model Training',
      description: 'Custom training of AI models on your specific domain knowledge, terminology, and use cases.',
      icon: CpuChipIcon,
      duration: '2-4 weeks',
      deliverables: ['Custom AI models', 'Domain-specific training', 'Quality validation', 'Performance testing']
    },
    {
      step: '03',
      title: 'Integration & Deployment',
      description: 'Seamless integration with your existing systems and secure deployment in your preferred environment.',
      icon: PlayIcon,
      duration: '1-3 weeks',
      deliverables: ['System integration', 'Security configuration', 'User training', 'Go-live support']
    },
    {
      step: '04',
      title: 'Optimization & Scale',
      description: 'Continuous monitoring, performance optimization, and scaling to meet growing enterprise needs.',
      icon: ChartBarIcon,
      duration: 'Ongoing',
      deliverables: ['Performance monitoring', 'Usage analytics', 'Continuous improvement', 'Enterprise support']
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise Implementation Process
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            A comprehensive, phased approach designed for successful enterprise deployment and maximum ROI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-indigo-200 dark:bg-indigo-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {step.step}
                      </div>
                      <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {step.duration}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white mb-6">
                    {step.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Deliverables:
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, deliverableIndex) => (
                        <li key={deliverableIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-white">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready for Enterprise Deployment?
            </h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Our enterprise implementation team ensures smooth deployment and maximum value from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Enterprise Pricing
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Schedule Enterprise Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
