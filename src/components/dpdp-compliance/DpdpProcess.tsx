'use client';
import Link from 'next/link';

import { DocumentIcon, CogIcon, PlayIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function DpdpProcess() {
  const steps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'Understand your business, data practices, and compliance needs through detailed consultation.',
      icon: DocumentIcon,
      duration: '1 week',
      deliverables: ['Business assessment', 'Current state analysis', 'Compliance objectives', 'Project proposal']
    },
    {
      step: '02',
      title: 'Comprehensive Assessment',
      description: '30-day detailed assessment of your data practices against DPDP Act requirements.',
      icon: DocumentIcon,
      duration: '4 weeks',
      deliverables: ['Gap analysis report', 'Risk assessment', 'Implementation roadmap', 'Priority action plan']
    },
    {
      step: '03',
      title: 'Implementation Planning',
      description: 'Develop detailed implementation plan with timelines, resources, and responsibilities.',
      icon: CogIcon,
      duration: '2 weeks',
      deliverables: ['Project timeline', 'Resource allocation', 'Risk mitigation plan', 'Success metrics']
    },
    {
      step: '04',
      title: 'Implementation Execution',
      description: 'Execute the compliance implementation with expert guidance and support.',
      icon: PlayIcon,
      duration: '6-8 weeks',
      deliverables: ['Policy implementation', 'Technical controls', 'Training completion', 'System validation']
    },
    {
      step: '05',
      title: 'Validation & Go-Live',
      description: 'Validate compliance implementation and prepare for ongoing compliance management.',
      icon: ArrowTrendingUpIcon,
      duration: '2 weeks',
      deliverables: ['Compliance validation', 'Go-live checklist', 'Monitoring setup', 'Handover documentation']
    },
    {
      step: '06',
      title: 'Ongoing Compliance',
      description: 'Continuous monitoring and support for maintaining DPDP compliance.',
      icon: ArrowTrendingUpIcon,
      duration: 'Ongoing',
      deliverables: ['Compliance monitoring', 'Annual audits', 'Updates & training', 'Incident response']
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            90-Day Compliance Journey
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Structured process to achieve complete DPDP compliance with expert guidance every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index > 0 && index % 3 !== 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-orange-200 dark:bg-orange-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {step.step}
                      </div>
                      <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        {step.duration}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-orange-600" />
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
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Compliance Journey?
            </h3>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Begin with our free consultation and assessment to understand your current compliance status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#assessment"
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Free Assessment
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Book Compliance Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
