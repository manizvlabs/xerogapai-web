'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Star, MessageCircle, BarChart3 } from 'lucide-react';
import type { ReactNode } from 'react';

function SolutionIconUsers({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  );
}

interface NavChild {
  label: string;
  href: string;
  icon?: ReactNode;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  {
    label: 'Products',
    href: '/solutions',
    children: [
      {
        label: 'AI Review Generator',
        href: '/solutions/ai-review-generation',
        icon: <Star className="w-5 h-5" />,
        description: 'Collect Google reviews in under 20 seconds',
      },
      {
        label: 'AgentMitra',
        href: '/agent-mitra',
        icon: <SolutionIconUsers className="w-5 h-5" />,
        description: 'AI agents for business automation',
      },
      {
        label: 'Setu',
        href: '/solutions/setu',
        icon: <MessageCircle className="w-5 h-5" />,
        description: 'WhatsApp marketing & automation',
      },
      {
        label: 'BankLens',
        href: '/solutions/banklens',
        icon: <BarChart3 className="w-5 h-5" />,
        description: 'AI credit decisioning for NBFCs',
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060E20]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-[#060E20] border-b border-white/10'
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-22">
          <Link href="/" className="flex items-center gap-2">
            <img src="/vyaptix-logo.png" alt="VyaptIX" className="h-10 md:h-12 w-auto" width="160" height="48" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
                onFocusCapture={() => item.children && setOpenDropdown(item.label)}
                onBlurCapture={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenDropdown(null);
                }}
              >
                <Link
                  href={item.href}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={item.children ? openDropdown === item.label : undefined}
                  className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    pathname === item.href || (pathname?.startsWith(item.href + '/') ?? false)
                      ? 'text-secondary-400'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-secondary-400 transition-all duration-300 origin-center ${
                      pathname === item.href || (pathname?.startsWith(item.href + '/') ?? false)
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0'
                    }`}
                  />
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 animate-slide-down" role="menu">
                    <div className="bg-[#0B1A35]/95 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 py-2 min-w-[280px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          role="menuitem"
                          className="group flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors focus:outline-none focus:bg-white/5"
                        >
                          {child.icon && (
                            <span className="text-slate-300 group-hover:text-secondary-400 transition-colors" aria-hidden="true">
                              {child.icon}
                            </span>
                          )}
                          <span>
                            <span className="block font-medium text-white/80 group-hover:text-white text-sm">{child.label}</span>
                            {child.description && <span className="block text-xs text-slate-300">{child.description}</span>}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/demo"
              className="px-5 py-2.5 text-sm font-semibold text-white/85 hover:text-white transition-colors"
            >
              Book Demo
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 hover:shadow-[0_0_20px_rgba(26,82,224,0.4)] transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white/85 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#060E20]/95 backdrop-blur-xl border-t border-white/10 animate-slide-down">
          <div className="container-main py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 font-medium text-white/85 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-3 px-4 py-2 text-slate-200 hover:text-white/80 transition-colors"
                      >
                        {child.icon && <span className="text-slate-400">{child.icon}</span>}
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/contact"
                className="block w-full text-center px-5 py-3 text-sm font-semibold text-white rounded-lg gradient-primary"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
