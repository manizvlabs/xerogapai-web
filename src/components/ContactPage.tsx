'use client';
import Link from 'next/link';
import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, DevicePhoneMobileIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useContent } from '@/hooks/useContent';
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


interface ContactPageContent {
  consultation?: ConsultationSection;
  responseTime?: ResponseTimeSection;
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
    }
  };

  const pageContent: ContactPageContent = {
    hero: content?.hero || defaultContent.hero,
    contactInfo: {
      ...defaultContent.contactInfo,
      ...(content?.contactInfo || content?.info || {})
    },
    responseTime: (content?.responseTime as Record<string, unknown>) || defaultContent.responseTime,
    consultation: (content?.consultation as Record<string, unknown>) || defaultContent.consultation
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
      <div className="relative isolate bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-blue-700 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]">
            <svg>
              <defs>
                <pattern id="contact-pattern" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#contact-pattern)" />
            </svg>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800/30 text-blue-200 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>Get in Touch
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {(pageContent.hero as Record<string, unknown>).title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                {" "}& Support
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-300">
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
                    className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                  >
                    {pageContent.consultation?.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Back to Home Link */}
      <div className="fixed bottom-6 left-6 z-40">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
