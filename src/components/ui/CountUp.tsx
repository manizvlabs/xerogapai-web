'use client';
import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({ value, suffix = '', prefix = '', duration = 1200, className = '' }: Props) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const count = useCountUp(value, duration, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
