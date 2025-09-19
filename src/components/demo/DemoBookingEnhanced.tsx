'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import CalendlyWidget from '@/components/calendly/CalendlyWidget';
import { CalendlyEventData } from '@/lib/calendly/calendly';
import DemoBookingForm from './DemoBookingForm';

interface DemoBookingEnhancedProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

type BookingMethod = 'form' | 'calendly';

export default function DemoBookingEnhanced({ onComplete, onBack }: DemoBookingEnhancedProps) {
  const [bookingMethod, setBookingMethod] = useState<BookingMethod>('calendly');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    industry: '',
    challenges: '',
  });

  // Calendly URL - Replace with your actual Calendly URL
  const calendlyUrl = 'https://calendly.com/xerogap-ai/demo';

  const handleCalendlyBooking = (data: CalendlyEventData) => {
    // Combine Calendly data with user info if available
    const bookingData = {
      ...userInfo,
      calendlyData: data,
      bookingMethod: 'calendly',
      eventName: data.payload.event.name,
      startTime: data.payload.event.start_time,
      endTime: data.payload.event.end_time,
      hostName: data.payload.host.name,
    };

    onComplete(bookingData);
  };

  const handleFormBooking = (formData: any) => {
    const bookingData = {
      ...formData,
      bookingMethod: 'form',
    };
    onComplete(bookingData);
  };

  const updateUserInfo = (info: Partial<typeof userInfo>) => {
    setUserInfo(prev => ({ ...prev, ...info }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6 text-white">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-blue-100 hover:text-white transition-colors mr-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back
            </button>
            <h1 className="text-2xl font-bold">Schedule Your AI Demo</h1>
          </div>
          <p className="text-blue-100">Choose your preferred booking method to get started.</p>
        </div>

        {/* Booking Method Selection */}
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setBookingMethod('calendly')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                bookingMethod === 'calendly'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <CalendarIcon className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Calendly Booking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-left">
                Fast, interactive calendar booking with instant confirmation
              </p>
            </button>

            <button
              onClick={() => setBookingMethod('form')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                bookingMethod === 'form'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <SparklesIcon className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detailed Form Booking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-left">
                Comprehensive form with specific requirements and preferences
              </p>
            </button>
          </div>
        </div>

        {/* Booking Content */}
        <div className="p-6">
          {bookingMethod === 'calendly' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select Your Preferred Date & Time
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose a convenient time for your personalized AI automation demo. The session will last about 45 minutes.
                </p>
              </div>

              <CalendlyWidget
                url={calendlyUrl}
                prefill={{
                  name: userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : undefined,
                  email: userInfo.email || undefined,
                  firstName: userInfo.firstName || undefined,
                  lastName: userInfo.lastName || undefined,
                  customAnswers: {
                    'Company Name': userInfo.companyName || '',
                    'Industry': userInfo.industry || '',
                    'Current Challenges': userInfo.challenges || '',
                  }
                }}
                onBookingComplete={handleCalendlyBooking}
                height={600}
              />

              {/* Optional Info Collection */}
              <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Optional: Help us prepare better (Pre-fill below)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={userInfo.firstName}
                    onChange={(e) => updateUserInfo({ firstName: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={userInfo.lastName}
                    onChange={(e) => updateUserInfo({ lastName: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userInfo.email}
                    onChange={(e) => updateUserInfo({ email: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={userInfo.companyName}
                    onChange={(e) => updateUserInfo({ companyName: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Tell Us About Your Needs
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Provide detailed information to help us customize the perfect demo for your business.
                </p>
              </div>

              <DemoBookingForm
                onComplete={handleFormBooking}
                onBack={() => setBookingMethod('calendly')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
