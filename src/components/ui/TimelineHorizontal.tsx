'use client';
import { useEffect, useRef, useState } from 'react';

interface Milestone {
  date: string;
  title: string;
  description: string;
}

interface Props {
  milestones: Milestone[];
}

export function TimelineHorizontal({ milestones }: Props) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: horizontal */}
      <div ref={ref} className="hidden md:block overflow-x-auto pb-4">
        <div className="flex items-start gap-0 min-w-max px-4">
          {milestones.map((m, i) => (
            <div key={i} className="flex flex-col items-center" style={{ minWidth: '200px' }}>
              {/* Connector line + dot row */}
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div className="flex-1 h-0.5 bg-[#E8ECEF] relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-400 transition-all duration-700"
                      style={{
                        width: revealed ? '100%' : '0%',
                        transitionDelay: `${i * 200}ms`,
                      }}
                    />
                  </div>
                )}
                {i === 0 && <div className="flex-1" />}
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-500 flex-none ${
                    revealed ? 'border-primary-500 bg-primary-500 ring-4 ring-primary-500/20' : 'border-[#E8ECEF] bg-white'
                  }`}
                  style={{ transitionDelay: `${i * 200 + 100}ms` }}
                />
                {i < milestones.length - 1 && <div className="flex-1" />}
              </div>

              {/* Card */}
              <div
                className={`mt-4 px-4 text-center transition-all duration-500 ${
                  revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 200 + 300}ms` }}
              >
                <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-1">{m.date}</p>
                <p className="font-bold text-text text-sm mb-1">{m.title}</p>
                <p className="text-text-secondary text-xs leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden space-y-6">
        {milestones.map((m, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-500/20 flex-none mt-1" />
              {i < milestones.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-primary-500 to-secondary-400 mt-2" />}
            </div>
            <div className="pb-4">
              <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-0.5">{m.date}</p>
              <p className="font-bold text-text text-sm mb-1">{m.title}</p>
              <p className="text-text-secondary text-sm leading-relaxed">{m.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
