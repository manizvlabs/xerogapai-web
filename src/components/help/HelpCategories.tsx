'use client';
import Link from 'next/link';

import { useState } from 'react';
import {
  CogIcon,
  CloudIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  UserGroupIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function HelpCategories() {
  const [activeCategory, setActiveCategory] = useState('getting-started');

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: CogIcon,
      description: 'New to VyaptIX AI? Start here with setup guides and basics.',
      articles: 25,
      popular: [
        'Quick Start Guide',
        'Account Setup',
        'First API Call',
        'Basic Configuration'
      ]
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: CloudIcon,
      description: 'Connect VyaptIX AI with your favorite tools and platforms.',
      articles: 35,
      popular: [
        'Notion Integration',
        'CRM Connections',
        'Email Platforms',
        'Calendar Sync'
      ]
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: ShieldCheckIcon,
      description: 'Learn about our security measures and compliance standards.',
      articles: 18,
      popular: [
        'Data Protection',
        'GDPR Compliance',
        'DPDP Compliance',
        'Security Best Practices'
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Pricing',
      icon: CreditCardIcon,
      description: 'Manage your subscription, billing, and payment information.',
      articles: 12,
      popular: [
        'Subscription Plans',
        'Payment Methods',
        'Billing Cycle',
        'Plan Changes'
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: UserGroupIcon,
      description: 'Manage your account settings, users, and preferences.',
      articles: 15,
      popular: [
        'User Management',
        'Profile Settings',
        'Team Collaboration',
        'Account Security'
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: WrenchScrewdriverIcon,
      description: 'Solve common issues and get help with technical problems.',
      articles: 28,
      popular: [
        'API Errors',
        'Integration Issues',
        'Performance Problems',
        'Login Issues'
      ]
    },
    {
      id: 'api',
      title: 'API & Development',
      icon: DocumentTextIcon,
      description: 'Technical documentation for developers and API users.',
      articles: 42,
      popular: [
        'API Reference',
        'Authentication',
        'Rate Limits',
        'Webhooks'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reporting',
      icon: ChartBarIcon,
      description: 'Understand your usage, performance, and generate reports.',
      articles: 16,
      popular: [
        'Usage Analytics',
        'Performance Metrics',
        'Custom Reports',
        'Dashboard Guide'
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.id === activeCategory) || categories[0];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Find exactly what you need with our organized knowledge base categories.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border transition-all ${
                  activeCategory === category.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xs font-medium text-center leading-tight">
                  {category.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Category Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                  <currentCategory.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {currentCategory.title}
                  </h3>
                  <p className="text-gray-600 dark:text-white mt-1">
                    {currentCategory.description}
                  </p>
                </div>
              </div>

              {/* Popular Articles */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Popular Articles ({currentCategory.articles})
                </h4>
                <div className="space-y-3">
                  {currentCategory.popular.map((article, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-indigo-500 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                          <span className="text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {article}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-white">
                          5 min read
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* View All Link */}
              <Link
                href={`/help/category/${currentCategory.id}`}
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold"
              >
                View all {currentCategory.articles} articles →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
                Category Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-indigo-800 dark:text-indigo-200">Total Articles</span>
                  <span className="font-semibold text-indigo-900 dark:text-indigo-100">
                    {currentCategory.articles}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-800 dark:text-indigo-200">Last Updated</span>
                  <span className="font-semibold text-indigo-900 dark:text-indigo-100">
                    2 days ago
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-800 dark:text-indigo-200">Helpful Rate</span>
                  <span className="font-semibold text-indigo-900 dark:text-indigo-100">
                    94%
                  </span>
                </div>
              </div>
            </div>

            {/* Related Categories */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Related Categories
              </h4>
              <div className="space-y-2">
                {categories
                  .filter(cat => cat.id !== activeCategory)
                  .slice(0, 4)
                  .map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center">
                        <category.icon className="w-4 h-4 text-gray-600 dark:text-white mr-3" />
                        <span className="text-sm text-gray-700 dark:text-white">
                          {category.title}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
                Need More Help?
              </h4>
              <p className="text-indigo-800 dark:text-indigo-200 text-sm mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100 font-medium"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
