"use client";

import * as React from "react";
import { motion, PanInfo } from "framer-motion";

interface Testimonial {
  id: number;
  testimonial: string;
  author: string;
  title: string;
  company: string;
  location: string;
  product: string;
  accentColor: string;
}

type StackPosition = "front" | "middle" | "back" | "offscreen";

const POSITION_STYLES: Record<StackPosition, { rotate: string; x: string; zIndex: number }> = {
  front:     { rotate: "-4deg", x: "0%",   zIndex: 3 },
  middle:    { rotate: "0deg",  x: "33%",  zIndex: 2 },
  back:      { rotate: "4deg",  x: "66%",  zIndex: 1 },
  offscreen: { rotate: "6deg",  x: "100%", zIndex: 0 },
};

interface TestimonialCardProps extends Testimonial {
  stackPosition: StackPosition;
  onDragLeft: () => void;
  onDragRight: () => void;
}

function TestimonialCard({
  testimonial,
  author,
  title,
  company,
  location,
  product,
  accentColor,
  stackPosition,
  onDragLeft,
  onDragRight,
}: TestimonialCardProps) {
  const isFront = stackPosition === "front";
  const { rotate, x, zIndex } = POSITION_STYLES[stackPosition];

  return (
    <motion.div
      style={{ zIndex, background: "rgba(10, 22, 40, 0.85)", borderColor: `${accentColor}30` }}
      animate={{ rotate, x }}
      drag={isFront ? "x" : false}
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -80) onDragLeft();
        else if (info.offset.x > 80) onDragRight();
      }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className={`absolute left-0 top-0 flex h-[420px] w-[340px] select-none flex-col justify-between rounded-2xl border p-8 shadow-2xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
      whileDrag={isFront ? { boxShadow: `0 0 40px ${accentColor}40` } : undefined}
    >
      {/* Opening quote mark */}
      <span
        className="text-6xl leading-none font-serif select-none"
        style={{ color: `${accentColor}60` }}
      >
        &ldquo;
      </span>

      <p className="flex-1 text-sm italic leading-relaxed text-slate-300 mt-2">
        {testimonial}
      </p>

      <div
        className="flex flex-col gap-1 pt-5 mt-4"
        style={{ borderTop: `1px solid ${accentColor}20` }}
      >
        <p className="text-sm font-semibold text-white">{author}</p>
        <p className="text-xs text-slate-400">{title} · {company}</p>
        <p className="text-xs text-slate-500">{location}</p>
        <span
          className="mt-2 self-start rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
          style={{
            background: `${accentColor}12`,
            color: accentColor,
            border: `1px solid ${accentColor}30`,
          }}
        >
          {product}
        </span>
      </div>
    </motion.div>
  );
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    testimonial:
      "31 reviews to 140 in two months. QR code at the counter, customers scan it while waiting. Honestly didn't expect it to work this well.",
    author: "Dishank Sharma",
    title: "Owner",
    company: "Black Coffee Cafe",
    location: "Sector 29, Gurgaon, Delhi NCR",
    product: "AI Review Generator",
    accentColor: "#06CEFF",
  },
  {
    id: 2,
    testimonial:
      "We were sending hearing reminders and document follow-ups from personal WhatsApp numbers — unprofessional and impossible to track. Setu gave us proper broadcast campaigns and a shared team inbox. Client communication is now structured, every message is logged, and nothing falls through.",
    author: "Abhimanyu Singh",
    title: "Managing Partner",
    company: "Manu Associates",
    location: "Jaipur, Rajasthan",
    product: "Setu — WhatsApp Marketing",
    accentColor: "#25D366",
  },
  {
    id: 3,
    testimonial:
      "Patients rarely think to leave a review after a good appointment. The VyaptIX link after each visit changed that — 70 reviews in six weeks and new patient inquiries have gone up.",
    author: "Dr. Nisha Reddy",
    title: "Owner",
    company: "Bright Smiles Dental Care",
    location: "Whitefield, Bengaluru",
    product: "AI Review Generator",
    accentColor: "#10B981",
  },
  {
    id: 4,
    testimonial:
      "We were blasting property listings from personal numbers and getting flagged constantly. Setu fixed that — proper campaigns, a shared inbox, real analytics. Our agents now respond faster and we don't lose conversations anymore.",
    author: "Suresh Rathod",
    title: "Director",
    company: "SR Property Advisors",
    location: "Hyderabad, Telangana",
    product: "Setu — WhatsApp Marketing",
    accentColor: "#25D366",
  },
  {
    id: 5,
    testimonial:
      "12 years in Ameerpet and barely 20 reviews online. Three months with VyaptIX — 105 reviews, 4.7 stars. Google Maps is actually bringing in new customers now.",
    author: "Mohan Reddy",
    title: "Owner",
    company: "Sri Balaji Jewellers",
    location: "Ameerpet, Hyderabad",
    product: "AI Review Generator",
    accentColor: "#F59E0B",
  },
  {
    id: 6,
    testimonial:
      "A medical store is not the obvious place for Google reviews, but competition in Secunderabad is real and customers do check ratings. We placed the QR standee at the counter and collected 65 reviews in six weeks. We now show up when people search for medical stores nearby — that wasn't the case before. Straightforward to set up and the results were clear.",
    author: "Venkat Rao",
    title: "Proprietor",
    company: "Sai Arogya Medicals",
    location: "Secunderabad, Hyderabad",
    product: "AI Review Generator",
    accentColor: "#06CEFF",
  },
];

/* ─────────────────────────────────────────────────────────────
   Testimonial Marquee — auto-scrolling left-to-right strip
   Click anywhere to pause; click again to resume.
   Speed is controlled by the `speed` prop (seconds for one loop).
───────────────────────────────────────────────────────────── */

export function TestimonialMarquee({ speed = 65 }: { speed?: number }) {
  const [paused, setPaused] = React.useState(false);
  // Duplicate for seamless infinite loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Scrolling strip */}
      <div
        className="testimonial-marquee-wrapper w-full"
        onClick={() => setPaused((p) => !p)}
        title={paused ? "Click to resume" : "Click to pause"}
      >
        <div
          className="testimonial-marquee-track"
          style={{
            animationDuration: `${speed}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              className="testimonial-marquee-card"
              style={{
                borderColor: `${t.accentColor}30`,
                background: "rgba(10, 22, 40, 0.85)",
              }}
            >
              <span
                className="text-5xl leading-none font-serif select-none"
                style={{ color: `${t.accentColor}60` }}
              >
                &ldquo;
              </span>
              <p className="flex-1 text-sm italic leading-relaxed text-slate-300 mt-2">
                {t.testimonial}
              </p>
              <div
                className="flex flex-col gap-1 pt-4 mt-4"
                style={{ borderTop: `1px solid ${t.accentColor}20` }}
              >
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-slate-400">
                  {t.title} · {t.company}
                </p>
                <p className="text-xs text-slate-500">{t.location}</p>
                <span
                  className="mt-2 self-start rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
                  style={{
                    background: `${t.accentColor}12`,
                    color: t.accentColor,
                    border: `1px solid ${t.accentColor}30`,
                  }}
                >
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status line — below the strip, separate from overflow:hidden container */}
      <p
        className="text-sm text-[#06CEFF]/70 italic tracking-wide select-none transition-opacity duration-300"
        style={{ opacity: paused ? 1 : 0 }}
      >
        — paused · click anywhere to resume —
      </p>
    </div>
  );
}

// order[i] = which testimonial index is at stack rank i
// rank 0 → front, rank 1 → middle, rank 2 → back, rank 3 → offscreen
const RANKS: StackPosition[] = ["front", "middle", "back", "offscreen"];

export function ShuffleTestimonials() {
  const n = TESTIMONIALS.length;
  // order[rank] = testimonial index at that rank
  const [order, setOrder] = React.useState(() => Array.from({ length: n }, (_, i) => i));

  // drag left → current front goes to the back of the queue (next card surfaces)
  const next = () =>
    setOrder((prev) => {
      const o = [...prev];
      o.push(o.shift()!);
      return o;
    });

  // drag right → last card comes to front (previous card surfaces)
  const prev = () =>
    setOrder((prev) => {
      const o = [...prev];
      o.unshift(o.pop()!);
      return o;
    });

  // invert: for each testimonial, find its rank
  const rankOf = React.useMemo(() => {
    const map: Record<number, StackPosition> = {};
    order.forEach((testimonialIdx, rank) => {
      map[testimonialIdx] = RANKS[rank] ?? "offscreen";
    });
    return map;
  }, [order]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="relative h-[460px] w-[340px]" style={{ marginLeft: "-80px" }}>
        {TESTIMONIALS.map((t, idx) => (
          <TestimonialCard
            key={t.id}
            {...t}
            stackPosition={rankOf[idx]}
            onDragLeft={next}
            onDragRight={prev}
          />
        ))}
      </div>

      <p className="text-xs text-slate-500 select-none" style={{ marginLeft: "-80px" }}>
        ← drag left or right →
      </p>
    </div>
  );
}
