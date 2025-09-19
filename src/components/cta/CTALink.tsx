'use client';

import React from 'react';
import Link from 'next/link';
import { useCTATracking } from '@/hooks/useCTATracking';

interface CTALinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  trackingLabel?: string;
  trackingSection?: string;
  ctaType?: 'primary' | 'secondary' | 'assessment' | 'demo' | 'consultation' | 'contact';
  serviceType?: string;
  external?: boolean;
  showArrow?: boolean;
}

export default function CTALink({
  children,
  href,
  className = '',
  trackingLabel,
  trackingSection,
  ctaType,
  serviceType,
  external = false,
  showArrow = false,
}: CTALinkProps) {
  const { trackCTAClick, getUserJourney } = useCTATracking();

  const handleClick = () => {
    const label = trackingLabel || (typeof children === 'string' ? children : 'CTA Link');
    const journey = getUserJourney();

    trackCTAClick(label, {
      section: trackingSection,
      cta_type: ctaType,
      service_type: serviceType,
      user_journey: journey.map(item => item.cta_type).filter(Boolean),
    });
  };

  const linkClasses = `
    inline-flex items-center font-semibold transition-colors hover:text-blue-600
    ${className}
  `.trim();

  if (external) {
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        {showArrow && <span className="ml-1" aria-hidden="true">→</span>}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={linkClasses}
    >
      {children}
      {showArrow && <span className="ml-1" aria-hidden="true">→</span>}
    </Link>
  );
}
