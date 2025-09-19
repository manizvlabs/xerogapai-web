'use client';
import Link from 'next/link';

import ContactHero from '@/components/contact-center-ai/ContactHero';
import ContactFeatures from '@/components/contact-center-ai/ContactFeatures';
import ContactScoring from '@/components/contact-center-ai/ContactScoring';
import ContactCoaching from '@/components/contact-center-ai/ContactCoaching';
import ContactAnalytics from '@/components/contact-center-ai/ContactAnalytics';
import ContactPricing from '@/components/contact-center-ai/ContactPricing';
import ContactTestimonials from '@/components/contact-center-ai/ContactTestimonials';
import ContactProcess from '@/components/contact-center-ai/ContactProcess';
import ContactSpecs from '@/components/contact-center-ai/ContactSpecs';
import ContactCTA from '@/components/contact-center-ai/ContactCTA';

export default function ContactCenterAIPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ContactHero />
      <ContactFeatures />
      <ContactScoring />
      <ContactCoaching />
      <ContactAnalytics />
      <ContactPricing />
      <ContactTestimonials />
      <ContactProcess />
      <ContactSpecs />
      <ContactCTA />

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
