'use client';

import { UserGroupIcon, LightBulbIcon, ChartBarIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

interface ConsultationHeroProps {
  onStartBooking: () => void;
}

export default function ConsultationHero({ onStartBooking }: ConsultationHeroProps) {
  return (
    <div className="relative isolate bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-emerald-700 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg>
            <defs>
              <pattern id="consultation-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#consultation-pattern)" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-800/30 text-emerald-200 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
            Free AI Consultation
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get Expert AI
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
              {" "}Guidance
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Book a free 30-minute consultation with our AI specialists.
            Get personalized recommendations, implementation strategies, and answers to all your AI questions.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-emerald-800/20 p-4 rounded-xl shadow-sm border border-emerald-700/30">
              <UserGroupIcon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-sm font-medium text-white mb-1">Expert Team</div>
              <div className="text-xs text-slate-300">AI specialists</div>
            </div>

            <div className="bg-emerald-800/20 p-4 rounded-xl shadow-sm border border-emerald-700/30">
              <LightBulbIcon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-sm font-medium text-white mb-1">Custom Strategy</div>
              <div className="text-xs text-slate-300">Tailored to you</div>
            </div>

            <div className="bg-emerald-800/20 p-4 rounded-xl shadow-sm border border-emerald-700/30">
              <ChartBarIcon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-sm font-medium text-white mb-1">ROI Analysis</div>
              <div className="text-xs text-slate-300">Data-driven</div>
            </div>

            <div className="bg-emerald-800/20 p-4 rounded-xl shadow-sm border border-emerald-700/30">
              <CheckBadgeIcon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <div className="text-sm font-medium text-white mb-1">No Obligation</div>
              <div className="text-xs text-slate-300">Free consultation</div>
            </div>
          </div>

          {/* What You'll Get */}
          <div className="bg-emerald-800/20 p-8 rounded-2xl shadow-lg border border-emerald-700/30 mb-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              What You'll Get in Your Consultation:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-800/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-emerald-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">AI Readiness Assessment</div>
                    <div className="text-sm text-slate-300">Evaluate your current capabilities</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-800/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-emerald-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">Custom Implementation Plan</div>
                    <div className="text-sm text-slate-300">Step-by-step roadmap</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-800/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-emerald-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">ROI Projections</div>
                    <div className="text-sm text-slate-300">Expected cost savings and benefits</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-800/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-emerald-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">Technology Recommendations</div>
                    <div className="text-sm text-slate-300">Best tools for your needs</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-800/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-emerald-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">Risk Assessment</div>
                    <div className="text-sm text-slate-300">Identify potential challenges</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-emerald-800/30 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-emerald-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-white">Q&A Session</div>
                    <div className="text-sm text-slate-300">Ask anything about AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartBooking}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Free Consultation
            </button>
            <span className="text-sm text-slate-300">
              30 minutes • Expert guidance • No cost
            </span>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-emerald-700/30">
            <p className="text-sm text-slate-300 mb-4">
              Join 300+ businesses who've benefited from our expert consultations
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">300+</div>
                <div className="text-xs text-slate-300">Consultations Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">95%</div>
                <div className="text-xs text-slate-300">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$500K+</div>
                <div className="text-xs text-slate-300">Client Savings Identified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
