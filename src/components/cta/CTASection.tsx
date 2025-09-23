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
    blue: 'bg-blue-600 text-white',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    white: 'bg-white text-gray-900 border border-gray-200',
  };

  return (
    <div className={`relative ${variantStyles[variant]} ${className}`}>
      {/* Logo Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true">
        <div className="absolute top-8 left-8 transform rotate-12">
          <Logo variant="icon" size="sm" className="w-16 h-auto" />
        </div>
        <div className="absolute bottom-8 right-8 transform -rotate-12">
          <Logo variant="icon" size="sm" className="w-16 h-auto" />
        </div>
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
          <Logo variant="icon" size="sm" className="w-12 h-auto" />
        </div>
      </div>

      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
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
