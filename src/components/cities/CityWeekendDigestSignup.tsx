'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export interface CityWeekendDigestSignupProps {
  cityName: string;
  citySlug: string;
  className?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CityWeekendDigestSignup({
  cityName,
  citySlug,
  className = '',
}: CityWeekendDigestSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !EMAIL_RE.test(cleanEmail)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setStatus('success');
      setMessage(
        `You're on the list! Watch your inbox Thursday morning for ${cityName}'s weekend Latin dance lineup.`
      );
      trackEvent('digest_subscribe', {
        city: cityName,
        city_slug: citySlug,
        status: 'success',
      });
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  }

  return (
    <section
      aria-label={`Get ${cityName} Weekend Latin Dance Digest`}
      className={`rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/30 via-zinc-900/60 to-zinc-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl ${className}`}
      data-testid="weekend-digest-signup"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Never miss a social</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            The {cityName} Weekend Latin Dance Digest
          </h2>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Every Thursday morning, we curate the top salsa, bachata, zouk, and kizomba socials, weekend workshops, and guest masterclasses in {cityName}. Zero spam, 100% Latin dance.
          </p>
        </div>

        <div className="w-full md:w-auto md:min-w-[320px]">
          {status === 'success' ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-emerald-200">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === 'loading'}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition shadow-inner disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 py-2.5 px-4 text-sm font-semibold text-white shadow-lg hover:from-amber-500 hover:to-amber-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <span>Get Weekend Lineup</span>
                )}
              </button>
              {status === 'error' && (
                <div className="flex items-center gap-2 text-xs text-rose-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
