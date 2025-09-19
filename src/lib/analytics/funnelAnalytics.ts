export interface FunnelStep {
  id: string;
  name: string;
  url: string;
  events: string[];
  conversionRate?: number;
  averageTime?: number;
}

export interface FunnelData {
  funnelId: string;
  name: string;
  steps: FunnelStep[];
  totalEntrances: number;
  totalConversions: number;
  conversionRate: number;
  averageTimeToConvert: number;
}

export interface UserJourney {
  sessionId: string;
  userId?: string;
  startTime: Date;
  steps: JourneyStep[];
  converted: boolean;
  conversionValue?: number;
  timeToConvert?: number;
}

export interface JourneyStep {
  timestamp: Date;
  page: string;
  action: string;
  element?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export class FunnelAnalytics {
  private static instance: FunnelAnalytics;
  private funnels: Map<string, FunnelData> = new Map();
  private userJourneys: Map<string, UserJourney> = new Map();

  private constructor() {
    this.initializeFunnels();
  }

  static getInstance(): FunnelAnalytics {
    if (!FunnelAnalytics.instance) {
      FunnelAnalytics.instance = new FunnelAnalytics();
    }
    return FunnelAnalytics.instance;
  }

  private initializeFunnels() {
    // Assessment Funnel
    this.funnels.set('assessment_funnel', {
      funnelId: 'assessment_funnel',
      name: 'AI Assessment Conversion',
      steps: [
        {
          id: 'visit_homepage',
          name: 'Visit Homepage',
          url: '/',
          events: ['page_view']
        },
        {
          id: 'click_assessment_cta',
          name: 'Click Assessment CTA',
          url: '/assessment',
          events: ['cta_click', 'assessment_start']
        },
        {
          id: 'start_assessment',
          name: 'Start Assessment',
          url: '/assessment',
          events: ['assessment_start']
        },
        {
          id: 'complete_assessment',
          name: 'Complete Assessment',
          url: '/assessment',
          events: ['assessment_complete']
        },
        {
          id: 'submit_email',
          name: 'Submit Email for Report',
          url: '/assessment',
          events: ['lead_capture', 'email_submit']
        },
        {
          id: 'book_consultation',
          name: 'Book Consultation',
          url: '/consultation',
          events: ['consultation_booked']
        }
      ],
      totalEntrances: 0,
      totalConversions: 0,
      conversionRate: 0,
      averageTimeToConvert: 0
    });

    // Demo Funnel
    this.funnels.set('demo_funnel', {
      funnelId: 'demo_funnel',
      name: 'Demo Booking Conversion',
      steps: [
        {
          id: 'visit_homepage',
          name: 'Visit Homepage',
          url: '/',
          events: ['page_view']
        },
        {
          id: 'click_demo_cta',
          name: 'Click Demo CTA',
          url: '/demo',
          events: ['cta_click', 'demo_start']
        },
        {
          id: 'start_demo_booking',
          name: 'Start Demo Booking',
          url: '/demo',
          events: ['demo_start']
        },
        {
          id: 'complete_demo_form',
          name: 'Complete Demo Form',
          url: '/demo',
          events: ['demo_form_complete']
        },
        {
          id: 'book_demo',
          name: 'Book Demo',
          url: '/demo',
          events: ['demo_booked']
        }
      ],
      totalEntrances: 0,
      totalConversions: 0,
      conversionRate: 0,
      averageTimeToConvert: 0
    });

    // Service Interest Funnel
    this.funnels.set('service_funnel', {
      funnelId: 'service_funnel',
      name: 'Service Page Conversion',
      steps: [
        {
          id: 'visit_homepage',
          name: 'Visit Homepage',
          url: '/',
          events: ['page_view']
        },
        {
          id: 'visit_service_page',
          name: 'Visit Service Page',
          url: '/services/*',
          events: ['page_view']
        },
        {
          id: 'click_learn_more',
          name: 'Click Learn More',
          url: '/services/*',
          events: ['cta_click']
        },
        {
          id: 'visit_detailed_page',
          name: 'Visit Detailed Service Page',
          url: '/*',
          events: ['page_view']
        },
        {
          id: 'book_demo',
          name: 'Book Demo',
          url: '/demo',
          events: ['demo_booked']
        }
      ],
      totalEntrances: 0,
      totalConversions: 0,
      conversionRate: 0,
      averageTimeToConvert: 0
    });
  }

  trackEvent(eventData: {
    event: string;
    page: string;
    userId?: string;
    sessionId?: string;
    element?: string;
    value?: number;
    metadata?: Record<string, any>;
  }) {
    const { event, page, userId, sessionId, element, value, metadata } = eventData;

    // Generate session ID if not provided
    const currentSessionId = sessionId || this.getOrCreateSessionId();

    // Update user journey
    this.updateUserJourney(currentSessionId, userId, {
      timestamp: new Date(),
      page,
      action: event,
      element,
      value,
      metadata
    });

    // Update funnel data
    this.updateFunnelData(event, page, currentSessionId);

    // Store analytics data
    this.storeAnalyticsData(eventData);
  }

  private updateUserJourney(sessionId: string, userId?: string, step: JourneyStep) {
    let journey = this.userJourneys.get(sessionId);

    if (!journey) {
      journey = {
        sessionId,
        userId,
        startTime: new Date(),
        steps: [],
        converted: false
      };
      this.userJourneys.set(sessionId, journey);
    }

    journey.steps.push(step);

    // Check for conversion events
    const conversionEvents = ['assessment_complete', 'demo_booked', 'consultation_booked', 'lead_capture'];
    if (conversionEvents.includes(step.action)) {
      journey.converted = true;
      journey.conversionValue = step.value;
      journey.timeToConvert = step.timestamp.getTime() - journey.startTime.getTime();
    }
  }

  private updateFunnelData(event: string, page: string, sessionId: string) {
    // Update relevant funnels based on the event and page
    this.funnels.forEach((funnel, funnelId) => {
      const relevantStep = funnel.steps.find(step =>
        step.events.includes(event) &&
        (step.url === page || step.url === '/' || step.url.includes('*'))
      );

      if (relevantStep) {
        // Track step progression
        this.trackFunnelStep(funnelId, relevantStep.id, sessionId);
      }
    });
  }

  private trackFunnelStep(funnelId: string, stepId: string, sessionId: string) {
    // In a real implementation, this would update step counts and conversion rates
    console.log(`Funnel ${funnelId}: Step ${stepId} reached by session ${sessionId}`);
  }

  private storeAnalyticsData(data: any) {
    // In a real implementation, this would store data in a database or analytics service
    console.log('Analytics data stored:', data);

    // Store in localStorage for demo purposes
    if (typeof window !== 'undefined') {
      const existingData = JSON.parse(localStorage.getItem('analytics_data') || '[]');
      existingData.push({
        ...data,
        timestamp: new Date().toISOString()
      });

      // Keep only last 1000 events
      if (existingData.length > 1000) {
        existingData.splice(0, existingData.length - 1000);
      }

      localStorage.setItem('analytics_data', JSON.stringify(existingData));
    }
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return 'server_session';

    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  getFunnelData(funnelId: string): FunnelData | null {
    return this.funnels.get(funnelId) || null;
  }

  getAllFunnelData(): FunnelData[] {
    return Array.from(this.funnels.values());
  }

  getUserJourney(sessionId: string): UserJourney | null {
    return this.userJourneys.get(sessionId) || null;
  }

  getAnalyticsReport(timeframe: 'day' | 'week' | 'month' = 'week'): {
    totalVisitors: number;
    totalConversions: number;
    conversionRate: number;
    topPages: Array<{ page: string; visits: number }>;
    topEvents: Array<{ event: string; count: number }>;
    funnelPerformance: Array<{ funnel: string; conversionRate: number }>;
  } {
    // In a real implementation, this would query stored analytics data
    // For demo purposes, return mock data
    return {
      totalVisitors: 1250,
      totalConversions: 87,
      conversionRate: 6.96,
      topPages: [
        { page: '/', visits: 850 },
        { page: '/assessment', visits: 320 },
        { page: '/demo', visits: 180 },
        { page: '/services', visits: 150 }
      ],
      topEvents: [
        { event: 'page_view', count: 2100 },
        { event: 'cta_click', count: 450 },
        { event: 'assessment_complete', count: 87 },
        { event: 'demo_booked', count: 35 }
      ],
      funnelPerformance: [
        { funnel: 'Assessment Funnel', conversionRate: 8.2 },
        { funnel: 'Demo Funnel', conversionRate: 5.4 },
        { funnel: 'Service Funnel', conversionRate: 12.1 }
      ]
    };
  }

  exportAnalyticsData(): any {
    if (typeof window === 'undefined') return null;

    try {
      const storedData = JSON.parse(localStorage.getItem('analytics_data') || '[]');
      return {
        events: storedData,
        funnels: this.getAllFunnelData(),
        userJourneys: Array.from(this.userJourneys.values()),
        report: this.getAnalyticsReport()
      };
    } catch {
      return null;
    }
  }
}

export const funnelAnalytics = FunnelAnalytics.getInstance();
