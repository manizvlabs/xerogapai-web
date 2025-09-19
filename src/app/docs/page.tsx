'use client';

import DocsHero from '@/components/docs/DocsHero';
import DocsNavigation from '@/components/docs/DocsNavigation';
import DocsQuickStart from '@/components/docs/DocsQuickStart';
import DocsAPIs from '@/components/docs/DocsAPIs';
import DocsGuides from '@/components/docs/DocsGuides';
import DocsResources from '@/components/docs/DocsResources';
import DocsSupport from '@/components/docs/DocsSupport';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DocsHero />
      <DocsNavigation />
      <DocsQuickStart />
      <DocsAPIs />
      <DocsGuides />
      <DocsResources />
      <DocsSupport />

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
