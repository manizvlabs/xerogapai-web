'use client';
import Link from 'next/link';

import { ServerIcon, LockClosedIcon, ArrowPathIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function DocsAPIs() {
  const apiEndpoints = [
    {
      category: 'Authentication',
      icon: LockClosedIcon,
      endpoints: [
        { method: 'POST', path: '/auth/login', description: 'Authenticate user and get access token' },
        { method: 'POST', path: '/auth/refresh', description: 'Refresh access token' },
        { method: 'POST', path: '/auth/logout', description: 'Invalidate access token' },
        { method: 'GET', path: '/auth/me', description: 'Get current user information' }
      ]
    },
    {
      category: 'Workflows',
      icon: ArrowPathIcon,
      endpoints: [
        { method: 'GET', path: '/workflows', description: 'List all workflows' },
        { method: 'POST', path: '/workflows', description: 'Create new workflow' },
        { method: 'GET', path: '/workflows/{id}', description: 'Get workflow details' },
        { method: 'PUT', path: '/workflows/{id}', description: 'Update workflow' },
        { method: 'DELETE', path: '/workflows/{id}', description: 'Delete workflow' }
      ]
    },
    {
      category: 'Integrations',
      icon: ServerIcon,
      endpoints: [
        { method: 'GET', path: '/integrations', description: 'List available integrations' },
        { method: 'POST', path: '/integrations', description: 'Create new integration' },
        { method: 'GET', path: '/integrations/{id}', description: 'Get integration details' },
        { method: 'PUT', path: '/integrations/{id}', description: 'Update integration' },
        { method: 'DELETE', path: '/integrations/{id}', description: 'Delete integration' }
      ]
    },
    {
      category: 'Analytics',
      icon: ShieldCheckIcon,
      endpoints: [
        { method: 'GET', path: '/analytics/overview', description: 'Get analytics overview' },
        { method: 'GET', path: '/analytics/workflows', description: 'Workflow performance metrics' },
        { method: 'GET', path: '/analytics/integrations', description: 'Integration usage statistics' },
        { method: 'GET', path: '/analytics/users', description: 'User activity analytics' }
      ]
    }
  ];

  const sdkSupport = [
    {
      language: 'JavaScript/TypeScript',
      logo: '🟨',
      features: ['Full API coverage', 'TypeScript definitions', 'Promise-based', 'Browser & Node.js support']
    },
    {
      language: 'Python',
      logo: '🐍',
      features: ['Async/await support', 'Auto-retry logic', 'Comprehensive error handling', 'Python 3.7+ compatible']
    },
    {
      language: 'PHP',
      logo: '🐘',
      features: ['Composer package', 'PSR-4 autoloading', 'Laravel integration', 'PHP 7.4+ compatible']
    },
    {
      language: 'Java',
      logo: '☕',
      features: ['Maven/Gradle support', 'Reactive programming', 'Spring Boot integration', 'Java 11+ compatible']
    },
    {
      language: 'Go',
      logo: '🔵',
      features: ['Go modules support', 'Context-aware requests', 'Comprehensive error handling', 'Go 1.16+ compatible']
    },
    {
      language: 'Ruby',
      logo: '💎',
      features: ['RubyGems package', 'Rails integration', 'Thread-safe implementation', 'Ruby 2.7+ compatible']
    }
  ];

  const apiFeatures = [
    {
      title: 'RESTful Design',
      description: 'Clean, consistent REST API following industry best practices',
      benefits: ['Predictable endpoints', 'Standard HTTP methods', 'JSON responses', 'Versioned API']
    },
    {
      title: 'Rate Limiting',
      description: 'Intelligent rate limiting with burst capacity and fair usage policies',
      benefits: ['1000 requests/minute', 'Burst capacity available', 'Usage analytics', 'Fair queuing']
    },
    {
      title: 'Webhook Support',
      description: 'Real-time notifications for workflow events and system updates',
      benefits: ['Instant notifications', 'Retry logic included', 'Event filtering', 'Security signatures']
    },
    {
      title: 'Version Control',
      description: 'API versioning with backward compatibility and deprecation notices',
      benefits: ['Version headers', 'Deprecation warnings', 'Migration guides', 'Long-term support']
    }
  ];

  return (
    <section id="api-reference" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Complete API Reference
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Everything you need to integrate XeroGap AI into your applications.
            Comprehensive documentation with examples and interactive testing.
          </p>
        </div>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {apiEndpoints.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.endpoints.map((endpoint, endpointIndex) => (
                    <div key={endpointIndex} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold mr-3 ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          endpoint.method === 'POST' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                          {endpoint.path}
                        </code>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-white">
                        {endpoint.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* SDK Support */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Official SDK Support
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Build faster with our official SDKs for all major programming languages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdkSupport.map((sdk, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{sdk.logo}</span>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {sdk.language}
                  </h4>
                </div>
                <ul className="space-y-2">
                  {sdk.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* API Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {apiFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-white mb-6">
                {feature.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Key Benefits:
                </h4>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-white">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive API Explorer */}
        <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Interactive API Explorer
          </h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Test our APIs directly in your browser with our interactive documentation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🔬</div>
              <div className="font-semibold text-sm mb-1">Live Testing</div>
              <div className="text-xs text-indigo-100">Test endpoints in real-time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold text-sm mb-1">Request Builder</div>
              <div className="text-xs text-indigo-100">Build requests visually</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-semibold text-sm mb-1">Response Viewer</div>
              <div className="text-xs text-indigo-100">Analyze API responses</div>
            </div>
          </div>

          <Link
            href="/docs/api/explorer"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Open API Explorer
          </Link>
        </div>
      </div>
    </section>
  );
}
