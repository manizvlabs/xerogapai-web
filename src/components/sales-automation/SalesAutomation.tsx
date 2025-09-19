'use client';
import Link from 'next/link';

import { EnvelopeIcon, PhoneIcon, CalendarIcon, DocumentTextIcon, CogIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function SalesAutomation() {
  const automationFeatures = [
    {
      icon: EnvelopeIcon,
      title: 'Automated Email Sequences',
      description: 'AI-crafted personalized email campaigns that nurture leads and move them through your sales funnel.',
      automation: [
        'Personalized content generation',
        'Send time optimization',
        'Open rate and click tracking',
        'Automated follow-ups'
      ],
      impact: '300% higher email engagement'
    },
    {
      icon: PhoneIcon,
      title: 'Smart Call Scheduling',
      description: 'Automatically schedule and confirm calls based on prospect availability and optimal timing.',
      automation: [
        'Calendar integration',
        'Time zone detection',
        'Automated reminders',
        'Meeting optimization'
      ],
      impact: '50% higher meeting attendance'
    },
    {
      icon: CalendarIcon,
      title: 'Follow-up Automation',
      description: 'Never miss a follow-up with AI-driven reminders and automated next-step suggestions.',
      automation: [
        'Intelligent reminders',
        'Next action suggestions',
        'Deal stage tracking',
        'Progress notifications'
      ],
      impact: 'Zero missed follow-ups'
    },
    {
      icon: DocumentTextIcon,
      title: 'Proposal Generation',
      description: 'Automatically create personalized proposals based on prospect data and deal requirements.',
      automation: [
        'Dynamic content insertion',
        'Pricing optimization',
        'Terms customization',
        'Approval workflows'
      ],
      impact: '75% faster proposal delivery'
    },
    {
      icon: CogIcon,
      title: 'Workflow Orchestration',
      description: 'Connect your entire sales stack with intelligent workflows that trigger based on prospect behavior.',
      automation: [
        'Multi-tool integration',
        'Conditional triggers',
        'Data synchronization',
        'Error handling'
      ],
      impact: '80% reduction in manual tasks'
    },
    {
      icon: ArrowPathIcon,
      title: 'CRM Synchronization',
      description: 'Keep all your sales data synchronized across CRM, email, calendar, and communication tools.',
      automation: [
        'Real-time data sync',
        'Conflict resolution',
        'Field mapping',
        'Audit trails'
      ],
      impact: '100% data accuracy'
    }
  ];

  const crmIntegrations = [
    'Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive', 'ActiveCampaign',
    'Microsoft Dynamics', 'SugarCRM', 'Freshsales', 'Insightly', 'Capsule'
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            End-to-End Sales Automation
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Automate every step of your sales process from lead generation to deal closure,
            freeing your team to focus on building relationships.
          </p>
        </div>

        {/* Automation Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {automationFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-green-600" />
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
                    Automation Features:
                  </h4>
                  <ul className="space-y-2">
                    {feature.automation.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    Impact: {feature.impact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CRM Integration Showcase */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Seamless CRM Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with all major CRM platforms for unified sales automation and data synchronization
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {crmIntegrations.map((crm, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {crm}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Workflow Visualization */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Complete Sales Automation Workflow
            </h3>
            <p className="text-green-100 max-w-2xl mx-auto">
              See how our AI orchestrates your entire sales process from prospect to customer
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-6 gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold text-sm mb-1">Lead Discovery</div>
                  <div className="text-xs text-green-100">AI finds prospects</div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-green-400 text-xl">→</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">📧</div>
                  <div className="font-semibold text-sm mb-1">Initial Outreach</div>
                  <div className="text-xs text-green-100">Personalized emails</div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-green-400 text-xl">→</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">📞</div>
                  <div className="font-semibold text-sm mb-1">Meeting Booking</div>
                  <div className="text-xs text-green-100">Smart scheduling</div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-green-400 text-xl">→</div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl mb-2">🤝</div>
                  <div className="font-semibold text-sm mb-1">Deal Closure</div>
                  <div className="text-xs text-green-100">Automated nurturing</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-green-100 text-sm mb-6">
              Every step is automated, tracked, and optimized by AI for maximum conversion
            </p>
            <Link
              href="/demo"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See Automation in Action
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
