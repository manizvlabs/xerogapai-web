'use client';

import React, { useState } from 'react';
import { ChevronLeftIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import DemoBookingForm from './DemoBookingForm';

interface DemoBookingEnhancedProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

type BookingMethod = 'form' | 'quick';

export default function DemoBookingEnhanced({ onComplete, onBack }: DemoBookingEnhancedProps) {
  const [bookingMethod, setBookingMethod] = useState<BookingMethod>('quick');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    preferredDate: '',
    preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    consultationType: 'AI Demo',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickBooking = async () => {
    // Validate required fields
    if (!userInfo.firstName || !userInfo.lastName || !userInfo.email || !userInfo.preferredDate || !userInfo.preferredTime) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the demo booking API
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error('Failed to book demo');
      }

      const result = await response.json();

      if (result.success) {
        // Pass the booking data to the parent component
        onComplete({
          ...userInfo,
          calendarEventId: result.calendarEventId,
          joinUrl: result.joinUrl,
        });
      } else {
        throw new Error(result.error || 'Failed to book demo');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book demo. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-6 text-white">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-green-100 hover:text-white transition-colors mr-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back
            </button>
            <h1 className="text-2xl font-bold">Schedule Your AI Demo</h1>
          </div>
          <p className="text-green-100">Choose your preferred booking method to get started.</p>
        </div>

        {/* Booking Method Selection */}
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setBookingMethod('quick')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                bookingMethod === 'quick'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              <div className="flex items-center mb-2">
                <ClockIcon className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Outlook Booking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-white text-left">
                Schedule directly with Outlook Calendar integration
              </p>
            </button>

            <button
              onClick={() => setBookingMethod('form')}
              className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                bookingMethod === 'form'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              <div className="flex items-center mb-2">
                <CalendarIcon className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Detailed Form Booking
                </h3>
              </div>
              <p className="text-gray-600 dark:text-white text-left">
                Comprehensive form with specific requirements and preferences
              </p>
            </button>
          </div>
        </div>

        {/* Booking Content */}
        <div className="p-6">
          {bookingMethod === 'quick' ? (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Schedule Your AI Demo
                </h2>
                <p className="text-gray-600 dark:text-white">
                  Fill in your details below and we'll send you a calendar invite with a Teams meeting link.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={userInfo.firstName}
                      onChange={(e) => updateUserInfo({ firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={userInfo.lastName}
                      onChange={(e) => updateUserInfo({ lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={userInfo.email}
                      onChange={(e) => updateUserInfo({ email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      value={userInfo.companyName}
                      onChange={(e) => updateUserInfo({ companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Preferred Date *
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      value={userInfo.preferredDate}
                      onChange={(e) => updateUserInfo({ preferredDate: e.target.value })}
                      min={moment().format('YYYY-MM-DD')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      value={userInfo.preferredTime}
                      onChange={(e) => updateUserInfo({ preferredTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleQuickBooking}
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Scheduling...
                      </div>
                    ) : (
                      'Schedule Demo'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Tell Us About Your Needs
                </h2>
                <p className="text-gray-600 dark:text-white">
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
