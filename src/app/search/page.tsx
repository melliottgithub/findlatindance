'use client';

import { useState, useMemo } from 'react';
import { EventCard } from '@/components/events/EventCard';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { Search as SearchIcon, X } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const events = eventsData as LatinDanceEvent[];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) => {
      const matchName = e.companyName.toLowerCase().includes(q);
      const matchCity = e.city.toLowerCase().includes(q);
      const matchCountry = e.country.toLowerCase().includes(q);
      const matchDesc = e.description.toLowerCase().includes(q);
      const matchStyles = e.danceStyles.some((s) => s.toLowerCase().includes(q));
      return matchName || matchCity || matchCountry || matchDesc || matchStyles;
    });
  }, [events, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Search Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="font-display text-3xl font-extrabold text-white">
          Search Latin Dance Events
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Find multi-room congresses, socials, and classes by city, venue, or dance style (e.g. "Zouk", "Miami", "Kizomba", "Denver", "Bachata").
        </p>
      </div>

      {/* Input Field */}
      <div className="relative mb-10 max-w-2xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, festival, or style..."
          className="w-full rounded-2xl border border-amber-500/20 bg-[#0d0d14] py-3.5 pl-12 pr-10 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 shadow-xl transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
        <span>Found {results.length} events</span>
        {query && (
          <button onClick={() => setQuery('')} className="text-amber-400 hover:underline">
            Clear search
          </button>
        )}
      </div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/5 bg-[#0e0e14] p-12 text-center text-zinc-400">
          <p>No Latin dance events matched "{query}".</p>
          <p className="mt-1 text-xs text-zinc-500">Try searching for a city like "Miami" or a style like "Zouk".</p>
        </div>
      )}

    </div>
  );
}
