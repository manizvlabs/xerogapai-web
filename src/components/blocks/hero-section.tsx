'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Mockup, MockupFrame } from '../ui/mockup';
import { Glow } from '../ui/glow';

interface HeroAction {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}

interface HeroImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface HeroProps {
  badge?: {
    text: string;
    dot?: 'green' | 'amber' | 'blue';
  };
  title: string;
  description: string;
  actions?: HeroAction[];
  image?: HeroImage;
  className?: string;
}

export function HeroSection({ badge, title, description, actions, image, className }: HeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden pb-0',
        'py-24 sm:py-32 md:py-40 px-4',
        'fade-bottom',
        className,
      )}
    >
      <div className="mx-auto max-w-container flex flex-col gap-12 sm:gap-20">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-10">

          {/* Badge */}
          {badge && (
            <div className="animate-appear inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70">
              {badge.dot && (
                <span
                  className={cn('h-2 w-2 rounded-full', {
                    'bg-emerald-400': badge.dot === 'green',
                    'bg-amber-400':   badge.dot === 'amber',
                    'bg-brand-cyan':  badge.dot === 'blue',
                  })}
                />
              )}
              {badge.text}
            </div>
          )}

          {/* Title */}
          <h1
            className={cn(
              'relative z-10 animate-appear',
              'font-display font-bold leading-[1.1] tracking-tight',
              'text-4xl sm:text-6xl md:text-7xl lg:text-8xl',
              'bg-gradient-to-b from-white via-white/90 to-white/50',
              'bg-clip-text text-transparent',
              'drop-shadow-[0_0_32px_rgba(6,206,255,0.15)]',
            )}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className={cn(
              'relative z-10 max-w-[560px] animate-appear opacity-0 delay-100',
              'text-base sm:text-lg md:text-xl',
              'font-medium leading-relaxed text-white/55',
            )}
          >
            {description}
          </p>

          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="relative z-10 flex animate-appear flex-wrap justify-center gap-3 opacity-0 delay-300">
              {actions.map((action, i) => {
                const cls =
                  action.variant === 'primary'
                    ? 'inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-brand-cyan to-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-cyan/20 transition-all duration-200 hover:opacity-90 hover:shadow-brand-cyan/30'
                    : 'inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white';

                return action.external ? (
                  <a key={i} href={action.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {action.text}
                    {action.variant === 'primary' && <ArrowRightIcon className="h-4 w-4" />}
                  </a>
                ) : (
                  <Link key={i} href={action.href} className={cls}>
                    {action.text}
                    {action.variant === 'primary' && <ArrowRightIcon className="h-4 w-4" />}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Mockup image */}
          {image && (
            <div className="relative w-full pt-8">
              <MockupFrame
                className="animate-appear opacity-0 delay-700 mx-auto max-w-5xl"
                size="small"
              >
                <Mockup type="responsive">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width ?? 1248}
                    height={image.height ?? 765}
                    priority
                    className="w-full h-auto"
                  />
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
