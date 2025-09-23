'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ContactPricing() {
  const plans = [
    {
      name: 'Contact Center Starter',
      price: '$499',
      period: 'month',
      description: 'Perfect for small contact centers or teams getting started with AI-powered QA',
      agents: 'Up to 25 agents',
      calls: '2,000 calls/month',
      features: [
        'Automated call scoring',
        'Basic analytics dashboard',
        'Email support',
        'Standard integrations',
        'Real-time feedback'
      ],
      limitations: [
        'Limited customization',
        'Basic coaching features',
        'Standard reporting'
      ],
      popular: false,
      cta: 'Start QA Trial'
    },
    {
      name: 'Contact Center Pro',
      price: '$999',
      period: 'month',
      description: 'Advanced QA solution for growing contact centers with comprehensive features',
      agents: 'Up to 100 agents',
      calls: '10,000 calls/month',
      features: [
        'Advanced AI scoring',
        'Real-time coaching',
        'Custom dashboards',
        'Priority support',
        'Advanced integrations',
        'Performance analytics',
        'Custom scoring models',
        'Team collaboration'
      ],
      limitations: [],
      popular: true,
      cta: 'Start QA Trial'
    },
    {
      name: 'Contact Center Enterprise',
      price: '$1,999',
      period: 'month',
      description: 'Complete enterprise solution with unlimited scale and custom AI development',
      agents: 'Unlimited agents',
      calls: 'Unlimited calls',
      features: [
        'Everything in Pro',
        'Custom AI models',
        'White-label solution',
        'Dedicated success manager',
        'Enterprise integrations',
        'Advanced security',
        'SLA guarantees',
        'Custom reporting',
        'API access',
        'On-premise deployment'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Contact Center QA Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Flexible pricing designed for contact centers of all sizes. All plans include our 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border-2 ${
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
                  <span className="text-gray-600 dark:text-white">/{plan.period}</span>
                </div>

                <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-white">
                  <div>{plan.agents}</div>
                  <div>{plan.calls}</div>
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
                    : plan.name === 'Contact Center Enterprise'
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
        <div className="bg-gradient-to-r from-green-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your QA ROI
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            See how much our contact center QA solution can save your organization
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">$25K+</div>
              <div className="text-sm text-green-100">Annual Savings</div>
              <div className="text-xs text-green-200 mt-1">Per QA analyst</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">40%</div>
              <div className="text-sm text-green-100">Performance Improvement</div>
              <div className="text-xs text-green-200 mt-1">Agent effectiveness</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">90%</div>
              <div className="text-sm text-green-100">Reduction in QA Time</div>
              <div className="text-xs text-green-200 mt-1">Manual review eliminated</div>
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
