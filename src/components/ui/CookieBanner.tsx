'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'vyaptix_cookie_consent';

export type CookieConsent = 'accepted' | 'declined';

export function getCookieConsent(): CookieConsent | null {
  try {
    return localStorage.getItem(CONSENT_KEY) as CookieConsent | null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    window.dispatchEvent(new Event('vyaptix:consent-accepted'));
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <div className="max-w-5xl mx-auto bg-white border border-border-light rounded-xl shadow-large px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="flex-1 text-sm text-text-secondary leading-relaxed">
          <span className="font-semibold text-text">We use cookies</span> to improve your experience and understand how visitors use our site.
          You can accept or decline below. See our{' '}
          <Link href="/privacy-policy" className="text-primary-500 hover:text-primary-600 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}for details.
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-text-secondary border border-border-medium rounded-md hover:bg-background-alt transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
