'use client';
import Link from 'next/link';

import { useState } from 'react';
import DemoHero from '@/components/demo/DemoHero';
import DemoBookingEnhanced from '@/components/demo/DemoBookingEnhanced';
import DemoProcess from '@/components/demo/DemoProcess';
import DemoTestimonials from '@/components/demo/DemoTestimonials';
import DemoFAQ from '@/components/demo/DemoFAQ';

type DemoStep = 'hero' | 'form' | 'confirmation';

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('hero');
  const [bookingData, setBookingData] = useState<unknown>(null);

  const handleStartBooking = () => {
    setCurrentStep('form');
  };

  const handleBookingComplete = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName: string;
    jobTitle: string;
    companySize: string;
    industry: string;
    website: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    consultationGoals: string;
    currentChallenges: string;
    budget: string;
    timeline: string;
    additionalNotes: string;
    consultationType: string;
  }) => {
    setBookingData(data);
    setCurrentStep('confirmation');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {currentStep === 'hero' && (
        <>
          <DemoHero onStartBooking={handleStartBooking} />
          <DemoProcess />
          <DemoTestimonials />
          <DemoFAQ />
        </>
      )}

      {currentStep === 'form' && (
        <DemoBookingEnhanced
          onComplete={handleBookingComplete}
          onBack={() => setCurrentStep('hero')}
        />
      )}

      {currentStep === 'confirmation' && bookingData && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Demo Booked Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for booking your demo. You&apos;ll receive a confirmation email shortly with all the details.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Booking Details:</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                <p><strong>Company:</strong> {bookingData.companyName}</p>
                <p><strong>Date:</strong> {bookingData.preferredDate}</p>
                <p><strong>Time:</strong> {bookingData.preferredTime}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBackToForm}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Book Another Demo
              </button>
              <Link
                href="/assessment"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Take AI Assessment
              </Link>
            </div>
          </div>
        </div>
      )}

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
