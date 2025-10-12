'use client';
import Link from 'next/link';

import { useState } from 'react';
import DemoHero from '@/components/demo/DemoHero';
import DemoCalendarBooking from '@/components/demo/DemoCalendarBooking';
import DemoProcess from '@/components/demo/DemoProcess';
import DemoTestimonials from '@/components/demo/DemoTestimonials';
import DemoFAQ from '@/components/demo/DemoFAQ';
import { MicrosoftGraphCalendarService } from '@/lib/email/microsoft365-calendar';

type DemoStep = 'hero' | 'form' | 'confirmation';

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('hero');
  const [bookingData, setBookingData] = useState<unknown>(null);
  const [isCreatingCalendarEvent, setIsCreatingCalendarEvent] = useState(false);
  const [calendarEventResult, setCalendarEventResult] = useState<{ success: boolean; joinUrl?: string; error?: string } | null>(null);

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

  const handleCreateCalendarEvent = async () => {
    if (!bookingData || typeof bookingData !== 'object') return;

    setIsCreatingCalendarEvent(true);
    setCalendarEventResult(null);

    try {
      // Create a fresh calendar service instance for this request
      const calendarService = new MicrosoftGraphCalendarService();

      // Create the calendar event data from booking information
      const eventData = {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        email: bookingData.email,
        companyName: bookingData.companyName,
        preferredDate: bookingData.preferredDate,
        preferredTime: bookingData.preferredTime,
        timezone: bookingData.timezone,
        consultationType: bookingData.consultationType,
      };

      const event = calendarService.generateDemoBookingEvent(eventData);
      const result = await calendarService.createCalendarEvent(event);

      setCalendarEventResult(result);

      if (result.success) {
        // Optionally, you could also send a confirmation email here
        console.log('Calendar event created successfully:', result);
      }
    } catch (error) {
      setCalendarEventResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create calendar event'
      });
    } finally {
      setIsCreatingCalendarEvent(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {currentStep === 'hero' && (
        <>
          <DemoHero onStartBooking={handleStartBooking} />
          <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
            <DemoProcess />
          </section>
          <section className="relative py-24 sm:py-32 bg-white dark:bg-gray-900">
            <DemoTestimonials />
          </section>
          <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
            <DemoFAQ />
          </section>
        </>
      )}

      {currentStep === 'form' && (
        <DemoCalendarBooking
          onBookingComplete={handleBookingComplete}
          onBack={() => setCurrentStep('hero')}
        />
      )}

      {currentStep === 'confirmation' && bookingData && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Demo Booked Successfully!
            </h1>
            <p className="text-gray-600 dark:text-white mb-6">
              Thank you for booking your demo. You&apos;ll receive a calendar invite with a Teams meeting link shortly.
            </p>

            {/* Calendar Integration Section */}
            <div className="flex-1 p-4 rounded-lg border-2 transition-all border-green-500 bg-green-50 dark:bg-green-900/20 mb-6">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                  Add to Calendar
                </h3>
              </div>

              {bookingData.joinUrl && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700">
                  <p className="font-medium">✅ Calendar invite sent!</p>
                  <p className="text-sm mt-1">
                    A calendar invite has been added to your Outlook calendar with a Teams meeting link.
                    <a href={bookingData.joinUrl} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline ml-1">
                      Join Meeting
                    </a>
                  </p>
                </div>
              )}

              {calendarEventResult && !bookingData.joinUrl && (
                <div className={`mb-4 p-3 rounded-lg ${calendarEventResult.success ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                  {calendarEventResult.success ? (
                    <div>
                      <p className="font-medium">✅ Calendar event created successfully!</p>
                      {calendarEventResult.joinUrl && (
                        <p className="text-sm mt-1">
                          <a href={calendarEventResult.joinUrl} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                            Join Teams Meeting
                          </a>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium">❌ Failed to create calendar event</p>
                      <p className="text-sm mt-1">{calendarEventResult.error}</p>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleCreateCalendarEvent}
                disabled={isCreatingCalendarEvent}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  isCreatingCalendarEvent
                    ? 'bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isCreatingCalendarEvent ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Calendar Event...
                  </span>
                ) : (
                  'Add Demo to Outlook Calendar'
                )}
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-600">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Booking Details:</h3>
              <div className="text-sm text-gray-600 dark:text-white space-y-1">
                <p><strong>Name:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                <p><strong>Company:</strong> {bookingData.companyName || 'Not provided'}</p>
                <p><strong>Date:</strong> {bookingData.preferredDate}</p>
                <p><strong>Time:</strong> {bookingData.preferredTime}</p>
                {bookingData.bookingMethod === 'quick' && (
                  <p><strong>Booking Method:</strong> Quick Outlook Booking</p>
                )}
                {bookingData.bookingMethod === 'form' && (
                  <p><strong>Booking Method:</strong> Detailed Form</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBackToForm}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
