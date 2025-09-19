'use client';

import { useMemo } from 'react';
import { useCTATracking } from './useCTATracking';

interface UserJourneyItem {
  timestamp: string;
  page: string;
  cta_type?: string;
  label: string;
}

interface PersonalizedCTA {
  primaryText: string;
  primaryHref: string;
  secondaryText?: string;
  secondaryHref?: string;
  urgencyLevel: 'low' | 'medium' | 'high';
  personalizationReason: string;
}

export function useCTAPersonalization() {
  const { getUserJourney } = useCTATracking();

  const personalizedCTA = useMemo((): PersonalizedCTA => {
    const journey = getUserJourney();

    if (journey.length === 0) {
      // New user - show assessment as primary
      return {
        primaryText: "Get Free AI Readiness Assessment",
        primaryHref: "/assessment",
        secondaryText: "Book Personalized Demo",
        secondaryHref: "/demo",
        urgencyLevel: 'low',
        personalizationReason: 'new_visitor'
      };
    }

    const recentInteractions = journey.slice(-5); // Last 5 interactions
    const ctaTypes = recentInteractions.map(item => item.cta_type).filter(Boolean);
    const pagesVisited = recentInteractions.map(item => item.page);

    // Check if user has shown interest in specific services
    const serviceInterest = ctaTypes.filter(type =>
      ['assessment', 'demo', 'consultation'].includes(type as string)
    );

    // Check if user has visited multiple service pages
    const servicePagesVisited = pagesVisited.filter(page =>
      page.includes('/whatsapp-cx') ||
      page.includes('/xerogap-ai') ||
      page.includes('/enterprise-copilots') ||
      page.includes('/sales-automation') ||
      page.includes('/contact-center-ai') ||
      page.includes('/dpdp-compliance')
    );

    // High intent user - multiple service interactions
    if (serviceInterest.length >= 2 || servicePagesVisited.length >= 2) {
      return {
        primaryText: "Book Your Free Consultation",
        primaryHref: "/consultation",
        secondaryText: "Schedule Demo",
        secondaryHref: "/demo",
        urgencyLevel: 'high',
        personalizationReason: 'high_intent'
      };
    }

    // Medium intent user - some service interest
    if (serviceInterest.length >= 1 || servicePagesVisited.length >= 1) {
      return {
        primaryText: "Book Personalized Demo",
        primaryHref: "/demo",
        secondaryText: "Get Assessment",
        secondaryHref: "/assessment",
        urgencyLevel: 'medium',
        personalizationReason: 'medium_intent'
      };
    }

    // Returning user with general interest
    if (journey.length >= 3) {
      return {
        primaryText: "Explore Our AI Solutions",
        primaryHref: "/services",
        secondaryText: "Free Assessment",
        secondaryHref: "/assessment",
        urgencyLevel: 'medium',
        personalizationReason: 'returning_visitor'
      };
    }

    // Default for engaged but not highly interested users
    return {
      primaryText: "Start Your AI Journey",
      primaryHref: "/assessment",
      secondaryText: "View Services",
      secondaryHref: "/services",
      urgencyLevel: 'low',
      personalizationReason: 'engaged_visitor'
    };
  }, [getUserJourney]);

  const getPersonalizedServiceCTA = (serviceType: string) => {
    const journey = getUserJourney();
    const hasInteractedWithService = journey.some(item =>
      item.page.includes(serviceType) || item.label.toLowerCase().includes(serviceType)
    );

    if (hasInteractedWithService) {
      return {
        text: "Book Consultation",
        href: "/consultation",
        variant: 'primary' as const,
        reason: 'service_interested'
      };
    }

    return {
      text: "Learn More",
      href: `/${serviceType}`,
      variant: 'outline' as const,
      reason: 'service_discovery'
    };
  };

  const getTimeBasedPersonalization = () => {
    const hour = new Date().getHours();

    // Business hours urgency
    if (hour >= 9 && hour <= 17) {
      return {
        urgencyText: "Available now for live demo",
        timeSensitive: true
      };
    }

    // After hours
    return {
      urgencyText: "Book for tomorrow morning",
      timeSensitive: false
    };
  };

  return {
    personalizedCTA,
    getPersonalizedServiceCTA,
    getTimeBasedPersonalization,
    userJourney: getUserJourney(),
  };
}
