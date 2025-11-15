'use client';
import Link from 'next/link';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function WhatsAppFAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      question: "How quickly can I get started with WhatsApp automation?",
      answer: "Most customers go live within 1-2 weeks. The process includes API connection (1-2 days), AI training (3-5 days), testing (2-3 days), and launch. We provide dedicated support throughout the entire process."
    },
    {
      question: "Do I need technical expertise to set this up?",
      answer: "Not at all! Our implementation team handles all technical setup, API connections, and AI training. You just need to provide access to your WhatsApp Business account and your business knowledge/preferences."
    },
    {
      question: "What languages does the AI support?",
      answer: "We support 20+ languages including English, Arabic (with RTL support and local dialects), French, Portuguese, Spanish, and many more. The AI automatically detects and responds in the customer's preferred language."
    },
    {
      question: "Is my data secure and compliant?",
      answer: "Absolutely. We use end-to-end encryption, are GDPR and DPDP compliant, and have ISO 27001 certification. All data is stored in secure, compliant data centers with regular security audits and penetration testing."
    },
    {
      question: "Can I customize the AI responses for my brand?",
      answer: "Yes! The AI learns your brand voice, tone, and specific terminology. You can provide training data, set response guidelines, and even create custom responses for specific scenarios or customer types."
    },
    {
      question: "What happens if the AI can't handle a customer query?",
      answer: "The AI automatically escalates complex queries to your human agents with full context preservation. You can set up custom escalation rules based on keywords, sentiment, or complexity. Agents receive all conversation history."
    },
    {
      question: "How much does it cost to get started?",
      answer: "We offer three plans: Starter ($500/month for up to 1K conversations), Professional ($1,200/month for up to 5K conversations), and Enterprise (custom pricing for unlimited conversations). All plans include a 14-day free trial."
    },
    {
      question: "Can I integrate with my existing CRM or other tools?",
      answer: "Yes! We integrate with major CRMs like HubSpot, Zoho, Salesforce, and many others. We also support custom API integrations and no-code tools like Zapier for connecting with your existing systems."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide 24/7 technical support, dedicated implementation managers, regular performance reviews, and ongoing optimization. Enterprise customers get priority support and a dedicated account manager."
    },
    {
      question: "Can I try it before committing?",
      answer: "Definitely! All plans include a 14-day free trial with full access to all features. No credit card required. We'll help you set up a test environment and provide sample data to demonstrate the capabilities."
    },
    {
      question: "How do you handle different business hours across regions?",
      answer: "The AI automatically detects customer timezones and business hours. You can set different operating hours for different regions, and the AI will respond appropriately - either handling queries or providing appropriate out-of-hours messages."
    },
    {
      question: "What if I exceed my conversation limit?",
      answer: "We'll notify you when you approach your monthly limit. Additional conversations are billed at $0.10 each. You can upgrade your plan anytime, or we can help you optimize your AI to reduce the number of escalations."
    }
  ];

  return (
    <section className="py-32 sm:py-40 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Everything you need to know about AI Multi-Channel Support Copilot
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-white leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-white mb-6">
              Our experts are here to help. Book a consultation or contact our sales team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/consultation"
                className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
              >
                Book Consultation
              </Link>
              <Link
                href="mailto:sales@vyaptix.com"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
