import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { getCityHeroImage, getCityHeroJpg } from '@/lib/city-hero-images';
import { countryForCity } from '@/lib/city-country';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { ChevronRight, Crown, MapPin, Sparkles } from 'lucide-react';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = eventsData as LatinDanceEvent[];
  const slugs = Array.from(new Set(events.map((e) => e.citySlug)));
  return slugs.map((slug) => ({ slug }));
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const events = eventsData as LatinDanceEvent[];
  const cityEvents = events.filter((e) => e.citySlug === slug);

  if (cityEvents.length === 0) {
    notFound();
  }

  const cityName = cityEvents[0].city;
  const countryName = cityEvents[0].country;
  const country = countryForCity(cityName, countryName);
  const heroWebp = getCityHeroImage(slug);
  const heroJpg = getCityHeroJpg(slug);

  const festivalCount = cityEvents.filter((e) => e.eventType === 'festival').length;
  const socialCount = cityEvents.filter((e) => e.eventType === 'social').length;
  const classCount = cityEvents.filter((e) => e.eventType === 'class').length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Breadcrumbs for SEO */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/cities/miami" className="hover:text-white transition">Cities</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-zinc-300 font-medium">{cityName}</span>
      </nav>

      {/* Immersive City Hero with Nocturnal Photography */}
      <header className="relative mb-10 overflow-hidden rounded-3xl border border-amber-500/20 bg-zinc-950 px-6 py-10 sm:p-12 shadow-2xl">
        {heroWebp && (
          <>
            <picture>
              <source type="image/webp" srcSet={heroWebp} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroJpg || heroWebp}
                alt=""
                aria-hidden="true"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center opacity-40 pointer-events-none scale-105"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070709]/95 via-[#070709]/50 to-transparent pointer-events-none" />
          </>
        )}

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl" aria-hidden="true">{country.flag}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {country.name} · Latin Social Dance Hub
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Latin Social Dance in {cityName}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            Verified multi-room Latin congresses, weekly social dances, and masterclasses across Salsa, Bachata, Brazilian Zouk, and Kizomba in {cityName}.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-semibold text-zinc-300">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {cityEvents.length} Total Events
            </span>
            {festivalCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 px-3 py-1 font-bold">
                <Crown className="h-3 w-3 text-amber-400" />
                {festivalCount} {festivalCount === 1 ? 'Congress' : 'Congresses'}
              </span>
            )}
            {socialCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 px-3 py-1">
                {socialCount} {socialCount === 1 ? 'Social' : 'Socials'}
              </span>
            )}
            {classCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 px-3 py-1">
                {classCount} {classCount === 1 ? 'Class' : 'Classes'}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cityEvents.map((ev) => (
          <EventCard key={ev.id} event={ev} />
        ))}
      </div>

      {/* Country continuation / no-dead-end block */}
      <div className="mt-16 rounded-2xl border border-white/5 bg-[#0e0e14] p-6 text-center text-xs text-zinc-400">
        <p>Know an unlisted weekly Latin party, social, or congress in {cityName}?</p>
        <Link href="/add-event" className="mt-2 inline-block font-semibold text-amber-400 hover:underline">
          + Submit an event for free
        </Link>
      </div>

    </div>
  );
}
