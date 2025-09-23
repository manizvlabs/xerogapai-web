'use client';
import Link from 'next/link';

import { MicrophoneIcon, ChartBarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <defs>
            <pattern id="contact-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#contact-pattern)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800/30 text-blue-200 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            AI-Powered Contact Center QA
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8">
            Transform Every
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              Customer Interaction
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-slate-300 mb-12 max-w-3xl mx-auto">
            AI-powered call scoring, real-time coaching, and quality assurance that helps your agents
            deliver exceptional customer experiences and improve performance by 40%.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <MicrophoneIcon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-slate-400">Call Quality Score</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <ChartBarIcon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">40%</div>
              <div className="text-sm text-slate-400">Performance Improvement</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <UserGroupIcon className="h-8 w-8 text-violet-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">60%</div>
              <div className="text-sm text-slate-400">Faster Agent Training</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <ClockIcon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">90%</div>
              <div className="text-sm text-slate-400">Reduction in QA Time</div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Complete Contact Center QA Solution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Automated Call Scoring</div>
                    <div className="text-sm text-slate-300">Real-time evaluation of every interaction</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">AI-Powered Coaching</div>
                    <div className="text-sm text-slate-300">Personalized feedback and improvement plans</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Quality Assurance</div>
                    <div className="text-sm text-slate-300">Consistent standards across all channels</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Performance Analytics</div>
                    <div className="text-sm text-slate-300">Deep insights into team and individual performance</div>
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
              Start Contact Center QA
            </Link>
            <Link
              href="/demo"
              className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-slate-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-600 transition-colors"
            >
              Book QA Demo
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-slate-700">
            <p className="text-sm text-slate-400 mb-6">
              Trusted by 200+ contact centers and customer service teams worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-70">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-xs text-slate-400">Contact Centers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10M+</div>
                <div className="text-xs text-slate-400">Calls Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-xs text-slate-400">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
