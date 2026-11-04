import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { ListNavScope } from '@/components/events/ListNavScope';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { Calendar, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Latin Dance Festivals & Congresses This Month — FindLatinDance',
  description: 'Upcoming salsa, bachata, and zouk congresses, marathons, and multi-day dance events taking place over the next 30 days. Don’t miss last-minute passes and weekend getaways.',
  alternates: {
    canonical: 'https://findlatindance.com/festivals/this-month',
  },
};

export default function FestivalsThisMonthPage() {
  const events = eventsData as LatinDanceEvent[];
  const festivals = events.filter((e) => e.eventType === 'festival');
  const upcomingFestivals = festivals.slice(0, 15);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/20 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Next 30 Days</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Latin Dance Festivals Happening This Month
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
          Top Latin dance congresses and marathons with imminent departure dates. Check artist line-ups, pass availability, and official ticket portals.
        </p>
      </div>

      {/* Temporal Navigation Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <Link
          href="/festivals"
          className="rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          All Congresses
        </Link>
        <Link
          href="/festivals/2026"
          className="rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          2026 Season
        </Link>
        <Link
          href="/festivals/2027"
          className="rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          2027 Season
        </Link>
        <span className="rounded-xl bg-amber-600 text-white px-3.5 py-1.5 text-xs font-bold shadow">
          This Month ({upcomingFestivals.length})
        </span>
        <Link
          href="/festivals/this-weekend"
          className="rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          This Weekend
        </Link>
      </div>

      {/* Grid */}
      <ListNavScope listKey="festivals:this-month" label="This Month">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingFestivals.map((fest) => (
            <EventCard key={fest.id} event={fest} />
          ))}
        </div>
      </ListNavScope>

    </div>
  );
}
