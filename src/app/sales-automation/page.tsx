'use client';
import Link from 'next/link';

import SalesHero from '@/components/sales-automation/SalesHero';
import SalesIntelligence from '@/components/sales-automation/SalesIntelligence';
import SalesLeadGen from '@/components/sales-automation/SalesLeadGen';
import SalesAutomation from '@/components/sales-automation/SalesAutomation';
import SalesPricing from '@/components/sales-automation/SalesPricing';
import SalesTestimonials from '@/components/sales-automation/SalesTestimonials';
import SalesProcess from '@/components/sales-automation/SalesProcess';
import SalesSpecs from '@/components/sales-automation/SalesSpecs';
import SalesCTA from '@/components/sales-automation/SalesCTA';

export default function SalesAutomationPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SalesHero />
      <SalesIntelligence />
      <SalesLeadGen />
      <SalesAutomation />
      <SalesPricing />
      <SalesTestimonials />
      <SalesProcess />
      <SalesSpecs />
      <SalesCTA />

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
