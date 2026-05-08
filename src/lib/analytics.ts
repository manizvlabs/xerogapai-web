import posthog from 'posthog-js';

let initialized = false;

const IDENTITY_KEY = 'vyaptix_user';

export interface UserIdentity {
  email: string;
  name?: string;
  company?: string;
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  if (initialized) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
    capture_pageview: false,
    persistence: 'localStorage',
  });

  initialized = true;
}

export function identifyUser(identity: UserIdentity) {
  if (!initialized) return;
  const { email, name, company } = identity;
  posthog.identify(email, {
    email,
    ...(name && { name }),
    ...(company && { company }),
  });
  persistIdentity(identity);
}

export function persistIdentity(identity: UserIdentity) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(IDENTITY_KEY, JSON.stringify(identity));
  } catch {
    // localStorage unavailable (private mode, storage full, etc.)
  }
}

export function loadStoredIdentity(): UserIdentity | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(IDENTITY_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserIdentity;
  } catch {
    return null;
  }
}

export function trackPageView(path: string) {
  if (!initialized) return;
  posthog.capture('$pageview', { $current_url: path });
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(event, properties);
}
