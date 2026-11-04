'use client';

import { Crown, Sparkles } from 'lucide-react';
import type { LatinDanceStyle } from '@/types';

interface HeroProps {
  selectedStyle: LatinDanceStyle;
  onSelectStyle: (style: LatinDanceStyle) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

const STYLES: LatinDanceStyle[] = [
  'All Styles',
  'Salsa',
  'Bachata',
  'Brazilian Zouk',
  'Kizomba',
  'Merengue',
];

const TOP_CITIES = [
  { name: 'All Metros', slug: '' },
  { name: 'Miami', slug: 'miami' },
  { name: 'Madrid', slug: 'madrid' },
  { name: 'New York', slug: 'new-york' },
  { name: 'Paris', slug: 'paris' },
  { name: 'Rovinj', slug: 'rovinj' },
  { name: 'Denver', slug: 'denver' },
];

export function Hero({ selectedStyle, onSelectStyle, selectedCity, onSelectCity }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-10 sm:pt-20 sm:pb-16 text-center">
      
      {/* Ambient Gold Radial Scrim */}
      <div className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-[550px] w-[850px] -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent blur-3xl" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_20px_-3px_rgba(212,175,55,0.3)] mb-6">
        <Crown className="h-3.5 w-3.5 text-amber-400" />
        <span>The Global Latin Dance Network</span>
      </div>

      {/* Headline */}
      <h1 className="font-display mx-auto max-w-4xl text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
        Discover <span className="bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-500 bg-clip-text text-transparent">Latin Dance Worldwide</span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
        The definitive global portal for multi-room congresses, weekend festivals, and authentic Latin club nights across Salsa, Bachata, Brazilian Zouk, and Kizomba.
      </p>

      {/* Style Filters */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {STYLES.map((style) => {
          const isActive = selectedStyle === style;
          return (
            <button
              key={style}
              onClick={() => onSelectStyle(style)}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-[0_0_15px_-2px_rgba(212,175,55,0.6)]'
                  : 'bg-zinc-900/90 text-zinc-300 border border-white/10 hover:border-amber-400/40 hover:text-white'
              }`}
            >
              {style}
            </button>
          );
        })}
      </div>

      {/* City Pickers */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs">
        {TOP_CITIES.map((c) => {
          const isActive = selectedCity === c.slug;
          return (
            <button
              key={c.name}
              onClick={() => onSelectCity(c.slug)}
              className={`rounded-lg px-2.5 py-1 transition ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

    </section>
  );
}
