'use client';
import Link from 'next/link';

import EnterpriseHero from '@/components/enterprise-copilots/EnterpriseHero';
import EnterpriseFeatures from '@/components/enterprise-copilots/EnterpriseFeatures';
import EnterprisePricing from '@/components/enterprise-copilots/EnterprisePricing';
import EnterpriseCTA from '@/components/enterprise-copilots/EnterpriseCTA';

export default function EnterpriseCopilotsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <EnterpriseHero />
      <EnterpriseFeatures />
      <EnterprisePricing />
      <EnterpriseCTA />

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
