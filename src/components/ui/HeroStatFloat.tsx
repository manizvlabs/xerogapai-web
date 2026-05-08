'use client';

interface Props {
  icon: string;
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
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-white font-bold text-sm leading-tight">{primary}</div>
        <div className="text-slate-200 text-xs">{secondary}</div>
      </div>
    </div>
  );
}
