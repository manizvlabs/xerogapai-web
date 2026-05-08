'use client';

interface CalendlyWidgetProps {
  url?: string;
  height?: number;
  className?: string;
}

export function CalendlyWidget({ url, height = 700, className = '' }: CalendlyWidgetProps) {
  const base = url ?? process.env.NEXT_PUBLIC_CALENDLY_URL ?? '';

  if (!base) {
    return (
      <div className={`rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center py-16 px-8 text-center ${className}`}>
        <span className="text-5xl mb-4">📅</span>
        <p className="text-white font-semibold mb-2">Calendly not configured</p>
        <p className="text-slate-300 text-sm max-w-xs">
          Set{' '}
          <code className="text-[#06CEFF] bg-[#06CEFF]/10 px-1.5 py-0.5 rounded text-xs">
            NEXT_PUBLIC_CALENDLY_URL
          </code>{' '}
          in your environment variables to enable booking.
        </p>
      </div>
    );
  }

  const embedUrl = new URL(base);
  embedUrl.searchParams.set('hide_gdpr_banner', '1');
  embedUrl.searchParams.set('background_color', '050D1A');
  embedUrl.searchParams.set('text_color', 'ffffff');
  embedUrl.searchParams.set('primary_color', '06CEFF');

  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 ${className}`}>
      <iframe
        src={embedUrl.toString()}
        width="100%"
        height={height}
        frameBorder="0"
        title="Schedule a meeting with VyaptIX"
        loading="lazy"
      />
    </div>
  );
}
