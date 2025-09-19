'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function DpdpPricing() {
  const plans = [
    {
      name: 'Assessment Only',
      price: '₹49,999',
      duration: 'One-time',
      description: '30-day comprehensive gap assessment with detailed implementation roadmap',
      features: [
        'Complete gap assessment',
        'Risk analysis report',
        'Implementation roadmap',
        'Priority recommendations',
        'Executive summary',
        '30-day support'
      ],
      limitations: [
        'Assessment only',
        'No implementation support',
        'Basic templates only'
      ],
      popular: false,
      cta: 'Start Assessment'
    },
    {
      name: 'Implementation Package',
      price: '₹1,49,999',
      duration: '90 days',
      description: 'Complete assessment + 90-day implementation support with expert guidance',
      features: [
        'Everything in Assessment',
        'Implementation support',
        'Custom templates',
        'Training sessions',
        'Compliance monitoring',
        '90-day expert support',
        'Progress tracking',
        'Go-live assistance'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Implementation'
    },
    {
      name: 'Enterprise Solution',
      price: 'Custom',
      duration: 'Flexible',
      description: 'Full enterprise solution with ongoing compliance management and support',
      features: [
        'Everything in Implementation',
        'Ongoing compliance monitoring',
        'Annual compliance audits',
        'Dedicated compliance officer',
        'Custom integrations',
        'Advanced analytics',
        'Priority support',
        'White-label reporting',
        'Multi-location support',
        'Custom SLA'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const addons = [
    { name: 'Data Protection Officer Services', price: '₹25,000/month', description: 'Outsourced DPO services' },
    { name: 'Annual Compliance Audit', price: '₹75,000/year', description: 'Annual compliance assessment' },
    { name: 'Breach Response Services', price: '₹50,000/incident', description: 'Breach notification and response' },
    { name: 'Employee Training Program', price: '₹15,000/year', description: 'Annual training for all employees' }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            DPDP Compliance Pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Transparent pricing designed to help Indian businesses achieve DPDP compliance cost-effectively.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border-2 ${
                plan.popular
                  ? 'border-orange-500 dark:border-orange-400'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
                  <span className="text-gray-600 dark:text-gray-400 block text-sm">
                    {plan.duration}
                  </span>
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
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : plan.name === 'Enterprise Solution'
                    ? 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Optional Add-ons
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enhance your compliance program with these additional services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addons.map((addon, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {addon.name}
                  </h4>
                  <div className="text-orange-600 font-bold">
                    {addon.price}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {addon.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your DPDP ROI
          </h3>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            See exactly how much penalties you'll avoid and what ROI to expect from DPDP compliance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">₹250Cr</div>
              <div className="text-sm text-orange-100">Maximum Penalty Avoided</div>
              <div className="text-xs text-orange-200 mt-1">Per violation</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">500%</div>
              <div className="text-sm text-orange-100">Average ROI</div>
              <div className="text-xs text-orange-200 mt-1">First year returns</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm text-orange-100">Cost Reduction</div>
              <div className="text-xs text-orange-200 mt-1">Penalty avoidance</div>
            </div>
          </div>

          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Calculate Your ROI
          </button>
        </div>
      </div>
    </section>
  );
}
