'use client';

import React, { useEffect, useState } from 'react';
import CalendlyIntegration, { CalendlyEventData } from '@/lib/calendly/calendly';

interface CalendlyPopupProps {
  url: string;
  prefill?: {
    name?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    customAnswers?: Record<string, string>;
  };
  children: React.ReactNode;
  onBookingComplete?: (data: CalendlyEventData) => void;
  className?: string;
}

export default function CalendlyPopup({
  url,
  prefill,
  children,
  onBookingComplete,
  className = '',
}: CalendlyPopupProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    CalendlyIntegration.loadCalendlyScript()
      .then(() => setIsScriptLoaded(true))
      .catch((error) => console.error('Failed to load Calendly:', error));
  }, []);

  useEffect(() => {
    if (!isScriptLoaded) return;

    const handleEventScheduled = (data: CalendlyEventData) => {
      CalendlyIntegration.trackBooking(data);
      onBookingComplete?.(data);
    };

    CalendlyIntegration.onEventScheduled(handleEventScheduled);

    return () => {
      // Clean up if needed
    };
  }, [isScriptLoaded, onBookingComplete]);

  const handleClick = () => {
    if (!isScriptLoaded) {
      console.warn('Calendly script not loaded yet');
      return;
    }

    CalendlyIntegration.openPopup(url, prefill);
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
}
