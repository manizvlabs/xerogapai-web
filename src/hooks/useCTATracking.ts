'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface CTATrackingData {
  action: 'click' | 'hover' | 'view';
  category: 'cta' | 'button' | 'link';
  label: string;
  value?: number;
  page?: string;
  section?: string;
  cta_type?: 'primary' | 'secondary' | 'assessment' | 'demo' | 'consultation' | 'contact';
  service_type?: string;
  user_journey?: string[];
}

export function useCTATracking() {
  const pathname = usePathname();

  const trackCTA = useCallback((ctaData: CTATrackingData) => {
    if (typeof window !== 'undefined' && window.trackCTA) {
      window.trackCTA({
        ...ctaData,
        page: ctaData.page || pathname,
      });
    }
  }, [pathname]);

  const trackCTAClick = useCallback((
    label: string,
    options: Omit<CTATrackingData, 'action' | 'label'> = {}
  ) => {
    trackCTA({
      action: 'click',
      category: 'cta',
      label,
      ...options,
    });
  }, [trackCTA]);

  const trackCTAView = useCallback((
    label: string,
    options: Omit<CTATrackingData, 'action' | 'label'> = {}
  ) => {
    trackCTA({
      action: 'view',
      category: 'cta',
      label,
      ...options,
    });
  }, [trackCTA]);

  const getUserJourney = useCallback(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('user_journey') || '[]');
    } catch {
      return [];
    }
  }, []);

  return {
    trackCTA,
    trackCTAClick,
    trackCTAView,
    getUserJourney,
  };
}
