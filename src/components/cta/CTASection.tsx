'use client';

import React from 'react';
import CTAButton from './CTAButton';
import CTALink from './CTALink';
import Logo from '../Logo';

interface CTASectionProps {
  readonly title: string;
  readonly description: string;
  readonly primaryButton?: {
    readonly text: string;
    readonly href: string;
    readonly ctaType?: 'assessment' | 'demo' | 'consultation' | 'contact';
  };
  readonly secondaryButton?: {
    readonly text: string;
    readonly href: string;
    readonly ctaType?: 'assessment' | 'demo' | 'consultation' | 'contact';
  };
  readonly section?: string;
  readonly className?: string;
  readonly variant?: 'blue' | 'gradient' | 'white';
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
    blue: 'bg-green-600 text-white',
    gradient: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
    white: 'bg-white text-gray-900 border border-gray-200',
  };

  return (
    <div className={`relative ${variantStyles[variant]} ${className}`}>
      {/* Logo Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none" aria-hidden="true">
        <div className="absolute top-4 left-4 transform rotate-12">
          <Logo variant="icon" size="sm" className="w-12 h-auto" />
        </div>
        <div className="absolute bottom-4 right-4 transform -rotate-12">
          <Logo variant="icon" size="sm" className="w-12 h-auto" />
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 rotate-45">
          <Logo variant="icon" size="sm" className="w-10 h-auto" />
        </div>
      </div>

      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className={`mx-auto mt-6 max-w-xl text-lg leading-8 ${
            variant === 'white' ? 'text-gray-600' : 'text-green-100'
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
                className={variant === 'white' ? 'text-green-600 hover:text-green-700' : 'text-white hover:text-green-100'}
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
