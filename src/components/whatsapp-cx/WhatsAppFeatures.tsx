'use client';

import {
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function WhatsAppFeatures() {
  const features = [
    {
      icon: CpuChipIcon,
      title: 'AI-Powered Responses',
      description: 'Intelligent automation that understands context and provides human-like responses to customer queries.',
      benefits: ['Natural language processing', 'Context-aware replies', 'Multi-language support', 'Continuous learning']
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Smart Tagging & Routing',
      description: 'Automatically categorize conversations and route them to the right team member or escalation path.',
      benefits: ['Priority-based routing', 'Auto-categorization', 'Escalation workflows', 'Team assignment']
    },
    {
      icon: ChartBarIcon,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboard with insights on response times, customer satisfaction, and conversion metrics.',
      benefits: ['Performance monitoring', 'Customer sentiment analysis', 'Conversion tracking', 'Custom reports']
    },
    {
      icon: ArrowPathIcon,
      title: 'Seamless Handoff',
      description: 'Smooth transition from AI to human agents when complex issues require personal attention.',
      benefits: ['Context preservation', 'Instant handoff', 'Agent notification', 'Quality assurance']
    },
    {
      icon: GlobeAltIcon,
      title: 'Multi-Language Support',
      description: 'Serve customers in their preferred language with automatic translation and localized responses.',
      benefits: ['20+ languages', 'Cultural adaptation', 'Local business hours', 'Regional compliance']
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption, compliance certifications, and data protection.',
      benefits: ['End-to-end encryption', 'GDPR compliant', 'Audit trails', 'Data residency options']
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Complete WhatsApp Business Automation Suite
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Everything you need to transform your WhatsApp customer experience into a revenue-generating powerhouse.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
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
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-white mb-6">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Key Capabilities:
                    </h4>
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-white">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="mt-20 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              WhatsApp CX Copilot vs Traditional Support
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-green-600">WhatsApp CX Copilot</th>
                    <th className="text-center py-4 px-4 font-semibold text-gray-500">Traditional Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">Response Time</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">2 minutes</td>
                    <td className="py-4 px-4 text-center text-gray-500">6+ hours</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">Availability</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">24/7</td>
                    <td className="py-4 px-4 text-center text-gray-500">9 AM - 6 PM</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">Languages</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">20+</td>
                    <td className="py-4 px-4 text-center text-gray-500">1-2</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">Cost per Conversation</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">$0.10</td>
                    <td className="py-4 px-4 text-center text-gray-500">$5.00+</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-medium">Customer Satisfaction</td>
                    <td className="py-4 px-4 text-center text-green-600 font-semibold">95%</td>
                    <td className="py-4 px-4 text-center text-gray-500">75%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
