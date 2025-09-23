'use client';
import Link from 'next/link';

import { BuildingOfficeIcon, ShieldCheckIcon, GlobeAltIcon, CpuChipIcon } from '@heroicons/react/24/outline';

export default function EnterpriseHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-slate-700 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <svg>
            <defs>
              <pattern id="enterprise-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#enterprise-pattern)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800 dark:bg-slate-700 text-slate-200 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
            Enterprise Knowledge Copilots
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-8">
            Multi-Lingual Q&A Over Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
              {" "}Company Documents
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-slate-300 mb-12 max-w-3xl mx-auto">
            Transform your enterprise knowledge into an intelligent Q&A system.
            Employees and customers get instant, accurate answers from your documents in 20+ languages.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-slate-400">Enterprise Clients</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <ShieldCheckIcon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-slate-400">Compliance Rate</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <GlobeAltIcon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">20+</div>
              <div className="text-sm text-slate-400">Languages Supported</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
              <CpuChipIcon className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-slate-400">Query Accuracy</div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Why Enterprise Copilots?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-indigo-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Instant Knowledge Access</div>
                    <div className="text-sm text-slate-300">Answers in seconds, not hours</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-indigo-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Multi-Language Support</div>
                    <div className="text-sm text-slate-300">Serve global teams in their language</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-indigo-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Enterprise Security</div>
                    <div className="text-sm text-slate-300">GDPR compliant with full audit trails</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-indigo-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Always Up-to-Date</div>
                    <div className="text-sm text-slate-300">Real-time sync with your knowledge base</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#pricing"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Enterprise Trial
            </Link>
            <Link
              href="/demo"
              className="bg-slate-700 hover:bg-slate-600 text-white border-2 border-slate-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-600 transition-colors"
            >
              Book Enterprise Demo
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-slate-700">
            <p className="text-sm text-slate-400 mb-6">
              Trusted by Fortune 500 companies and government agencies worldwide
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-70">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">ISO 27001</div>
                <div className="text-xs text-slate-400">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">SOC 2</div>
                <div className="text-xs text-slate-400">Type II</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">GDPR</div>
                <div className="text-xs text-slate-400">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
