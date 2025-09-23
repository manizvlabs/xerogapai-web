'use client';
import Link from 'next/link';
import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, DevicePhoneMobileIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useContent } from '@/hooks/useContent';
import { useRegion } from '@/contexts/RegionContext';
import ContactForm from '../app/contact/ContactForm';

interface ConsultationSection {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

interface ResponseTimeSection {
  title: string;
  description: string;
}

interface RegionalSupportSection {
  title: string;
  india: {
    title: string;
    contact: string;
    whatsapp: string;
    timezone: string;
    languages: string;
  };
  global: {
    title: string;
    contact: string;
    whatsapp: string;
    timezone: string;
    languages: string;
  };
}

interface ContactPageContent {
  consultation?: ConsultationSection;
  responseTime?: ResponseTimeSection;
  regionalSupport?: RegionalSupportSection;
}

export default function ContactPage() {
  const { content, loading, error } = useContent('contact');

  // Default content structure (moved up before usage)
  const defaultContent = {
    hero: {
      title: "Get in Touch with Our AI Experts",
      subtitle: "Ready to transform your business with AI automation? Let's discuss your specific needs and create a solution that drives measurable results."
    },
    contactInfo: {
      title: "Contact Information",
      description: "Connect with our AI specialists through your preferred channel. We serve businesses globally with dedicated regional support.",
      details: []
    },
    responseTime: {
      title: "Quick Response Guarantee",
      description: "We respond to all inquiries within 24 hours, with urgent requests receiving same-day attention."
    },
    consultation: {
      title: "Book a Consultation",
      description: "Schedule a personalized consultation to discuss your AI automation needs and explore how XeroGap AI can transform your business operations.",
      buttonText: "Book Consultation",
      buttonHref: "/consultation"
    },
    regionalSupport: {
      title: "Regional Support Teams",
      india: {
        title: "India Support",
        contact: "",
        whatsapp: "https://wa.me/919876543210",
        timezone: "IST (GMT+5:30)",
        languages: "English, Hindi"
      },
      global: {
        title: "Global Support",
        contact: "+1 (555) 123-4567",
        whatsapp: "https://wa.me/15551234567",
        timezone: "EST (GMT-5)",
        languages: "English, Arabic, French"
      }
    }
  };

  const pageContent: ContactPageContent = {
    hero: content?.hero || defaultContent.hero,
    contactInfo: {
      ...defaultContent.contactInfo,
      ...(content?.contactInfo || content?.info || {})
    },
    responseTime: (content?.responseTime as Record<string, unknown>) || defaultContent.responseTime,
    consultation: (content?.consultation as Record<string, unknown>) || defaultContent.consultation,
    regionalSupport: content?.regionalSupport || defaultContent.regionalSupport
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-white">Loading contact page content...</p>
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



  // Icon mapping
  const iconMap = {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon
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
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
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
                <p className="mt-4 text-base leading-7 text-gray-600 dark:text-white">
                  {(pageContent.contactInfo as Record<string, unknown>).description}
                </p>
                <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600 dark:text-white">
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
                            <Link className="hover:text-gray-900 dark:text-white" href={detail.link}>
                              {detail.value.split('\n').map((line, lineIndex) => (
                                <React.Fragment key={line}>
                                  {line}
                                  {lineIndex < detail.value.split('\n').length - 1 && <br />}
                                </React.Fragment>
                              ))}
                            </Link>
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
                  <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">{pageContent.responseTime?.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-white">
                    {pageContent.responseTime?.description}
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">{pageContent.consultation?.title}</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-white">
                    {pageContent.consultation?.description}
                  </p>
                  <Link
                    href={pageContent.consultation?.buttonHref || "/assessment"}
                    className="mt-4 inline-block rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
                  >
                    {pageContent.consultation?.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Support Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {pageContent.regionalSupport?.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              Dedicated support teams for your region with local language assistance and timezone alignment.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* India Support */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    🇮🇳
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {pageContent.regionalSupport?.india?.title || "India Support"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white">
                      {pageContent.regionalSupport?.india?.timezone || "IST (GMT+5:30)"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-green-600" />
                    <Link href={`tel:${pageContent.regionalSupport?.india?.contact || "+919876543210"}`}
                       className="text-gray-600 dark:text-white hover:text-green-600">
                      {pageContent.regionalSupport?.india?.contact || "+91 98765 43210"}
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-green-600" />
                    <Link href={pageContent.regionalSupport?.india?.whatsapp || "https://wa.me/919876543210"}
                       className="text-gray-600 dark:text-white hover:text-green-600">
                      WhatsApp Business
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    <GlobeAltIcon className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-600 dark:text-white">
                      {pageContent.regionalSupport?.india?.languages || "English, Hindi, Telugu, Tamil"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-white">
                    Available: 9 AM - 9 PM IST | Response: &lt; 2 hours
                  </p>
                </div>
              </div>

              {/* Global Support */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                    🌍
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {pageContent.regionalSupport?.global?.title || "Global Support"}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-white">
                      {pageContent.regionalSupport?.global?.timezone || "EST (GMT-5)"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-green-600" />
                    <Link href={`tel:${pageContent.regionalSupport?.global?.contact || "+15551234567"}`}
                       className="text-gray-600 dark:text-white hover:text-green-600">
                      {pageContent.regionalSupport?.global?.contact || "+1 (555) 123-4567"}
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    <DevicePhoneMobileIcon className="w-5 h-5 text-green-600" />
                    <Link href={pageContent.regionalSupport?.global?.whatsapp || "https://wa.me/15551234567"}
                       className="text-gray-600 dark:text-white hover:text-green-600">
                      WhatsApp Business
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    <GlobeAltIcon className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-600 dark:text-white">
                      {pageContent.regionalSupport?.global?.languages || "English, Arabic, French"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-white">
                    Available: 9 AM - 6 PM EST | Response: &lt; 4 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
