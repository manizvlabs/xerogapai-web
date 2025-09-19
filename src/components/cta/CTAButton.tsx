'use client';

import React from 'react';
import Link from 'next/link';
import { useCTATracking } from '@/hooks/useCTATracking';

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  trackingLabel?: string;
  trackingSection?: string;
  ctaType?: 'primary' | 'secondary' | 'assessment' | 'demo' | 'consultation' | 'contact';
  serviceType?: string;
  disabled?: boolean;
  external?: boolean;
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
  secondary: 'bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
  outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm font-medium',
  md: 'px-4 py-3 text-sm font-semibold',
  lg: 'px-6 py-4 text-base font-semibold'
};

export default function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  trackingLabel,
  trackingSection,
  ctaType,
  serviceType,
  disabled = false,
  external = false,
}: CTAButtonProps) {
  const { trackCTAClick, getUserJourney } = useCTATracking();

  const handleClick = (e: React.MouseEvent) => {
    // Track the CTA click
    const label = trackingLabel || (typeof children === 'string' ? children : 'CTA Button');
    const journey = getUserJourney();

    trackCTAClick(label, {
      section: trackingSection,
      cta_type: ctaType,
      service_type: serviceType,
      user_journey: journey.map(item => item.cta_type).filter(Boolean),
    });

    // Call the original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  const buttonClasses = `
    inline-flex items-center justify-center rounded-md transition-colors
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          onClick={handleClick}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        onClick={handleClick}
        className={buttonClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
