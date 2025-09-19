'use client';

import Link from 'next/link';
import CareerHero from '@/components/careers/CareerHero';
import CareerCulture from '@/components/careers/CareerCulture';
import CareerOpenings from '@/components/careers/CareerOpenings';
import CareerBenefits from '@/components/careers/CareerBenefits';
import CareerLife from '@/components/careers/CareerLife';
import CareerApply from '@/components/careers/CareerApply';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <CareerHero />
      <CareerCulture />
      <CareerOpenings />
      <CareerBenefits />
      <CareerLife />
      <CareerApply />

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
