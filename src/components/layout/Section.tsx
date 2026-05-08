import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'alt' | 'gradient' | 'dark';
  padding?: 'sm' | 'md' | 'lg';
  id?: string;
}

const bgStyles = {
  default: 'bg-background',
  alt: 'bg-background-alt',
  gradient: 'gradient-hero text-white',
  dark: 'bg-space-navy text-white',
};

const paddingStyles = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
};

export function Section({
  children,
  className = '',
  background = 'default',
  padding = 'md',
  id
}: SectionProps) {
  return (
    <section id={id} className={`${bgStyles[background]} ${paddingStyles[padding]} ${className}`}>
      <div className="container-main">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = true, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-h2 mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-text-secondary max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}
