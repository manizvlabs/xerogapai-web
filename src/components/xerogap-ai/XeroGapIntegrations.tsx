'use client';
import Link from 'next/link';

import { ArrowPathIcon, CloudIcon, CircleStackIcon } from '@heroicons/react/24/outline';

export default function XeroGapIntegrations() {
  const integrations = [
    // Productivity & Collaboration
    {
      category: 'Productivity & Collaboration',
      icon: CloudIcon,
      tools: [
        { name: 'Notion', logo: '📝', description: 'Core workspace integration' },
        { name: 'Google Workspace', logo: '📧', description: 'Docs, Sheets, Calendar sync' },
        { name: 'Microsoft Teams', logo: '💬', description: 'Team communication' },
        { name: 'Slack', logo: '💬', description: 'Channel notifications' },
        { name: 'Zoom', logo: '📹', description: 'Meeting transcripts' },
        { name: 'Miro', logo: '🎨', description: 'Visual collaboration' }
      ]
    },
    // CRM & Sales
    {
      category: 'CRM & Sales',
      icon: CircleStackIcon,
      tools: [
        { name: 'HubSpot', logo: '🎯', description: 'Lead management & tracking' },
        { name: 'Zoho CRM', logo: '📊', description: 'Sales pipeline automation' },
        { name: 'Pipedrive', logo: '📈', description: 'Deal tracking & forecasting' },
        { name: 'Salesforce', logo: '☁️', description: 'Enterprise CRM integration' },
        { name: 'ActiveCampaign', logo: '📧', description: 'Marketing automation' },
        { name: 'Mailchimp', logo: '📧', description: 'Email campaign sync' }
      ]
    },
    // Project Management
    {
      category: 'Project Management',
      icon: ArrowPathIcon,
      tools: [
        { name: 'Asana', logo: '📋', description: 'Task & project tracking' },
        { name: 'Trello', logo: '📋', description: 'Kanban board integration' },
        { name: 'Monday.com', logo: '📊', description: 'Work management' },
        { name: 'Jira', logo: '🎫', description: 'Issue & sprint tracking' },
        { name: 'ClickUp', logo: '✅', description: 'All-in-one workspace' },
        { name: 'Basecamp', logo: '🏕️', description: 'Project collaboration' }
      ]
    },
    // Finance & Operations
    {
      category: 'Finance & Operations',
      icon: CircleStackIcon,
      tools: [
        { name: 'QuickBooks', logo: '💰', description: 'Accounting & invoicing' },
        { name: 'Xero', logo: '💰', description: 'Business accounting' },
        { name: 'Stripe', logo: '💳', description: 'Payment processing' },
        { name: 'PayPal', logo: '💰', description: 'Transaction tracking' },
        { name: 'Zapier', logo: '🔗', description: 'Workflow automation' },
        { name: 'Make.com', logo: '🔗', description: 'Advanced integrations' }
      ]
    }
  ];

  const popularIntegrations = [
    'Notion', 'Google Workspace', 'Slack', 'HubSpot', 'Asana', 'QuickBooks',
    'Microsoft Teams', 'Zoom', 'Mailchimp', 'Zapier', 'Monday.com', 'Xero'
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Connect Your Entire Tech Stack
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            50+ integrations to create a unified workflow ecosystem. Your data flows seamlessly between all your favorite tools.
          </p>
        </div>

        {/* Integration Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {integrations.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-2xl mr-3">{tool.logo}</div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                          {tool.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {tool.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Popular Integrations Badge */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Most Popular Integrations
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join thousands of teams already connecting these essential tools
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {popularIntegrations.map((integration, index) => (
              <div key={index} className="flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                {integration}
              </div>
            ))}
          </div>
        </div>

        {/* Integration Showcase */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            See Integrations in Action
          </h3>
          <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
            Watch how XeroGap AI connects your tools and automates your workflows with live examples from real businesses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold mb-1">Data Sync</div>
              <div className="text-sm text-purple-100">Real-time data flow between tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold mb-1">Smart Automation</div>
              <div className="text-sm text-purple-100">AI-driven workflow triggers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-semibold mb-1">Analytics Integration</div>
              <div className="text-sm text-purple-100">Unified reporting across platforms</div>
            </div>
          </div>

          <Link
            href="/demo"
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Watch Integration Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
