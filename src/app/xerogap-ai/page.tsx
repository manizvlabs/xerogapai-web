'use client';
import Link from 'next/link';

import XeroGapHero from '@/components/xerogap-ai/XeroGapHero';
import XeroGapIntegrations from '@/components/xerogap-ai/XeroGapIntegrations';
import XeroGapUseCases from '@/components/xerogap-ai/XeroGapUseCases';
import XeroGapFeatures from '@/components/xerogap-ai/XeroGapFeatures';
import XeroGapPricing from '@/components/xerogap-ai/XeroGapPricing';
import XeroGapTestimonials from '@/components/xerogap-ai/XeroGapTestimonials';
import XeroGapProcess from '@/components/xerogap-ai/XeroGapProcess';
import XeroGapSpecs from '@/components/xerogap-ai/XeroGapSpecs';
import XeroGapCTA from '@/components/xerogap-ai/XeroGapCTA';

export default function XeroGapAIPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <XeroGapHero />
      <XeroGapIntegrations />
      <XeroGapUseCases />
      <XeroGapFeatures />
      <XeroGapPricing />
      <XeroGapTestimonials />
      <XeroGapProcess />
      <XeroGapSpecs />
      <XeroGapCTA />

      {/* Back to Home Link */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
