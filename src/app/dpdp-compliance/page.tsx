'use client';

import DpdpHero from '@/components/dpdp-compliance/DpdpHero';
import DpdpFeatures from '@/components/dpdp-compliance/DpdpFeatures';
import DpdpAssessment from '@/components/dpdp-compliance/DpdpAssessment';
import DpdpCompliance from '@/components/dpdp-compliance/DpdpCompliance';
import DpdpImplementation from '@/components/dpdp-compliance/DpdpImplementation';
import DpdpPricing from '@/components/dpdp-compliance/DpdpPricing';
import DpdpTestimonials from '@/components/dpdp-compliance/DpdpTestimonials';
import DpdpProcess from '@/components/dpdp-compliance/DpdpProcess';
import DpdpSpecs from '@/components/dpdp-compliance/DpdpSpecs';
import DpdpCTA from '@/components/dpdp-compliance/DpdpCTA';

export default function DpdpCompliancePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DpdpHero />
      <DpdpFeatures />
      <DpdpAssessment />
      <DpdpCompliance />
      <DpdpImplementation />
      <DpdpPricing />
      <DpdpTestimonials />
      <DpdpProcess />
      <DpdpSpecs />
      <DpdpCTA />

      {/* Back to Home Link */}
      <div className="fixed bottom-6 left-6 z-40">
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
