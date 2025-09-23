'use client';

import { ShieldCheckIcon, LockClosedIcon, EyeIcon, DocumentCheckIcon, ServerIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function EnterpriseSecurity() {
  const securityFeatures = [
    {
      icon: LockClosedIcon,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit and at rest using AES-256 encryption standards.',
      details: [
        'TLS 1.3 encryption for data in transit',
        'AES-256 encryption for data at rest',
        'Zero-knowledge architecture',
        'Regular security audits'
      ]
    },
    {
      icon: KeyIcon,
      title: 'Role-Based Access Control',
      description: 'Granular permissions ensure users only access information they\'re authorized to see.',
      details: [
        'Document-level permissions',
        'User role management',
        'Access logging and monitoring',
        'Compliance reporting'
      ]
    },
    {
      icon: EyeIcon,
      title: 'Complete Audit Trails',
      description: 'Every interaction is logged with timestamps, user information, and detailed activity records.',
      details: [
        'Query logging with context',
        'User activity monitoring',
        'Compliance audit reports',
        'Data retention policies'
      ]
    },
    {
      icon: DocumentCheckIcon,
      title: 'Compliance Certifications',
      description: 'Fully compliant with global standards including GDPR, DPDP, and industry-specific regulations.',
      details: [
        'GDPR and DPDP compliant',
        'ISO 27001 certified',
        'SOC 2 Type II certified',
        'Regular compliance audits'
      ]
    },
    {
      icon: ServerIcon,
      title: 'Data Residency Options',
      description: 'Choose where your data is stored with regional data centers and compliance options.',
      details: [
        'EU, US, and APAC regions',
        'Local data residency',
        'Regional compliance',
        'Data sovereignty'
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: 'Advanced Threat Protection',
      description: 'Multi-layered security including DDoS protection, intrusion detection, and threat intelligence.',
      details: [
        'DDoS protection',
        'Intrusion detection',
        'Real-time threat monitoring',
        'Security incident response'
      ]
    }
  ];

  const complianceStandards = [
    { name: 'GDPR', status: 'Compliant', description: 'European data protection regulation' },
    { name: 'DPDP', status: 'Compliant', description: 'Indian data protection law' },
    { name: 'ISO 27001', status: 'Certified', description: 'Information security management' },
    { name: 'SOC 2', status: 'Certified', description: 'Trust services criteria' },
    { name: 'HIPAA', status: 'Ready', description: 'Healthcare data protection' },
    { name: 'PCI DSS', status: 'Ready', description: 'Payment card industry standards' }
  ];

  const securityMetrics = [
    { label: 'Data Breach Prevention', value: '100%', description: 'Zero data breaches in 5+ years' },
    { label: 'Uptime SLA', value: '99.9%', description: 'Guaranteed availability' },
    { label: 'Security Incidents', value: '0', description: 'No security incidents reported' },
    { label: 'Compliance Score', value: '100%', description: 'Perfect compliance rating' }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Built with security-first architecture to meet the highest standards of data protection and regulatory compliance.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Security Measures:
                  </h4>
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Standards */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Compliance & Certifications
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Meet global standards with comprehensive compliance certifications and audit-ready documentation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {complianceStandards.map((standard, index) => (
              <div key={index} className="text-center">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-600 mb-3">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {standard.name}
                  </div>
                  <div className={`text-sm font-medium ${
                    standard.status === 'Certified' ? 'text-indigo-600' :
                    standard.status === 'Compliant' ? 'text-indigo-600' : 'text-orange-600'
                  }`}>
                    {standard.status}
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-white">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Metrics */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Security Track Record
            </h3>
            <p className="text-indigo-100 max-w-2xl mx-auto">
              Proven security performance with zero incidents and perfect compliance scores
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-indigo-100">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Promise */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <ShieldCheckIcon className="w-12 h-12 text-indigo-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Our Security Promise
              </h3>
            </div>

            <p className="text-gray-600 dark:text-white mb-8 max-w-2xl mx-auto">
              Your data security and privacy are our top priorities. We employ multiple layers of protection
              and maintain the highest standards of enterprise security.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🔐</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Zero Trust Security</h4>
                <p className="text-sm text-gray-600 dark:text-white">
                  Never trust, always verify - every request is authenticated and authorized
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Defense in Depth</h4>
                <p className="text-sm text-gray-600 dark:text-white">
                  Multiple security layers ensure comprehensive protection at every level
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-3">📋</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Compliance First</h4>
                <p className="text-sm text-gray-600 dark:text-white">
                  Security controls designed to meet and exceed regulatory requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
