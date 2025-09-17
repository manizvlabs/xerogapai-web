import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import type { Metadata } from "next";
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: "Contact - Zero Digital",
  description: "Get in touch with Zero Digital for AI automation, mobile app development, and digital transformation solutions. Based in Hyderabad, serving clients globally.",
};

export default function Contact() {

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ready to transform your business? Let&apos;s discuss your project and create a solution that drives real results.
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
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Contact information</h2>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  We&apos;re here to help you transform your business. Reach out to us through any of these channels.
                </p>
                <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Address</span>
                      <MapPinIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      Hyderabad, Telangana, India<br />
                      Serving clients globally
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Telephone</span>
                      <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <a className="hover:text-gray-900" href="tel:+919876543210">
                        +91 98765 43210
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <a className="hover:text-gray-900" href="mailto:info@zerodigital.ai">
                        info@zerodigital.ai
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-16">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">Response time</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">Free consultation</h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    Schedule a free 30-minute consultation to discuss your project requirements and get a custom quote.
                  </p>
                  <button className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
                    Schedule Now
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
