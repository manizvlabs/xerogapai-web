'use client';

import { UserGroupIcon, LightBulbIcon, ChartBarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

interface ConsultationHeroProps {
  onStartBooking: () => void;
}

export default function ConsultationHero({ onStartBooking }: ConsultationHeroProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Free AI Consultation
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Get Expert AI
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-600">
              {" "}Guidance
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Book a free 30-minute consultation with our AI specialists.
            Get personalized recommendations, implementation strategies, and answers to all your AI questions.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <UserGroupIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Expert Team</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">AI specialists</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <LightBulbIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Custom Strategy</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Tailored to you</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">ROI Analysis</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Data-driven</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <CheckBadgeIcon className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">No Obligation</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Free consultation</div>
            </div>
          </div>

          {/* What You'll Get */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              What You'll Get in Your Consultation:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">AI Readiness Assessment</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Evaluate your current capabilities</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Custom Implementation Plan</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Step-by-step roadmap</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">ROI Projections</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Expected cost savings and benefits</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Technology Recommendations</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Best tools for your needs</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Risk Assessment</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Identify potential challenges</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Q&A Session</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Ask anything about AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartBooking}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Free Consultation
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              30 minutes • Expert guidance • No cost
            </span>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Join 300+ businesses who've benefited from our expert consultations
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">300+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Consultations Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">$500K+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Client Savings Identified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
