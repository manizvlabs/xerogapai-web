interface CalendlyWidget {
  initInlineWidget(options: Record<string, unknown>): void;
  closePopupWidget(): void;
  initPopupWidget(options: Record<string, unknown>): void;
}

declare global {
  interface Window {
    Calendly: CalendlyWidget;
  }
}

export interface CalendlyEventData {
  event: string;
  payload: {
    event: {
      uri: string;
      name: string;
      start_time: string;
      end_time: string;
    };
    invitee: {
      uri: string;
      name: string;
      email: string;
      first_name?: string;
      last_name?: string;
    };
    host: {
      uri: string;
      name: string;
    };
  };
}

export class CalendlyIntegration {
  private static scriptLoaded = false;

  static async loadCalendlyScript(): Promise<void> {
    if (this.scriptLoaded) return;

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      // Check if script is already loaded
      const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        this.scriptLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;

      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Calendly script'));
      };

      document.head.appendChild(script);
    });
  }

  static initWidget(
    url: string,
    element: HTMLElement,
    prefill?: {
      name?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      customAnswers?: Record<string, string>;
    }
  ): void {
    if (typeof window === 'undefined' || !window.Calendly) {
      console.warn('Calendly not loaded');
      return;
    }

    window.Calendly.initInlineWidget({
      url,
      parentElement: element,
      prefill,
    });
  }

  static openPopup(
    url: string,
    prefill?: {
      name?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      customAnswers?: Record<string, string>;
    }
  ): void {
    if (typeof window === 'undefined' || !window.Calendly) {
      console.warn('Calendly not loaded');
      return;
    }

    window.Calendly.initPopupWidget({ url, prefill });
  }

  static closePopup(): void {
    if (typeof window === 'undefined' || !window.Calendly) {
      return;
    }

    window.Calendly.closePopupWidget();
  }

  static onEventScheduled(callback: (data: CalendlyEventData) => void): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('message', (e) => {
      if (e.data.event && e.data.event.indexOf('calendly') === 0) {
        callback(e.data as CalendlyEventData);
      }
    });
  }

  static trackBooking(data: CalendlyEventData): void {
    // Track with Google Analytics
    if (typeof window !== 'undefined' && window.trackCTA) {
      window.trackCTA({
        action: 'book',
        category: 'calendly',
        label: 'demo_booked',
        value: 1000, // $1000 value for demo booking
        cta_type: 'demo'
      });
    }

    // Log the booking for internal tracking
    console.log('Demo booked via Calendly:', {
      eventUri: data.payload.event.uri,
      inviteeName: data.payload.invitee.name,
      inviteeEmail: data.payload.invitee.email,
      eventName: data.payload.event.name,
      startTime: data.payload.event.start_time,
      endTime: data.payload.event.end_time,
    });
  }
}

export default CalendlyIntegration;
