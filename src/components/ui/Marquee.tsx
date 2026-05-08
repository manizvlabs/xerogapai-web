'use client';

interface LogoItem {
  src: string;
  alt: string;
}

interface Props {
  items: LogoItem[];
  reverse?: boolean;
  speed?: number;
}

function LogoTile({ src, alt }: LogoItem) {
  return (
    <div className="flex-none rounded-xl border border-[#E8ECEF] bg-white p-3 h-14 w-24 flex items-center justify-center">
      <img src={src} alt={alt} className="h-8 w-auto object-contain" />
    </div>
  );
}

export function Marquee({ items, reverse = false, speed = 25 }: Props) {
  return (
    <div className="marquee-wrapper py-2">
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <LogoTile key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
