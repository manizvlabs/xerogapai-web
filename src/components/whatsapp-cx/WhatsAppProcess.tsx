'use client';

import { CloudArrowUpIcon, CogIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function WhatsAppProcess() {
  const steps = [
    {
      step: '01',
      title: 'Connect & Configure',
      description: 'Connect your WhatsApp Business API and configure your AI agent with your business knowledge, tone, and preferences.',
      icon: CloudArrowUpIcon,
      duration: '1-2 days'
    },
    {
      step: '02',
      title: 'AI Training & Optimization',
      description: 'Our team trains your AI agent on your specific use cases, customer interactions, and business processes.',
      icon: CogIcon,
      duration: '3-5 days'
    },
    {
      step: '03',
      title: 'Testing & Validation',
      description: 'Comprehensive testing with real customer scenarios to ensure accuracy, compliance, and performance.',
      icon: ChartBarIcon,
      duration: '2-3 days'
    },
    {
      step: '04',
      title: 'Go Live & Scale',
      description: 'Launch your WhatsApp automation and scale based on demand with continuous monitoring and optimization.',
      icon: RocketLaunchIcon,
      duration: 'Ongoing'
    }
  ];

  return (
    <section className="py-32 sm:py-40 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple Setup, Powerful Results
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Get started in just 1-2 weeks with our proven implementation process and expert support every step of the way.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line (hidden on first item) */}
                {index > 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-green-200 dark:bg-green-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {step.step}
                      </div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {step.duration}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
