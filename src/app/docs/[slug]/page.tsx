'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { contentConfig } from '@/config/content';

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Find the documentation page in our content
  const docPage = contentConfig.docs.sections.flatMap(section => 
    section.items.filter(item => item.slug === slug)
  )[0];

  // If page doesn't exist, show 404
  if (!docPage) {
    notFound();
  }

  // Find the section this page belongs to
  const section = contentConfig.docs.sections.find(section => 
    section.items.some(item => item.slug === slug)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/docs" className="hover:text-green-600 dark:hover:text-green-400">
                Documentation
              </Link>
            </li>
            <li>•</li>
            {section && (
              <>
                <li>
                  <span>{section.title}</span>
                </li>
                <li>•</li>
              </>
            )}
            <li className="text-gray-900 dark:text-white font-medium">
              {docPage.title}
            </li>
          </ol>
        </nav>

        {/* Content */}
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {docPage.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <span>Reading time: {docPage.readTime}</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {docPage.description}
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 dark:text-yellow-200">
              This documentation page is under construction. The full content will be available soon.
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/docs"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
            >
              ← Back to Documentation
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}