'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  Crown,
  Calendar,
  MapPin,
  Ticket,
  Sparkles,
  Layers,
  ShieldCheck,
} from 'lucide-react';

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const POPULAR_CONGRESS_CITIES = ['Miami', 'Orlando', 'Las Vegas', 'Chicago', 'Houston', 'Madrid', 'Paris', 'Cancun'];
const DANCE_STYLES = ['Salsa', 'Bachata', 'Brazilian Zouk', 'Kizomba', 'Merengue'] as const;
const EVENT_TYPES = ['Multi-Room Congress', 'Weekend Festival', 'Dance Marathon', 'Weekly Multi-Style Social'] as const;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const URL_RE = /^https?:\/\/.+/;
const IG_RE = /^@?[A-Za-z0-9._]{1,30}$/;

type FieldName =
  | 'eventInstagram'
  | 'city'
  | 'organizerEmail'
  | 'eventName'
  | 'eventType'
  | 'ballroomCount'
  | 'eventDate'
  | 'venue'
  | 'websiteUrl'
  | 'price'
  | 'notes';

type FieldErrors = Partial<Record<FieldName, string>>;

interface FormState {
  // 3 Primary Required Fields
  eventInstagram: string;
  city: string;
  organizerEmail: string;
  // Optional Enrichment Fields (Collapsible)
  eventName: string;
  eventType: string;
  danceStyles: string[];
  ballroomCount: number;
  eventDate: string;
  venue: string;
  websiteUrl: string;
  price: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  eventInstagram: '',
  city: '',
  organizerEmail: '',
  eventName: '',
  eventType: 'Multi-Room Congress',
  danceStyles: ['Salsa', 'Bachata'],
  ballroomCount: 3,
  eventDate: '',
  venue: '',
  websiteUrl: '',
  price: '',
  notes: '',
};

function validateField(field: FieldName, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case 'eventInstagram':
      if (!v) return 'Instagram handle is required — we pull event details and lineups directly from it';
      if (!IG_RE.test(v)) return 'Must be a valid Instagram handle (e.g. @latindancefest or latindancefest)';
      return undefined;
    case 'city':
      if (!v) return 'City is required';
      if (v.length > 80) return 'City name is too long';
      return undefined;
    case 'organizerEmail':
      if (!v) return 'Email is required so we can notify you when your listing is published';
      if (!EMAIL_RE.test(v)) return 'Please enter a valid email address';
      return undefined;
    case 'eventName':
      if (v.length > 120) return 'Event name is too long';
      return undefined;
    case 'eventDate':
      if (v && !/^\d{4}-\d{2}-\d{2}$/.test(v)) return 'Please use YYYY-MM-DD format';
      return undefined;
    case 'venue':
      if (v.length > 150) return 'Venue details too long';
      return undefined;
    case 'websiteUrl':
      if (v && !URL_RE.test(v)) return 'Must start with http:// or https://';
      return undefined;
    default:
      return undefined;
  }
}

export function AddEventClient() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showExtras, setShowExtras] = useState(false);

  function update(field: keyof FormState, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    const validatedField = field as FieldName;
    if (touched[validatedField] && typeof value === 'string') {
      setErrors((prev) => ({ ...prev, [validatedField]: validateField(validatedField, value) }));
    }
  }

  function blur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = form[field];
    if (typeof val === 'string') {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, val) }));
    }
  }

  function toggleStyle(style: string) {
    const current = form.danceStyles;
    if (current.includes(style)) {
      if (current.length > 1) {
        update('danceStyles', current.filter((s) => s !== style));
      }
    } else {
      update('danceStyles', [...current, style]);
    }
  }

  function validateAll(): FieldErrors {
    const required: FieldName[] = ['eventInstagram', 'city', 'organizerEmail'];
    const next: FieldErrors = {};
    for (const f of required) {
      const err = validateField(f, form[f] as string);
      if (err) next[f] = err;
    }
    const optional: FieldName[] = ['eventName', 'eventDate', 'venue', 'websiteUrl'];
    for (const f of optional) {
      const v = form[f];
      if (typeof v === 'string' && v.trim()) {
        const err = validateField(f, v);
        if (err) next[f] = err;
      }
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError('');

    const fieldErrors = validateAll();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      const allTouched: Partial<Record<FieldName, boolean>> = {};
      for (const f of Object.keys(EMPTY_FORM) as FieldName[]) allTouched[f] = true;
      setTouched(allTouched);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
    } catch {
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // Live card preview helpers
  const cleanIg = form.eventInstagram.replace(/^@/, '');
  const previewTitle = form.eventName.trim() || (cleanIg ? `Latin Congress with @${cleanIg}` : 'Your Latin Dance Congress');
  const previewCity = form.city.trim() || 'Your City';
  const previewVenue = form.venue.trim() || 'Resort Hotel & Convention Center';
  const previewDate = form.eventDate.trim() || 'Upcoming 2026';
  const previewPrice = form.price.trim() || 'Full Pass $140';

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 lg:py-14 space-y-12">
      
      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/festivals"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Browse Latin Congresses
          </Link>
          <span className="text-zinc-600">•</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-950/20 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
            <Crown className="h-3 w-3 text-amber-400" />
            Global Network Launchpad
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
            100% Free Listing
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          List Your Latin Dance Congress
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Showcase your multi-room festival, marathon, or premier social to dancers worldwide. 15-second submission via your Instagram handle.
        </p>
      </header>

      {/* Main Grid: Form on Left, Live Flyer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="py-10 text-center" role="alert" aria-live="polite">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                  Congress Submitted for Verification!
                </h2>
                <p className="mt-3 text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  We received your event via <span className="text-amber-400 font-semibold">@{cleanIg}</span>. Our curation team will review and notify you at <span className="text-white font-medium">{form.organizerEmail}</span> once approved.
                </p>

                {/* THE INSTAGRAM COLLABORATOR FLYWHEEL CTA */}
                <div className="mt-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-rose-950/20 p-5 text-left space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 text-sm font-bold">
                    <InstagramIcon className="h-4 w-4 text-amber-400" />
                    <span>Double Your Reach: Add @FindLatinDance as a Collaborator</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    When you post your official lineup, flyer, or teaser Reel on Instagram, tap <strong>Tag People → Invite Collaborator</strong> and enter <strong>@findlatindance</strong>. Your event will be co-broadcast directly to thousands of traveling dancers looking for multi-room congresses!
                  </p>
                  <div className="pt-1 flex flex-wrap gap-2">
                    <a
                      href="https://instagram.com/findlatindance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-amber-500 transition"
                    >
                      Follow @findlatindance on Instagram
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setErrors({});
                    setTouched({});
                    setSubmitted(false);
                    setShowExtras(false);
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-700 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Submit Another Event
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 3 Core Fields Banner */}
                <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-4 mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>Instant 3-Field Organizer Intake</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Traveling dancers discover events through Instagram. Enter your handle and city — we curate and index your multi-room schedule directly.
                  </p>
                </div>

                {/* Field 1: Instagram Handle */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    1. Congress or Organizer Instagram Handle *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">@</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. miamisalsacongress"
                      value={form.eventInstagram.replace(/^@/, '')}
                      onChange={(e) => update('eventInstagram', e.target.value.trim())}
                      onBlur={() => blur('eventInstagram')}
                      className={`w-full rounded-xl border bg-zinc-900/90 pl-8 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition ${
                        errors.eventInstagram
                          ? 'border-red-500 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/20'
                      }`}
                    />
                  </div>
                  {errors.eventInstagram && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.eventInstagram}</p>
                  )}
                </div>

                {/* Field 2: City */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    2. City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Miami, Orlando, Las Vegas, Houston"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    onBlur={() => blur('city')}
                    className={`w-full rounded-xl border bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition ${
                      errors.city
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/20'
                    }`}
                  />
                  {errors.city && <p className="mt-1.5 text-xs text-red-400">{errors.city}</p>}

                  {/* Popular Congress City Quick-Chips */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-zinc-500">Top festival hubs:</span>
                    {POPULAR_CONGRESS_CITIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => update('city', c)}
                        className="rounded-full border border-white/5 bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-400 hover:border-amber-500/40 hover:text-white transition"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 3: Organizer Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    3. Organizer Notification Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="directors@latindancecongress.com"
                    value={form.organizerEmail}
                    onChange={(e) => update('organizerEmail', e.target.value)}
                    onBlur={() => blur('organizerEmail')}
                    className={`w-full rounded-xl border bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition ${
                      errors.organizerEmail
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-white/10 focus:border-amber-500 focus:ring-amber-500/20'
                    }`}
                  />
                  {errors.organizerEmail && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.organizerEmail}</p>
                  )}
                  <p className="mt-1 text-[11px] text-zinc-500">
                    We only use this to confirm your listing publication. Zero spam.
                  </p>
                </div>

                {/* Collapsible Optional Enrichment Details */}
                <div className="pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowExtras(!showExtras)}
                    className="flex w-full items-center justify-between py-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                  >
                    <span>{showExtras ? 'Hide Optional Details' : '+ Add Congress Name, Multi-Room Styles & Venue (Optional)'}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showExtras ? 'rotate-180' : ''}`} />
                  </button>

                  {showExtras && (
                    <div className="mt-4 space-y-4 pt-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Congress / Festival Title
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. International Latin Dance Congress 2026"
                          value={form.eventName}
                          onChange={(e) => update('eventName', e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      {/* Styles Multi-Select Pills */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Featured Dance Styles (Dedicated Rooms)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {DANCE_STYLES.map((style) => {
                            const isSelected = form.danceStyles.includes(style);
                            return (
                              <button
                                key={style}
                                type="button"
                                onClick={() => toggleStyle(style)}
                                className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition ${
                                  isSelected
                                    ? 'border-amber-500/50 bg-amber-500/20 text-amber-200 shadow-sm shadow-amber-500/20'
                                    : 'border-white/10 bg-zinc-900 text-zinc-400 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                {isSelected ? '✓ ' : '+ '}{style}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Event Type
                          </label>
                          <select
                            value={form.eventType}
                            onChange={(e) => update('eventType', e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                          >
                            {EVENT_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Number of Ballrooms
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={6}
                            value={form.ballroomCount}
                            onChange={(e) => update('ballroomCount', parseInt(e.target.value, 10) || 1)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Start Date (YYYY-MM-DD)
                          </label>
                          <input
                            type="date"
                            value={form.eventDate}
                            onChange={(e) => update('eventDate', e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                            Full Pass Price
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. $140 Early Bird / €130"
                            value={form.price}
                            onChange={(e) => update('price', e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Host Hotel or Convention Venue
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Hyatt Regency Convention Center, Miami, FL"
                          value={form.venue}
                          onChange={(e) => update('venue', e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Official Ticket / Pass Link
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={form.websiteUrl}
                          onChange={(e) => update('websiteUrl', e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                          Headlining Artists & Notes
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Artist couples, guest DJs, theme party nights..."
                          value={form.notes}
                          onChange={(e) => update('notes', e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {submitError && (
                  <p className="text-xs text-red-400 font-semibold">{submitError}</p>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold-primary w-full py-3.5 text-sm font-bold shadow-lg shadow-amber-900/40 disabled:opacity-50"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Verifying...' : 'Submit Congress for Free Listing'}
                </button>

                <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Manual editorial verification • Distributed across the Latin Dance Triad</span>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* Live Preview Card Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Live Congress Preview
            </span>
            <span className="badge-gold rounded-full px-2.5 py-0.5 text-[10px] font-bold">
              Multi-Room Card
            </span>
          </div>

          <div className="fcard overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 p-5 space-y-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-1">
                  {form.danceStyles.map((s) => (
                    <span key={s} className="rounded-md bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-500/30">
                      {s}
                    </span>
                  ))}
                </div>
                <h3 className="font-display mt-2 text-lg font-bold text-white leading-snug">
                  {previewTitle}
                </h3>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-md">
                <Crown className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-300 border-t border-white/5 pt-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{previewCity} • {previewVenue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                <span>{previewDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                <span>{form.ballroomCount} Dedicated Ballrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>{previewPrice}</span>
              </div>
              {cleanIg && (
                <div className="flex items-center gap-2 text-amber-300">
                  <InstagramIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>@{cleanIg}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <div className="w-full rounded-xl bg-amber-600/30 border border-amber-500/40 py-2 text-center text-xs font-semibold text-amber-200">
                Explore Festival Pass & Schedule →
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-4 text-xs text-zinc-400 space-y-2">
            <div className="font-semibold text-white">Why the Instagram handle matters:</div>
            <p className="leading-relaxed">
              Our automated intake pipeline fetches confirmed international artist tags, workshop schedules, and flyer art directly from Instagram, keeping your congress listing updated for traveling dancers.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
