'use client';

import { useState, useEffect, useRef } from 'react';

interface Screenshot {
  src: string;
  caption: string;
}

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
  accentColor: string;
  appUrl?: string;
  screenshotBg?: string;
}

export function ScreenshotCarousel({
  screenshots,
  accentColor,
  appUrl = 'app.vyaptix.ai',
  screenshotBg = '#f1f5f9',
}: ScreenshotCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, screenshots.length]);

  return (
    <div
      className="max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* App window chrome */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_48px_rgba(0,0,0,0.5)]">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0D1B30] border-b border-white/10">
          <div className="flex gap-1.5 flex-shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
          </div>
          <div className="flex-1 max-w-xs mx-auto">
            <div className="h-5 rounded bg-white/5 border border-white/10 flex items-center px-3">
              <span className="text-[11px] text-slate-500 truncate">{appUrl}</span>
            </div>
          </div>
        </div>

        {/* Screenshot viewport — fixed height, full image always visible */}
        <div
          className="relative"
          style={{ height: '380px', background: screenshotBg }}
        >
          {screenshots.map((shot, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
            >
              <img
                src={shot.src}
                alt={shot.caption}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'contain',
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Caption + dot nav */}
      <div className="flex items-center justify-between mt-4 px-1 gap-6">
        <p className="text-sm text-slate-400 italic leading-snug">{screenshots[current].caption}</p>
        <div className="flex gap-2 flex-shrink-0">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setPaused(true); }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === current ? accentColor : 'rgba(255,255,255,0.2)',
                transform: i === current ? 'scale(1.5)' : 'scale(1)',
              }}
              aria-label={`Screenshot ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
