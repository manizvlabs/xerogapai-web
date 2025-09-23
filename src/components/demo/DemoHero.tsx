'use client';

import { PlayIcon, CalendarIcon, UsersIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface DemoHeroProps {
  onStartBooking: () => void;
}

export default function DemoHero({ onStartBooking }: DemoHeroProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Live Product Demo
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            See XeroGap AI in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              {" "}Action
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience a personalized demonstration of our WhatsApp automation and AI workflow solutions.
            See real results in just 30 minutes.
          </p>

          {/* Demo Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <PlayIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Live Demo</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">30 minutes</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <CalendarIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Your Schedule</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Pick your time</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <UsersIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Expert Led</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">AI specialists</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <ArrowTrendingUpIcon className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">ROI Focus</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Real results</div>
            </div>
          </div>

          {/* Value Props */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              What You'll See in Your Demo:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl mb-3">📱</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">WhatsApp Automation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">See how AI handles customer conversations 24/7</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-3">🤖</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Workflow Intelligence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Watch AI automate complex business processes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-3">📊</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Real-Time Analytics</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">View live dashboards and performance metrics</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartBooking}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule Your Free Demo
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              No commitment • 30 minutes • 100% free
            </span>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Join 200+ businesses who've seen XeroGap AI in action
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">200+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Demos Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Book to Demo Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Demo to Trial Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
