'use client';

import { ScaleIcon, ArrowTrendingUpIcon, UsersIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function WhatsAppBenefits() {
  const benefits = [
    {
      icon: ScaleIcon,
      title: 'Scale Customer Service',
      description: 'Handle 10x more customer conversations without hiring additional staff or expanding your support team.',
      metrics: [
        { label: 'Conversations Handled', value: '10x increase' },
        { label: 'Cost per Interaction', value: '95% reduction' },
        { label: 'Support Team Size', value: 'No increase needed' }
      ],
      color: 'green'
    },
    {
      icon: ArrowTrendingUpIcon,
      title: 'Boost Revenue & Conversion',
      description: 'Turn WhatsApp conversations into sales opportunities with intelligent lead qualification and follow-up.',
      metrics: [
        { label: 'Lead Conversion Rate', value: '3x improvement' },
        { label: 'Sales Cycle Time', value: '40% reduction' },
        { label: 'Revenue per Customer', value: '25% increase' }
      ],
      color: 'blue'
    },
    {
      icon: UsersIcon,
      title: 'Improve Customer Experience',
      description: 'Provide instant, personalized responses that delight customers and build long-term loyalty.',
      metrics: [
        { label: 'Customer Satisfaction', value: '85% improvement' },
        { label: 'Response Time', value: '2 minutes average' },
        { label: 'Customer Retention', value: '30% increase' }
      ],
      color: 'purple'
    }
  ];

  const useCases = [
    {
      industry: 'E-commerce',
      problem: 'High volume of order status inquiries',
      solution: 'AI instantly answers order questions, processes returns, and handles basic support',
      result: '90% of inquiries resolved without human intervention'
    },
    {
      industry: 'Healthcare',
      problem: 'Appointment scheduling and basic inquiries',
      solution: 'AI handles appointment booking, prescription queries, and general information',
      result: '60% reduction in phone call volume'
    },
    {
      industry: 'Financial Services',
      problem: 'Account balance and transaction inquiries',
      solution: 'AI provides secure account information and handles routine banking queries',
      result: '75% of customer inquiries automated'
    },
    {
      industry: 'Hospitality',
      problem: 'Reservation changes and facility information',
      solution: 'AI manages booking modifications, provides venue details, and answers FAQs',
      result: '50% reduction in front desk workload'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Why Businesses Choose WhatsApp CX Copilot
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Measurable results that drive business growth and customer satisfaction across industries.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            const colorClasses = {
              green: 'text-green-600 bg-green-100 dark:bg-green-900/30',
              blue: 'text-green-600 bg-green-100 dark:bg-green-900/30',
              purple: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
            };

            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${colorClasses[benefit.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {benefit.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {benefit.description}
                </p>

                <div className="space-y-3">
                  {benefit.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</span>
                      <span className={`text-sm font-semibold ${
                        benefit.color === 'green' ? 'text-green-600' :
                        benefit.color === 'blue' ? 'text-green-600' : 'text-purple-600'
                      }`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Industry Use Cases */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-World Success Stories
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See how businesses across different industries are transforming their customer experience with WhatsApp automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">
                      {useCase.industry.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {useCase.industry}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
                      Challenge:
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {useCase.problem}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                      Solution:
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {useCase.solution}
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <div className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                      Result:
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-400">
                      {useCase.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROI Calculator Preview */}
        <div className="bg-gradient-to-r from-green-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Calculate Your Potential ROI
          </h3>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            See exactly how much WhatsApp automation can save your business with our interactive ROI calculator.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">95%</div>
              <div className="text-sm text-green-100">Cost Reduction</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">3x</div>
              <div className="text-sm text-green-100">Conversion Increase</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">6-month</div>
              <div className="text-sm text-green-100">ROI Payback</div>
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
