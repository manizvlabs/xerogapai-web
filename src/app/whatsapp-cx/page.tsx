'use client';
import Link from 'next/link';

import WhatsAppHero from '@/components/whatsapp-cx/WhatsAppHero';
import WhatsAppFeatures from '@/components/whatsapp-cx/WhatsAppFeatures';
import WhatsAppPricing from '@/components/whatsapp-cx/WhatsAppPricing';
import WhatsAppCTA from '@/components/whatsapp-cx/WhatsAppCTA';

export default function WhatsAppCXPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <WhatsAppHero />
      <WhatsAppFeatures />
      <WhatsAppPricing />
      <WhatsAppCTA />

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
