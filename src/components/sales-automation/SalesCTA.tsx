'use client';

export default function SalesCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-8">
            Ready to 3x Your Sales
            <span className="block">With AI Automation?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100 mb-12">
            Join 300+ sales teams already using AI-powered automation to generate more leads,
            close more deals, and accelerate revenue growth.
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">3x More Leads</h3>
              <p className="text-green-100">AI-powered prospecting finds qualified leads 24/7</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">60% Faster Sales Cycle</h3>
              <p className="text-green-100">Automated nurturing and follow-ups accelerate deal closure</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-2">$50K+ Extra Revenue</h3>
              <p className="text-green-100">Per sales rep annually from improved efficiency</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">300+</div>
                <div className="text-sm text-green-100">Sales Teams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">$50M+</div>
                <div className="text-sm text-green-100">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-green-100">Lead Quality Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">85%</div>
                <div className="text-sm text-green-100">Higher Conversion</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mb-8">
            <a
              href="#pricing"
              className="rounded-md bg-white px-8 py-4 text-lg font-semibold text-green-600 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="/demo"
              className="text-lg font-semibold leading-6 text-white hover:text-green-200 transition-colors"
            >
              Book Sales Demo <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="text-center">
            <p className="text-sm text-green-100 mb-4">
              ✓ 14-day free trial • ✓ No credit card • ✓ Full automation access • ✓ Expert setup assistance
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
