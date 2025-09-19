'use client';

import { DocumentTextIcon, ShieldCheckIcon, UserCheckIcon, ClipboardDocumentCheckIcon, ExclamationTriangleIcon, CogIcon } from '@heroicons/react/24/outline';

export default function DpdpFeatures() {
  const features = [
    {
      icon: DocumentTextIcon,
      title: 'Comprehensive Gap Assessment',
      description: 'Detailed audit of your current data practices against DPDP Act requirements with actionable recommendations.',
      capabilities: [
        'Data inventory mapping',
        'Risk assessment',
        'Compliance gap analysis',
        'Priority recommendations'
      ],
      benefit: 'Complete visibility into compliance status'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy Policy Framework',
      description: 'Complete set of DPDP-compliant policies, procedures, and documentation templates.',
      capabilities: [
        'Privacy policy templates',
        'Consent management',
        'Data processing agreements',
        'Breach response procedures'
      ],
      benefit: 'Ready-to-use compliance documentation'
    },
    {
      icon: UserCheckIcon,
      title: 'Consent Management System',
      description: 'Automated consent collection, management, and withdrawal processing for all data subjects.',
      capabilities: [
        'Consent forms and workflows',
        'Consent withdrawal handling',
        'Audit trails',
        'Multi-channel consent'
      ],
      benefit: 'Seamless consent management'
    },
    {
      icon: ClipboardDocumentCheckIcon,
      title: 'Data Protection Officer Support',
      description: 'Tools and templates to support your DPO in maintaining ongoing compliance.',
      capabilities: [
        'DPO dashboard',
        'Compliance monitoring',
        'Audit preparation',
        'Training materials'
      ],
      benefit: 'Empower your DPO team'
    },
    {
      icon: ExclamationTriangleIcon,
      title: 'Breach Management System',
      description: 'Automated breach detection, notification, and response management system.',
      capabilities: [
        'Breach detection alerts',
        'Notification workflows',
        'Impact assessment',
        'Regulatory reporting'
      ],
      benefit: 'Minimize breach impact and penalties'
    },
    {
      icon: CogIcon,
      title: 'Implementation Roadmap',
      description: 'Detailed step-by-step implementation plan with timelines, resources, and milestones.',
      capabilities: [
        'Project planning',
        'Resource allocation',
        'Timeline management',
        'Progress tracking'
      ],
      benefit: 'Clear path to compliance'
    }
  ];

  const complianceRequirements = [
    {
      requirement: 'Lawful Processing',
      description: 'Ensure all data processing has lawful basis and purpose limitation',
      status: 'Mandatory'
    },
    {
      requirement: 'Data Minimization',
      description: 'Collect and process only necessary personal data',
      status: 'Mandatory'
    },
    {
      requirement: 'Consent Management',
      description: 'Obtain and manage valid consent for data processing',
      status: 'Mandatory'
    },
    {
      requirement: 'Data Subject Rights',
      description: 'Implement rights of access, rectification, erasure, and portability',
      status: 'Mandatory'
    },
    {
      requirement: 'Data Security',
      description: 'Implement appropriate technical and organizational measures',
      status: 'Mandatory'
    },
    {
      requirement: 'Breach Notification',
      description: 'Report personal data breaches within 72 hours',
      status: 'Mandatory'
    },
    {
      requirement: 'Data Protection Impact Assessment',
      description: 'Conduct DPIA for high-risk processing activities',
      status: 'Mandatory'
    },
    {
      requirement: 'Data Protection Officer',
      description: 'Appoint DPO for large-scale processing operations',
      status: 'Conditional'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Complete DPDP Compliance Solution
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Everything you need to achieve and maintain DPDP Act compliance with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Capabilities:
                  </h4>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capabilityIndex) => (
                      <li key={capabilityIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-300">
                    {feature.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DPDP Requirements Matrix */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              DPDP Act Requirements Coverage
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete mapping of our solution against all DPDP Act requirements
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Requirement</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {complianceRequirements.map((req, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">
                      {req.requirement}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                      {req.description}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        req.status === 'Mandatory'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            90-Day Implementation Timeline
          </h3>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Structured approach to achieve DPDP compliance within 90 days
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold text-sm mb-1">Days 1-30</div>
              <div className="text-xs text-orange-100">Assessment & Planning</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold text-sm mb-1">Days 31-60</div>
              <div className="text-xs text-orange-100">Implementation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-semibold text-sm mb-1">Days 61-90</div>
              <div className="text-xs text-orange-100">Testing & Go-Live</div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href="/demo"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Your Assessment
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
