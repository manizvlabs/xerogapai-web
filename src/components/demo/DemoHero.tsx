'use client';

import Link from 'next/link';

interface DemoHeroProps {
  onStartBooking: () => void;
}

export default function DemoHero({ onStartBooking }: DemoHeroProps) {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 bg-white dark:bg-gray-900">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
        style={{
          backgroundImage: 'url(/logo-pattern.png)',
          backgroundSize: '800px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          zIndex: -2
        }}
        aria-hidden="true"
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-600/20 to-emerald-400/20 dark:from-green-600/10 dark:to-emerald-400/10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
        />
      </div>

      {/* Logo Watermark Background */}
      <div className="absolute inset-0 -z-5 opacity-[0.08] dark:opacity-[0.12]" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <img src="/logo-hero.png" alt="" className="w-80 h-auto" />
        </div>
        <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <img src="/logo-hero.png" alt="" className="w-80 h-auto" />
        </div>
        <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
          <img src="/logo-hero.png" alt="" className="w-64 h-auto" />
        </div>
      </div>

        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Live Product Demo
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            See VyaptIX AI in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              {" "}Action
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-white">
            Experience a personalized demonstration of our WhatsApp automation and AI workflow solutions.
            See real results in just 30 minutes.
          </p>

          {/* Quick Implementation CTA Section */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              onClick={onStartBooking}
              className="flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
            >
              Schedule Your Free Demo
            </button>
            <Link
              href="/assessment"
              className="flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-600 border border-green-200 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
            >
              Take AI Assessment
            </Link>
            <Link
              href="/consultation"
              className="flex items-center justify-center rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors"
            >
              Book Consultation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
    </div>
  );
}
