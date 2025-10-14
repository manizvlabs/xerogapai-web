'use client';
import Link from 'next/link';

export default function WhatsAppCTA() {
  return (
    <section className="py-32 sm:py-40 bg-gradient-to-r from-green-600 via-green-600 to-emerald-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            Ready to Transform Your WhatsApp Customer Experience?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100 mb-12">
            Join 200+ businesses already using AI Multi-Channel Support Copilot to automate customer conversations,
            boost satisfaction, and drive revenue growth.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Implementation</h3>
              <p className="text-green-100">Go live in 1-2 weeks with our expert support</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven ROI</h3>
              <p className="text-green-100">Average 300% ROI in first 6 months</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
              <p className="text-green-100">GDPR compliant with bank-level security</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">200+</div>
                <div className="text-sm text-green-100">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1M+</div>
                <div className="text-sm text-green-100">Messages Handled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-green-100">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">2min</div>
                <div className="text-sm text-green-100">Average Response</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mb-8">
            <Link
              href="#pricing"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-green-600 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-green-200 transition-colors"
            >
              Book Personalized Demo <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <p className="text-sm text-green-100 mb-4">
              ✓ 14-day free trial • ✓ No setup fees • ✓ Cancel anytime • ✓ 24/7 support
            </p>
            <p className="text-xs text-green-200">
              By starting your trial, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
