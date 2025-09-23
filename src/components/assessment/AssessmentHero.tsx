'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

interface AssessmentHeroProps {
  onStart: () => void;
}

export default function AssessmentHero({ onStart }: AssessmentHeroProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Free AI Readiness Assessment
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Discover Your Business&apos;s
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              {" "}AI Readiness
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 dark:text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            Get a comprehensive AI readiness assessment worth $500 completely free.
            Discover your automation potential, identify quick wins, and get a custom implementation roadmap in just 10 minutes.
          </p>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Custom Roadmap
              </h3>
              <p className="text-gray-600 dark:text-white text-sm">
                AI strategy tailored to your business goals and current capabilities
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Detailed Report
              </h3>
              <p className="text-gray-600 dark:text-white text-sm">
                Comprehensive analysis with ROI projections and priority actions
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600 dark:text-white text-sm">
                Free consultation call with AI implementation specialists
              </p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mb-12 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              What You&apos;ll Get:
            </h3>
            <div className="space-y-4">
              {[
                "AI Readiness Score (0-100)",
                "Current Capability Assessment",
                "3-Month Implementation Roadmap",
                "Priority Action Items",
                "Potential ROI Projections",
                "Free Consultation Booking"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStart}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              Start Free Assessment
            </button>
            <span className="text-sm text-gray-500 dark:text-white">
              Takes only 10 minutes • No credit card required
            </span>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-white mb-4">
              Trusted by 500+ businesses worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-xs text-gray-500 dark:text-white">Assessments Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
                <div className="text-xs text-gray-500 dark:text-white">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">$2M+</div>
                <div className="text-xs text-gray-500 dark:text-white">Client Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
