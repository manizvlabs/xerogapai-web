'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Book a Demo', href: '/demo' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Support', href: '/contact' },
  ],
  solutions: [
    { label: 'AI Review Generator', href: '/solutions/ai-review-generation' },
    { label: 'AgentMitra', href: '/agent-mitra' },
    { label: 'Setu', href: '/solutions/setu' },
    { label: 'BankLens', href: '/solutions/banklens' },
  ],
};

export function Footer() {
  const [revealed, setRevealed] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-[#060E20] text-white border-t border-white/[0.12]">
      {/* Top gradient accent line */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #1A52E0 25%, #06CEFF 60%, #4A7FF5 100%)' }} />

      <div className="container-main py-14">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          <div
            className={`md:col-span-2 transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0ms' }}
          >
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/vyaptix-logo.webp"
                alt="VyaptIX"
                className="h-10 md:h-12 w-auto"
                width={160}
                height={48}
                style={{ width: 'auto' }}
                priority
              />
            </Link>
            <p className="text-slate-300 text-sm max-w-sm mb-3 leading-relaxed">
              AI automation and custom software for businesses that want real results — not slide-deck promises.
            </p>
            <a
              href="mailto:hello@vyaptix.com"
              className="inline-block text-sm text-slate-200 hover:text-[#06CEFF] transition-colors mb-5"
            >
              hello@vyaptix.com
            </a>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/vyaptixai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61584387628675"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/vyaptix-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Vyaptix_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-secondary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-300 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-widest mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-300 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-500 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-widest mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-slate-300 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.12] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <p>&copy; {new Date().getFullYear()} VyaptIX</p>
            </div>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-slate-100 transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-slate-100 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
