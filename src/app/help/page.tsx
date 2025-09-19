'use client';

import HelpHero from '@/components/help/HelpHero';
import HelpSearch from '@/components/help/HelpSearch';
import HelpCategories from '@/components/help/HelpCategories';
import HelpFAQs from '@/components/help/HelpFAQs';
import HelpGuides from '@/components/help/HelpGuides';
import HelpContact from '@/components/help/HelpContact';
import HelpStatus from '@/components/help/HelpStatus';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HelpHero />
      <HelpSearch />
      <HelpCategories />
      <HelpFAQs />
      <HelpGuides />
      <HelpContact />
      <HelpStatus />

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
