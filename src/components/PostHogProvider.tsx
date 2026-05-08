'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initAnalytics, trackPageView, identifyUser, loadStoredIdentity } from '@/src/lib/analytics';
import { getCookieConsent } from '@/src/components/ui/CookieBanner';

function tryIdentifyFromContext() {
  // 1. URL params — e.g. email links: ?ph_email=x&ph_name=y
  const params = new URLSearchParams(window.location.search);
  const urlEmail = params.get('ph_email');
  const urlName = params.get('ph_name');
  if (urlEmail) {
    identifyUser({ email: urlEmail, name: urlName ?? undefined });
    return;
  }

  // 2. Previously stored identity from a contact form submission
  const stored = loadStoredIdentity();
  if (stored) {
    identifyUser(stored);
  }
}

export function PostHogProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize on mount if already consented
  useEffect(() => {
    if (getCookieConsent() === 'accepted') {
      initAnalytics();
      tryIdentifyFromContext();
    }

    function handleConsentAccepted() {
      initAnalytics();
      tryIdentifyFromContext();
      trackPageView(window.location.pathname);
    }

    window.addEventListener('vyaptix:consent-accepted', handleConsentAccepted);
    return () => window.removeEventListener('vyaptix:consent-accepted', handleConsentAccepted);
  }, []);

  // Re-check identity when URL params change (e.g. user lands from email link)
  useEffect(() => {
    if (getCookieConsent() !== 'accepted') return;
    const email = searchParams?.get('ph_email');
    const name = searchParams?.get('ph_name');
    if (email) {
      identifyUser({ email, name: name ?? undefined });
    }
  }, [searchParams]);

  // Track page views on navigation
  useEffect(() => {
    if (pathname && getCookieConsent() === 'accepted') {
      trackPageView(pathname);
    }
  }, [pathname]);

  return null;
}
