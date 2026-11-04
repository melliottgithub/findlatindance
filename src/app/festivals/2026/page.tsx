import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { ListNavScope } from '@/components/events/ListNavScope';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { Calendar, Globe2 } from 'lucide-react';

export const metadata = {
  title: 'Latin Dance Congresses & Festivals 2026 Calendar — FindLatinDance',
  description: 'Verified worldwide directory of Latin dance congresses, marathons, and festivals in 2026. Official ticket links, master artist lineups, and venue details.',
  alternates: {
    canonical: 'https://findlatindance.com/festivals/2026',
  },
};

export default function Festivals2026Page() {
  const events = eventsData as LatinDanceEvent[];
  const festivals2026 = events.filter(
    (e) => e.eventType === 'festival' && (e.date.startsWith('2026') || (e.endDate && e.endDate.startsWith('2026')))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/20 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3">
          <Globe2 className="h-3.5 w-3.5 text-amber-400" />
          <span>2026 Global Calendar</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Latin Dance Congresses & Festivals 2026
        </h1>
        <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
          Discover {festivals2026.length} international Latin dance festivals and congresses scheduled across Europe, the Americas, and Asia for the 2026 calendar year.
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
        <span className="rounded-xl bg-amber-500 text-zinc-950 px-3.5 py-1.5 text-xs font-bold shadow">
          2026 Season ({festivals2026.length})
        </span>
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
        <Link
          href="/festivals/this-weekend"
          className="rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition"
        >
          This Weekend
        </Link>
      </div>

      {/* Grid */}
      <ListNavScope listKey="festivals:2026" label="2026 Congresses">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {festivals2026.map((fest) => (
            <EventCard key={fest.id} event={fest} />
          ))}
        </div>
      </ListNavScope>

    </div>
  );
}
