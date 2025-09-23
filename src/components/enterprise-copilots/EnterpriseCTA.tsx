'use client';
import Link from 'next/link';

export default function EnterpriseCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            Ready to Transform Your Enterprise
            <span className="block">Knowledge Management?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100 mb-12">
            Join 500+ enterprise organizations already using XeroGap AI Enterprise Copilots to empower their global workforce.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Workforce</h3>
              <p className="text-indigo-100">Support employees in 20+ languages with instant, accurate answers</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
              <p className="text-indigo-100">Bank-level security with SOC 2, ISO 27001, and GDPR compliance</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant ROI</h3>
              <p className="text-indigo-100">Reduce support costs by 75% and improve productivity by 200%</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-indigo-100">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">2M+</div>
                <div className="text-sm text-indigo-100">Daily Queries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-indigo-100">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-indigo-100">User Satisfaction</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mb-8">
            <Link
              href="#pricing"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Start Enterprise Trial
            </Link>
            <Link
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-indigo-200 transition-colors"
            >
              Book Enterprise Demo <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <p className="text-sm text-indigo-100 mb-4">
              ✓ 30-day enterprise trial • ✓ Full security audit • ✓ Dedicated support • ✓ Custom implementation
            </p>
            <p className="text-xs text-green-200">
              By starting your enterprise trial, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
