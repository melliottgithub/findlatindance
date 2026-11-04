'use client';

import Link from 'next/link';
import { trackRecClick } from '@/lib/analytics';
import { eventCanonicalSlug } from '@/lib/slugs';
import type { LatinDanceEvent } from '@/types';
import { Calendar, MapPin } from 'lucide-react';

export interface ThisWeekInCityProps {
  city: string;
  currentEventId: string;
  events: LatinDanceEvent[];
  maxCards?: number;
}

export function ThisWeekInCity({
  city,
  currentEventId,
  events,
  maxCards = 3,
}: ThisWeekInCityProps) {
  const eligible = events
    .filter((e) => e.id !== currentEventId)
    .slice(0, maxCards);

  if (eligible.length === 0) return null;

  const targetHref = `/cities/${encodeURIComponent(city.toLowerCase().replace(/\s+/g, '-'))}`;

  return (
    <section
      aria-label={`More Latin dance in ${city} this week`}
      className="space-y-4 pt-6 border-t border-white/10"
      data-testid="this-week-in-city"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <Calendar className="h-4 w-4 text-amber-400" />
          <span>More in {city} this week</span>
        </h2>
        <Link
          href={targetHref}
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
        >
          {`See all ${city} events →`}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {eligible.map((item, idx) => (
          <Link
            key={item.id}
            href={`/events/${eventCanonicalSlug(item)}`}
            onClick={() =>
              trackRecClick({
                module: 'this_week_in_city',
                position: idx + 1,
                from_event_id: currentEventId,
                to_event_id: item.id,
                tier: 'city_week',
              })
            }
            className="group flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-3.5 transition-all hover:border-amber-500/40 hover:bg-zinc-800/80 shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className="inline-block rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/20">
                  {item.eventType}
                </span>
                <span className="text-[11px] font-medium text-zinc-400">
                  {item.frequency === 'weekly' && item.dateTime?.day
                    ? `Every ${item.dateTime.day}`
                    : item.date}
                </span>
              </div>
              <h3 className="line-clamp-1 text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                {item.companyName}
              </h3>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-zinc-400">
              <MapPin className="h-3 w-3 shrink-0 text-zinc-500" />
              <span className="truncate">{item.location}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
