'use client';
import Link from 'next/link';

import { RocketLaunchIcon, CodeBracketIcon, CloudIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function DocsQuickStart() {
  const quickStartSteps = [
    {
      step: 1,
      title: 'Create Your Account',
      description: 'Sign up for a XeroGap AI account and get your API keys',
      icon: RocketLaunchIcon,
      time: '2 minutes',
      code: `curl -X POST https://api.xerogap.ai/v1/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "your-email@example.com",
    "password": "your-password"
  }'`
    },
    {
      step: 2,
      title: 'Install SDK',
      description: 'Choose your preferred SDK and install it in your project',
      icon: CodeBracketIcon,
      time: '1 minute',
      code: `# For Node.js
npm install xerogap-ai

# For Python
pip install xerogap-ai

# For PHP
composer require xerogap/xerogap-ai`
    },
    {
      step: 3,
      title: 'Make Your First API Call',
      description: 'Send your first request to test the connection',
      icon: CloudIcon,
      time: '3 minutes',
      code: `import { XeroGapAI } from 'xerogap-ai';

const client = new XeroGapAI({
  apiKey: 'your-api-key-here'
});

const response = await client.workflows.list();
console.log(response);`
    },
    {
      step: 4,
      title: 'Build Your First Workflow',
      description: 'Create a simple automation workflow to get started',
      icon: CheckCircleIcon,
      time: '5 minutes',
      code: `const workflow = await client.workflows.create({
  name: 'My First Workflow',
  trigger: {
    type: 'notion_page_updated',
    database_id: 'your-database-id'
  },
  actions: [
    {
      type: 'send_email',
      to: 'team@example.com',
      subject: 'Page Updated',
      body: 'A Notion page has been updated!'
    }
  ]
});`
    }
  ];

  const gettingStartedGuides = [
    {
      title: 'Complete Developer Guide',
      description: 'Step-by-step guide for new developers',
      readTime: '15 min read',
      difficulty: 'Beginner',
      href: '/docs/getting-started'
    },
    {
      title: 'API Reference Overview',
      description: 'Complete API documentation and examples',
      readTime: '20 min read',
      difficulty: 'All Levels',
      href: '/docs/api/overview'
    },
    {
      title: 'Integration Tutorials',
      description: 'Connect XeroGap AI with your favorite tools',
      readTime: '25 min read',
      difficulty: 'Intermediate',
      href: '/docs/integrations'
    },
    {
      title: 'Best Practices',
      description: 'Learn how to build scalable AI applications',
      readTime: '12 min read',
      difficulty: 'Advanced',
      href: '/docs/best-practices'
    }
  ];

  return (
    <section id="quick-start" className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Get Started in 15 Minutes
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Follow our step-by-step guide to go from zero to building AI-powered applications
            with XeroGap AI. No prior experience required.
          </p>
        </div>

        {/* Quick Start Steps */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {quickStartSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="bg-indigo-600 text-white text-sm font-bold px-2 py-1 rounded mr-3">
                          Step {step.step}
                        </span>
                        <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                          {step.time}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-white mb-6">
                    {step.description}
                  </p>

                  <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Getting Started Guides */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Getting Started Guides
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Dive deeper with our detailed guides covering everything from basic concepts to advanced implementations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gettingStartedGuides.map((guide, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {guide.title}
                    </h4>
                    <p className="text-gray-600 dark:text-white text-sm mb-3">
                      {guide.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-white">
                      <span>{guide.readTime}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {guide.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={guide.href}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                >
                  Read Guide →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Developer Success Rates
            </h3>
            <p className="text-indigo-100 max-w-2xl mx-auto">
              See how quickly developers are building and deploying with XeroGap AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm text-indigo-100">First API Call Success</div>
              <div className="text-xs text-indigo-200 mt-1">Within 10 minutes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">15 min</div>
              <div className="text-sm text-indigo-100">Average Setup Time</div>
              <div className="text-xs text-indigo-200 mt-1">From signup to first workflow</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm text-indigo-100">Developer Satisfaction</div>
              <div className="text-xs text-indigo-200 mt-1">Based on feedback surveys</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-sm text-indigo-100">Support Availability</div>
              <div className="text-xs text-indigo-200 mt-1">Round-the-clock assistance</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-indigo-100 text-sm mb-6">
              Join thousands of developers building the future with XeroGap AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/quick-start"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Building Now
              </Link>
              <Link
                href="/docs/api/overview"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Explore API Reference
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
