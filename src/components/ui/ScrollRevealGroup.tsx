'use client';
import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  staggerMs?: number;
  className?: string;
  threshold?: number;
}

export function ScrollRevealGroup({ children, staggerMs = 100, className = '', threshold = 0.1 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.children) as HTMLElement[];
    items.forEach((child) => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((child, i) => {
            setTimeout(() => {
              child.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, i * staggerMs);
          });
          observer.unobserve(container);
        }
      },
      { threshold }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerMs, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
