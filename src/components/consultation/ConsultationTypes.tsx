'use client';

import { ChevronLeftIcon, CpuChipIcon, LightBulbIcon, ChartBarSquareIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

interface ConsultationTypesProps {
  onTypeSelected: (type: string) => void;
  onBack: () => void;
}

const consultationTypes = [
  {
    id: 'technical',
    name: 'Technical Consultation',
    icon: CpuChipIcon,
    duration: '45 minutes',
    price: 'Free',
    description: 'Deep-dive technical discussion about AI implementation, integrations, and architecture.',
    idealFor: ['Technical teams', 'IT decision makers', 'Developers'],
    covers: [
      'Technical architecture and integrations',
      'API capabilities and limitations',
      'Security and compliance requirements',
      'Scalability and performance considerations',
      'Custom development possibilities'
    ]
  },
  {
    id: 'business',
    name: 'Business Strategy Consultation',
    icon: ChartBarSquareIcon,
    duration: '30 minutes',
    price: 'Free',
    description: 'Strategic guidance on AI adoption, ROI analysis, and business transformation.',
    idealFor: ['Business leaders', 'Operations managers', 'Strategy teams'],
    covers: [
      'AI readiness assessment',
      'Business case development',
      'ROI projections and KPIs',
      'Implementation roadmap',
      'Change management strategy'
    ]
  },
  {
    id: 'industry',
    name: 'Industry-Specific Consultation',
    icon: LightBulbIcon,
    duration: '30 minutes',
    price: 'Free',
    description: 'Specialized guidance for your industry with relevant use cases and best practices.',
    idealFor: ['Industry leaders', 'Department heads', 'Innovation teams'],
    covers: [
      'Industry-specific AI applications',
      'Regulatory compliance considerations',
      'Competitive landscape analysis',
      'Success stories from your industry',
      'Tailored implementation approach'
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance & Security Consultation',
    icon: ShieldCheckIcon,
    duration: '30 minutes',
    price: 'Free',
    description: 'Focus on compliance requirements, data security, and regulatory considerations.',
    idealFor: ['Compliance officers', 'Legal teams', 'Risk managers'],
    covers: [
      'GDPR, DPDP, and other compliance frameworks',
      'Data security and privacy measures',
      'Audit trails and documentation',
      'Risk assessment and mitigation',
      'Regulatory reporting capabilities'
    ]
  }
];

export default function ConsultationTypes({ onTypeSelected, onBack }: ConsultationTypesProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to consultation overview
        </button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your Consultation Type
        </h1>
        <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto">
          Select the consultation that best matches your needs. All consultations are free and conducted by AI experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {consultationTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <div
              key={type.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => onTypeSelected(type.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {type.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-white">
                      <span>⏱️ {type.duration}</span>
                      <span>💰 {type.price}</span>
                    </div>
                  </div>
                </div>
                <div className="text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-white mb-6">
                {type.description}
              </p>

              {/* Ideal For */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Ideal for:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {type.idealFor.map((person, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white rounded-full text-sm"
                    >
                      {person}
                    </span>
                  ))}
                </div>
              </div>

              {/* What it covers */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  What we'll cover:
                </h4>
                <ul className="space-y-2">
                  {type.covers.map((item, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="text-emerald-500 mr-2 mt-0.5">•</span>
                      <span className="text-gray-600 dark:text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTypeSelected(type.id);
                }}
                className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
              >
                Select This Consultation
              </button>
            </div>
          );
        })}
      </div>

      {/* Help text */}
      <div className="mt-12 text-center">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Not sure which consultation to choose?
          </h3>
          <p className="text-gray-600 dark:text-white mb-4">
            Most clients start with the Business Strategy consultation to understand the big picture,
            then follow up with Technical consultation for implementation details.
          </p>
          <button
            onClick={() => onTypeSelected('business')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Start with Business Strategy
          </button>
        </div>
      </div>
    </div>
  );
}
