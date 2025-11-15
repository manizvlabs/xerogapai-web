'use client';
import Link from 'next/link';

import { useState } from 'react';
import { MagnifyingGlassIcon, CommandLineIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function HelpSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const popularSearches = [
    'How to create a workflow',
    'API authentication',
    'Notion integration setup',
    'Sales automation',
    'Contact center QA',
    'DPDP compliance'
  ];

  const quickActions = [
    {
      title: 'Get Started Guide',
      description: 'Complete beginner\'s guide to VyaptIX AI',
      icon: '🚀',
      href: '/docs/quick-start'
    },
    {
      title: 'API Documentation',
      description: 'Complete API reference and examples',
      icon: '📚',
      href: '/docs/api'
    },
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: '💬',
      href: '#contact'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: '👥',
      href: '/community'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real implementation, this would search through the knowledge base
    // For now, we'll show some mock results
    if (query.length > 2) {
      setSearchResults([
        {
          title: 'How to set up API authentication',
          category: 'API',
          snippet: 'Learn how to authenticate your API requests with VyaptIX AI...',
          href: '/docs/api/authentication'
        },
        {
          title: 'Creating your first workflow',
          category: 'Getting Started',
          snippet: 'Step-by-step guide to building your first automation workflow...',
          href: '/docs/getting-started/first-workflow'
        },
        {
          title: 'Notion integration troubleshooting',
          category: 'Integrations',
          snippet: 'Common issues and solutions for Notion integration...',
          href: '/docs/integrations/notion/troubleshooting'
        }
      ]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <section id="search" className="py-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg"
            />
            <div className="absolute right-4 top-4 flex items-center space-x-1">
              <CommandLineIcon className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">K</span>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Search Results ({searchResults.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {searchResults.map((result: any, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                          {result.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-white mb-2">
                          {result.snippet}
                        </p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                          {result.category}
                        </span>
                      </div>
                      <ArrowRightIcon className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Popular Searches */}
        {searchQuery.length === 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Popular Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-indigo-500 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-500 transition-all group"
              >
                <div className="text-3xl mb-4">{action.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-white mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>Get Started</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Keyboard Shortcuts
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono mb-1">
                  Ctrl+K
                </div>
                <div className="text-gray-600 dark:text-white">Focus search</div>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono mb-1">
                  ↓/↑
                </div>
                <div className="text-gray-600 dark:text-white">Navigate results</div>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono mb-1">
                  Enter
                </div>
                <div className="text-gray-600 dark:text-white">Open result</div>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono mb-1">
                  Esc
                </div>
                <div className="text-gray-600 dark:text-white">Close search</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
