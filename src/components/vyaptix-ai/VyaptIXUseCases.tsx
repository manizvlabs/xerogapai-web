'use client';
import Link from 'next/link';

import { BuildingOfficeIcon, UserGroupIcon, AcademicCapIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

export default function VyaptIXUseCases() {
  const useCases = [
    {
      icon: BuildingOfficeIcon,
      name: 'Startups & Agencies',
      description: 'Streamline client work, automate reporting, and scale operations efficiently.',
      scenarios: [
        {
          title: 'Client Project Tracking',
          problem: 'Manual status updates and client reporting',
          solution: 'Auto-generate weekly progress reports from Notion databases',
          benefit: 'Save 15 hours/week on client communications'
        },
        {
          title: 'Lead Management',
          problem: 'Scattered lead information across tools',
          solution: 'Sync HubSpot leads with Notion project boards',
          benefit: '50% faster lead qualification process'
        },
        {
          title: 'Invoice Automation',
          problem: 'Manual invoice creation and follow-ups',
          solution: 'Generate invoices from project time tracking',
          benefit: '90% reduction in late payments'
        }
      ],
      metrics: {
        users: '45%',
        savings: '25hrs/week',
        efficiency: '+150%'
      }
    },
    {
      icon: UserGroupIcon,
      name: 'Consulting Firms',
      description: 'Automate client deliverables, knowledge management, and team coordination.',
      scenarios: [
        {
          title: 'Knowledge Base Updates',
          problem: 'Outdated client documentation',
          solution: 'Auto-sync project insights to client knowledge bases',
          benefit: 'Always up-to-date client information'
        },
        {
          title: 'Meeting Preparation',
          problem: 'Manual research for client meetings',
          solution: 'Generate meeting briefs from project history',
          benefit: '60% faster meeting preparation'
        },
        {
          title: 'Proposal Generation',
          problem: 'Time-consuming proposal creation',
          solution: 'Auto-generate proposals from project templates',
          benefit: '75% faster proposal turnaround'
        }
      ],
      metrics: {
        users: '35%',
        savings: '20hrs/week',
        efficiency: '+120%'
      }
    },
    {
      icon: AcademicCapIcon,
      name: 'Educational Institutions',
      description: 'Streamline administrative tasks, student management, and reporting.',
      scenarios: [
        {
          title: 'Student Progress Tracking',
          problem: 'Manual grade and attendance reporting',
          solution: 'Auto-generate progress reports for parents',
          benefit: '80% reduction in administrative work'
        },
        {
          title: 'Curriculum Management',
          problem: 'Outdated course materials',
          solution: 'Sync learning resources across platforms',
          benefit: 'Real-time curriculum updates'
        },
        {
          title: 'Event Management',
          problem: 'Manual event coordination',
          solution: 'Auto-schedule and track educational events',
          benefit: '50% faster event organization'
        }
      ],
      metrics: {
        users: '20%',
        savings: '30hrs/week',
        efficiency: '+200%'
      }
    }
  ];

  const commonWorkflows = [
    {
      title: 'Weekly Report Generation',
      description: 'Automatically compile project updates, metrics, and insights into comprehensive weekly reports.',
      tools: ['Notion', 'Google Sheets', 'Slack'],
      timeSaved: '5 hours/week'
    },
    {
      title: 'Lead to Project Conversion',
      description: 'Transform qualified leads into structured project workspaces with automated setup.',
      tools: ['HubSpot', 'Notion', 'Asana'],
      timeSaved: '3 hours/project'
    },
    {
      title: 'Meeting Summary & Action Items',
      description: 'Generate meeting summaries, extract action items, and assign tasks automatically.',
      tools: ['Zoom', 'Notion', 'Asana'],
      timeSaved: '2 hours/meeting'
    },
    {
      title: 'Invoice & Payment Tracking',
      description: 'Monitor invoice status, payment deadlines, and follow up automatically.',
      tools: ['QuickBooks', 'Notion', 'Stripe'],
      timeSaved: '4 hours/week'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Perfect for Growing Businesses
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Tailored automation solutions for startups, agencies, consulting firms, and educational institutions.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {useCase.name}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-white mb-6">
                  {useCase.description}
                </p>

                {/* Scenarios */}
                <div className="space-y-4 mb-6">
                  {useCase.scenarios.map((scenario, scenarioIndex) => (
                    <div key={scenarioIndex} className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {scenario.title}
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="text-red-600 dark:text-red-400">
                          Problem: {scenario.problem}
                        </div>
                        <div className="text-green-600 dark:text-green-400">
                          Solution: {scenario.solution}
                        </div>
                        <div className="text-green-600 dark:text-green-400 font-medium">
                          Result: {scenario.benefit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                    Typical Results:
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-bold text-purple-600">{useCase.metrics.users}</div>
                      <div className="text-purple-700 dark:text-purple-400">of users</div>
                    </div>
                    <div>
                      <div className="font-bold text-purple-600">{useCase.metrics.savings}</div>
                      <div className="text-purple-700 dark:text-purple-400">saved</div>
                    </div>
                    <div>
                      <div className="font-bold text-purple-600">{useCase.metrics.efficiency}</div>
                      <div className="text-purple-700 dark:text-purple-400">more efficient</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Common Workflows */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Automation Workflows
            </h3>
            <p className="text-gray-600 dark:text-white max-w-2xl mx-auto">
              Pre-built automation templates that you can customize for your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonWorkflows.map((workflow, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {workflow.title}
                  </h4>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-sm font-medium">
                    {workflow.timeSaved}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-white mb-4">
                  {workflow.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {workflow.tools.map((tool, toolIndex) => (
                    <span key={toolIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Automate Your Workflows?
            </h3>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Start with our free trial and see how VyaptIX AI can transform your team's productivity in just 30 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#pricing"
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Book Workflow Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
