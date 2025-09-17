import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/config/site';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center group mb-4">
                <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {siteConfig.name.split(' ')[0]}
                </span>
                <span className="text-lg text-gray-300 ml-2 group-hover:text-blue-300 transition-colors">
                  {siteConfig.name.split(' ')[1]}
                </span>
              </Link>
              <p className="text-sm leading-6 text-gray-300 mb-6 max-w-md">
                {siteConfig.tagline}. We help businesses in {siteConfig.location} and across India 
                leverage AI automation, mobile apps, and digital marketing to achieve exponential growth.
              </p>
              <div className="flex space-x-4">
                <a 
                  href={`mailto:${siteConfig.email}`} 
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                  aria-label="Email us"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                </a>
                <a 
                  href={`tel:${siteConfig.phone}`} 
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                  aria-label="Call us"
                >
                  <PhoneIcon className="h-5 w-5" />
                </a>
                <span 
                  className="text-gray-400 p-2 rounded-lg"
                  aria-label="Location"
                >
                  <MapPinIcon className="h-5 w-5" />
                </span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-4">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/services" 
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    AI Content Automation
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Mobile App Development
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/services" 
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    AI Agent Development
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-4">Quick Links</h3>
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
                    href="/portfolio" 
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog" 
                    className="text-sm text-gray-300 hover:text-white transition-colors block py-1"
                  >
                    Blog
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
