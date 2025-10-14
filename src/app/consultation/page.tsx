'use client';
import Link from 'next/link';

import { useState } from 'react';
import ConsultationHero from '@/components/consultation/ConsultationHero';
import ConsultationTypes from '@/components/consultation/ConsultationTypes';
import ConsultationForm from '@/components/consultation/ConsultationForm';
import ConsultationBenefits from '@/components/consultation/ConsultationBenefits';

type ConsultationStep = 'hero' | 'types' | 'form' | 'confirmation';

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState<ConsultationStep>('hero');
  const [selectedType, setSelectedType] = useState<string>('');
  const [bookingData, setBookingData] = useState<Linkny>(null);

  const handleStartBooking = () => {
    setCurrentStep('types');
  };

  const handleTypeSelected = (type: string) => {
    setSelectedType(type);
    setCurrentStep('form');
  };

  const handleBookingComplete = (data: any) => {
    setBookingData({
      ...data,
      calendarEventId: data.calendarEventId,
      joinUrl: data.joinUrl
    });
    setCurrentStep('confirmation');
  };

  const handleBackToTypes = () => {
    setCurrentStep('types');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {currentStep === 'hero' && (
        <>
          <ConsultationHero onStartBooking={handleStartBooking} />
          <ConsultationBenefits />
        </>
      )}

      {currentStep === 'types' && (
        <ConsultationTypes
          onTypeSelected={handleTypeSelected}
          onBack={() => setCurrentStep('hero')}
        />
      )}

      {currentStep === 'form' && selectedType && (
        <ConsultationForm
          consultationType={selectedType}
          onComplete={handleBookingComplete}
          onBack={handleBackToTypes}
        />
      )}

      {currentStep === 'confirmation' && bookingData && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Consultation Booked Successfully!
            </h1>
            <p className="text-gray-600 dark:text-white mb-6">
              Thank you for booking your consultation. You&apos;ll receive a confirmation email shortly with all the details and preparation materials.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Booking Details:</h3>
              <div className="text-sm text-gray-600 dark:text-white space-y-1">
                <p><strong>Consultation Type:</strong> {bookingData.consultationType}</p>
                <p><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                <p><strong>Phone:</strong> {bookingData.phone}</p>
                <p><strong>Company:</strong> {bookingData.company}</p>
                <p><strong>Job Title:</strong> {bookingData.jobTitle}</p>
                <p><strong>Industry:</strong> {bookingData.industry}</p>
                <p><strong>Date:</strong> {bookingData.preferredDate}</p>
                <p><strong>Time:</strong> {bookingData.preferredTime}</p>
                <p><strong>Timezone:</strong> {bookingData.timezone}</p>
                {bookingData.consultationGoals && <p><strong>Goals:</strong> {bookingData.consultationGoals}</p>}
                {bookingData.currentChallenges && <p><strong>Challenges:</strong> {bookingData.currentChallenges}</p>}
              </div>
            </div>

            {/* Teams Meeting Info */}
            {bookingData.joinUrl && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">📅 Teams Meeting Scheduled</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  A calendar invite has been sent to your email with the Teams meeting link.
                </p>
                <a
                  href={bookingData.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Join Teams Meeting
                </a>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentStep('types')}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Book Another Consultation
              </button>
              <Link
                href="/assessment"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
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
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
