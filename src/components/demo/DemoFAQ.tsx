'use client';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function DemoFAQ() {
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
      question: "How long does the demo take?",
      answer: "The standard demo is 30 minutes long. We also offer a 15-minute express demo for busy executives, or a 60-minute deep-dive demo for technical teams who want to explore implementation details."
    },
    {
      question: "Do I need to prepare anything for the demo?",
      answer: "Not at all! We'll send you preparation materials including your personalized demo agenda. If you have specific use cases or challenges you'd like us to address, feel free to mention them when booking."
    },
    {
      question: "What if I can't make my scheduled demo time?",
      answer: "No problem! You can reschedule up to 24 hours before your demo at no cost. We'll work with your schedule to find a time that works best."
    },
    {
      question: "Will the demo show examples from my industry?",
      answer: "Absolutely! Our demos are customized based on your industry and company size. We'll show relevant examples and discuss how our solutions apply to your specific business challenges."
    },
    {
      question: "Is the demo recorded?",
      answer: "We can record the demo for your reference if you'd like. Just let us know during the pre-demo call, and we'll send you the recording along with any materials we discussed."
    },
    {
      question: "What happens after the demo?",
      answer: "Within 24 hours, you'll receive a detailed follow-up email with: (1) Recording of the demo (if requested), (2) Customized proposal, (3) ROI analysis, (4) Implementation timeline, and (5) Next steps."
    },
    {
      question: "Do you offer demos in different languages?",
      answer: "Yes! We offer demos in English, Arabic, French, and Portuguese to serve our MEA and global markets. Let us know your language preference when booking."
    },
    {
      question: "Can multiple people from my team attend?",
      answer: "Definitely! We encourage cross-functional teams to attend. The demo is valuable for decision-makers, technical teams, and end-users. There's no additional cost for multiple attendees."
    },
    {
      question: "What if I'm not technical?",
      answer: "No worries! Our demos are designed for all levels of technical expertise. We'll explain concepts clearly and focus on business outcomes rather than technical details."
    },
    {
      question: "Is there a cost for the demo?",
      answer: "No, the demo is completely free with no obligations. We want you to see the value of our solutions and make an informed decision about whether they're right for your business."
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Demo FAQ
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Common questions about our demo process and what to expect.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform ${
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
    </div>
  );
}
