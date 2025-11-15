'use client';
import Link from 'next/link';

import { TrophyIcon, ArrowTrendingUpIcon, UsersIcon, StarIcon } from '@heroicons/react/24/outline';

export default function CaseHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg>
            <defs>
              <pattern id="case-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#case-pattern)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Customer Success Stories
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8">
            Real Results from
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
              {" "}Real Customers
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-slate-300 mb-12 max-w-3xl mx-auto">
            Discover how businesses across industries are transforming their operations with VyaptIX AI solutions.
            From startups to enterprises, see the measurable impact of AI-powered automation.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <TrophyIcon className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">200+</div>
              <div className="text-sm text-gray-600 dark:text-white">Success Stories</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">$50M+</div>
              <div className="text-sm text-gray-600 dark:text-white">Revenue Generated</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <UsersIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">1,000+</div>
              <div className="text-sm text-gray-600 dark:text-white">Companies Served</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <StarIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4.9/5</div>
              <div className="text-sm text-gray-600 dark:text-white">Customer Rating</div>
            </div>
          </div>

          {/* Industry Representation */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Success Across Industries
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'Technology', 'Healthcare', 'Finance', 'Manufacturing',
                'Retail', 'Consulting', 'Education', 'Real Estate'
              ].map((industry, index) => (
                <div key={index} className="flex items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-white text-center">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#featured"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Featured Stories
            </Link>
            <Link
              href="#all-studies"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Browse All Case Studies
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-white mb-6">
              Trusted by companies from startups to Fortune 500 enterprises worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
                <div className="text-xs text-gray-500 dark:text-white">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">300%</div>
                <div className="text-xs text-gray-500 dark:text-white">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">6 months</div>
                <div className="text-xs text-gray-500 dark:text-white">Payback Period</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
