'use client';

import React from 'react';
import CTAButton from './CTAButton';
import CTALink from './CTALink';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    href: string;
    ctaType?: 'assessment' | 'demo' | 'consultation' | 'contact';
  };
  secondaryButton?: {
    text: string;
    href: string;
    ctaType?: 'assessment' | 'demo' | 'consultation' | 'contact';
  };
  section?: string;
  className?: string;
  variant?: 'blue' | 'gradient' | 'white';
}

export default function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  section,
  className = '',
  variant = 'blue',
}: CTASectionProps) {
  const variantStyles = {
    blue: 'bg-blue-600 text-white',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    white: 'bg-white text-gray-900 border border-gray-200',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className={`mx-auto mt-6 max-w-xl text-lg leading-8 ${
            variant === 'white' ? 'text-gray-600' : 'text-blue-100'
          }`}>
            {description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
            {primaryButton && (
              <CTAButton
                href={primaryButton.href}
                variant={variant === 'white' ? 'primary' : 'secondary'}
                size="lg"
                trackingLabel={primaryButton.text}
                trackingSection={section}
                ctaType={primaryButton.ctaType}
              >
                {primaryButton.text}
              </CTAButton>
            )}
            {secondaryButton && (
              <CTALink
                href={secondaryButton.href}
                className={variant === 'white' ? 'text-blue-600 hover:text-blue-700' : 'text-white hover:text-blue-100'}
                trackingLabel={secondaryButton.text}
                trackingSection={section}
                ctaType={secondaryButton.ctaType}
                showArrow
              >
                {secondaryButton.text}
              </CTALink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
