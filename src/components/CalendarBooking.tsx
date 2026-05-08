import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Check } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

interface CalendarBookingProps {
  onSlotSelect: (date: Date, time: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

export function CalendarBooking({ onSlotSelect, selectedDate, selectedTime }: CalendarBookingProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date; time: string } | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Business hours: 9 AM to 6 PM IST (Indian Standard Time)
  const businessHours = useMemo(() => [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ], []);

  // Fetch calendar availability from Google Calendar API
  const fetchCalendarAvailability = useCallback(async (date: Date) => {
    setIsLoading(true);
    try {
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format

      const response = await fetch(`/api/get-calendar-availability?date=${dateString}&consultationType=technical`);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      setAvailableSlots(data.timeSlots || []);

    } catch (error) {
      console.error('Error fetching calendar availability:', error);
      // Fallback to all slots available with some mock booked slots
      const mockBookedSlots = ['09:00', '10:30', '14:00'];
      const fallbackSlots: TimeSlot[] = businessHours.map(time => ({
        time,
        available: !mockBookedSlots.includes(time),
        booked: mockBookedSlots.includes(time)
      }));
      setAvailableSlots(fallbackSlots);
    } finally {
      setIsLoading(false);
    }
  }, [businessHours]);

  useEffect(() => {
    if (selectedDate) {
      fetchCalendarAvailability(selectedDate);
    }
  }, [selectedDate, fetchCalendarAvailability]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    return weekDays;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (!isPastDate(date)) {
      setSelectedDateTime(null);
      onSlotSelect(date, '');
      fetchCalendarAvailability(date);
    }
  };

  const handleTimeSlotClick = (time: string) => {
    if (selectedDate && availableSlots.find(slot => slot.time === time)?.available) {
      const dateTime = { date: selectedDate, time };
      setSelectedDateTime(dateTime);
      onSlotSelect(selectedDate, time);
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentMonth);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <h3 className="text-lg font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
            </div>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <div key={index} className="aspect-square">
                {date ? (
                  <button
                    onClick={() => handleDateClick(date)}
                    disabled={isPastDate(date)}
                    className={`
                      w-full h-full flex items-center justify-center text-sm font-medium rounded-lg transition-all
                      ${isToday(date) ? 'bg-blue-100 text-blue-600 border-2 border-blue-300' : ''}
                      ${isSelectedDate(date) ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}
                      ${isPastDate(date) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 cursor-pointer'}
                    `}
                  >
                    {date.getDate()}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentMonth);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              <h3 className="text-lg font-semibold">
                Week of {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h3>
            </div>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Week Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((date, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  {dayNames[index]}
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-3">
                  {date.getDate()}
                </div>
                <button
                  onClick={() => handleDateClick(date)}
                  disabled={isPastDate(date)}
                  className={`
                    w-full py-2 px-3 rounded-lg text-sm font-medium transition-all
                    ${isToday(date) ? 'bg-blue-100 text-blue-600 border-2 border-blue-300' : ''}
                    ${isSelectedDate(date) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                    ${isPastDate(date) ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
                  `}
                >
                  {isSelectedDate(date) ? 'Selected' : 'Select'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTimeSlots = () => {
    if (!selectedDate || isLoading) {
      return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="text-center">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Loading available times...</span>
              </div>
            ) : (
              <div className="text-gray-500">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Select a date to view available time slots</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <h3 className="text-lg font-semibold">
              Available Times - {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => handleTimeSlotClick(slot.time)}
                disabled={!slot.available}
                className={`
                  p-3 rounded-lg border-2 text-sm font-medium transition-all relative
                  ${slot.booked ? 'bg-red-50 border-red-200 text-red-600 cursor-not-allowed' : ''}
                  ${slot.available ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300 cursor-pointer' : ''}
                  ${selectedTime === slot.time ? 'bg-blue-600 border-blue-600 text-white' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{formatTime(slot.time)}</span>
                  {selectedTime === slot.time && <Check className="w-4 h-4" />}
                </div>
                {slot.booked && <div className="text-xs mt-1 opacity-75">Booked</div>}
                {slot.available && <div className="text-xs mt-1 opacity-75">Available</div>}
              </button>
            ))}
          </div>

          {selectedDateTime && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <Check className="w-5 h-5" />
                <span className="font-medium">
                  Selected: {selectedDateTime.date.toLocaleDateString()} at {formatTime(selectedDateTime.time)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Month View
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Week View
          </button>
        </div>
      </div>

      {/* Calendar */}
      {viewMode === 'month' ? renderMonthView() : renderWeekView()}

      {/* Time Slots */}
      {renderTimeSlots()}
    </div>
  );
}