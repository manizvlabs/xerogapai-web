'use client';

import { CheckCircleIcon, EnvelopeIcon, PhoneIcon, PresentationChartBarIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function DemoProcess() {
  const steps = [
    {
      step: '1',
      title: 'Confirmation Email',
      description: 'Receive immediate confirmation with demo details and preparation materials.',
      icon: EnvelopeIcon,
      time: 'Instant'
    },
    {
      step: '2',
      title: 'Pre-Demo Call',
      description: '15-minute call to understand your needs and customize the demo experience.',
      icon: PhoneIcon,
      time: '1-2 days before'
    },
    {
      step: '3',
      title: 'Live Demo',
      description: '30-minute personalized demonstration with live examples and Q&A.',
      icon: PresentationChartBarIcon,
      time: 'Scheduled time'
    },
    {
      step: '4',
      title: 'Follow-up',
      description: 'Detailed proposal, ROI analysis, and next steps discussion.',
      icon: ClipboardDocumentCheckIcon,
      time: 'Within 24 hours'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What to Expect
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Our demo process is designed to give you maximum value in minimum time.
            Here's exactly what happens after you book.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector line (hidden on first item) */}
                  {index > 0 && (
                    <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-green-200 dark:bg-green-800 -translate-x-full translate-y-4" />
                  )}

                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative">
                    {/* Step number */}
                    <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white text-sm font-bold rounded-full mb-4 mx-auto">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4 mx-auto">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white mb-3 text-center">
                      {step.description}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium text-center">
                      {step.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional benefits */}
        <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Demo Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Custom Demo</h4>
                <p className="text-sm text-gray-600 dark:text-white">Tailored to your industry and use cases</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Live Examples</h4>
                <p className="text-sm text-gray-600 dark:text-white">See real workflows and automation in action</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">ROI Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-white">Get specific cost savings and efficiency metrics</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Implementation Plan</h4>
                <p className="text-sm text-gray-600 dark:text-white">Detailed roadmap for deployment and training</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Free Consultation</h4>
                <p className="text-sm text-gray-600 dark:text-white">30-minute follow-up call at no cost</p>
              </div>
            </div>

            <div className="flex items-start">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">No Pressure</h4>
                <p className="text-sm text-gray-600 dark:text-white">Purely educational - no sales pitch</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
