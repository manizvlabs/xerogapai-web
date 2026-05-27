'use client';

import { useEffect } from 'react';
import { getCookieConsent } from '@/src/components/ui/CookieBanner';

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '';

function loadClarity() {
  if (typeof window === 'undefined' || !PROJECT_ID) return;
  if ((window as unknown as Record<string, unknown>)['clarity']) return;

  (function (c: Window, l: Document, a: string, r: string, i: string) {
    type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
    (c as unknown as Record<string, ClarityFn>)[a] =
      (c as unknown as Record<string, ClarityFn>)[a] ||
      function (...args: unknown[]) {
        ((c as unknown as Record<string, ClarityFn>)[a].q =
          (c as unknown as Record<string, ClarityFn>)[a].q || []).push(args);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, 'clarity', 'script', PROJECT_ID);
}

export function ClarityProvider() {
  useEffect(() => {
    if (getCookieConsent() === 'accepted') {
      loadClarity();
    }

    function handleConsentAccepted() {
      loadClarity();
    }

    window.addEventListener('vyaptix:consent-accepted', handleConsentAccepted);
    return () => window.removeEventListener('vyaptix:consent-accepted', handleConsentAccepted);
  }, []);

  return null;
}
