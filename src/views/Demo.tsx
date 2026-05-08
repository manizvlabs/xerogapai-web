'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { CalendlyWidget } from '../components/ui/CalendlyWidget';

const PERKS = [
  '15-minute no-pressure intro call',
  'See live demos of both products',
  'Get answers from the founding team',
  'Walk away with a clear next step',
];

export function Demo() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden hero-luxury-bg text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#06CEFF]/7 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#1A52E0]/12 blur-3xl" />
        </div>
        <div className="container-main py-14 md:py-20 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-200 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="max-w-2xl">
            <p className="label-mono-cyan mb-4">Book a Demo</p>
            <h1
              className="font-playfair italic font-bold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', lineHeight: 1.1 }}
            >
              See VyaptIX in action — in 15 minutes
            </h1>
            <p className="text-lg text-slate-200 mb-8 max-w-xl">
              No slides. No sales pitch. Just a real conversation about your business and how AI automation can help.
            </p>

            <ul className="space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-white/85 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#06CEFF] shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Prep guide ── */}
      <section className="bg-[#0A1628] border-b border-white/8 py-10 md:py-14">
        <div className="container-main max-w-3xl mx-auto">
          <p className="label-mono-cyan mb-4 text-center">Before the call</p>
          <h2
            className="font-playfair italic font-bold text-white text-center mb-8"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
          >
            What to think about beforehand
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🏢',
                heading: 'Your business',
                text: 'What does your business do, how many customers do you serve, and what does a typical week look like?',
              },
              {
                icon: '😤',
                heading: 'Your biggest friction',
                text: 'Where are you losing time, dropping leads, or doing repetitive work that feels like it could be automated?',
              },
              {
                icon: '🎯',
                heading: 'Your goal',
                text: 'What does success look like 90 days after deploying an AI tool — more reviews, faster follow-ups, fewer manual tasks?',
              },
            ].map((item) => (
              <div key={item.heading} className="p-5 rounded-xl bg-white/5 border border-white/10">
                <p className="text-2xl mb-3">{item.icon}</p>
                <p className="font-semibold text-white text-sm mb-1">{item.heading}</p>
                <p className="text-slate-200 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-xs mt-6">
            You don't need to prepare anything formal — this is a conversation, not a presentation.
          </p>
        </div>
      </section>

      {/* ── Calendly embed ── */}
      <section className="py-16 md:py-24 bg-[#050D1A]">
        <div className="container-main max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <p className="label-mono-cyan mb-3">Pick a time</p>
            <h2
              className="font-playfair italic font-bold text-white"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
            >
              Choose a slot that works for you
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              You'll get a confirmation email immediately. Ajeet (founder) will be on the call.
            </p>
          </div>
          <CalendlyWidget height={720} />
        </div>
      </section>
    </>
  );
}
