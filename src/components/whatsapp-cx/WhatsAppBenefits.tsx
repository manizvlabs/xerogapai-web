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

        {/* Industry Use Cases */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Real-World Success Stories
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
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
                    <div className="text-sm text-gray-600 dark:text-white">
                      {useCase.problem}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">
                      Solution:
                    </div>
                    <div className="text-sm text-gray-600 dark:text-white">
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

      </div>
    </section>
  );
}
