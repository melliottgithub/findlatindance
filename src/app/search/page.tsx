'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { ListNavScope } from '@/components/events/ListNavScope';
import eventsData from '@/data/events.json';
import type { LatinDanceEvent } from '@/types';
import { Search as SearchIcon, X, Calendar, MapPin, Sparkles, Filter, Globe2, Camera } from 'lucide-react';
import { VisualSearchModal } from '@/components/search/VisualSearchModal';

const TOP_CITIES = [
  'Miami',
  'Madrid',
  'New York',
  'London',
  'Barcelona',
  'Paris',
  'Chicago',
  'Los Angeles',
  'Milan',
  'Berlin',
];

const LATIN_STYLES = [
  { id: 'all', label: 'All Styles' },
  { id: 'salsa', label: 'Salsa' },
  { id: 'bachata', label: 'Bachata' },
  { id: 'zouk', label: 'Brazilian Zouk' },
  { id: 'kizomba', label: 'Kizomba' },
];

const EVENT_TYPES = [
  { id: 'all', label: 'All Events' },
  { id: 'social', label: 'Socials' },
  { id: 'class', label: 'Classes' },
  { id: 'festival', label: 'Congresses' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<'all' | 'weekend' | 'month'>('all');
  const [visualModalOpen, setVisualModalOpen] = useState(false);

  const events = eventsData as LatinDanceEvent[];

  const featuredFestivals = useMemo(() => {
    return events.filter((e) => e.eventType === 'festival').slice(0, 6);
  }, [events]);

  const hasActiveFilters = Boolean(
    query.trim() || selectedType !== 'all' || selectedStyle !== 'all' || selectedCity || timeFilter !== 'all'
  );

  const results = useMemo(() => {
    if (!hasActiveFilters) return [];

    const q = query.trim().toLowerCase();
    const now = new Date();

    return events.filter((e) => {
      // Type filter
      if (selectedType !== 'all' && e.eventType !== selectedType) {
        return false;
      }

      // Style filter
      if (selectedStyle !== 'all') {
        const matchesStyle = e.danceStyles.some((s) =>
          s.toLowerCase().includes(selectedStyle.toLowerCase())
        );
        if (!matchesStyle) return false;
      }

      // City filter
      if (selectedCity && e.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Time filter
      if (timeFilter === 'weekend') {
        const isWeeklyWeekend =
          e.frequency === 'weekly' &&
          (e.dateTime.day === 'Friday' || e.dateTime.day === 'Saturday' || e.dateTime.day === 'Sunday');
        const evDate = new Date(e.date);
        const dayOfWeek = evDate.getDay();
        const isOneTimeWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;
        if (!isWeeklyWeekend && !isOneTimeWeekend) return false;
      } else if (timeFilter === 'month') {
        const evDate = new Date(e.date);
        const diffDays = (evDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
        if (e.frequency === 'one-time' && (diffDays < 0 || diffDays > 31)) {
          return false;
        }
      }

      // Query text match
      if (q) {
        const matchName = e.companyName.toLowerCase().includes(q);
        const matchCity = e.city.toLowerCase().includes(q);
        const matchCountry = e.country.toLowerCase().includes(q);
        const matchDesc = e.description.toLowerCase().includes(q);
        const matchLoc = e.location.toLowerCase().includes(q);
        const matchStyles = e.danceStyles.some((s) => s.toLowerCase().includes(q));
        const matchArtists = e.artists?.some((a) => a.toLowerCase().includes(q)) ?? false;
        return matchName || matchCity || matchCountry || matchDesc || matchLoc || matchStyles || matchArtists;
      }

      return true;
    });
  }, [events, query, selectedType, selectedStyle, selectedCity, timeFilter, hasActiveFilters]);

  function resetAll() {
    setQuery('');
    setSelectedType('all');
    setSelectedStyle('all');
    setSelectedCity(null);
    setTimeFilter('all');
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Real-Time Dance Engine</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Search Worldwide Latin Dance
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-zinc-400 max-w-2xl">
          Instantly filter verified salsa, bachata, zouk, and kizomba socials, masterclasses, and international congresses across 39 dance capitals.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6 max-w-3xl">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by city, genre, venue, or artist (e.g. 'Miami', 'Zouk', 'Ataca', 'Bachata')..."
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/90 py-3.5 pl-12 pr-10 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-xl transition"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setVisualModalOpen(true)}
            title="Snap a flyer / Visual search"
            aria-label="Snap flyer to search"
            className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300 transition"
          >
            <Camera className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Snap Flyer</span>
          </button>
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="mb-6 space-y-4">
        {/* Event Type Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Type:
          </span>
          {EVENT_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedType === t.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950/50'
                  : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Style & Time Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mr-1">
            Genre:
          </span>
          {LATIN_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStyle(s.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                selectedStyle === s.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                  : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {s.label}
            </button>
          ))}

          <span className="text-zinc-600 mx-1 hidden sm:inline">|</span>

          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mr-1">
            Date:
          </span>
          <button
            onClick={() => setTimeFilter('all')}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              timeFilter === 'all'
                ? 'bg-zinc-700 text-white'
                : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            All Dates
          </button>
          <button
            onClick={() => setTimeFilter('weekend')}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              timeFilter === 'weekend'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            This Weekend
          </button>
          <button
            onClick={() => setTimeFilter('month')}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              timeFilter === 'month'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            Next 30 Days
          </button>
        </div>

        {/* Quick City Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mr-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Cities:
          </span>
          {TOP_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                selectedCity === city
                  ? 'bg-white text-zinc-950 font-bold shadow'
                  : 'bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
              }`}
            >
              {city}
            </button>
          ))}
          {selectedCity && (
            <button
              onClick={() => setSelectedCity(null)}
              className="text-xs text-amber-400 hover:underline ml-1"
            >
              Clear city
            </button>
          )}
        </div>
      </div>

      {/* Active Search & Filter Status */}
      {hasActiveFilters && (
        <div className="mb-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-400">
          <div>
            <span>Found </span>
            <strong className="text-white font-bold">{results.length}</strong>
            <span> matching events</span>
          </div>
          <button onClick={resetAll} className="text-amber-400 hover:text-amber-300 font-medium">
            Reset all filters
          </button>
        </div>
      )}

      {/* Results View */}
      {hasActiveFilters ? (
        results.length > 0 ? (
          <ListNavScope listKey="search:results" label="Search Results">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          </ListNavScope>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-zinc-900/40 p-12 text-center text-zinc-400">
            <p className="text-base text-white font-semibold">No Latin dance events found matching your criteria.</p>
            <p className="mt-1.5 text-xs text-zinc-500">
              Try adjusting your genre filter, city chips, or date range.
            </p>
            <button
              onClick={resetAll}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 transition shadow"
            >
              Reset filters & explore all
            </button>
          </div>
        )
      ) : (
        /* Pre-baked Idle State: Featured Congresses & Top City Shortcuts */
        <div className="space-y-12">
          {/* Top City Hub Shortcuts */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-amber-400" />
                <span>Explore Top Latin Dance Capitals</span>
              </h2>
              <Link href="/" className="text-xs font-semibold text-amber-400 hover:text-amber-300">
                View all cities →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {TOP_CITIES.map((city) => {
                const count = events.filter((e) => e.city.toLowerCase() === city.toLowerCase()).length;
                const slug = city.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={city}
                    href={`/cities/${slug}`}
                    className="rounded-xl border border-white/10 bg-zinc-900/60 p-3 hover:border-amber-500/40 hover:bg-zinc-800/80 transition shadow-sm group"
                  >
                    <p className="text-sm font-bold text-white group-hover:text-amber-300 transition truncate">
                      {city}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">{count} verified events</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Featured Upcoming Festivals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-rose-400" />
                <span>Featured Worldwide Latin Congresses</span>
              </h2>
              <Link href="/festivals" className="text-xs font-semibold text-rose-400 hover:text-rose-300">
                View all congresses →
              </Link>
            </div>
            <ListNavScope listKey="search:featured_festivals" label="Featured Congresses">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredFestivals.map((fest) => (
                  <EventCard key={fest.id} event={fest} />
                ))}
              </div>
            </ListNavScope>
          </div>
        </div>
      )}

      {/* Visual Search Modal */}
      <VisualSearchModal
        isOpen={visualModalOpen}
        onClose={() => setVisualModalOpen(false)}
        brand="findlatindance"
      />
    </div>
  );
}
