'use client';
import Link from 'next/link';

export default function CaseCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-green-600 via-green-600 to-emerald-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            Ready to Create Your Own
            <span className="block">Success Story?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100 mb-12">
            Join 1,000+ companies that have transformed their operations with VyaptIX AI solutions.
            Start your journey towards automation excellence today.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-2">Quick Implementation</h3>
              <p className="text-green-100">Most clients see results within 30 days of implementation</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Measurable ROI</h3>
              <p className="text-green-100">Average 300% return on investment within 6 months</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">Proven Results</h3>
              <p className="text-green-100">200+ success stories across industries and company sizes</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1,000+</div>
                <div className="text-sm text-green-100">Successful Implementations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$50M+</div>
                <div className="text-sm text-green-100">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">300%</div>
                <div className="text-sm text-green-100">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
                <div className="text-sm text-green-100">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mb-8">
            <Link
              href="/demo"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-green-600 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/assessment"
              className="text-lg font-semibold leading-6 text-white hover:text-green-200 transition-colors"
            >
              Get Free Assessment <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <p className="text-sm text-green-100 mb-4">
              ✓ 30-day free trial • ✓ Expert implementation support • ✓ 100% success guarantee • ✓ Ongoing optimization
            </p>
            <p className="text-xs text-green-200">
              By getting started, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
