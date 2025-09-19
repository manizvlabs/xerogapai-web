'use client';
import Link from 'next/link';

import { PlayIcon, ChatBubbleLeftRightIcon, ClockIcon, ArrowTrendingUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function WhatsAppHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <defs>
            <pattern id="hero-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
              <path d="M0 0L200 200M200 0L0 200" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#hero-pattern)" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            #1 WhatsApp Automation Solution
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-8">
            Transform Every WhatsApp
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
              {" "}Conversation
            </span>
            <br />
            Into Revenue
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Intelligent AI agents that handle customer queries 24/7, escalate complex issues,
            and provide actionable insights to scale your business globally.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ClockIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2-minute</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Response Time</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ArrowTrendingUpIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Customer Satisfaction Increase</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">3x</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Deal Closure Rate</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <PlayIcon className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Automated Support</div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Why Businesses Choose WhatsApp CX Copilot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Scale Customer Service</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Handle 10x more conversations without adding staff</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Boost Revenue</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Turn conversations into sales opportunities</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Data-Driven Insights</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI analytics for better business decisions</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Multi-Language Support</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Serve global customers in their language</div>
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
              Trusted by 200+ businesses across MEA, Europe, and Asia
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">200+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Active Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1M+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Messages Handled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
