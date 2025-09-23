'use client';
import Link from 'next/link';

import { ChatBubbleLeftRightIcon, QuestionMarkCircleIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function DocsSupport() {
  const supportChannels = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Developer Chat',
      description: 'Real-time support from our developer team',
      availability: '24/7',
      responseTime: '< 5 minutes',
      bestFor: 'Technical questions, API issues, urgent problems',
      href: '#chat'
    },
    {
      icon: QuestionMarkCircleIcon,
      title: 'Help Center',
      description: 'Self-service knowledge base and documentation',
      availability: '24/7',
      responseTime: 'Instant',
      bestFor: 'Quick answers, tutorials, troubleshooting guides',
      href: '/help'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Forum',
      description: 'Connect with other developers and share solutions',
      availability: '24/7',
      responseTime: 'Community driven',
      bestFor: 'Best practices, code examples, peer support',
      href: '/community'
    },
    {
      icon: ClockIcon,
      title: 'Office Hours',
      description: 'Weekly live sessions with our engineering team',
      availability: 'Wednesdays 2-3 PM IST',
      responseTime: 'Live interaction',
      bestFor: 'Deep technical discussions, roadmap questions',
      href: '/office-hours'
    }
  ];

  const supportPlans = [
    {
      name: 'Community',
      price: 'Free',
      features: [
        'Help Center access',
        'Community forum',
        'Basic documentation',
        'Public roadmap',
        'Feature requests'
      ],
      responseTime: 'Community driven',
      supportHours: 'Self-service'
    },
    {
      name: 'Developer',
      price: '$49/month',
      features: [
        'Priority email support',
        'Developer chat access',
        'API troubleshooting',
        'Integration assistance',
        'Monthly office hours'
      ],
      responseTime: '< 24 hours',
      supportHours: 'Business hours'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Dedicated success manager',
        'Phone & video support',
        'Custom integrations',
        'Onboarding assistance',
        'SLA guarantees',
        'Priority feature requests'
      ],
      responseTime: '< 4 hours',
      supportHours: '24/7 enterprise support'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with XeroGap AI?',
      answer: 'Start with our Quick Start Guide in the documentation. It takes about 15 minutes to get your first API call working.',
      category: 'Getting Started'
    },
    {
      question: 'What programming languages do you support?',
      answer: 'We provide official SDKs for JavaScript/TypeScript, Python, PHP, Java, Go, and Ruby. More languages are coming soon.',
      category: 'SDK & Tools'
    },
    {
      question: 'How do I handle rate limits?',
      answer: 'Check our Rate Limits documentation for current limits and best practices. Enterprise plans offer higher limits.',
      category: 'API Usage'
    },
    {
      question: 'Can I integrate with my existing CRM?',
      answer: 'Yes! We support integrations with Salesforce, HubSpot, Zoho CRM, Pipedrive, and many others. See our CRM Integration Guide.',
      category: 'Integrations'
    },
    {
      question: 'How secure is XeroGap AI?',
      answer: 'We use bank-level encryption, SOC 2 compliance, and follow industry security best practices. All data is encrypted at rest and in transit.',
      category: 'Security'
    },
    {
      question: 'Do you offer training or workshops?',
      answer: 'Yes! We offer both public and private training sessions. Enterprise customers get custom workshops and onboarding.',
      category: 'Training'
    }
  ];

  const contactOptions = [
    {
      method: 'Live Chat',
      description: 'Instant support for technical questions',
      availability: '24/7 for paying customers',
      buttonText: 'Start Chat',
      primary: true
    },
    {
      method: 'Email Support',
      description: 'Detailed questions and complex issues',
      availability: 'Response within 24 hours',
      buttonText: 'Send Email',
      primary: false
    },
    {
      method: 'Phone Support',
      description: 'Urgent issues requiring immediate attention',
      availability: 'Business hours, Enterprise only',
      buttonText: 'Call Now',
      primary: false
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Developer Support
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Get the help you need, when you need it. From instant chat support to comprehensive documentation,
            we're here to ensure your success with XeroGap AI.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {supportChannels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {channel.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {channel.availability}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-white">
                        {channel.responseTime}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white mb-4">
                  {channel.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Best for:
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-white">
                    {channel.bestFor}
                  </p>
                </div>

                <Link
                  href={channel.href}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold"
                >
                  Access Support →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Support Plans */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Support Plans
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Choose the support level that fits your needs and development timeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportPlans.map((plan, index) => (
              <div key={index} className={`bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-600 ${plan.name === 'Developer' ? 'ring-2 ring-indigo-500' : ''}`}>
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h4>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    {plan.price}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-white">
                    Response: {plan.responseTime}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <div className="text-xs text-gray-500 dark:text-white mb-3">
                    {plan.supportHours}
                  </div>
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${
                      plan.name === 'Developer'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* FAQs */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 dark:text-white text-sm mb-2">
                    {faq.answer}
                  </p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    {faq.category}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/help/faq"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm mt-4"
            >
              View All FAQs →
            </Link>
          </div>

          {/* Contact Options */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Support
            </h3>

            <div className="space-y-6">
              {contactOptions.map((option, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {option.method}
                    </h4>
                    <p className="text-gray-600 dark:text-white text-sm mb-2">
                      {option.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-white">
                      {option.availability}
                    </p>
                  </div>
                  <button
                    className={`ml-4 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      option.primary
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                    }`}
                  >
                    {option.buttonText}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                Emergency Support
              </h4>
              <p className="text-indigo-800 dark:text-indigo-200 text-sm mb-3">
                For critical production issues and outages, contact our emergency line.
              </p>
              <div className="text-sm font-mono bg-indigo-100 dark:bg-indigo-800 p-2 rounded text-indigo-900 dark:text-indigo-100">
                +1-800-XEROGAP (Emergency Only)
              </div>
            </div>
          </div>
        </div>

        {/* Support Quality Metrics */}
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Support Quality Metrics
          </h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            We're committed to providing exceptional support to help you succeed
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm text-indigo-100">First Response Time</div>
              <div className="text-xs text-indigo-200 mt-1">Within 1 hour</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">4.8/5</div>
              <div className="text-sm text-indigo-100">Support Satisfaction</div>
              <div className="text-xs text-indigo-200 mt-1">Customer rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm text-indigo-100">Issue Resolution</div>
              <div className="text-xs text-indigo-200 mt-1">First contact</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm text-indigo-100">Availability</div>
              <div className="text-xs text-indigo-200 mt-1">Global support</div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/support"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Get Support Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
