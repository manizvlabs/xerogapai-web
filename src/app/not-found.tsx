import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | VyaptIX AI',
  description: 'The page you are looking for could not be found. Return to VyaptIX AI homepage.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">Page Not Found</h2>
          <p className="mt-2 text-gray-600 dark:text-white">
            The page you are looking for could not be found.
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
