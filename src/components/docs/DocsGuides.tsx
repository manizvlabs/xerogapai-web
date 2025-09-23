'use client';
import Link from 'next/link';

import { LinkIcon, CogIcon, CloudIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

export default function DocsGuides() {
  const integrationGuides = [
    {
      title: 'Notion Integration Guide',
      description: 'Connect XeroGap AI with your Notion workspace for seamless automation',
      icon: '📝',
      difficulty: 'Beginner',
      readTime: '15 min',
      features: ['Database sync', 'Page automation', 'Template workflows', 'Real-time updates'],
      href: '/docs/integrations/notion'
    },
    {
      title: 'CRM Integration Setup',
      description: 'Integrate with Salesforce, HubSpot, Zoho CRM, and other CRM platforms',
      icon: '🎯',
      difficulty: 'Intermediate',
      readTime: '20 min',
      features: ['Contact sync', 'Lead automation', 'Deal tracking', 'Reporting integration'],
      href: '/docs/integrations/crm'
    },
    {
      title: 'Email Platform Integration',
      description: 'Connect with Gmail, Outlook, SendGrid, and other email services',
      icon: '📧',
      difficulty: 'Beginner',
      readTime: '12 min',
      features: ['Email automation', 'Contact import', 'Sequence management', 'Analytics sync'],
      href: '/docs/integrations/email'
    },
    {
      title: 'Calendar & Scheduling',
      description: 'Integrate with Google Calendar, Outlook Calendar, and Calendly',
      icon: '📅',
      difficulty: 'Beginner',
      readTime: '10 min',
      features: ['Meeting scheduling', 'Reminder automation', 'Availability sync', 'Time zone handling'],
      href: '/docs/integrations/calendar'
    },
    {
      title: 'Custom Webhook Integration',
      description: 'Build custom integrations using webhooks and REST APIs',
      icon: '🔗',
      difficulty: 'Advanced',
      readTime: '25 min',
      features: ['Custom endpoints', 'Event triggers', 'Data transformation', 'Error handling'],
      href: '/docs/integrations/webhooks'
    },
    {
      title: 'API Authentication Setup',
      description: 'Configure OAuth, API keys, and secure authentication methods',
      icon: '🔐',
      difficulty: 'Intermediate',
      readTime: '18 min',
      features: ['OAuth setup', 'API key management', 'Token refresh', 'Security best practices'],
      href: '/docs/integrations/auth'
    }
  ];

  const solutionGuides = [
    {
      title: 'XeroGap AI Implementation',
      description: 'Complete guide to implementing workflow automation with XeroGap AI',
      category: 'Workflow Automation',
      steps: ['Setup workspace', 'Configure integrations', 'Build workflows', 'Monitor performance'],
      href: '/docs/solutions/xerogap-ai'
    },
    {
      title: 'Sales Automation Blueprint',
      description: 'End-to-end sales automation setup for modern sales teams',
      category: 'Sales Automation',
      steps: ['CRM integration', 'Lead scoring setup', 'Email sequences', 'Analytics dashboard'],
      href: '/docs/solutions/sales-automation'
    },
    {
      title: 'Contact Center QA Framework',
      description: 'Implement AI-powered quality assurance for contact centers',
      category: 'Contact Center',
      steps: ['Call recording setup', 'Scoring model configuration', 'Agent coaching', 'Performance monitoring'],
      href: '/docs/solutions/contact-center'
    },
    {
      title: 'DPDP Compliance Roadmap',
      description: 'Complete guide to achieving DPDP Act compliance',
      category: 'Compliance',
      steps: ['Gap assessment', 'Policy development', 'Technical implementation', 'Ongoing monitoring'],
      href: '/docs/solutions/dpdp'
    }
  ];

  const tutorialCategories = [
    {
      icon: LinkIcon,
      title: 'Integration Tutorials',
      description: 'Step-by-step guides for connecting XeroGap AI with your tools',
      tutorials: 25,
      difficulty: 'Beginner to Advanced',
      href: '/docs/tutorials/integrations'
    },
    {
      icon: CogIcon,
      title: 'Workflow Tutorials',
      description: 'Learn to build powerful automation workflows',
      tutorials: 18,
      difficulty: 'Intermediate',
      href: '/docs/tutorials/workflows'
    },
    {
      icon: CloudIcon,
      title: 'API Tutorials',
      description: 'Master the XeroGap AI API with practical examples',
      tutorials: 32,
      difficulty: 'All Levels',
      href: '/docs/tutorials/api'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile & Web Tutorials',
      description: 'Build mobile apps and web applications with XeroGap AI',
      tutorials: 15,
      difficulty: 'Intermediate',
      href: '/docs/tutorials/mobile-web'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Integration Guides & Tutorials
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Comprehensive guides to help you integrate XeroGap AI with your existing tools
            and build powerful automation solutions.
          </p>
        </div>

        {/* Integration Guides */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Popular Integration Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrationGuides.map((guide, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{guide.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {guide.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-white">
                          {guide.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white text-sm mb-4">
                  {guide.description}
                </p>

                <div className="mb-4">
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
                    Features covered:
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {guide.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={guide.href}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm"
                >
                  Read Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Guides */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Solution Implementation Guides
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              End-to-end guides for implementing complete XeroGap AI solutions in your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionGuides.map((guide, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {guide.title}
                    </h4>
                    <p className="text-gray-600 dark:text-white text-sm mb-3">
                      {guide.description}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      {guide.category}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
                    Implementation Steps:
                  </h5>
                  <ol className="text-xs text-gray-600 dark:text-white space-y-1">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center">
                        <span className="w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <Link
                  href={guide.href}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm"
                >
                  Start Implementation →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorial Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {tutorialCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <IconComponent className="w-8 h-8 text-indigo-600 mr-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h4>
                </div>

                <p className="text-gray-600 dark:text-white text-sm mb-4">
                  {category.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-white">Tutorials:</span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {category.tutorials}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-white">Difficulty:</span>
                    <span className="text-gray-900 dark:text-white">
                      {category.difficulty}
                    </span>
                  </div>
                </div>

                <Link
                  href={category.href}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm"
                >
                  Browse Tutorials →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Video Tutorials */}
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Video Tutorials & Webinars
          </h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Learn from our expert-led video tutorials and live webinars
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🎥</div>
              <div className="font-semibold text-sm mb-1">Video Tutorials</div>
              <div className="text-xs text-indigo-100">Step-by-step visual guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📡</div>
              <div className="font-semibold text-sm mb-1">Live Webinars</div>
              <div className="text-xs text-indigo-100">Interactive Q&A sessions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">💬</div>
              <div className="font-semibold text-sm mb-1">Office Hours</div>
              <div className="text-xs text-indigo-100">Direct developer support</div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/docs/videos"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Watch Tutorials
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
