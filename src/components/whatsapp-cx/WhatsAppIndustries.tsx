'use client';
import Link from 'next/link';

import { ShoppingBagIcon, HeartIcon, HomeIcon, TruckIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function WhatsAppIndustries() {
  const industries = [
    {
      icon: ShoppingBagIcon,
      name: 'E-commerce',
      description: 'Perfect for order status, returns, product recommendations, and customer support.',
      useCases: [
        'Order tracking and updates',
        'Product recommendations',
        'Return and exchange processing',
        'Abandoned cart recovery',
        'Customer loyalty programs'
      ],
      metrics: {
        automation: '90%',
        satisfaction: '+85%',
        revenue: '+$250K'
      }
    },
    {
      icon: HeartIcon,
      name: 'Healthcare',
      description: 'Manage appointments, prescription queries, and patient communication securely.',
      useCases: [
        'Appointment scheduling',
        'Prescription reminders',
        'Test results communication',
        'Insurance queries',
        'Follow-up care coordination'
      ],
      metrics: {
        automation: '75%',
        satisfaction: '+90%',
        revenue: '+$180K'
      }
    },
    {
      icon: HomeIcon,
      name: 'Real Estate',
      description: 'Handle property inquiries, showings, and client communication efficiently.',
      useCases: [
        'Property information requests',
        'Viewing appointment booking',
        'Market updates and alerts',
        'Document sharing',
        'Client follow-ups'
      ],
      metrics: {
        automation: '80%',
        satisfaction: '+75%',
        revenue: '+$320K'
      }
    },
    {
      icon: TruckIcon,
      name: 'Logistics & Delivery',
      description: 'Track shipments, handle delivery updates, and manage customer inquiries.',
      useCases: [
        'Shipment tracking updates',
        'Delivery rescheduling',
        'Route optimization queries',
        'Customs and documentation',
        'Customer notifications'
      ],
      metrics: {
        automation: '85%',
        satisfaction: '+80%',
        revenue: '+$150K'
      }
    },
    {
      icon: BriefcaseIcon,
      name: 'Professional Services',
      description: 'Streamline client communication, project updates, and service inquiries.',
      useCases: [
        'Project status updates',
        'Invoice and payment queries',
        'Service appointment booking',
        'Contract and document sharing',
        'Client onboarding'
      ],
      metrics: {
        automation: '70%',
        satisfaction: '+85%',
        revenue: '+$200K'
      }
    },
    {
      icon: AcademicCapIcon,
      name: 'Education',
      description: 'Manage student inquiries, admissions, and administrative communications.',
      useCases: [
        'Admission inquiries',
        'Course information',
        'Exam results and certificates',
        'Fee payment queries',
        'Student support services'
      ],
      metrics: {
        automation: '65%',
        satisfaction: '+88%',
        revenue: '+$120K'
      }
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Perfect for MEA & Global Businesses
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Tailored solutions for every industry, with industry-specific workflows and compliance requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {industry.name}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {industry.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Common Use Cases:
                  </h4>
                  <ul className="space-y-2">
                    {industry.useCases.map((useCase, useCaseIndex) => (
                      <li key={useCaseIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Typical Results:
                  </h5>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">{industry.metrics.automation}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Automation</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{industry.metrics.satisfaction}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">{industry.metrics.revenue}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Revenue Impact</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Industry Comparison */}
        <div className="mt-20 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              WhatsApp Automation by Industry
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              See how different industries benefit from automated WhatsApp communication
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Industry</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Avg Automation Rate</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Response Time</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Cost Savings</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">Revenue Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {industries.map((industry, index) => (
                  <tr key={index}>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">
                      {industry.name}
                    </td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">
                      {industry.metrics.automation}
                    </td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">
                      2 min
                    </td>
                    <td className="py-4 px-4 text-center text-purple-600 font-semibold">
                      95%
                    </td>
                    <td className="py-4 px-4 text-center text-orange-600 font-semibold">
                      {industry.metrics.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Industry?
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join hundreds of businesses in your industry that are already using WhatsApp automation to drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                View Pricing
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Book Industry Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
