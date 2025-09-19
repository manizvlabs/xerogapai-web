'use client';
import Link from 'next/link';

export default function XeroGapCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            Ready to Automate Your
            <span className="block">Workflow Intelligence?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-100 mb-12">
            Join 150+ teams already using XeroGap AI to transform their Notion workspaces into intelligent business hubs.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast Setup</h3>
              <p className="text-purple-100">Go from zero to automated in under 45 minutes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
              <p className="text-purple-100">GDPR compliant with bank-level encryption</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven ROI</h3>
              <p className="text-purple-100">Average 300% ROI in first 6 months</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-purple-100">Teams Automated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-purple-100">Integrations Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-purple-100">Business Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99.5%</div>
                <div className="text-sm text-purple-100">Automation Accuracy</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mb-8">
            <Link
              href="#pricing"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-purple-200 transition-colors"
            >
              Book Personalized Demo <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <p className="text-sm text-purple-100 mb-4">
              ✓ 14-day free trial • ✓ No credit card • ✓ Enterprise security • ✓ 24/7 support
            </p>
            <p className="text-xs text-purple-200">
              By starting your trial, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
