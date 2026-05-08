import { type ReactNode } from 'react';

type BadgeVariant = 'success' | 'warning' | 'info' | 'default';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success-100 text-success-700',
  warning: 'bg-yellow-100 text-yellow-700',
  info: 'bg-primary-100 text-primary-700',
  default: 'bg-secondary-100 text-secondary-700',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
