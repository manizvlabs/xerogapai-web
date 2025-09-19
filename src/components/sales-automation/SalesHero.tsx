'use client';
import Link from 'next/link';

import { ArrowTrendingUpIcon, UserGroupIcon, CursorArrowRaysIcon, BoltIcon } from '@heroicons/react/24/outline';

export default function SalesHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg>
            <defs>
              <pattern id="sales-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#sales-pattern)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            AI-Powered Sales Intelligence
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-8">
            Turn Prospects Into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
              {" "}Revenue
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            AI-driven sales automation that finds, qualifies, and converts leads automatically.
            Boost your sales pipeline by 3x with intelligent prospecting and personalized outreach.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">More Qualified Leads</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <UserGroupIcon className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Higher Conversion Rate</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <CursorArrowRaysIcon className="h-8 w-8 text-teal-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">60%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Faster Sales Cycle</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <BoltIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Automated Prospecting</div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Complete Sales Automation Suite
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Intelligent Lead Generation</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">AI finds and qualifies prospects automatically</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Personalized Outreach</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Tailored messaging based on prospect data</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Sales Intelligence</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Real-time insights on prospects and deals</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">CRM Integration</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Seamlessly sync with your existing sales tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Sales Automation
            </Link>
            <Link
              href="/demo"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Book Sales Demo
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Trusted by 300+ sales teams and growing businesses worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">300+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Sales Teams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">$50M+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Lead Quality Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
