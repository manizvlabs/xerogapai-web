'use client';
import Link from 'next/link';

export default function DpdpCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            Don't Wait Until 2025
            <span className="block">Achieve DPDP Compliance Today</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-orange-100 mb-12">
            Join 150+ Indian businesses that have achieved DPDP compliance and avoided penalties.
            Start your free assessment and get compliant before the 2025 deadline.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Avoid ₹250Cr Penalties</h3>
              <p className="text-orange-100">Maximum penalty per violation under DPDP Act</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Build Customer Trust</h3>
              <p className="text-orange-100">Demonstrate commitment to data protection and privacy</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-white mb-2">Competitive Advantage</h3>
              <p className="text-orange-100">Stand out as a privacy-first organization in your industry</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">150+</div>
                <div className="text-sm text-orange-100">Companies Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">₹500Cr</div>
                <div className="text-sm text-orange-100">Penalties Avoided</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-orange-100">Assessment Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">85%</div>
                <div className="text-sm text-orange-100">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mb-8">
            <Link
              href="#assessment"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-orange-600 shadow-sm hover:bg-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Start Free Assessment
            </Link>
            <Link
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-orange-200 transition-colors"
            >
              Book Compliance Demo <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <p className="text-sm text-orange-100 mb-4">
              ✓ 30-day free assessment • ✓ Expert DPDP guidance • ✓ 98% accuracy • ✓ Implementation support
            </p>
            <p className="text-xs text-orange-200">
              By starting your assessment, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
