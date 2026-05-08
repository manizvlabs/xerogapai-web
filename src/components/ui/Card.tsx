import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-subtle
        ${hover ? 'hover:shadow-medium hover:-translate-y-1 transition-all duration-300' : ''}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  metric?: string;
}

export function FeatureCard({ icon, title, description, metric }: FeatureCardProps) {
  return (
    <Card hover padding="lg">
      <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-h4 text-text font-semibold mb-2">{title}</h3>
      <p className="text-text-muted mb-3">{description}</p>
      {metric && (
        <p className="text-sm font-semibold text-primary-500">{metric}</p>
      )}
    </Card>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
}

export function TestimonialCard({ quote, author, role, company, rating = 5 }: TestimonialCardProps) {
  return (
    <Card padding="lg" className="flex flex-col">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-text flex-1 mb-4 italic">"{quote}"</blockquote>
      <div>
        <p className="font-semibold text-text">{author}</p>
        <p className="text-sm text-text-muted">{role}, {company}</p>
      </div>
    </Card>
  );
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  onCtaClick?: () => void;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  popular = false,
  onCtaClick
}: PricingCardProps) {
  return (
    <Card
      padding="lg"
      className={`relative flex flex-col ${popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="text-h3 font-semibold text-text mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-display text-primary-500">{price}</span>
        {period && <span className="text-text-muted">/{period}</span>}
      </div>
      <p className="text-text-muted mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-text-light">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onCtaClick}
        className={`w-full py-3 px-6 rounded-md font-semibold transition-all duration-200 ${
          popular
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50'
        }`}
      >
        {cta}
      </button>
    </Card>
  );
}
