'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function EnterprisePricing() {
  const plans = [
    {
      name: 'Enterprise Starter',
      price: '$800',
      period: 'month',
      description: 'Perfect for mid-sized organizations starting their AI knowledge journey',
      users: 'Up to 500 users',
      documents: 'Up to 10,000 documents',
      languages: '5 languages',
      features: [
        'Multi-language Q&A',
        'Basic analytics dashboard',
        'Role-based access control',
        'Email support',
        'Basic integrations',
        'GDPR compliance'
      ],
      limitations: [
        'Limited customization',
        'Standard support hours',
        'Basic AI training'
      ],
      popular: false,
      cta: 'Start Enterprise Trial'
    },
    {
      name: 'Enterprise Pro',
      price: '$1,500',
      period: 'month',
      description: 'Advanced enterprise features for large organizations with complex needs',
      users: 'Up to 2,000 users',
      documents: 'Up to 50,000 documents',
      languages: '15 languages',
      features: [
        'Advanced multi-language support',
        'Custom AI model training',
        'Enterprise analytics',
        'Priority support',
        'Advanced integrations',
        'White-label solution',
        'Custom workflows',
        'API access',
        'Dedicated success manager',
        'SLA guarantees'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Enterprise Trial'
    },
    {
      name: 'Enterprise Elite',
      price: 'Custom',
      period: 'pricing',
      description: 'Full enterprise solution with unlimited scale and custom integrations',
      users: 'Unlimited users',
      documents: 'Unlimited documents',
      languages: 'All 20+ languages',
      features: [
        'Unlimited everything',
        'Custom AI development',
        'Enterprise-grade security',
        '24/7 dedicated support',
        'Custom integrations',
        'On-premise deployment',
        'Custom compliance features',
        'Executive reporting',
        'Strategic partnership',
        'Custom SLA terms'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const enterpriseFeatures = [
    'Multi-language Q&A',
    'Role-based access control',
    'Custom AI model training',
    'Enterprise analytics',
    'White-label solution',
    'API access',
    'Dedicated success manager',
    'Custom integrations',
    'On-premise deployment',
    'Strategic partnership'
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Enterprise Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Scalable pricing designed for enterprise needs. All plans include our 30-day free trial and full enterprise support.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-2 ${
                plan.popular
                  ? 'border-green-500 dark:border-green-400'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-white mb-6">
                  {plan.description}
                </p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period !== 'pricing' && (
                    <span className="text-gray-600 dark:text-white">/{plan.period}</span>
                  )}
                </div>

                <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-white">
                  <div>{plan.users}</div>
                  <div>{plan.documents}</div>
                  <div>{plan.languages}</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  What's included:
                </h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-white">{feature}</span>
                  </div>
                ))}

                {plan.limitations.length > 0 && (
                  <>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4 mt-6">
                      Limitations:
                    </h4>
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center">
                        <XMarkIcon className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-white">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : plan.name === 'Enterprise Elite'
                    ? 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Enterprise Feature Comparison
            </h3>
            <p className="text-gray-600 dark:text-white">
              Compare enterprise features across all plans
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-600">Pro</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {enterpriseFeatures.map((feature, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">
                      {feature}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {index < 6 ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {index < 9 ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enterprise Benefits */}
        <div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Why Enterprise Copilots?
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              More than just AI - a complete enterprise knowledge management solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🏢</div>
              <h4 className="text-xl font-semibold mb-2">Enterprise Scale</h4>
              <p className="text-green-100 text-sm">
                Built for thousands of users and millions of documents
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="text-xl font-semibold mb-2">Bank-Level Security</h4>
              <p className="text-green-100 text-sm">
                SOC 2, ISO 27001, and GDPR compliant
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="text-xl font-semibold mb-2">Global Support</h4>
              <p className="text-green-100 text-sm">
                20+ languages with 24/7 enterprise support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
