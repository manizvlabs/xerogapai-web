'use client';

import { useState } from 'react';
import ConsultationHero from '@/components/consultation/ConsultationHero';
import ConsultationTypes from '@/components/consultation/ConsultationTypes';
import ConsultationForm from '@/components/consultation/ConsultationForm';
import ConsultationBenefits from '@/components/consultation/ConsultationBenefits';

type ConsultationStep = 'hero' | 'types' | 'form' | 'confirmation';

export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState<ConsultationStep>('hero');
  const [selectedType, setSelectedType] = useState<string>('');
  const [bookingData, setBookingData] = useState<any>(null);

  const handleStartBooking = () => {
    setCurrentStep('types');
  };

  const handleTypeSelected = (type: string) => {
    setSelectedType(type);
    setCurrentStep('form');
  };

  const handleBookingComplete = (data: any) => {
    setBookingData(data);
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
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Consultation Booked Successfully!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for booking your consultation. You'll receive a confirmation email shortly with all the details and preparation materials.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Booking Details:</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <p><strong>Consultation Type:</strong> {bookingData.consultationType}</p>
                <p><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                <p><strong>Company:</strong> {bookingData.companyName}</p>
                <p><strong>Date:</strong> {bookingData.preferredDate}</p>
                <p><strong>Time:</strong> {bookingData.preferredTime}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentStep('types')}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Book Another Consultation
              </button>
              <a
                href="/assessment"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
              >
                Take AI Assessment
              </a>
            </div>
          </div>
        </div>
      )}

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
