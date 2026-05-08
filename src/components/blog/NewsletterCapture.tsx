'use client';

export function NewsletterCapture() {
  return (
    <section className="bg-[#0A1628] border-b border-white/8 py-10">
      <div className="container-main">
        <div className="max-w-xl mx-auto">
          <p className="text-slate-100 text-sm mb-2 text-center sm:text-left">
            Get weekly AI automation tips — no spam, unsubscribe anytime.
          </p>
          <form
            className="flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 min-w-0 bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#06CEFF]/50 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-[#050D1A] bg-white rounded-lg hover:bg-[#06CEFF] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
