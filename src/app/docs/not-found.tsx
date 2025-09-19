'use client';

import Link from 'next/link';

export default function DocNotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Documentation Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The documentation page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/docs"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
        >
          Return to Documentation
        </Link>
      </div>
    </div>
  );
}
