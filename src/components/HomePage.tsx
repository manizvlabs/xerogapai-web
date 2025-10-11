'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">

      {/* Hero Banner Section */}
      <section className="relative">
        {/* Hero Banner Image */}
        <div className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden">
          <img
            src="/homepage_banner1.png"
            alt="XeroGap AI - WhatsApp Automation Hero Banner"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-4xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 drop-shadow-lg">
                Never Lose Another Customer
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl mb-12 sm:mb-16 lg:mb-20 leading-relaxed drop-shadow-md">
                Your customers message you on WhatsApp at all hours.
                <br className="hidden sm:block" />
                <span className="block mt-2 sm:mt-4">
                  What if someone could respond instantly - even when you're sleeping?
                </span>
              </p>
              <Link
                href="/demo"
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Banner Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
            <img
              src="/homepage_banner2.png"
              alt="XeroGap AI - WhatsApp Automation Solutions"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="relative">
        {/* Massive empty space above */}
        <div className="h-32 sm:h-48 lg:h-64"></div>

        {/* Simple Process Explanation */}
        <section className="px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Empty space */}
            <div className="h-8 sm:h-12 lg:h-16"></div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 sm:mb-16 lg:mb-20">
              How It Works
            </h2>

            {/* Three simple steps with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl">💬</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white">
                  Customer messages you on WhatsApp
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl">🤖</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white">
                  AI responds instantly (24/7)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl">📱</span>
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-white">
                  You get notified only for important messages
                </p>
              </div>
            </div>

            {/* Empty space */}
            <div className="h-8 sm:h-12 lg:h-16"></div>

            {/* Simple note */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              No apps to install. No technical knowledge needed.
            </p>
          </div>
        </section>

        {/* Large empty space */}
        <div className="h-24 sm:h-32 lg:h-40"></div>

        {/* Single Success Story */}
        <section className="px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Empty space */}
            <div className="h-8 sm:h-12 lg:h-16"></div>

            <div className="max-w-2xl mx-auto">
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-white italic mb-6 sm:mb-8">
                "Customers now get instant responses even at 3 AM. My business never sleeps."
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                  R
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                    Rajesh Kumar
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    VP, More Supermarkets
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Large empty space */}
        <div className="h-32 sm:h-40 lg:h-48"></div>

        {/* Final CTA Section */}
        <section className="px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Empty space */}
            <div className="h-8 sm:h-12 lg:h-16"></div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 lg:mb-16">
              Ready to never miss another customer?
            </h2>

            <div className="space-y-6 sm:space-y-8">
              <Link
                href="/demo"
                className="inline-block bg-green-600 text-white px-8 py-4 sm:px-12 sm:py-6 rounded-lg font-semibold text-lg sm:text-xl hover:bg-green-700 transition-colors shadow-lg"
              >
                Start Free Trial
              </Link>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                No credit card required
              </p>
            </div>
          </div>
        </section>

        {/* Large empty space */}
        <div className="h-32 sm:h-40 lg:h-48"></div>
      </main>
    </div>
  );
}
