'use client';

import { useState } from 'react';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export default function HelpFAQs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      faqs: [
        {
          question: 'How do I create my XeroGap AI account?',
          answer: 'Creating an account is simple! Click the "Sign Up" button on our website, enter your email and password, and verify your email. You\'ll have access to our free tier immediately.'
        },
        {
          question: 'What is the free tier and what can I do with it?',
          answer: 'Our free tier includes 1,000 API calls per month, basic integrations, and access to our core features. It\'s perfect for testing and small projects.'
        },
        {
          question: 'How do I upgrade my plan?',
          answer: 'You can upgrade your plan anytime from your account dashboard. Go to Settings > Billing > Upgrade Plan. Changes take effect immediately.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period, and you\'ll retain access to your data.'
        }
      ]
    },
    {
      title: 'Technical Support',
      icon: '🔧',
      faqs: [
        {
          question: 'What programming languages do you support?',
          answer: 'We provide official SDKs for JavaScript/TypeScript, Python, PHP, Java, Go, and Ruby. You can also use our REST API directly from any language.'
        },
        {
          question: 'How do I handle API rate limits?',
          answer: 'Check our Rate Limits documentation for current limits. Free tier: 100 calls/hour, Pro: 1,000 calls/hour, Enterprise: Custom limits. We include automatic retry logic in our SDKs.'
        },
        {
          question: 'What should I do if I get an API error?',
          answer: 'First, check our API Error Codes documentation. Most common issues are authentication problems or rate limiting. If you need help, contact our support team.'
        },
        {
          question: 'How do I migrate from another platform?',
          answer: 'We have detailed migration guides for popular platforms. Contact our support team for personalized migration assistance and data transfer help.'
        }
      ]
    },
    {
      title: 'Integrations',
      icon: '🔗',
      faqs: [
        {
          question: 'How do I connect XeroGap AI with Notion?',
          answer: 'Go to Integrations in your dashboard, select Notion, and follow the OAuth flow. Our integration guide has step-by-step instructions with screenshots.'
        },
        {
          question: 'Which CRM platforms do you support?',
          answer: 'We support Salesforce, HubSpot, Zoho CRM, Pipedrive, ActiveCampaign, and many others. Check our integrations page for the complete list.'
        },
        {
          question: 'Can I create custom integrations?',
          answer: 'Yes! Use our webhook system and REST API to create custom integrations. We provide extensive documentation and code samples.'
        },
        {
          question: 'How secure are your integrations?',
          answer: 'All integrations use OAuth 2.0, encrypted connections, and follow industry security standards. Your data is never stored on our servers.'
        }
      ]
    },
    {
      title: 'Billing & Account',
      icon: '💳',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans.'
        },
        {
          question: 'Do you offer discounts for annual plans?',
          answer: 'Yes! Annual plans receive a 20% discount. You can also pay monthly with no long-term commitment.'
        },
        {
          question: 'How do I add team members to my account?',
          answer: 'Go to Settings > Team Members > Add Member. You can assign different roles and permissions to control access.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export your data anytime from your account dashboard. We provide data in JSON, CSV, and other common formats.'
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Quick answers to the most common questions about XeroGap AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * category.faqs.length + faqIndex;
                  const isOpen = openFAQ === globalIndex;

                  return (
                    <div key={faqIndex} className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-left font-medium text-gray-900 dark:text-white">
                          {faq.question}
                        </span>
                        <ChevronDownIcon
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <QuestionMarkCircleIcon className="w-12 h-12 mr-4" />
              <h3 className="text-2xl font-bold">
                Still Need Help?
              </h3>
            </div>

            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you succeed with XeroGap AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="/docs"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
