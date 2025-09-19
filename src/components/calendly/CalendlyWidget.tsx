'use client';

import React, { useEffect, useRef, useState } from 'react';
import CalendlyIntegration, { CalendlyEventData } from '@/lib/calendly/calendly';

interface CalendlyWidgetProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    customAnswers?: Record<string, string>;
  };
  onBookingComplete?: (data: CalendlyEventData) => void;
  className?: string;
  height?: number;
}

export default function CalendlyWidget({
  url,
  prefill,
  onBookingComplete,
  className = '',
  height = 700,
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeCalendly = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load Calendly script
        await CalendlyIntegration.loadCalendlyScript();

        if (!mounted) return;

        // Wait a bit for Calendly to be fully loaded
        setTimeout(() => {
          if (!mounted) return;

          if (widgetRef.current) {
            CalendlyIntegration.initWidget(url, widgetRef.current, prefill);
          }
          setIsLoading(false);
        }, 500);

        // Set up event listener for booking completion
        CalendlyIntegration.onEventScheduled((data) => {
          if (mounted) {
            CalendlyIntegration.trackBooking(data);
            onBookingComplete?.(data);
          }
        });

      } catch (err) {
        if (mounted) {
          setError('Failed to load Calendly. Please try again.');
          setIsLoading(false);
          console.error('Calendly initialization error:', err);
        }
      }
    };

    initializeCalendly();

    return () => {
      mounted = false;
    };
  }, [url, prefill, onBookingComplete]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg ${className}`}>
        <div className="text-center p-8">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Scheduling Unavailable
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading calendar...</p>
          </div>
        </div>
      )}

      <div
        ref={widgetRef}
        style={{ height: `${height}px`, minHeight: '400px' }}
        className={`w-full rounded-lg overflow-hidden ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />

      {!isLoading && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select a date and time that works best for you. The demo will be conducted via video call.
          </p>
        </div>
      )}
    </div>
  );
}
