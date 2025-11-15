'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function VyaptIXPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$300',
      period: 'month',
      description: 'Perfect for small teams getting started with AI workflow automation',
      workspaces: 'Up to 3',
      automations: '10 active automations',
      features: [
        'Notion workspace integration',
        '5 tool integrations',
        'Basic AI report generation',
        'Email support',
        'Standard templates'
      ],
      limitations: [
        'Limited customization',
        'Basic AI features',
        'Standard support hours'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: '$600',
      period: 'month',
      description: 'Advanced automation for growing teams with complex workflows',
      workspaces: 'Up to 10',
      automations: '50 active automations',
      features: [
        'Unlimited workspace integration',
        '25 tool integrations',
        'Advanced AI analytics',
        'Priority support',
        'Custom automation builder',
        'Advanced AI insights',
        'Custom templates'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: '$1,200',
      period: 'month',
      description: 'Full-featured solution for large organizations with enterprise requirements',
      workspaces: 'Unlimited',
      automations: 'Unlimited',
      features: [
        'Enterprise workspace integration',
        'Unlimited tool integrations',
        'Enterprise AI capabilities',
        'Dedicated success manager',
        'Custom AI model training',
        'Advanced security & compliance',
        'White-label solution',
        'API access',
        'Custom integrations',
        'SLA guarantees'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const features = [
    'Notion workspace integration',
    'Tool integrations',
    'AI report generation',
    'Custom automation builder',
    'Advanced AI analytics',
    'Priority customer support',
    'Custom templates',
    'White-label solution',
    'Dedicated success manager',
    'API access'
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Choose the plan that fits your team's needs. All plans include our 14-day free trial with full access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-2 ${
                plan.popular
                  ? 'border-purple-500 dark:border-purple-400'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                  <span className="text-gray-600 dark:text-white">/{plan.period}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="text-sm text-gray-600 dark:text-white">
                    {plan.workspaces} workspaces
                  </div>
                  <div className="text-sm text-gray-600 dark:text-white">
                    {plan.automations}
                  </div>
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
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : plan.name === 'Enterprise'
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
              Compare Plans
            </h3>
            <p className="text-gray-600 dark:text-white">
              Detailed feature comparison to help you choose the right plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-purple-600">Professional</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {features.map((feature, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">
                      {feature}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {index < 5 ? (
                        <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {index < 7 ? (
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

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pricing FAQ
            </h3>
            <p className="text-gray-600 dark:text-white">
              Common questions about our pricing and features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What's included in the free trial?
                </h4>
                <p className="text-gray-600 dark:text-white text-sm">
                  Full access to all features for 14 days. No credit card required. Includes setup assistance and training materials.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I change plans anytime?
                </h4>
                <p className="text-gray-600 dark:text-white text-sm">
                  Yes! Upgrade or downgrade at any time. Changes take effect immediately, and we'll prorate the billing.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What counts as a workspace?
                </h4>
                <p className="text-gray-600 dark:text-white text-sm">
                  A workspace is a Notion workspace. Each plan allows a different number of connected Notion workspaces.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer annual discounts?
                </h4>
                <p className="text-gray-600 dark:text-white text-sm">
                  Yes! Annual plans receive a 20% discount. You can also pay monthly with no long-term commitment.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a setup fee?
                </h4>
                <p className="text-gray-600 dark:text-white text-sm">
                  No setup fees! We provide free onboarding and setup assistance for all plans.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-600 dark:text-white text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
