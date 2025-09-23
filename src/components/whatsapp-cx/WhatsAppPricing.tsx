'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function WhatsAppPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$500',
      period: 'month',
      description: 'Perfect for small businesses getting started with WhatsApp automation',
      conversations: 'Up to 1,000',
      features: [
        'AI-powered responses',
        'Basic analytics dashboard',
        'Email support',
        'Standard integrations',
        'Basic reporting'
      ],
      limitations: [
        'Limited customization',
        'Basic AI training',
        'Standard support hours'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: '$1,200',
      period: 'month',
      description: 'Advanced automation for growing businesses with higher volume',
      conversations: 'Up to 5,000',
      features: [
        'Advanced AI responses',
        'Real-time analytics',
        'Priority support',
        'Custom integrations',
        'Advanced reporting',
        'Multi-language support',
        'Custom AI training'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: '$2,500',
      period: 'month',
      description: 'Full-featured solution for large organizations with complex needs',
      conversations: 'Unlimited',
      features: [
        'Enterprise AI responses',
        'Advanced analytics & insights',
        'Dedicated support manager',
        'Custom integrations',
        'Advanced reporting & API',
        'Multi-language support',
        'Custom AI training',
        'White-label solution',
        'SLA guarantees',
        'Custom compliance features'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const features = [
    'AI-powered responses',
    'Real-time analytics dashboard',
    'Priority customer support',
    'Custom integrations',
    'Advanced reporting',
    'Multi-language support',
    'Custom AI training',
    'White-label solution',
    'Dedicated support manager',
    'SLA guarantees'
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose the plan that fits your business needs. All plans include our 14-day free trial.
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
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {plan.conversations} conversations/month
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  What's included:
                </h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
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
                        <span className="text-sm text-gray-700 dark:text-gray-300">{limitation}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-green-600 hover:bg-green-700 text-white'
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
            <p className="text-gray-600 dark:text-gray-300">
              Detailed feature comparison to help you choose the right plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Starter</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-600">Professional</th>
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
            <p className="text-gray-600 dark:text-gray-300">
              Common questions about our pricing and plans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a free trial?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes! All plans include a 14-day free trial with full access to all features. No credit card required.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I change plans anytime?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What if I exceed my conversation limit?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We'll notify you when you approach your limit. Additional conversations are billed at $0.10 each.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer annual discounts?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Yes! Annual plans receive a 15% discount and include 2 months of service for the price of 10.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a setup fee?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  No setup fees for our standard plans. Enterprise plans may include custom implementation fees.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
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
