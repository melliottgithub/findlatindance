import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { ListNavScope } from '@/components/events/ListNavScope';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { Calendar, PartyPopper } from 'lucide-react';

export const metadata = {
  title: 'Latin Dance Festivals & Congresses This Weekend — FindLatinDance',
  description: 'Festivals, congresses, and Latin dance weekenders taking place this upcoming Friday through Sunday. Last-minute party passes and workshop day passes.',
  alternates: {
    canonical: 'https://findlatindance.com/festivals/this-weekend',
  },
};

export default function FestivalsThisWeekendPage() {
  const events = eventsData as LatinDanceEvent[];
  const festivals = events.filter((e) => e.eventType === 'festival');
  const thisWeekendFestivals = festivals.slice(0, 9);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/20 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3">
          <PartyPopper className="h-3.5 w-3.5 text-amber-400" />
          <span>Friday – Sunday Weekender</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Latin Dance Festivals This Weekend
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
          Multi-day Latin dance events and weekenders launching this weekend. Discover party passes, day passes, and venue addresses.
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
        <Link
          href="/festivals/this-month"
          className="rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          This Month
        </Link>
        <span className="rounded-xl bg-amber-600 text-white px-3.5 py-1.5 text-xs font-bold shadow">
          This Weekend ({thisWeekendFestivals.length})
        </span>
      </div>

      {/* Grid */}
      <ListNavScope listKey="festivals:this-weekend" label="This Weekend">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {thisWeekendFestivals.map((fest) => (
            <EventCard key={fest.id} event={fest} />
          ))}
        </div>
      </ListNavScope>

    </div>
  );
}
