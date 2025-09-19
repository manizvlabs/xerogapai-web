'use client';

import { CloudArrowUpIcon, CogIcon, PlayIcon, TrendingUpIcon } from '@heroicons/react/24/outline';

export default function ContactProcess() {
  const steps = [
    {
      step: '01',
      title: 'Setup & Integration',
      description: 'Connect your contact center systems and configure AI models for your specific quality standards.',
      icon: CloudArrowUpIcon,
      duration: '1-2 weeks',
      deliverables: ['System integration', 'AI model training', 'Quality standards setup', 'Initial testing']
    },
    {
      step: '02',
      title: 'AI Training & Calibration',
      description: 'Train the AI on your call scoring criteria, industry standards, and quality benchmarks.',
      icon: CogIcon,
      duration: '2-3 weeks',
      deliverables: ['Custom scoring models', 'Quality calibration', 'Performance validation', 'Training completion']
    },
    {
      step: '03',
      title: 'Launch & Monitoring',
      description: 'Deploy the solution and begin automated QA with real-time monitoring and adjustments.',
      icon: PlayIcon,
      duration: '1 week',
      deliverables: ['Live QA system', 'Real-time monitoring', 'Performance dashboards', 'Initial reports']
    },
    {
      step: '04',
      title: 'Optimization & Scaling',
      description: 'Continuously improve the system and scale to additional channels and locations.',
      icon: TrendingUpIcon,
      duration: 'Ongoing',
      deliverables: ['Performance optimization', 'Feature expansion', 'Team training', 'ROI tracking']
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Get Started in 4 Weeks
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Complete implementation process designed for successful contact center transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-blue-200 dark:bg-blue-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {step.step}
                      </div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {step.duration}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
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
                      Deliverables:
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Contact Center?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Start your free trial and see how our AI-powered QA can improve your contact center performance in just weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Pricing
              </a>
              <a
                href="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Book QA Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
