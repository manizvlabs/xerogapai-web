'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SalesPricing() {
  const plans = [
    {
      name: 'Sales Starter',
      price: '$299',
      period: 'month',
      description: 'Perfect for individual sales reps or small sales teams getting started with AI automation',
      users: 'Up to 5 users',
      leads: '1,000 leads/month',
      features: [
        'Lead generation & scoring',
        'Email automation',
        'Basic CRM integration',
        'Sales intelligence dashboard',
        'Email support'
      ],
      limitations: [
        'Limited customization',
        'Basic AI features',
        'Standard integrations'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Sales Pro',
      price: '$599',
      period: 'month',
      description: 'Advanced automation for growing sales teams with comprehensive AI capabilities',
      users: 'Up to 25 users',
      leads: '10,000 leads/month',
      features: [
        'Advanced lead intelligence',
        'Multi-channel automation',
        'Custom AI models',
        'Advanced integrations',
        'Team collaboration tools',
        'Performance analytics',
        'Priority support',
        'Custom workflows'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      name: 'Sales Enterprise',
      price: '$1,199',
      period: 'month',
      description: 'Complete enterprise solution with unlimited users and custom AI development',
      users: 'Unlimited users',
      leads: 'Unlimited leads',
      features: [
        'Everything in Pro',
        'Custom AI development',
        'White-label solution',
        'Dedicated success manager',
        'Enterprise integrations',
        'Advanced security',
        'SLA guarantees',
        'Custom reporting',
        'API access',
        'Phone support'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Sales Automation Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Choose the plan that fits your sales team size and automation needs. All plans include our 14-day free trial.
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

                <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <div>{plan.users}</div>
                  <div>{plan.leads}</div>
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
                    : plan.name === 'Sales Enterprise'
                    ? 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your Sales Automation ROI
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            See exactly how much revenue our sales automation can generate for your team
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">$50K+</div>
              <div className="text-sm text-green-100">Additional Revenue</div>
              <div className="text-xs text-green-200 mt-1">Per sales rep annually</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">3x</div>
              <div className="text-sm text-green-100">More Qualified Leads</div>
              <div className="text-xs text-green-200 mt-1">AI-powered prospecting</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">60%</div>
              <div className="text-sm text-green-100">Faster Sales Cycle</div>
              <div className="text-xs text-green-200 mt-1">Automated nurturing</div>
            </div>
          </div>

          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Calculate Your ROI
          </button>
        </div>
      </div>
    </section>
  );
}
