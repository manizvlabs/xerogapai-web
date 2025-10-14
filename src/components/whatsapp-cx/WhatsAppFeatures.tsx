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
      description: 'Get instant, human-like replies to customer questions automatically. Your AI assistant learns and improves with every conversation.'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Smart Routing',
      description: 'Conversations automatically go to the right person on your team. Important messages get priority attention.'
    },
    {
      icon: ChartBarIcon,
      title: 'Easy-to-Read Reports',
      description: 'See how fast you\'re responding to customers and how happy they are. Simple dashboards show what matters most.'
    },
    {
      icon: ArrowPathIcon,
      title: 'Seamless Handoff',
      description: 'When customers need personal help, the AI smoothly passes them to your team with all conversation details intact.'
    },
    {
      icon: GlobeAltIcon,
      title: 'Multiple Languages',
      description: 'Talk to customers in their own language. Support for 20+ languages helps you serve customers worldwide.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Your customer data is protected with bank-level security. Fully compliant with privacy regulations.'
    }
  ];

  return (
    <section className="py-32 sm:py-40 bg-gray-50 dark:bg-gray-800">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

                  <p className="text-gray-600 dark:text-white">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
