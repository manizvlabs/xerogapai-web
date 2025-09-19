'use client';
import Link from 'next/link';

import { DocumentTextIcon, ChatBubbleLeftRightIcon, UserGroupIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function CareerApply() {
  const applicationProcess = [
    {
      step: 1,
      title: 'Submit Application',
      description: 'Send us your resume and tell us why you\'re interested in joining XeroGap AI',
      time: '5 minutes',
      icon: DocumentTextIcon
    },
    {
      step: 2,
      title: 'Initial Screening',
      description: 'Our recruitment team reviews your application and experience',
      time: '2-3 days',
      icon: CheckCircleIcon
    },
    {
      step: 3,
      title: 'Technical Interview',
      description: 'Discuss your experience and technical skills with our team',
      time: '45-60 minutes',
      icon: ChatBubbleLeftRightIcon
    },
    {
      step: 4,
      title: 'Team Interview',
      description: 'Meet with potential colleagues and discuss team fit',
      time: '45-60 minutes',
      icon: UserGroupIcon
    },
    {
      step: 5,
      title: 'Final Interview',
      description: 'Meet with leadership and discuss your role and growth',
      time: '45-60 minutes',
      icon: CheckCircleIcon
    },
    {
      step: 6,
      title: 'Offer & Onboarding',
      description: 'Receive your offer and begin your journey with us',
      time: '1-2 weeks',
      icon: CheckCircleIcon
    }
  ];

  const faqs = [
    {
      question: 'What should I include in my application?',
      answer: 'Include your resume, a cover letter explaining why you\'re interested in XeroGap AI, and any relevant portfolio work or GitHub repositories. Be specific about your experience and achievements.'
    },
    {
      question: 'Do you accept remote applications?',
      answer: 'Yes! We have a remote-first culture and accept applications from anywhere in India. Some roles may require occasional travel to our Bangalore office.'
    },
    {
      question: 'What is the typical interview process timeline?',
      answer: 'The entire process typically takes 2-4 weeks from application to offer. We aim to provide feedback within 1 week of each interview stage.'
    },
    {
      question: 'Do you sponsor work visas?',
      answer: 'For exceptional candidates, we consider sponsoring work visas. This is evaluated on a case-by-case basis depending on the role and your qualifications.'
    },
    {
      question: 'What benefits do you offer?',
      answer: 'We offer comprehensive benefits including health insurance, learning budgets, flexible work arrangements, stock options, and more. See our Benefits section for details.'
    },
    {
      question: 'Can I apply for multiple positions?',
      answer: 'Yes, you can apply for multiple positions that interest you. Please submit separate applications for each role.'
    }
  ];

  const contactMethods = [
    {
      method: 'Email Recruitment Team',
      contact: 'careers@xerogap.ai',
      description: 'General inquiries and application questions',
      response: '< 24 hours'
    },
    {
      method: 'LinkedIn',
      contact: 'XeroGap AI Company Page',
      description: 'Connect with our recruiters and team members',
      response: 'Within 2-3 days'
    },
    {
      method: 'Referral Program',
      contact: 'referral@xerogap.ai',
      description: 'Refer a friend and both get rewarded',
      response: 'Immediate confirmation'
    }
  ];

  return (
    <section id="apply" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Join Our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Ready to start your journey with XeroGap AI? Here&apos;s everything you need to know about our application process.
          </p>
        </div>

        {/* Application Process */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Hiring Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicationProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded mr-3">
                          Step {step.step}
                        </span>
                        <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                          {step.time}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about working at XeroGap AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                {method.method}
              </h4>

              <div className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                {method.contact}
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {method.description}
              </p>

              <div className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Response time: {method.response}
              </div>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
            </div>
          ))}
        </div>

        {/* Application Tips */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Application Tips
            </h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              Increase your chances of getting noticed with these application best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📝</div>
              <div className="font-semibold text-sm mb-1">Tailor Your Resume</div>
              <div className="text-xs text-purple-100">Customize for each role you apply for</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-sm mb-1">Show Your Impact</div>
              <div className="text-xs text-purple-100">Quantify your achievements and contributions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-semibold text-sm mb-1">Research the Company</div>
              <div className="text-xs text-purple-100">Demonstrate knowledge of our mission and values</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">💬</div>
              <div className="font-semibold text-sm mb-1">Prepare for Interviews</div>
              <div className="text-xs text-purple-100">Practice common technical and behavioral questions</div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Apply?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Browse our open positions and take the first step towards joining our innovative team.
              We&apos;re excited to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#openings"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View Open Positions
              </Link>
              <Link
                href="/about"
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
