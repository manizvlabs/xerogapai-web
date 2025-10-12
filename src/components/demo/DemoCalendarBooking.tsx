'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface BusySlot {
  date: string;
  time: string;
  subject: string;
  isDemoBooking?: boolean;
}

interface AvailabilityData {
  freeSlots: TimeSlot[];
  busySlots: BusySlot[];
  workingHours: { start: string; end: string };
}

interface DemoCalendarBookingProps {
  onBookingComplete: (data: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    consultationType: string;
  }) => void;
  onBack: () => void;
}

export default function DemoCalendarBooking({ onBookingComplete, onBack }: DemoCalendarBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
  });

  // Configurable timezone for calendar operations (from environment)
  const userTimezone = process.env.NEXT_PUBLIC_CALENDAR_TIMEZONE || 'Asia/Kolkata';
  const [isBooking, setIsBooking] = useState(false);

  // Fetch availability data
  useEffect(() => {
    fetchAvailability();
  }, [selectedDate]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      // Get the next 7 days starting from today
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);

      const response = await fetch(`/api/demo-booking?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAvailability(data.availability);
        }
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateShort = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
    setSelectedSlot(null);
  };

  const getSlotsForDate = (date: string) => {
    if (!availability) return { available: [], busy: [] };

    return {
      available: availability.freeSlots.filter(slot => slot.date === date),
      busy: availability.busySlots.filter(slot => slot.date === date)
    };
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedSlot({ date: slot.date, time: slot.time });
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !userInfo.firstName || !userInfo.lastName || !userInfo.email) {
      alert('Please fill in all required fields and select a time slot');
      return;
    }

    setIsBooking(true);

    try {
      const bookingData = {
        ...userInfo,
        preferredDate: selectedSlot.date,
        preferredTime: selectedSlot.time,
        timezone: userTimezone, // Use IST timezone for calendar events
        consultationType: 'AI Demo',
      };

      // Call the existing demo booking API
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          onBookingComplete({
            ...bookingData,
            calendarEventId: result.calendarEventId,
            joinUrl: result.joinUrl,
          });
        } else {
          throw new Error(result.error || 'Failed to book demo');
        }
      } else {
        throw new Error('Failed to book demo');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book demo. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const generateDateRange = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dateRange = generateDateRange();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading calendar...</span>
          </div>
        </div>
      </div>
    );
  }

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
            <CalendarIcon className="w-6 h-6 mr-3" />
            <h1 className="text-2xl font-bold">Schedule Your AI Demo</h1>
          </div>
          <p className="text-green-100">
            Choose an available time slot from my calendar. All times are shown in your local timezone.
          </p>
        </div>

        <div className="p-6">
          {/* User Information Form */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
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
                  onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
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
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
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
                  onChange={(e) => setUserInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>

          {/* Calendar Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Date Selection */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Select Date</h3>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => navigateDate('prev')}
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateDate('next')}
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {dateRange.map((date, index) => {
                    const isSelected = isSelectedDate(date);
                    const { available } = getSlotsForDate(date.toISOString().split('T')[0]);
                    const hasAvailability = available.length > 0;

                    return (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          isSelected
                            ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 text-green-800 dark:text-green-300'
                            : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-650 text-gray-900 dark:text-white'
                        }`}
                      >
                        <div className="font-medium">
                          {formatDateShort(date)}
                          {isToday(date) && (
                            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded">Today</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {hasAvailability ? `${available.length} slots` : 'No availability'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Available Times - {formatDate(selectedDate)}
                </h3>

                {(() => {
                  const { available, busy } = getSlotsForDate(selectedDate.toISOString().split('T')[0]);

                  if (available.length === 0 && busy.length === 0) {
                    return (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <ClockIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No availability for this date</p>
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {/* Combine and sort all slots chronologically */}
                      {(() => {
                        // Create a map to deduplicate and prioritize slots
                        const slotMap = new Map();

                        // Add available slots first
                        available.forEach(slot => {
                          const key = `${slot.date}-${slot.time}`;
                          slotMap.set(key, { ...slot, type: 'available' });
                        });

                        // Add busy slots (these override available slots at same time)
                        busy.forEach(slot => {
                          const key = `${slot.date}-${slot.time}`;
                          slotMap.set(key, { ...slot, type: 'busy' });
                        });

                        const allSlots = Array.from(slotMap.values());

                        // Sort by time (convert time to minutes for proper sorting)
                        allSlots.sort((a, b) => {
                          const timeA = parseInt(a.time.split(':')[0]) * 60 + parseInt(a.time.split(':')[1]);
                          const timeB = parseInt(b.time.split(':')[0]) * 60 + parseInt(b.time.split(':')[1]);
                          return timeA - timeB;
                        });

                        return allSlots.map((slot) => (
                          slot.type === 'available' ? (
                            <button
                              key={`available-${slot.date}-${slot.time}`}
                              onClick={() => handleSlotClick(slot)}
                              className={`p-3 rounded-lg text-center transition-colors ${
                                selectedSlot?.date === slot.date && selectedSlot?.time === slot.time
                                  ? 'bg-green-600 text-white'
                                  : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                              }`}
                            >
                              <div className="font-medium">{slot.time}</div>
                              <div className="text-xs opacity-75">Available</div>
                            </button>
                          ) : (
                            <div
                              key={`busy-${slot.date}-${slot.time}`}
                              className={`p-3 rounded-lg text-center ${
                                slot.isDemoBooking
                                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                                  : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                              }`}
                            >
                              <div className="font-medium">{slot.time}</div>
                              <div className="text-xs opacity-75">
                                {slot.isDemoBooking ? 'Demo Booked' : 'Busy'}
                              </div>
                              {slot.subject !== 'Busy' && (
                                <div className="text-xs mt-1 truncate" title={slot.subject}>
                                  {slot.subject}
                                </div>
                              )}
                            </div>
                          )
                        ));
                      })()}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Selected Slot and Booking Button */}
          {selectedSlot && (
            <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-green-600 mr-2" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Selected: {new Date(`${selectedSlot.date}T${selectedSlot.time}`).toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      60-minute AI Demo session
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={isBooking || !userInfo.firstName || !userInfo.lastName || !userInfo.email}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isBooking || !userInfo.firstName || !userInfo.lastName || !userInfo.email
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isBooking ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking...
                    </div>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
