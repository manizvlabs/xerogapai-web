'use client';

import { useState } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function DocsNavigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const navigationSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      items: [
        { title: 'Quick Start Guide', href: '/docs/quick-start', time: '5 min' },
        { title: 'Installation', href: '/docs/installation', time: '3 min' },
        { title: 'Authentication', href: '/docs/authentication', time: '4 min' },
        { title: 'First API Call', href: '/docs/first-api-call', time: '2 min' }
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: '🔌',
      items: [
        { title: 'REST API Overview', href: '/docs/api/overview', time: '8 min' },
        { title: 'Authentication Endpoints', href: '/docs/api/auth', time: '6 min' },
        { title: 'Workflow Endpoints', href: '/docs/api/workflows', time: '10 min' },
        { title: 'Analytics Endpoints', href: '/docs/api/analytics', time: '7 min' },
        { title: 'Error Handling', href: '/docs/api/errors', time: '5 min' },
        { title: 'Rate Limits', href: '/docs/api/rate-limits', time: '3 min' }
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: '🔗',
      items: [
        { title: 'Notion Integration', href: '/docs/integrations/notion', time: '12 min' },
        { title: 'CRM Connectors', href: '/docs/integrations/crm', time: '15 min' },
        { title: 'Email Platforms', href: '/docs/integrations/email', time: '8 min' },
        { title: 'Calendar Systems', href: '/docs/integrations/calendar', time: '6 min' },
        { title: 'Custom Webhooks', href: '/docs/integrations/webhooks', time: '10 min' }
      ]
    },
    {
      id: 'solutions',
      title: 'Solution Guides',
      icon: '💡',
      items: [
        { title: 'XeroGap AI Implementation', href: '/docs/solutions/xerogap-ai', time: '20 min' },
        { title: 'Sales Automation Setup', href: '/docs/solutions/sales-automation', time: '18 min' },
        { title: 'Contact Center QA', href: '/docs/solutions/contact-center', time: '16 min' },
        { title: 'DPDP Compliance', href: '/docs/solutions/dpdp', time: '25 min' },
        { title: 'Enterprise Copilots', href: '/docs/solutions/copilots', time: '22 min' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      icon: '⚡',
      items: [
        { title: 'Custom AI Models', href: '/docs/advanced/custom-models', time: '15 min' },
        { title: 'Performance Optimization', href: '/docs/advanced/optimization', time: '12 min' },
        { title: 'Security Best Practices', href: '/docs/advanced/security', time: '10 min' },
        { title: 'Troubleshooting', href: '/docs/advanced/troubleshooting', time: '8 min' },
        { title: 'Migration Guide', href: '/docs/advanced/migration', time: '14 min' }
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: '📚',
      items: [
        { title: 'SDK Downloads', href: '/docs/resources/sdks', time: '2 min' },
        { title: 'Code Samples', href: '/docs/resources/samples', time: '5 min' },
        { title: 'API Changelog', href: '/docs/resources/changelog', time: '3 min' },
        { title: 'Status Page', href: '/docs/resources/status', time: '1 min' },
        { title: 'Community Forum', href: '/docs/resources/community', time: '2 min' }
      ]
    }
  ];

  const filteredSections = navigationSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="py-8">
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSections.map((section) => (
              <div key={section.id} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Section Items */}
                {expandedSections.includes(section.id) && (
                  <div className="border-t border-gray-200 dark:border-gray-600">
                    {section.items.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {item.title}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {item.time}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Popular Topics */}
          <div className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
              Popular Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Quick Start Guide',
                'API Authentication',
                'Notion Integration',
                'Sales Automation',
                'Contact Center QA',
                'DPDP Compliance'
              ].map((topic, index) => (
                <a
                  key={index}
                  href="#"
                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors"
                >
                  {topic}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
