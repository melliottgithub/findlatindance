'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { EventCard } from '@/components/events/EventCard';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent, LatinDanceStyle } from '@/types';
import { ArrowRight, Crown, Sparkles, MapPin, Globe } from 'lucide-react';

export default function HomePage() {
  const [selectedStyle, setSelectedStyle] = useState<LatinDanceStyle>('All Styles');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const events: LatinDanceEvent[] = eventsData as LatinDanceEvent[];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchStyle =
        selectedStyle === 'All Styles' ||
        ev.danceStyles.includes(selectedStyle) ||
        ev.danceStyles.includes('Mixed');
      const matchCity = !selectedCity || ev.citySlug === selectedCity;
      return matchStyle && matchCity;
    });
  }, [events, selectedStyle, selectedCity]);

  const festivals = useMemo(() => {
    return filteredEvents.filter((ev) => ev.eventType === 'festival');
  }, [filteredEvents]);

  const socialsAndClasses = useMemo(() => {
    return filteredEvents.filter((ev) => ev.eventType !== 'festival');
  }, [filteredEvents]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
      {/* Hero with interactive style & metro filters */}
      <Hero
        selectedStyle={selectedStyle}
        onSelectStyle={setSelectedStyle}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      {/* Featured Multi-Room Congresses Section */}
      {festivals.length > 0 && (
        <section className="mt-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                Featured Multi-Room Latin Congresses
              </h2>
            </div>
            <Link
              href="/festivals"
              className="text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-200 transition flex items-center gap-1"
            >
              View Full Calendar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {festivals.map((fest) => (
              <EventCard key={fest.id} event={fest} />
            ))}
          </div>
        </section>
      )}

      {/* Weekly Latin Socials & Club Nights */}
      <section className="mt-12 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              Weekly Latin Nights & Socials
            </h2>
          </div>
          <span className="text-xs font-medium text-zinc-500">
            Showing {socialsAndClasses.length} events
          </span>
        </div>

        {socialsAndClasses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {socialsAndClasses.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-12 text-center text-zinc-400">
            <p>No socials found matching this filter.</p>
            <button
              onClick={() => {
                setSelectedStyle('All Styles');
                setSelectedCity('');
              }}
              className="mt-3 text-xs text-amber-400 underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Top Global Latin Dance Cities Hub */}
      <section className="my-16">
        <div className="flex items-center gap-2 mb-6">
          <Globe className="h-5 w-5 text-amber-400" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            Explore Top Latin Dance Metros
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {[
            { name: 'Miami', slug: 'miami', flag: '🌴' },
            { name: 'Madrid', slug: 'madrid', flag: '🇪🇸' },
            { name: 'New York', slug: 'new-york', flag: '🗽' },
            { name: 'Paris', slug: 'paris', flag: '🇫🇷' },
            { name: 'Rovinj', slug: 'rovinj', flag: '🌊' },
            { name: 'Denver', slug: 'denver', flag: '🏔️' },
          ].map((city) => (
            <Link
              key={city.slug}
              href={`/cities/${city.slug}`}
              className="glass-gold-card flex flex-col items-center justify-center rounded-2xl p-5 text-center group transition"
            >
              <span className="text-2xl mb-1">{city.flag}</span>
              <span className="font-display text-sm font-bold text-white group-hover:text-amber-300 transition">
                {city.name}
              </span>
              <span className="text-[11px] text-zinc-500 mt-0.5">Explore Scene →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Network Synergy Banner: FindSalsa & FindBachata */}
      <section className="my-16 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#0c0c12] via-[#101018] to-amber-950/20 p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_-10px_rgba(212,175,55,0.1)]">
        <div className="relative z-10 max-w-2xl">
          <span className="badge-prestige-gold rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            The Global Latin Dance Triad
          </span>
          <h3 className="font-display mt-4 text-2xl sm:text-3xl font-bold text-white">
            Looking for Deeply Curated Niche Scenes?
          </h3>
          <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
            While <strong className="text-white">FindLatinDance.com</strong> unifies multi-room congresses and Latin nights, explore our sister portals dedicated exclusively to single-genre mastery:
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://findsalsa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-rose-500/40 bg-rose-500/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-rose-300 hover:bg-rose-500/20 transition flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Visit FindSalsa.com (On1 · On2 · Cuban) →
            </a>
            <a
              href="https://findbachata.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2.5 text-xs sm:text-sm font-semibold text-purple-300 hover:bg-purple-500/20 transition flex items-center gap-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              Visit FindBachata.com (Sensual · Traditional) →
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
