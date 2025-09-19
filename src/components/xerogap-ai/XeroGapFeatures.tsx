'use client';

import { CpuChipIcon, DocumentTextIcon, BellIcon, ArrowPathIcon, EyeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

export default function XeroGapFeatures() {
  const features = [
    {
      icon: DocumentTextIcon,
      title: 'AI-Powered Report Generation',
      description: 'Automatically generate comprehensive reports from your Notion workspace data, meeting transcripts, and project updates.',
      capabilities: [
        'Weekly progress reports',
        'Meeting summaries with action items',
        'Performance analytics dashboards',
        'Custom report templates'
      ],
      benefit: 'Save 20+ hours per week on reporting'
    },
    {
      icon: BellIcon,
      title: 'Intelligent Notifications',
      description: 'Smart alerts for important updates, deadlines, and opportunities across all your connected tools.',
      capabilities: [
        'Priority-based notifications',
        'Context-aware alerts',
        'Custom notification rules',
        'Multi-channel delivery'
      ],
      benefit: 'Never miss critical updates'
    },
    {
      icon: ArrowPathIcon,
      title: 'Seamless Data Sync',
      description: 'Real-time synchronization between Notion and 50+ business tools, ensuring data consistency across platforms.',
      capabilities: [
        'Bi-directional data sync',
        'Conflict resolution',
        'Custom field mapping',
        'Scheduled syncs'
      ],
      benefit: 'Single source of truth for all data'
    },
    {
      icon: EyeIcon,
      title: 'AI-Driven Insights',
      description: 'Generate actionable insights from your workspace data using advanced AI analysis and pattern recognition.',
      capabilities: [
        'Trend analysis and forecasting',
        'Performance optimization recommendations',
        'Risk identification',
        'Opportunity discovery'
      ],
      benefit: 'Make data-driven decisions faster'
    },
    {
      icon: CpuChipIcon,
      title: 'Automated Task Management',
      description: 'AI learns your workflows and automatically creates, assigns, and tracks tasks across your project management tools.',
      capabilities: [
        'Smart task creation',
        'Automated task assignment',
        'Deadline prediction',
        'Progress tracking'
      ],
      benefit: '90% reduction in manual task management'
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Custom Automation Builder',
      description: 'Build complex multi-step automations with our visual workflow builder, no coding required.',
      capabilities: [
        'Drag-and-drop workflow builder',
        'Conditional logic and branching',
        'Custom triggers and actions',
        'Template library'
      ],
      benefit: 'Create custom automations in minutes'
    }
  ];

  const aiCapabilities = [
    {
      category: 'Natural Language Processing',
      items: [
        'Meeting transcript analysis',
        'Sentiment analysis',
        'Content summarization',
        'Action item extraction'
      ]
    },
    {
      category: 'Machine Learning',
      items: [
        'Pattern recognition',
        'Predictive analytics',
        'Anomaly detection',
        'Trend forecasting'
      ]
    },
    {
      category: 'Workflow Intelligence',
      items: [
        'Process optimization',
        'Bottleneck identification',
        'Resource allocation',
        'Performance prediction'
      ]
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Advanced AI Features for Modern Teams
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Powerful automation capabilities powered by cutting-edge AI technology, designed to transform how your team works.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {feature.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Capabilities:
                  </h4>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capabilityIndex) => (
                      <li key={capabilityIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    {feature.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Capabilities */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              AI Technology Stack
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powered by advanced AI models and machine learning algorithms for intelligent automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  {capability.category}
                </h4>
                <ul className="space-y-2">
                  {capability.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              XeroGap AI vs Traditional Automation
            </h3>
            <p className="text-purple-100 max-w-2xl mx-auto">
              See why AI-powered automation delivers superior results compared to traditional workflow tools
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-purple-400">
                  <th className="text-left py-4 px-4 font-semibold">Capability</th>
                  <th className="text-center py-4 px-4 font-semibold">XeroGap AI</th>
                  <th className="text-center py-4 px-4 font-semibold text-purple-200">Traditional Tools</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-400">
                <tr>
                  <td className="py-4 px-4 font-medium">Learning & Adaptation</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">AI-Powered</span>
                  </td>
                  <td className="py-4 px-4 text-center text-purple-200">Rule-Based</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Natural Language Processing</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Advanced</span>
                  </td>
                  <td className="py-4 px-4 text-center text-purple-200">Basic Keywords</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Context Awareness</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Full Context</span>
                  </td>
                  <td className="py-4 px-4 text-center text-purple-200">Limited Context</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Predictive Capabilities</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Intelligent</span>
                  </td>
                  <td className="py-4 px-4 text-center text-purple-200">Reactive Only</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Setup Time</td>
                  <td className="py-4 px-4 text-center">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Minutes</span>
                  </td>
                  <td className="py-4 px-4 text-center text-purple-200">Days/Weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
