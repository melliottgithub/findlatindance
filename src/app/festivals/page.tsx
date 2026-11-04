import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { Crown, Globe2, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Multi-Room Latin Dance Congresses & Festivals 2026–2027 — FindLatinDance',
  description: 'The definitive calendar of multi-room Latin dance congresses and weekend festivals worldwide. Dedicated Salsa, Bachata, Brazilian Zouk, and Kizomba rooms under one roof.',
};

export default function FestivalsPage() {
  const events = eventsData as LatinDanceEvent[];
  const festivals = events.filter((e) => e.eventType === 'festival');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/20 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3">
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span>Worldwide Multi-Room Latin Congress Calendar</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Latin Dance Congresses & Festivals (2026–2027)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
          World-class multi-room congresses featuring dedicated ballrooms for Bachata Sensual, Classic Mambo Salsa, Urban Kiz, and Brazilian Zouk with international master instructors and live orchestras.
        </p>
      </div>

      {/* Grid of Festivals */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {festivals.map((fest) => (
          <EventCard key={fest.id} event={fest} />
        ))}
      </div>

    </div>
  );
}
