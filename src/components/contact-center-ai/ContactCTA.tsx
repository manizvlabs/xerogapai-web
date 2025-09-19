'use client';
import Link from 'next/link';

export default function ContactCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            Ready to Elevate Your Contact Center
            <span className="block">Performance?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100 mb-12">
            Join 200+ contact centers already using AI-powered QA to deliver exceptional customer experiences
            and improve agent performance by 40%.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">95% QA Accuracy</h3>
              <p className="text-blue-100">AI-powered scoring eliminates human bias and ensures consistency</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">40% Performance Boost</h3>
              <p className="text-blue-100">Real-time coaching and personalized training improve agent effectiveness</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-2">$25K+ Annual Savings</h3>
              <p className="text-blue-100">Per QA analyst through automated evaluation and reduced manual review time</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">200+</div>
                <div className="text-sm text-blue-100">Contact Centers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10M+</div>
                <div className="text-sm text-blue-100">Calls Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-blue-100">QA Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">40%</div>
                <div className="text-sm text-blue-100">Performance Improvement</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mb-8">
            <Link
              href="#pricing"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-blue-200 transition-colors"
            >
              Book QA Demo <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <p className="text-sm text-blue-100 mb-4">
              ✓ 14-day free trial • ✓ No credit card • ✓ Full QA automation • ✓ Enterprise support
            </p>
            <p className="text-xs text-blue-200">
              By starting your trial, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
