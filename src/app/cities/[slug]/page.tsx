import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { ChevronRight, Crown, MapPin } from 'lucide-react';

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

      {/* City Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <MapPin className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            {countryName} Latin Dance Scene
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Latin Social Dance in {cityName}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
          Verified multi-room Latin congresses, weekly social dances, and masterclasses across Salsa, Bachata, Brazilian Zouk, and Kizomba in {cityName}.
        </p>
      </div>

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
