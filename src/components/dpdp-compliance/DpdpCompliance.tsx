'use client';

import { ShieldCheckIcon, UserGroupIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function DpdpCompliance() {
  const compliancePrinciples = [
    {
      icon: ShieldCheckIcon,
      principle: 'Lawful Processing',
      description: 'All personal data processing must have a lawful basis and clear purpose',
      requirements: [
        'Obtain valid consent',
        'Fulfill contractual obligations',
        'Comply with legal requirements',
        'Protect vital interests',
        'Perform public tasks',
        'Pursue legitimate interests'
      ]
    },
    {
      icon: UserGroupIcon,
      principle: 'Data Subject Rights',
      description: 'Individuals have rights over their personal data that must be honored',
      requirements: [
        'Right to information',
        'Right to access',
        'Right to rectification',
        'Right to erasure',
        'Right to restrict processing',
        'Right to data portability',
        'Right to object'
      ]
    },
    {
      icon: LockClosedIcon,
      principle: 'Data Security',
      description: 'Implement appropriate technical and organizational measures to protect data',
      requirements: [
        'Data encryption',
        'Access controls',
        'Regular security audits',
        'Incident response plans',
        'Staff training',
        'Vendor assessments'
      ]
    },
    {
      icon: DocumentTextIcon,
      principle: 'Accountability',
      description: 'Demonstrate compliance through documentation and records',
      requirements: [
        'Data processing records',
        'Privacy impact assessments',
        'Breach notification procedures',
        'Audit trails',
        'Policy documentation',
        'Training records'
      ]
    }
  ];

  const complianceChecklist = [
    { item: 'Appoint Data Protection Officer (if applicable)', mandatory: false },
    { item: 'Conduct Data Protection Impact Assessment', mandatory: true },
    { item: 'Implement lawful basis for processing', mandatory: true },
    { item: 'Create privacy policy and notices', mandatory: true },
    { item: 'Establish consent management system', mandatory: true },
    { item: 'Implement data subject rights procedures', mandatory: true },
    { item: 'Establish data security measures', mandatory: true },
    { item: 'Create breach notification procedures', mandatory: true },
    { item: 'Maintain processing records', mandatory: true },
    { item: 'Conduct regular compliance audits', mandatory: true }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            DPDP Act Compliance Framework
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Complete understanding of DPDP Act requirements with practical implementation guidance.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {compliancePrinciples.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {principle.principle}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {principle.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Requirements:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {principle.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Checklist */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              DPDP Compliance Checklist
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete checklist of DPDP Act requirements with implementation guidance
            </p>
          </div>

          <div className="space-y-4">
            {complianceChecklist.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.item}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.mandatory
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                }`}>
                  {item.mandatory ? 'Mandatory' : 'Conditional'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Guidance */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Implementation Guidance
            </h3>
            <p className="text-orange-100 max-w-2xl mx-auto">
              Step-by-step guidance for each compliance requirement with templates and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold text-sm mb-1">Templates</div>
              <div className="text-xs text-orange-100">Ready-to-use documents</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-sm mb-1">Checklists</div>
              <div className="text-xs text-orange-100">Step-by-step guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">💡</div>
              <div className="font-semibold text-sm mb-1">Best Practices</div>
              <div className="text-xs text-orange-100">Industry recommendations</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-orange-100 text-sm mb-6">
              Get expert guidance on implementing each DPDP requirement
            </p>
            <a
              href="/demo"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Implementation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
