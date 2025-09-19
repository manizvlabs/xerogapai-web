'use client';
import Link from 'next/link';

import { CloudArrowUpIcon, CogIcon, ChartBarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function WhatsAppProcess() {
  const steps = [
    {
      step: '01',
      title: 'Connect & Configure',
      description: 'Connect your WhatsApp Business API and configure your AI agent with your business knowledge, tone, and preferences.',
      icon: CloudArrowUpIcon,
      duration: '1-2 days',
      deliverables: ['API connection', 'AI training setup', 'Basic configuration']
    },
    {
      step: '02',
      title: 'AI Training & Optimization',
      description: 'Our team trains your AI agent on your specific use cases, customer interactions, and business processes.',
      icon: CogIcon,
      duration: '3-5 days',
      deliverables: ['Custom AI model', 'Workflow optimization', 'Quality assurance']
    },
    {
      step: '03',
      title: 'Testing & Validation',
      description: 'Comprehensive testing with real customer scenarios to ensure accuracy, compliance, and performance.',
      icon: ChartBarIcon,
      duration: '2-3 days',
      deliverables: ['Performance testing', 'Compliance validation', 'User acceptance']
    },
    {
      step: '04',
      title: 'Go Live & Scale',
      description: 'Launch your WhatsApp automation and scale based on demand with continuous monitoring and optimization.',
      icon: RocketLaunchIcon,
      duration: 'Ongoing',
      deliverables: ['Live deployment', 'Monitoring dashboard', 'Performance optimization']
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple Setup, Powerful Results
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Get started in just 1-2 weeks with our proven implementation process and expert support every step of the way.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line (hidden on first item) */}
                {index > 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-blue-200 dark:bg-blue-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  {/* Step number */}
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

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
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

        {/* Timeline Overview */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Implementation Timeline
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              From setup to full automation in just 1-2 weeks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">Week 1</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Setup & Training</div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• API Connection</li>
                <li>• AI Training</li>
                <li>• Configuration</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Week 2</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Testing & Launch</div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Quality Testing</li>
                <li>• Go Live</li>
                <li>• Monitoring Setup</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">Month 1</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Optimization</div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Performance Tuning</li>
                <li>• Feature Expansion</li>
                <li>• ROI Analysis</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">Ongoing</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">Scale & Support</div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Continuous Learning</li>
                <li>• 24/7 Support</li>
                <li>• Feature Updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support & Resources */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Expert Support Every Step
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Our implementation specialists and AI experts are with you from day one, ensuring smooth deployment and maximum ROI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="text-2xl font-bold mb-2">24/7</div>
                <div className="text-sm text-blue-100">Technical Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">1:1</div>
                <div className="text-sm text-blue-100">Implementation Manager</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">Free</div>
                <div className="text-sm text-blue-100">Training & Onboarding</div>
              </div>
            </div>
            <Link
              href="/demo"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Your Implementation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
