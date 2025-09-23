import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { siteConfig } from '@/config/site';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center group mb-6">
                <div className="flex items-center mr-4">
                  <Logo
                    variant="footer"
                    size="lg"
                    className="h-16 w-auto"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {siteConfig.name.split(' ')[0]}
                  </span>
                  <span className="text-xl text-gray-300 group-hover:text-green-300 transition-colors">
                    {siteConfig.name.split(' ')[1]}
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-6 text-gray-300 mb-6 max-w-md">
                {siteConfig.tagline}. We help businesses in {siteConfig.location} and across globe 
                leverage AI automation, mobile apps, and digital marketing to achieve exponential growth.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href={`mailto:${siteConfig.email}`} 
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                  aria-label="Email us"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                </Link>
                <Link 
                  href={`tel:${siteConfig.phone}`} 
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                  aria-label="Call us"
                >
                  <PhoneIcon className="h-5 w-5" />
                </Link>
                <span 
                  className="text-gray-400 p-2 rounded-lg"
                  aria-label="Location"
                >
                  <MapPinIcon className="h-5 w-5" />
                </span>
              </div>
            </div>

            {/* AI Solutions */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-4">AI Solutions</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/whatsapp-cx"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    WhatsApp CX Copilot
                  </Link>
                </li>
                <li>
                  <Link
                    href="/xerogap-ai"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    XeroGap AI Workflow
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enterprise-copilots"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Enterprise Copilots
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sales-automation"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Sales Intelligence
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-center-ai"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Contact Center AI
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dpdp-compliance"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    DPDP Compliance
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/case-studies"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/assessment"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    AI Assessment
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/consultation"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 dark:border-gray-700 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p className="text-xs text-gray-400">
                &copy; {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
              </p>
              <span className="hidden sm:inline text-gray-600">•</span>
              <p className="text-xs text-gray-400">
                Based in {siteConfig.location}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p className="text-xs text-gray-400">
                Serving clients globally
              </p>
              <span className="hidden sm:inline text-gray-600">•</span>
              <p className="text-xs text-gray-500 font-mono">
                v{siteConfig.version}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
