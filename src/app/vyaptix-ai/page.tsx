'use client';
import Link from 'next/link';

import VyaptIXHero from '@/components/vyaptix-ai/VyaptIXHero';
import VyaptIXFeatures from '@/components/vyaptix-ai/VyaptIXFeatures';
import VyaptIXPricing from '@/components/vyaptix-ai/VyaptIXPricing';
import VyaptIXCTA from '@/components/vyaptix-ai/VyaptIXCTA';

export default function VyaptIXAIPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <VyaptIXHero />
      <VyaptIXFeatures />
      <VyaptIXPricing />
      <VyaptIXCTA />

      {/* Back to Home Link */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
