'use client';
import Link from 'next/link';

import React from 'react';
import { useCTAPersonalization } from '@/hooks/useCTAPersonalization';
import CTAButton from './CTAButton';
import CTALink from './CTALink';

interface PersonalizedCTASectionProps {
  section?: string;
  className?: string;
  variant?: 'blue' | 'gradient' | 'white';
  showUrgency?: boolean;
}

export default function PersonalizedCTASection({
  section,
  className = '',
  variant = 'blue',
  showUrgency = true,
}: PersonalizedCTASectionProps) {
  const { personalizedCTA, getTimeBasedPersonalization } = useCTAPersonalization();
  const { urgencyText, timeSensitive } = getTimeBasedPersonalization();

  const variantStyles = {
    blue: 'bg-green-600 text-white',
    gradient: 'bg-gradient-to-r from-green-600 to-emerald-600 text-white',
    white: 'bg-white text-gray-900 border border-gray-200',
  };

  const getUrgencyStyles = () => {
    switch (personalizedCTA.urgencyLevel) {
      case 'high':
        return 'ring-2 ring-red-500 ring-opacity-50 bg-red-50';
      case 'medium':
        return 'ring-1 ring-orange-400 ring-opacity-30 bg-orange-50';
      default:
        return '';
    }
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`}>
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className={`${getUrgencyStyles()} rounded-lg p-6 mb-8 ${personalizedCTA.urgencyLevel !== 'low' ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center mb-2">
              {personalizedCTA.urgencyLevel === 'high' && (
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              )}
              {personalizedCTA.urgencyLevel === 'medium' && (
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {personalizedCTA.urgencyLevel === 'high' ? 'High Interest Detected' : 'Growing Interest'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Based on your browsing behavior, here's what we recommend:
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {personalizedCTA.primaryText.replace('Free ', '').replace('Get ', '')}
          </h2>

          <p className={`mx-auto mt-6 max-w-xl text-lg leading-8 ${
            variant === 'white' ? 'text-gray-600' : 'text-green-100'
          }`}>
            {personalizedCTA.primaryText.includes('Consultation')
              ? "You've shown interest in our AI solutions. Let's discuss how we can help transform your business."
              : personalizedCTA.primaryText.includes('Demo')
              ? "See our AI solutions in action with a personalized demo tailored to your needs."
              : "Discover which AI automation solutions will drive the most impact for your business."
            }
          </p>

          {showUrgency && timeSensitive && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {urgencyText}
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
            <CTAButton
              href={personalizedCTA.primaryHref}
              variant={variant === 'white' ? 'primary' : 'secondary'}
              size="lg"
              trackingLabel={personalizedCTA.primaryText}
              trackingSection={section}
              ctaType={
                personalizedCTA.primaryHref.includes('/assessment') ? 'assessment' :
                personalizedCTA.primaryHref.includes('/demo') ? 'demo' :
                personalizedCTA.primaryHref.includes('/consultation') ? 'consultation' : 'contact'
              }
              className={personalizedCTA.urgencyLevel === 'high' ? 'ring-2 ring-red-500 ring-opacity-50' : ''}
            >
              {personalizedCTA.primaryText}
              {personalizedCTA.urgencyLevel === 'high' && (
                <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                  HOT
                </span>
              )}
            </CTAButton>

            {personalizedCTA.secondaryText && personalizedCTA.secondaryHref && (
              <CTALink
                href={personalizedCTA.secondaryHref}
                className={variant === 'white' ? 'text-green-600 hover:text-green-700' : 'text-white hover:text-green-100'}
                trackingLabel={personalizedCTA.secondaryText}
                trackingSection={section}
                ctaType={
                  personalizedCTA.secondaryHref.includes('/assessment') ? 'assessment' :
                  personalizedCTA.secondaryHref.includes('/demo') ? 'demo' :
                  personalizedCTA.secondaryHref.includes('/consultation') ? 'consultation' : 'contact'
                }
                showArrow
              >
                {personalizedCTA.secondaryText}
              </CTALink>
            )}
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>✨ Personalized recommendation based on your browsing behavior</p>
          </div>
        </div>
      </div>
    </div>
  );
}
