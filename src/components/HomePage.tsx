'use client';

import Link from 'next/link';
import { useRegion } from '@/contexts/RegionContext';
import Logo from './Logo';
import { globalHomepageContent } from '@/regions/global/homepage';
import { indianHomepageContent } from '@/regions/indian/homepage';

export default function HomePage() {
  const { currentRegion } = useRegion();

  // Select content based on region
  const content = currentRegion === 'india' ? indianHomepageContent : globalHomepageContent;

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative isolate px-6 pt-14 lg:px-8">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5" 
          style={{ 
            backgroundImage: 'url(/logo-pattern.png)',
            backgroundSize: '800px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            zIndex: -2
          }}
          aria-hidden="true"
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-600/20 to-emerald-400/20 dark:from-green-600/10 dark:to-emerald-400/10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>

        {/* Logo Watermark Background */}
        <div className="absolute inset-0 -z-5 opacity-[0.08] dark:opacity-[0.12]" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <Logo variant="hero" size="xl" className="w-80 h-auto" />
          </div>
          <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
            <Logo variant="hero" size="xl" className="w-80 h-auto" />
          </div>
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 rotate-12">
            <Logo variant="hero" size="lg" className="w-64 h-auto" />
          </div>
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              {content.hero.headline}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
              {content.hero.subheadline}
            </p>

            {/* Region-specific messaging */}
            {currentRegion === 'india' && content.hero.localizedMessage && (
              <p className="mt-4 text-lg leading-8 text-green-600 dark:text-green-400 font-medium">
                {content.hero.localizedMessage}
              </p>
            )}

            {/* Quick Implementation CTA Section */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link
                href="/assessment"
                className="flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
              >
                Get Free AI Readiness Assessment
              </Link>
              <Link
                href="/demo"
                className="flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-600 border border-green-200 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
              >
                Book Personalized Demo
              </Link>
              <Link
                href="/consultation"
                className="flex items-center justify-center rounded-md bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors"
              >
                Schedule Consultation <span aria-hidden="true">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
        {/* Logo Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" aria-hidden="true">
          <div className="absolute top-12 right-12 transform rotate-6">
            <Logo variant="hero" size="sm" className="w-20 h-auto" />
          </div>
          <div className="absolute bottom-12 left-12 transform -rotate-6">
            <Logo variant="hero" size="sm" className="w-20 h-auto" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {content.services.sectionTitle}
            </h2>
            {currentRegion === 'india' && content.services.localizedNote && (
              <p className="mt-4 text-lg text-green-600 dark:text-green-400 font-medium">
                {content.services.localizedNote}
              </p>
            )}
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {content.services.services.map((service) => (
                <div
                  key={service.id}
                  className={`relative bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm border-2 transition-all hover:shadow-md ${
                    service.pricing.popular
                      ? 'border-green-500 dark:border-green-400'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {service.pricing.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white">
                      {service.subtitle}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        <span className="text-sm text-gray-600 dark:text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {service.pricing.starting}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-white">/month</span>
                    </div>
                    {service.pricing.note && (
                      <p className="text-xs text-gray-500 dark:text-white mt-1">
                        {service.pricing.note}
                      </p>
                    )}
                  </div>

                  {service.href ? (
                    <Link
                      href={service.href}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block"
                    >
                      {service.cta}
                    </Link>
                  ) : (
                    <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      {service.cta}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative py-24 sm:py-32 bg-white dark:bg-gray-900">
        {/* Logo Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" aria-hidden="true">
          <div className="absolute top-16 left-1/4 transform -translate-x-1/2 -rotate-12">
            <Logo variant="hero" size="sm" className="w-16 h-auto" />
          </div>
          <div className="absolute bottom-16 right-1/4 transform translate-x-1/2 rotate-12">
            <Logo variant="hero" size="sm" className="w-16 h-auto" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {content.socialProof.sectionTitle}
            </h2>
            {currentRegion === 'india' && content.socialProof.localizedMessage && (
              <p className="mt-4 text-lg text-green-600 dark:text-green-400 font-medium">
                {content.socialProof.localizedMessage}
              </p>
            )}
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {content.socialProof.testimonials.map((testimonial) => (
                <div key={`${testimonial.author}-${testimonial.company}`} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                  <div className="text-4xl mb-4 text-gray-400">&quot;</div>
                  <blockquote className="text-gray-700 dark:text-white mb-6 italic">
                    {testimonial.quote}
                  </blockquote>

                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-white">
                        {testimonial.position}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-white">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {Object.entries(testimonial.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {value}
                        </div>
                        <div className="text-xs text-gray-700 dark:text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative py-16 bg-gray-50 dark:bg-gray-800">
        {/* Logo Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
            <Logo variant="hero" size="sm" className="w-16 h-auto" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {content.partners.sectionTitle}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
              {content.partners.partners.map((partner) => (
                <div key={partner.name} className="flex items-center justify-center p-4 bg-white dark:bg-gray-900 rounded-lg">
                  <span className="text-gray-700 dark:text-white font-medium">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="relative py-16 bg-white dark:bg-gray-900">
        {/* Logo Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none" aria-hidden="true">
          <div className="absolute top-8 right-8 transform rotate-6">
            <Logo variant="icon" size="sm" className="w-12 h-auto" />
          </div>
          <div className="absolute bottom-8 left-8 transform -rotate-6">
            <Logo variant="icon" size="sm" className="w-12 h-auto" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {content.compliance.sectionTitle}
            </h2>
            <p className="text-gray-600 dark:text-white mb-8 max-w-2xl mx-auto">
              {content.compliance.message}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {content.compliance.badges.map((badge) => (
                <div key={badge.name} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    {badge.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 sm:py-32 bg-green-600 dark:bg-green-700">
        {/* Logo Background Pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden="true">
          <div className="absolute top-16 left-16 transform rotate-12">
            <Logo variant="dark" size="md" className="w-28 h-auto" />
          </div>
          <div className="absolute bottom-16 right-16 transform -rotate-12">
            <Logo variant="dark" size="md" className="w-28 h-auto" />
          </div>
          <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2 rotate-45">
            <Logo variant="dark" size="sm" className="w-16 h-auto" />
          </div>
        </div>
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {content.finalCTA.sectionTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-green-100">
              {content.finalCTA.content}
            </p>
            {currentRegion === 'india' && content.finalCTA.localizedContent && (
              <p className="mt-4 text-lg text-green-200">
                {content.finalCTA.localizedContent}
              </p>
            )}

            <ul className="mt-8 space-y-2">
              {content.finalCTA.offers.map((offer) => (
                <li key={offer} className="flex items-center justify-center text-green-100">
                  <span className="text-green-300 mr-2">✓</span>
                  {offer}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
              <Link
                href={content.finalCTA.primaryCTA.href}
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {content.finalCTA.primaryCTA.text}
              </Link>
              <Link
                href={content.finalCTA.secondaryCTA.href}
                className="rounded-md border-2 border-white px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                {content.finalCTA.secondaryCTA.text} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
