'use client';
import Link from 'next/link';

import ContactHero from '@/components/contact-center-ai/ContactHero';
import ContactFeatures from '@/components/contact-center-ai/ContactFeatures';
import ContactPricing from '@/components/contact-center-ai/ContactPricing';
import ContactCTA from '@/components/contact-center-ai/ContactCTA';

export default function ContactCenterAIPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ContactHero />
      <ContactFeatures />
      <ContactPricing />
      <ContactCTA />

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
