'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, ChatBubbleLeftRightIcon, CogIcon, CpuChipIcon, DocumentTextIcon, ShieldCheckIcon, UserGroupIcon, BriefcaseIcon, QuestionMarkCircleIcon, BookOpenIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import ThemeSwitcher from './ThemeSwitcher';
import RegionSwitcher from './RegionSwitcher';
import { siteConfig } from '@/config/site';
import { useRegion } from '@/contexts/RegionContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation structure with dropdowns
  const navigation = [
    {
      name: 'Solutions',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'WhatsApp CX Copilot', href: '/whatsapp-cx', icon: ChatBubbleLeftRightIcon, description: 'AI-powered customer conversations' },
        { name: 'XeroGap AI Workflow', href: '/xerogap-ai', icon: CogIcon, description: 'Workspace automation' },
        { name: 'Enterprise Copilots', href: '/enterprise-copilots', icon: CpuChipIcon, description: 'Knowledge management' },
        { name: 'Sales Automation', href: '/sales-automation', icon: UserGroupIcon, description: 'Lead intelligence' },
        { name: 'Contact Center AI', href: '/contact-center-ai', icon: ShieldCheckIcon, description: 'Quality assurance' },
        { name: 'DPDP Compliance', href: '/dpdp-compliance', icon: DocumentTextIcon, description: 'Data protection' }
      ]
    },
    {
      name: 'Resources',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Case Studies', href: '/case-studies', icon: BriefcaseIcon, description: 'Success stories' },
        { name: 'Documentation', href: '/docs', icon: BookOpenIcon, description: 'API docs & guides' },
        { name: 'Help Center', href: '/help', icon: QuestionMarkCircleIcon, description: 'Support & FAQ' }
      ]
    },
    {
      name: 'Company',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'About Us', href: '/about', icon: BuildingOfficeIcon, description: 'Our story & mission' },
        { name: 'Careers', href: '/careers', icon: UserGroupIcon, description: 'Join our team' },
        { name: 'Consultation', href: '/consultation', icon: ChatBubbleLeftRightIcon, description: 'Book a meeting' }
      ]
    },
    { name: 'Contact', href: '/contact', hasDropdown: false }
  ];

  return (
    <header
      className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <div
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt={`${siteConfig.name} Logo`}
                width={400}
                height={133}
                className="h-20 w-auto"
                priority
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8" ref={dropdownRef}>
          {navigation.map((item, index) => (
            <div
              key={item.name}
              className="relative"
            >
              {item.hasDropdown ? (
                <div>
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="flex items-center text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                  >
                    {item.name}
                    <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                  </button>

                  {activeDropdown === item.name && (
                      <div
                        className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="p-2">
                          {item.dropdownItems?.map((dropdownItem, dropdownIndex) => {
                            const IconComponent = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="flex-shrink-0">
                                  <IconComponent className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    {dropdownItem.name}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                                    {dropdownItem.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {siteConfig.enableThemeSwitcher && <ThemeSwitcher />}
          <RegionSwitcher />
          <Link
            href="/contact"
            className="rounded-md bg-blue-600 dark:bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:ring-gray-700/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.svg"
                  alt={`${siteConfig.name} Logo`}
                  width={400}
                  height={133}
                  className="h-20 w-auto"
                />
              </Link>
              <div className="flex items-center gap-x-4">
                {siteConfig.enableThemeSwitcher && <ThemeSwitcher />}
                <RegionSwitcher />
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item, index) => (
                    <div
                      key={item.name}
                    >
                      {item.hasDropdown ? (
                        <div className="space-y-1">
                          <div className="-mx-3 px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                            {item.name}
                          </div>
                          {item.dropdownItems?.map((dropdownItem) => {
                            const IconComponent = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="-mx-3 flex items-center rounded-lg px-3 py-2 text-base font-medium leading-7 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <IconComponent className="h-5 w-5 mr-3 text-gray-400" />
                                <div>
                                  <div>{dropdownItem.name}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {dropdownItem.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/contact"
                    className="rounded-md bg-blue-600 dark:bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 dark:hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
