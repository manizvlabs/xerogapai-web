'use client';

import { UserPlusIcon, CogIcon, PlayIcon, TrendingUpIcon } from '@heroicons/react/24/outline';

export default function SalesProcess() {
  const steps = [
    {
      step: '01',
      title: 'Setup & Integration',
      description: 'Connect your CRM and sales tools with our secure API integrations and configure your AI preferences.',
      icon: UserPlusIcon,
      duration: '1-2 days',
      deliverables: ['CRM integration', 'AI model training', 'User onboarding', 'Initial configuration']
    },
    {
      step: '02',
      title: 'AI Training & Customization',
      description: 'Train the AI on your sales processes, ideal customer profiles, and communication preferences.',
      icon: CogIcon,
      duration: '3-5 days',
      deliverables: ['Custom AI models', 'Sales playbooks', 'Automation workflows', 'Quality assurance']
    },
    {
      step: '03',
      title: 'Launch & Optimization',
      description: 'Go live with your sales automation and continuously optimize based on performance data.',
      icon: PlayIcon,
      duration: 'Ongoing',
      deliverables: ['Live automation', 'Performance monitoring', 'A/B testing', 'Optimization reports']
    },
    {
      step: '04',
      title: 'Scale & Advanced Features',
      description: 'Expand to advanced features like predictive analytics, custom AI models, and enterprise integrations.',
      icon: TrendingUpIcon,
      duration: '1-3 months',
      deliverables: ['Advanced analytics', 'Custom integrations', 'Team expansion', 'ROI maximization']
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Get Started in 5 Days
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            From setup to full automation in just one week. Our proven process ensures maximum ROI from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-green-200 dark:bg-green-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
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

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {step.description}
                  </p>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      You'll get:
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, deliverableIndex) => (
                        <li key={deliverableIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">{deliverable}</span>
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
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Supercharge Your Sales?
            </h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Start your free trial and see how our sales automation can transform your team's performance in just 5 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Free Trial
              </a>
              <a
                href="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Book Sales Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
