'use client';
import Link from 'next/link';

import { CloudArrowUpIcon, CogIcon, PlayIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function XeroGapProcess() {
  const steps = [
    {
      step: '01',
      title: 'Connect Your Tools',
      description: 'Link your Notion workspace and business tools with our secure API connections.',
      icon: CloudArrowUpIcon,
      duration: '15 minutes',
      deliverables: ['API connections', 'Initial sync', 'Security verification']
    },
    {
      step: '02',
      title: 'Configure AI Workflows',
      description: 'Set up automated workflows and customize AI behavior for your specific needs.',
      icon: CogIcon,
      duration: '30 minutes',
      deliverables: ['Workflow templates', 'AI customization', 'Test automation']
    },
    {
      step: '03',
      title: 'Go Live',
      description: 'Start your automation with monitoring and gradual rollout to ensure smooth operation.',
      icon: PlayIcon,
      duration: 'Immediate',
      deliverables: ['Live automation', 'Performance monitoring', 'Support access']
    },
    {
      step: '04',
      title: 'Optimize & Scale',
      description: 'Monitor performance, gather insights, and expand automation across your organization.',
      icon: ChartBarIcon,
      duration: 'Ongoing',
      deliverables: ['Performance analytics', 'Optimization recommendations', 'Scaling support']
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Get Started in Minutes
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            From setup to full automation in just 45 minutes. Our guided process ensures you get maximum value quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-purple-200 dark:bg-purple-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {step.step}
                      </div>
                      <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        {step.duration}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-purple-600" />
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
                      You'll get:
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, deliverableIndex) => (
                        <li key={deliverableIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
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
          <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Workflow?
            </h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Start your free trial and see how XeroGap AI can automate your team's most time-consuming tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Book Live Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
