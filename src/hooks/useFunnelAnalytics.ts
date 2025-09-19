'use client';

import { useCallback } from 'react';
import { funnelAnalytics } from '@/lib/analytics/funnelAnalytics';

export function useFunnelAnalytics() {
  const trackEvent = useCallback((
    event: string,
    page: string,
    options: {
      userId?: string;
      sessionId?: string;
      element?: string;
      value?: number;
      metadata?: Record<string, any>;
    } = {}
  ) => {
    funnelAnalytics.trackEvent({
      event,
      page,
      ...options,
    });
  }, []);

  const trackPageView = useCallback((page: string, userId?: string) => {
    trackEvent('page_view', page, { userId });
  }, [trackEvent]);

  const trackCTA = useCallback((
    action: string,
    page: string,
    options: {
      element?: string;
      value?: number;
      userId?: string;
      metadata?: Record<string, any>;
    } = {}
  ) => {
    trackEvent(`cta_${action}`, page, options);
  }, [trackEvent]);

  const trackConversion = useCallback((
    conversionType: string,
    page: string,
    value?: number,
    metadata?: Record<string, any>
  ) => {
    trackEvent(`conversion_${conversionType}`, page, {
      value,
      metadata: {
        ...metadata,
        conversionType
      }
    });
  }, [trackEvent]);

  const getAnalyticsReport = useCallback((timeframe: 'day' | 'week' | 'month' = 'week') => {
    return funnelAnalytics.getAnalyticsReport(timeframe);
  }, []);

  const getFunnelData = useCallback((funnelId: string) => {
    return funnelAnalytics.getFunnelData(funnelId);
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackCTA,
    trackConversion,
    getAnalyticsReport,
    getFunnelData,
  };
}
