'use client';

import { ShieldCheckIcon, ScaleIcon, DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DpdpHero() {
  return (
    <div className="relative isolate bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
          <defs>
            <pattern id="dpdp-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#dpdp-pattern)" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            DPDP Act Compliance Solutions
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl mb-8">
            Achieve DPDP Compliance
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
              {" "}Before 2025
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl leading-8 text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Complete DPDP Act assessment, implementation, and compliance management solutions.
            Avoid penalties up to ₹250 crores and protect your customers' digital rights.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ShieldCheckIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">DPDP Compliant</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ScaleIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">₹250Cr</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Max Penalty Avoided</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <DocumentTextIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">30</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days Assessment</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">2025</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Deadline</div>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Complete DPDP Compliance Solution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Gap Assessment</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">30-day comprehensive audit</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Implementation Roadmap</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Step-by-step compliance plan</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Policy Framework</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Complete documentation package</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white dark:text-white">Ongoing Compliance</div>
                    <div className="text-sm text-gray-300 dark:text-gray-400">Monitoring and audit support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#assessment"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Assessment
            </a>
            <a
              href="/demo"
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Book Compliance Demo
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Trusted by 150+ Indian businesses and organizations for DPDP compliance
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">150+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Companies Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">₹500Cr</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Penalties Avoided</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">98%</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Assessment Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
