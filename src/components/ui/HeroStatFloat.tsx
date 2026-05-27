'use client';

import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  primary: string;
  secondary: string;
  className?: string;
  animationDelay?: string;
  floatSpeed?: string;
}

export function HeroStatFloat({ icon, primary, secondary, className = '', animationDelay = '0s', floatSpeed = '8s' }: Props) {
  return (
    <div
      className={`glass-stat-card px-4 py-3 inline-flex items-center gap-3 ${className}`}
      style={{
        animation: `float ${floatSpeed} ease-in-out infinite`,
        animationDelay,
      }}
    >
      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
        {icon}
      </span>
      <div>
        <div className="text-white font-bold text-sm leading-tight">{primary}</div>
        <div className="text-slate-200 text-xs">{secondary}</div>
      </div>
    </div>
  );
}
