'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar, Check, Loader2, ArrowRight, Video } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

type Step = 'pick' | 'form' | 'success';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  goals: string;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

// Week starts Monday
const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function formatTime(time: string): string {
  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${ampm}`;
}

function buildDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getDaysInMonth(monthStart: Date): (Date | null)[] {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  // Mon-first: Sun=0 → offset 6, Mon=1 → offset 0, Tue=2 → offset 1 …
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
  return days;
}

export function DemoBookingFlow() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [step, setStep] = useState<Step>('pick');
  const [form, setForm] = useState<FormData>({ fullName: '', email: '', phone: '', company: '', goals: '' });
  const [submitting, setSubmitting] = useState(false);
  const [eventLink, setEventLink] = useState<string | null>(null);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isToday = (d: Date) => d.toDateString() === new Date().toDateString();
  const isPast  = (d: Date) => d < today;
  const isSelected = (d: Date) => selectedDate?.toDateString() === d.toDateString();

  const fetchSlots = useCallback(async (date: Date) => {
    setLoadingSlots(true);
    setTimeSlots([]);
    try {
      const dateStr = buildDateStr(date);
      const res = await fetch(`/api/get-calendar-availability?date=${dateStr}&consultationType=discovery`);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      setTimeSlots(data.timeSlots || []);
    } catch {
      setTimeSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  const handleDateClick = (date: Date) => {
    if (isPast(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
    fetchSlots(date);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !form.fullName || !form.email || !form.goals) return;
    setSubmitting(true);
    setError(null);
    try {
      const nameParts = form.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName  = nameParts.slice(1).join(' ') || '-';
      const timezone  = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const res = await fetch('/api/book-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email: form.email,
          mobile: form.phone,
          company: form.company,
          consultationGoals: form.goals,
          preferredDate: buildDateStr(selectedDate),
          preferredTime: selectedTime,
          timezone,
          consultationType: 'discovery',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEventLink(data.eventLink || null);
        setMeetLink(data.meetLink || null);
        setStep('success');
      } else {
        setError(data.details || data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const days = getDaysInMonth(currentMonth);
  const availableSlots = timeSlots.filter(s => s.available);

  // ── Success ────────────────────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div className="rounded-2xl border border-[#06CEFF]/20 bg-[#06CEFF]/5 p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-[#06CEFF]/15 flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-[#06CEFF]" />
        </div>
        <h3 className="text-white font-semibold text-xl mb-2">You're booked!</h3>
        <p className="text-slate-300 text-sm mb-1">
          {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          {selectedTime ? ` · ${formatTime(selectedTime)}` : ''} · 30 min
        </p>
        <p className="text-slate-400 text-sm mb-6">
          Ajeet from the founding team will be on the call. A Google Meet link and calendar invite have been sent to your email.
        </p>
        <div className="flex flex-col items-center gap-3">
          {meetLink && (
            <a href={meetLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#06CEFF] text-[#050D1A] font-semibold text-sm hover:bg-[#06CEFF]/90 transition-colors">
              <Video className="w-4 h-4" /> Join Google Meet
            </a>
          )}
          {eventLink && (
            <a href={eventLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#06CEFF]/70 text-sm hover:text-[#06CEFF] transition-colors">
              <Calendar className="w-4 h-4" /> View in Google Calendar
            </a>
          )}
        </div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  if (step === 'form') {
    return (
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        {/* Booked slot bar */}
        <div className="flex items-center gap-3 px-5 py-3 bg-[#06CEFF]/8 border-b border-[#06CEFF]/15">
          <Calendar className="w-4 h-4 text-[#06CEFF] shrink-0" />
          <span className="text-white/80 text-sm flex-1">
            {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            {selectedTime ? ` · ${formatTime(selectedTime)}` : ''} · 30 min discovery call
          </span>
          <button onClick={() => setStep('pick')}
            className="text-xs text-slate-300 hover:text-[#06CEFF] transition-colors shrink-0">
            Change
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-white font-medium text-sm">A few quick details</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'fullName', label: 'Full Name', placeholder: 'Jordan Williams', required: true },
              { key: 'email',    label: 'Work Email', placeholder: 'you@company.com', required: true, type: 'email' },
              { key: 'phone',    label: 'Phone',      placeholder: '+1 (555) 000-0000', required: false },
              { key: 'company',  label: 'Company',    placeholder: 'Your business',    required: false },
            ].map(({ key, label, placeholder, required, type }) => (
              <div key={key}>
                <label className="block text-white/65 text-xs mb-1.5">
                  {label}{required ? ' *' : ''}
                </label>
                <input
                  type={type ?? 'text'}
                  value={form[key as keyof FormData]}
                  onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#06CEFF]/50 transition-colors"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-white/65 text-xs mb-1.5">
              What are you hoping to get from the call? *
            </label>
            <textarea
              value={form.goals}
              onChange={e => setForm(p => ({ ...p, goals: e.target.value }))}
              placeholder="e.g. I want to automate my Google review collection and understand if AI fits my restaurant chain..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#06CEFF]/50 transition-colors resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={submitting || !form.fullName || !form.email || !form.goals}
            className="w-full py-3 rounded-xl bg-[#06CEFF] text-[#050D1A] font-semibold text-sm hover:bg-[#06CEFF]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking…</>
              : <>Confirm Booking <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      </div>
    );
  }

  // ── Split panel — calendar left · slots right ──────────────────────────────
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/10 overflow-hidden grid grid-cols-1 sm:grid-cols-[1fr_1px_1fr]">

        {/* ── Left: month calendar ── */}
        <div className="p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() - 1, 1))}
              className="p-1 rounded-md hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-white text-sm font-semibold">
              {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              onClick={() => setCurrentMonth(p => new Date(p.getFullYear(), p.getMonth() + 1, 1))}
              className="p-1 rounded-md hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day name headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center text-[10px] font-medium text-white/50 py-1">{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {days.map((date, i) => (
              <div key={i} className="flex flex-col items-center py-0.5">
                {date ? (
                  <>
                    <button
                      onClick={() => handleDateClick(date)}
                      disabled={isPast(date)}
                      className={[
                        'w-8 h-8 rounded-full text-xs font-medium transition-all leading-none',
                        isPast(date)
                          ? 'text-white/18 cursor-not-allowed'
                          : isSelected(date)
                            ? 'bg-[#06CEFF] text-[#050D1A] font-bold'
                            : isToday(date)
                              ? 'ring-1 ring-[#06CEFF]/60 text-white hover:bg-white/10'
                              : 'text-white/80 hover:bg-white/10',
                      ].join(' ')}
                    >
                      {date.getDate()}
                    </button>
                    {/* Green availability dot for future dates */}
                    <span className={[
                      'w-1 h-1 rounded-full mt-0.5',
                      isPast(date) ? 'bg-transparent' : 'bg-[#06CEFF]/40',
                    ].join(' ')} />
                  </>
                ) : <div className="w-8 h-8" />}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/8">
            <span className="flex items-center gap-1.5 text-[10px] text-white/55">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06CEFF]/50" /> Available
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-white/55">
              <span className="w-2 h-2 rounded-full ring-1 ring-[#06CEFF]/60 inline-block" /> Today
            </span>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="hidden sm:block bg-white/8" />

        {/* ── Right: time slots ── */}
        <div className="border-t border-white/8 sm:border-t-0 p-4 flex flex-col">
          {!selectedDate ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
              <Calendar className="w-7 h-7 text-white/15 mb-3" />
              <p className="text-slate-300 text-xs leading-relaxed">
                Pick any date on the left<br />to see open slots
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-3.5 h-3.5 text-[#06CEFF]" />
                <span className="text-white font-medium text-xs">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                {!loadingSlots && availableSlots.length > 0 && (
                  <span className="ml-auto text-[10px] text-[#06CEFF]/70">
                    {availableSlots.length} open
                  </span>
                )}
              </div>

              {loadingSlots ? (
                <div className="flex items-center gap-2 text-slate-300 text-xs py-4">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking…
                </div>
              ) : timeSlots.length === 0 ? (
                <p className="text-slate-300 text-xs py-4">No slots found for this day.</p>
              ) : (
                <div className="grid grid-cols-2 gap-1.5 overflow-y-auto max-h-52">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={[
                        'py-2 px-2 rounded-lg text-xs font-medium transition-all border text-center',
                        !slot.available
                          ? 'border-white/5 text-white/18 cursor-not-allowed line-through'
                          : selectedTime === slot.time
                            ? 'border-[#06CEFF] bg-[#06CEFF]/15 text-[#06CEFF] font-semibold'
                            : 'border-white/12 text-white/70 hover:border-[#06CEFF]/40 hover:text-[#06CEFF]/90',
                      ].join(' ')}
                    >
                      {formatTime(slot.time)}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Continue CTA — only appears once date + time are both selected */}
      {selectedDate && selectedTime && (
        <button
          onClick={() => setStep('form')}
          className="w-full py-3 rounded-xl bg-[#06CEFF] text-[#050D1A] font-semibold text-sm hover:bg-[#06CEFF]/90 transition-all flex items-center justify-center gap-2"
        >
          Continue to booking details <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
