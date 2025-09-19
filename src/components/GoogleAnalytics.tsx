'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useFunnelAnalytics } from '@/hooks/useFunnelAnalytics';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    trackCTA: (ctaData: CTATrackingData) => void;
  }
}

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

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID?: string;
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackPageView, trackEvent } = useFunnelAnalytics();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'GA-XXXXXXXXXX') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Track initial page view with funnel analytics
    trackPageView(pathname);

    // Set up CTA tracking function
    window.trackCTA = (ctaData: CTATrackingData) => {
      if (!window.gtag) return;

      // Track CTA event
      window.gtag('event', 'cta_interaction', {
        event_category: ctaData.category,
        event_label: ctaData.label,
        value: ctaData.value || 0,
        custom_parameters: {
          page: ctaData.page || pathname,
          section: ctaData.section,
          cta_type: ctaData.cta_type,
          service_type: ctaData.service_type,
          user_journey: ctaData.user_journey?.join(','),
          action: ctaData.action
        }
      });

      // Track conversion events for specific CTA types
      if (ctaData.cta_type === 'assessment' && ctaData.action === 'click') {
        window.gtag('event', 'assessment_request', {
          event_category: 'conversion',
          event_label: 'ai_readiness_assessment',
          value: 500 // $500 value
        });
      }

      if (ctaData.cta_type === 'demo' && ctaData.action === 'click') {
        window.gtag('event', 'demo_request', {
          event_category: 'conversion',
          event_label: 'demo_booking',
          value: 1000 // $1000 value
        });
      }

      // Track service-specific conversions
      if (ctaData.service_type && ctaData.action === 'click') {
        window.gtag('event', 'service_interest', {
          event_category: 'engagement',
          event_label: ctaData.service_type,
          value: 1
        });
      }

      // Store user journey in localStorage for personalization
      if (ctaData.action === 'click') {
        const journey = JSON.parse(localStorage.getItem('user_journey') || '[]');
        journey.push({
          timestamp: new Date().toISOString(),
          page: ctaData.page || pathname,
          cta_type: ctaData.cta_type,
          label: ctaData.label
        });

        // Keep only last 10 interactions
        if (journey.length > 10) {
          journey.shift();
        }

        localStorage.setItem('user_journey', JSON.stringify(journey));
      }
    };

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [GA_MEASUREMENT_ID, pathname]);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'GA-XXXXXXXXXX' || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: document.title,
      page_location: window.location.href,
    });

    // Track page view with funnel analytics
    trackPageView(pathname);
  }, [pathname, searchParams, GA_MEASUREMENT_ID, trackPageView]);

  return null;
}
