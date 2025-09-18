'use client';
import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useContent } from '@/hooks/useContent';
import ContactForm from '../app/contact/ContactForm';

export default function ContactPage() {
  const { content, loading, error } = useContent('contact');

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Loading contact page content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <p className="text-red-800">Error loading content: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default content structure
  const defaultContent = {
    hero: {
      title: "Get in Touch",
      subtitle: "Ready to transform your business? Let's discuss your project and create a solution that drives real results."
    },
    contactInfo: {
      title: "Contact information",
      description: "We're here to help you transform your business. Reach out to us through any of these channels.",
      details: [
        {
          icon: "MapPinIcon",
          label: "Address",
          value: "Hyderabad, Telangana, India\nServing clients globally"
        },
        {
          icon: "PhoneIcon",
          label: "Telephone",
          value: "+91 98765 43210",
          link: "tel:+919876543210"
        },
        {
          icon: "EnvelopeIcon",
          label: "Email",
          value: "info@zerodigital.ai",
          link: "mailto:info@zerodigital.ai"
        }
      ]
    },
    responseTime: {
      title: "Response time",
      description: "We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly."
    },
    consultation: {
      title: "Free consultation",
      description: "Schedule a free 30-minute consultation to discuss your project requirements and get a custom quote.",
      buttonText: "Schedule Now"
    }
  };

  const pageContent = {
    hero: content?.hero || defaultContent.hero,
    contactInfo: {
      ...defaultContent.contactInfo,
      ...(content?.contactInfo || content?.info || {}),
      details: (((content?.contactInfo as Record<string, unknown>)?.details || (content?.info as Record<string, unknown>)?.details || defaultContent.contactInfo.details) || [])
    },
    responseTime: (content?.responseTime as Record<string, unknown>) || defaultContent.responseTime,
    consultation: (content?.consultation as Record<string, unknown>) || defaultContent.consultation
  };

  // Icon mapping
  const iconMap = {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {(pageContent.hero as Record<string, unknown>).title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              {(pageContent.hero as Record<string, unknown>).subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="lg:pl-16">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{(pageContent.contactInfo as Record<string, unknown>).title}</h2>
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {(pageContent.contactInfo as Record<string, unknown>).description}
                </p>
                <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {(pageContent.contactInfo as Record<string, unknown>).details && Array.isArray((pageContent.contactInfo as Record<string, unknown>).details) && (pageContent.contactInfo as Record<string, unknown>).details.map((detail: { icon: string; label: string; value: string; link?: string }) => {
                    const IconComponent = iconMap[detail.icon as keyof typeof iconMap] || MapPinIcon;
                    return (
                      <div key={detail.label} className="flex gap-x-4">
                        <dt className="flex-none">
                          <span className="sr-only">{detail.label}</span>
                          <IconComponent className="h-7 w-6 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>
                          {detail.link ? (
                            <a className="hover:text-gray-900 dark:text-white" href={detail.link}>
                              {detail.value.split('\n').map((line, lineIndex) => (
                                <React.Fragment key={line}>
                                  {line}
                                  {lineIndex < detail.value.split('\n').length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </a>
                          ) : (
                            detail.value.split('\n').map((line, lineIndex) => (
                              <React.Fragment key={line}>
                                {line}
                                {lineIndex < detail.value.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            ))
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div className="mt-16">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">{(pageContent.responseTime as Record<string, unknown>).title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {(pageContent.responseTime as Record<string, unknown>).description}
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">{(pageContent.consultation as Record<string, unknown>).title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {(pageContent.consultation as Record<string, unknown>).description}
                  </p>
                  <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                    {(pageContent.consultation as Record<string, unknown>).buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
