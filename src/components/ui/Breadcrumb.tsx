import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="inline-flex items-center gap-2 text-base font-medium text-text-secondary bg-white border border-border-light rounded-full px-4 py-2 shadow-subtle mb-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-text-tertiary" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-primary-500 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-text">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
