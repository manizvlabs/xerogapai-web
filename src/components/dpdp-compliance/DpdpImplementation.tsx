'use client';

import { CogIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function DpdpImplementation() {
  const implementationPhases = [
    {
      icon: CogIcon,
      phase: 'Planning Phase',
      duration: 'Weeks 1-2',
      activities: [
        'Stakeholder identification',
        'Resource allocation',
        'Timeline development',
        'Risk assessment'
      ],
      deliverables: [
        'Implementation roadmap',
        'Resource plan',
        'Project timeline',
        'Risk mitigation plan'
      ]
    },
    {
      icon: DocumentTextIcon,
      phase: 'Documentation Phase',
      duration: 'Weeks 3-6',
      activities: [
        'Privacy policy development',
        'Process documentation',
        'Data mapping completion',
        'Template customization'
      ],
      deliverables: [
        'Privacy policies',
        'Processing records',
        'Data inventory',
        'Policy templates'
      ]
    },
    {
      icon: ShieldCheckIcon,
      phase: 'Technical Implementation',
      duration: 'Weeks 7-10',
      activities: [
        'System configuration',
        'Security implementation',
        'Consent mechanisms',
        'Audit systems setup'
      ],
      deliverables: [
        'Technical controls',
        'Security measures',
        'Consent systems',
        'Audit capabilities'
      ]
    },
    {
      icon: ShieldCheckIcon,
      phase: 'Training & Testing',
      duration: 'Weeks 11-12',
      activities: [
        'Staff training programs',
        'System testing',
        'Compliance validation',
        'Go-live preparation'
      ],
      deliverables: [
        'Training materials',
        'Test reports',
        'Compliance certificates',
        'Go-live checklist'
      ]
    }
  ];

  const implementationTools = [
    {
      category: 'Documentation Tools',
      tools: [
        'Privacy policy generator',
        'Process documentation templates',
        'Data processing agreements',
        'Consent form templates'
      ]
    },
    {
      category: 'Technical Tools',
      tools: [
        'Consent management platform',
        'Data discovery scanners',
        'Audit logging systems',
        'Security assessment tools'
      ]
    },
    {
      category: 'Training Tools',
      tools: [
        'E-learning modules',
        'Training assessment quizzes',
        'Progress tracking dashboards',
        'Certification programs'
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            90-Day Implementation Program
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Structured 12-week program to achieve complete DPDP compliance with expert guidance.
          </p>
        </div>

        {/* Implementation Phases */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
          {implementationPhases.map((phase, index) => {
            const IconComponent = phase.icon;
            return (
              <div key={index} className="relative">
                {index > 0 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-orange-200 dark:bg-orange-800 -translate-x-full translate-y-4" />
                )}

                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        {phase.duration}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {phase.phase}
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Activities:
                    </h4>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, activityIndex) => (
                        <li key={activityIndex} className="flex items-center text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-white">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Deliverables:
                    </h4>
                    <ul className="space-y-2">
                      {phase.deliverables.map((deliverable, deliverableIndex) => (
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

        {/* Implementation Tools */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Implementation Toolkit
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Comprehensive toolkit with templates, tools, and resources for successful implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {implementationTools.map((category, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h4>
                <ul className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Implementation Success Metrics
          </h3>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Track your progress with clear metrics and milestones throughout the implementation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">90%</div>
              <div className="text-sm text-orange-100">Average Completion Rate</div>
              <div className="text-xs text-orange-200 mt-1">On-time delivery</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm text-orange-100">Compliance Achievement</div>
              <div className="text-xs text-orange-200 mt-1">Full DPDP compliance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm text-orange-100">Cost Reduction</div>
              <div className="text-xs text-orange-200 mt-1">Penalty avoidance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">4.8/5</div>
              <div className="text-sm text-orange-100">Client Satisfaction</div>
              <div className="text-xs text-orange-200 mt-1">Implementation quality</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
