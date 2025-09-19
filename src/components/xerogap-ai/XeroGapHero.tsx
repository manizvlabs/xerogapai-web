'use client';
import Link from 'next/link';

import { ClockIcon, ChartBarIcon, PuzzlePieceIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function XeroGapHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg>
            <defs>
              <pattern id="xerogap-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#xerogap-pattern)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Notion-Powered AI Workflow Automation
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-8">
            Transform Your Notion Workspace Into an
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
              {" "}Intelligent Business Hub
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Connect Notion with 50+ business tools. Automate reports, sync data, generate insights,
            and let AI handle your repetitive tasks so you can focus on what matters.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ClockIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">20+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hours Saved Weekly</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ChartBarIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">90%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reduction in Reporting Time</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <PuzzlePieceIcon className="h-8 w-8 text-indigo-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Business Tool Integrations</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <SparklesIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">AI-Powered</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Intelligent Automation</div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What XeroGap AI Can Do For You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Auto-Generate Reports</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Weekly summaries from your workspace data</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Sync Multiple Tools</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Connect CRM, project tools, and databases</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Smart Notifications</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Get alerts for important updates and deadlines</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">AI-Powered Insights</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Generate actionable insights from your data</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Book Demo
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Trusted by 150+ teams across startups, agencies, and enterprises
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">150+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Active Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Integrations Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">99.5%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Automation Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
