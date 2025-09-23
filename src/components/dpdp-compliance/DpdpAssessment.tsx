'use client';

import { MagnifyingGlassIcon, DocumentCheckIcon, ChartBarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export default function DpdpAssessment() {
  const assessmentSteps = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Data Discovery & Mapping',
      description: 'Comprehensive audit of all personal data collection, processing, and storage activities.',
      deliverables: [
        'Data inventory catalog',
        'Processing activity mapping',
        'Data flow diagrams',
        'Risk identification'
      ]
    },
    {
      icon: DocumentCheckIcon,
      title: 'Compliance Gap Analysis',
      description: 'Detailed comparison of current practices against DPDP Act requirements.',
      deliverables: [
        'Gap assessment report',
        'Compliance score',
        'Priority recommendations',
        'Implementation roadmap'
      ]
    },
    {
      icon: ChartBarIcon,
      title: 'Risk Assessment',
      description: 'Evaluation of data protection risks and their potential impact on your organization.',
      deliverables: [
        'Risk register',
        'Impact assessments',
        'Mitigation strategies',
        'Priority risk matrix'
      ]
    },
    {
      icon: ClipboardDocumentListIcon,
      title: 'Action Plan Development',
      description: 'Creation of detailed implementation plan with timelines and responsible parties.',
      deliverables: [
        'Project timeline',
        'Resource requirements',
        'Milestone tracking',
        'Success metrics'
      ]
    }
  ];

  const assessmentTools = [
    {
      category: 'Automated Scanning',
      tools: [
        'Data discovery scanners',
        'Privacy policy analyzers',
        'Consent mechanism auditors',
        'Breach detection systems'
      ]
    },
    {
      category: 'Manual Assessment',
      tools: [
        'Interview templates',
        'Process documentation',
        'Policy review checklists',
        'Stakeholder questionnaires'
      ]
    },
    {
      category: 'Reporting & Analytics',
      tools: [
        'Compliance dashboards',
        'Risk heat maps',
        'Progress tracking',
        'Executive summaries'
      ]
    }
  ];

  const assessmentTimeline = [
    { phase: 'Week 1', activity: 'Data discovery and mapping', status: 'completed' },
    { phase: 'Week 2', activity: 'Process documentation and interviews', status: 'in-progress' },
    { phase: 'Week 3', activity: 'Gap analysis and risk assessment', status: 'pending' },
    { phase: 'Week 4', activity: 'Report generation and action planning', status: 'pending' }
  ];

  return (
    <section id="assessment" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Comprehensive DPDP Assessment
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            30-day detailed assessment that identifies all compliance gaps and provides
            actionable recommendations to achieve DPDP compliance.
          </p>
        </div>

        {/* Assessment Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {assessmentSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {step.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Deliverables:
                  </h4>
                  {step.deliverables.map((deliverable, deliverableIndex) => (
                    <div key={deliverableIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Assessment Tools */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Assessment Toolkit
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Comprehensive toolkit combining automated scanning, manual assessment, and advanced analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {assessmentTools.map((category, index) => (
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

        {/* Assessment Timeline */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              30-Day Assessment Timeline
            </h3>
            <p className="text-orange-100 max-w-2xl mx-auto">
              Structured 4-week assessment process with clear deliverables each week
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {assessmentTimeline.map((phase, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-bold">{phase.phase}</div>
                  <div className={`w-3 h-3 rounded-full ${
                    phase.status === 'completed' ? 'bg-green-400' :
                    phase.status === 'in-progress' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="text-sm text-orange-100 mb-3">
                  {phase.activity}
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  phase.status === 'completed' ? 'bg-green-500/20 text-green-200' :
                  phase.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-200' :
                  'bg-gray-500/20 text-gray-200'
                }`}>
                  {phase.status === 'completed' ? 'Completed' :
                   phase.status === 'in-progress' ? 'In Progress' : 'Pending'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Benefits */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <MagnifyingGlassIcon className="w-12 h-12 text-orange-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why Choose Our Assessment?
              </h3>
            </div>

            <p className="text-gray-600 dark:text-white mb-8 max-w-2xl mx-auto">
              Comprehensive assessment that goes beyond compliance to optimize your data practices
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">98% Accuracy</h4>
                <p className="text-sm text-gray-600 dark:text-white">
                  Industry-leading assessment accuracy with detailed validation
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">30 Days</h4>
                <p className="text-sm text-gray-600 dark:text-white">
                  Complete assessment delivered within 30 days
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl mb-3">📋</div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Actionable</h4>
                <p className="text-sm text-gray-600 dark:text-white">
                  Detailed implementation roadmap with clear next steps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
