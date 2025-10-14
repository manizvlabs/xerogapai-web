'use client';

export default function WhatsAppBenefits() {
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
    <section className="py-32 sm:py-40 bg-white dark:bg-gray-900">
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
