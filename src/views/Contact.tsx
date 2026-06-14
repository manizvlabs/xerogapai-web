'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { HeroSection } from '../components/blocks/hero-section';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/Accordion';
import ContactService, { type ContactData } from '../services/contactService';

export function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: '',
    companySize: '',
    annualRevenue: '',
    currentTools: '',
    timeline: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // Primary: submit to Zoho CRM — this is the source of truth
      const zohoFormData = new FormData();
      zohoFormData.append('firstName', formData.firstName);
      zohoFormData.append('lastName', formData.lastName);
      zohoFormData.append('email', formData.email);
      if (formData.company) zohoFormData.append('company', formData.company);
      if (formData.service) zohoFormData.append('service', formData.service);
      if (formData.message) zohoFormData.append('description', formData.message);
      if (formData.companySize) zohoFormData.append('companySize', formData.companySize);
      if (formData.annualRevenue) zohoFormData.append('annualRevenue', formData.annualRevenue);
      if (formData.currentTools) zohoFormData.append('currentChallenges', formData.currentTools);
      if (formData.timeline) zohoFormData.append('timeline', formData.timeline);

      const response = await fetch('/api/submit-to-zoho', {
        method: 'POST',
        body: zohoFormData,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || `Zoho API Error: ${response.status}`);
      }

      // Secondary: fire-and-forget Supabase backup (non-blocking)
      ContactService.createContact({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company || undefined,
        service: formData.service || undefined,
        message: formData.message || undefined,
        company_size: formData.companySize || undefined,
        annual_revenue: formData.annualRevenue || undefined,
        current_challenges: formData.currentTools || undefined,
        timeline: formData.timeline || undefined,
        lead_source: 'Website',
      } as ContactData).catch((err) => console.warn('Supabase backup skipped:', err?.message));

      router.replace('/thank-you');
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-[#0A1628] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#06CEFF] transition-colors';
  const labelClass = 'block text-sm font-medium text-white/85 mb-2';

  return (
    <>

{/* Breadcrumb */}
      <div className="bg-[#050D1A] border-b border-white/10">
        <div className="container-main py-3">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
          />
        </div>
      </div>

      <HeroSection
        title="Get in Touch"
        description="No pitch decks, no generic demos — just a real conversation about where AI can help your business."
      />

      {/* Form section */}
      <section className="py-16 md:py-24 bg-[#050D1A]">
        <div className="container-main">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12">

            {/* Form card */}
            <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
              <p className="text-slate-200 mb-8">We respond to all inquiries within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Alex"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Johnson"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Work Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company <span className="text-slate-400 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>
                    Product Interest <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={inputClass + ' appearance-none cursor-pointer'}
                  >
                    <option value="" className="bg-[#0A1628]">Select a product...</option>
                    <option value="ai-review-generator" className="bg-[#0A1628]">AI Review Generator</option>
                    <option value="setu" className="bg-[#0A1628]">Setu — WhatsApp Marketing</option>
                    <option value="banklens" className="bg-[#0A1628]">BankLens — Credit Decisioning</option>
                    <option value="custom-software-ai-automation" className="bg-[#0A1628]">Custom Software Development & AI Automation</option>
                    <option value="not-sure" className="bg-[#0A1628]">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us what you're trying to automate or solve..."
                    className={inputClass + ' resize-none'}
                  />
                </div>

                {/* Enterprise accordion */}
                <Accordion type="single" collapsible className="border border-white/10 rounded-xl overflow-hidden">
                  <AccordionItem value="enterprise" className="border-none">
                    <AccordionTrigger className="px-5 py-4 text-sm text-slate-100 hover:text-white/80">
                      Enterprise? Add more details{' '}
                      <span className="text-slate-400 font-normal ml-1">(optional)</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5">
                      <div className="grid sm:grid-cols-2 gap-5 pt-2">
                        <div>
                          <label htmlFor="companySize" className={labelClass}>Company Size</label>
                          <select
                            id="companySize"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            className={inputClass + ' appearance-none cursor-pointer'}
                          >
                            <option value="" className="bg-[#0A1628]">Select size...</option>
                            <option value="1-10" className="bg-[#0A1628]">1–10 employees</option>
                            <option value="11-50" className="bg-[#0A1628]">11–50 employees</option>
                            <option value="51-200" className="bg-[#0A1628]">51–200 employees</option>
                            <option value="201-1000" className="bg-[#0A1628]">201–1000 employees</option>
                            <option value="1000+" className="bg-[#0A1628]">1000+ employees</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="annualRevenue" className={labelClass}>Annual Revenue Range</label>
                          <input
                            type="text"
                            id="annualRevenue"
                            name="annualRevenue"
                            value={formData.annualRevenue}
                            onChange={handleChange}
                            placeholder="e.g. $500K – $2M"
                            className={inputClass}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="currentTools" className={labelClass}>Current Tools / Stack</label>
                          <input
                            type="text"
                            id="currentTools"
                            name="currentTools"
                            value={formData.currentTools}
                            onChange={handleChange}
                            placeholder="e.g. Zoho CRM, WhatsApp Business, Google Sheets"
                            className={inputClass}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label htmlFor="timeline" className={labelClass}>Project Timeline</label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className={inputClass + ' appearance-none cursor-pointer'}
                          >
                            <option value="" className="bg-[#0A1628]">Select timeline...</option>
                            <option value="asap" className="bg-[#0A1628]">ASAP</option>
                            <option value="1-month" className="bg-[#0A1628]">Within 1 month</option>
                            <option value="3-months" className="bg-[#0A1628]">Within 3 months</option>
                            <option value="6-months" className="bg-[#0A1628]">Within 6 months</option>
                            <option value="exploring" className="bg-[#0A1628]">Just exploring</option>
                          </select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {formStatus === 'error' && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    Something went wrong. Please check your connection and try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg bg-white text-[#050D1A] hover:shadow-[0_0_24px_rgba(6,206,255,0.3)] hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {formStatus === 'loading' ? 'Sending...' : (
                    <>Send Message <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>

            {/* Info panel */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Let's build something</h2>
                <p className="text-slate-200 leading-relaxed">
                  Connect with us about AI automation for your business. We work with businesses
                  across restaurants, clinics, real estate, agencies, and more.
                </p>
                <a
                  href="mailto:hello@vyaptix.com"
                  className="inline-flex mt-4 text-[#06CEFF] font-semibold hover:text-white transition-colors"
                >
                  hello@vyaptix.com
                </a>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center flex-shrink-0 text-lg">
                    ⚡
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">24-hour response</p>
                    <p className="text-sm text-slate-300">
                      We respond to all inquiries within a business day. Urgent? WhatsApp us.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center flex-shrink-0 text-lg">
                    🎯
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">No commitment required</p>
                    <p className="text-sm text-slate-300">
                      30-minute discovery call. No pitch decks, no sales script. Real answers only.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#06CEFF]/10 border border-[#06CEFF]/20 flex items-center justify-center flex-shrink-0 text-lg">
                    🌐
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Built for any business</p>
                    <p className="text-sm text-slate-300">
                      Whether you're a local shop or a growing enterprise — we tailor solutions to your context.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#06CEFF]/20 bg-[#06CEFF]/5 p-6">
                <p className="text-sm font-semibold text-[#06CEFF] mb-2">Prefer to book directly?</p>
                <p className="text-sm text-slate-200 mb-4">Skip the form — pick a time that works for you.</p>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-sm rounded-lg bg-white text-[#050D1A] hover:shadow-[0_0_16px_rgba(6,206,255,0.3)] transition-all"
                >
                  Book a Call <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
