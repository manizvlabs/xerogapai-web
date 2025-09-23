'use client';
import Link from 'next/link';

import { CloudArrowDownIcon, BookOpenIcon, CodeBracketIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function DocsResources() {
  const sdks = [
    {
      language: 'JavaScript/TypeScript',
      version: 'v2.1.0',
      size: '2.3 MB',
      downloads: '45K+',
      features: ['Full API coverage', 'TypeScript support', 'Promise-based', 'Browser & Node.js'],
      installCommand: 'npm install xerogap-ai'
    },
    {
      language: 'Python',
      version: 'v2.0.8',
      size: '1.8 MB',
      downloads: '32K+',
      features: ['Async/await support', 'Auto-retry logic', 'Type hints', 'Python 3.7+'],
      installCommand: 'pip install xerogap-ai'
    },
    {
      language: 'PHP',
      version: 'v1.9.5',
      size: '1.5 MB',
      downloads: '18K+',
      features: ['Composer package', 'PSR-4 autoloading', 'Laravel integration', 'PHP 7.4+'],
      installCommand: 'composer require xerogap/xerogap-ai'
    },
    {
      language: 'Java',
      version: 'v2.0.3',
      size: '3.2 MB',
      downloads: '15K+',
      features: ['Maven/Gradle support', 'Reactive programming', 'Spring Boot integration', 'Java 11+'],
      installCommand: '// Add to pom.xml or build.gradle'
    },
    {
      language: 'Go',
      version: 'v1.8.2',
      size: '2.1 MB',
      downloads: '12K+',
      features: ['Go modules support', 'Context-aware requests', 'Structured logging', 'Go 1.16+'],
      installCommand: 'go get github.com/xerogap/xerogap-ai-go'
    },
    {
      language: 'Ruby',
      version: 'v1.7.9',
      size: '1.9 MB',
      downloads: '8K+',
      features: ['RubyGems package', 'Rails integration', 'Thread-safe', 'Ruby 2.7+'],
      installCommand: 'gem install xerogap-ai'
    }
  ];

  const resources = [
    {
      icon: BookOpenIcon,
      title: 'API Reference',
      description: 'Complete API documentation with examples and interactive testing',
      type: 'Documentation',
      href: '/docs/api',
      featured: true
    },
    {
      icon: CodeBracketIcon,
      title: 'Code Samples',
      description: 'Ready-to-use code examples for common use cases and integrations',
      type: 'Code Examples',
      href: '/docs/samples',
      featured: true
    },
    {
      icon: CloudArrowDownIcon,
      title: 'Postman Collection',
      description: 'Import our API endpoints into Postman for easy testing and development',
      type: 'API Testing',
      href: '/docs/postman',
      featured: false
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Community Forum',
      description: 'Connect with other developers, share solutions, and get help from the community',
      type: 'Community',
      href: '/community',
      featured: false
    }
  ];

  const changelog = [
    {
      version: 'v2.1.0',
      date: '2024-01-15',
      type: 'Major Release',
      changes: [
        'Added new workflow triggers for calendar events',
        'Improved error handling and retry logic',
        'Enhanced analytics dashboard with real-time metrics',
        'Added support for custom webhook authentication'
      ]
    },
    {
      version: 'v2.0.8',
      date: '2024-01-08',
      type: 'Minor Release',
      changes: [
        'Fixed memory leak in long-running workflows',
        'Added support for bulk operations',
        'Improved logging and debugging capabilities',
        'Updated dependencies for security patches'
      ]
    },
    {
      version: 'v2.0.3',
      date: '2024-01-01',
      type: 'Patch Release',
      changes: [
        'Fixed authentication token refresh issue',
        'Improved rate limiting accuracy',
        'Added missing error codes to API responses',
        'Updated documentation links'
      ]
    }
  ];

  const statusMetrics = [
    { label: 'API Uptime', value: '99.9%', status: 'operational' },
    { label: 'Response Time', value: '< 200ms', status: 'good' },
    { label: 'Error Rate', value: '< 0.1%', status: 'good' },
    { label: 'Active Connections', value: '50K+', status: 'operational' }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Developer Resources
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Everything you need to build, test, and deploy with XeroGap AI.
            From SDKs to community support, we've got you covered.
          </p>
        </div>

        {/* SDK Downloads */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Official SDKs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sdks.map((sdk, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {sdk.language}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {sdk.version}
                  </span>
                </div>

                <div className="mb-4">
                  <code className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-gray-800 dark:text-gray-200 font-mono">
                    {sdk.installCommand}
                  </code>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Size:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{sdk.size}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Downloads:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{sdk.downloads}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
                    Features:
                  </h5>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    {sdk.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                  Download SDK
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div key={index} className={`bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ${resource.featured ? 'ring-2 ring-indigo-500' : ''}`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {resource.title}
                    </h3>
                    <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      {resource.type}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {resource.description}
                </p>

                <Link
                  href={resource.href}
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold"
                >
                  Access Resource →
                </Link>
              </div>
            );
          })}
        </div>

        {/* API Status & Changelog */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* API Status */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              API Status
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {statusMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold mb-1 ${
                    metric.status === 'operational' ? 'text-green-600' :
                    metric.status === 'good' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                All systems operational
              </span>
            </div>
          </div>

          {/* Recent Changelog */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Updates
            </h3>

            <div className="space-y-4">
              {changelog.slice(0, 3).map((entry, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {entry.version}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      entry.type === 'Major Release' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      entry.type === 'Minor Release' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {entry.type}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {entry.date}
                  </p>

                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Link
              href="/docs/changelog"
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm mt-4"
            >
              View Full Changelog →
            </Link>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Stay Updated
          </h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Get the latest updates on new features, API changes, and developer resources
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:border-transparent"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          <p className="text-xs text-indigo-200 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
}
