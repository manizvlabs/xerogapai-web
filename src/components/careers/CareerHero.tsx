'use client';
import Link from 'next/link';

import { RocketLaunchIcon, UsersIcon, LightBulbIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function CareerHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <defs>
            <pattern id="career-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#career-pattern)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Join Our Mission
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8">
            Shape the Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              {" "}AI Automation
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-slate-300 mb-12 max-w-3xl mx-auto">
            Join a team of passionate innovators building the next generation of AI-powered business solutions.
            We're looking for talented individuals who want to make a real impact.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <RocketLaunchIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
              <div className="text-sm text-gray-600 dark:text-white">Team Members</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <UsersIcon className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">15+</div>
              <div className="text-sm text-gray-600 dark:text-white">Nationalities</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <LightBulbIcon className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">25+</div>
              <div className="text-sm text-gray-600 dark:text-white">Open Positions</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <HeartIcon className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">95%</div>
              <div className="text-sm text-gray-600 dark:text-white">Employee Satisfaction</div>
            </div>
          </div>

          {/* Why Join Us */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Join VyaptIX AI?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Cutting-Edge Technology</div>
                    <div className="text-sm text-gray-300 dark:text-white">Work with the latest AI and automation technologies</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Global Impact</div>
                    <div className="text-sm text-gray-300 dark:text-white">Your work will help thousands of businesses worldwide</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Growth Opportunities</div>
                    <div className="text-sm text-gray-300 dark:text-white">Continuous learning and career development support</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Work-Life Balance</div>
                    <div className="text-sm text-gray-300 dark:text-white">Flexible work arrangements and comprehensive benefits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#openings"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Open Positions
            </Link>
            <Link
              href="#culture"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Our Culture
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-white mb-6">
              Recognized as a Great Place to Work and named one of India's Best Startups to Work For
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">#1</div>
                <div className="text-xs text-gray-500 dark:text-white">AI Startup 2024</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</div>
                <div className="text-xs text-gray-500 dark:text-white">Glassdoor Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-xs text-gray-500 dark:text-white">Awards Won</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
