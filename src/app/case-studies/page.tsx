'use client';
import Link from 'next/link';

import CaseHero from '@/components/case-studies/CaseHero';
import CaseFilters from '@/components/case-studies/CaseFilters';
import CaseGrid from '@/components/case-studies/CaseGrid';
import CaseFeatured from '@/components/case-studies/CaseFeatured';
import CaseMetrics from '@/components/case-studies/CaseMetrics';
import CaseCTA from '@/components/case-studies/CaseCTA';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <CaseHero />
      <CaseFilters />
      <CaseFeatured />
      <CaseGrid />
      <CaseMetrics />
      <CaseCTA />

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
