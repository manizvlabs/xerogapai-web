'use client';
import Link from 'next/link';

import WhatsAppHero from '@/components/whatsapp-cx/WhatsAppHero';
import WhatsAppFeatures from '@/components/whatsapp-cx/WhatsAppFeatures';
import WhatsAppBenefits from '@/components/whatsapp-cx/WhatsAppBenefits';
import WhatsAppIndustries from '@/components/whatsapp-cx/WhatsAppIndustries';
import WhatsAppPricing from '@/components/whatsapp-cx/WhatsAppPricing';
import WhatsAppTestimonials from '@/components/whatsapp-cx/WhatsAppTestimonials';
import WhatsAppProcess from '@/components/whatsapp-cx/WhatsAppProcess';
import WhatsAppSpecs from '@/components/whatsapp-cx/WhatsAppSpecs';
import WhatsAppFAQ from '@/components/whatsapp-cx/WhatsAppFAQ';
import WhatsAppCTA from '@/components/whatsapp-cx/WhatsAppCTA';

export default function WhatsAppCXPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <WhatsAppHero />
      <WhatsAppFeatures />
      <WhatsAppBenefits />
      <WhatsAppIndustries />
      <WhatsAppPricing />
      <WhatsAppTestimonials />
      <WhatsAppProcess />
      <WhatsAppSpecs />
      <WhatsAppFAQ />
      <WhatsAppCTA />

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
