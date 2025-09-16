import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/config/site';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="-m-1.5 p-1.5 group">
              <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {siteConfig.name.split(' ')[0]}
              </span>
              <span className="text-sm text-gray-300 ml-1 group-hover:text-blue-300 transition-colors">
                {siteConfig.name.split(' ')[1]}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              {siteConfig.tagline}. We help businesses in {siteConfig.location} and across India 
              leverage AI automation, mobile apps, and digital marketing to achieve exponential growth.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-white transition-colors">
                <EnvelopeIcon className="h-5 w-5" />
              </a>
              <a href={`tel:${siteConfig.phone}`} className="text-gray-400 hover:text-white transition-colors">
                <PhoneIcon className="h-5 w-5" />
              </a>
              <span className="text-gray-400">
                <MapPinIcon className="h-5 w-5" />
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Services</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link href="/services" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  AI Content Automation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  AI Agent Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">Quick Links</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 dark:border-gray-700 pt-8 md:mt-12 md:pt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-xs leading-5 text-gray-400">
              &copy; 2024 {siteConfig.name}. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs leading-5 text-gray-400">
                Based in {siteConfig.location} | Serving clients globally
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
