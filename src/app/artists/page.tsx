import Link from 'next/link';
import type { Metadata } from 'next';
import { Users, Sparkles, MapPin, ArrowRight, Calendar, Star } from 'lucide-react';
import artistsData from '@/data/artists.json';
import eventsData from '@/data/events.json';
import type { LatinEvent } from '@/types';

export const metadata: Metadata = {
  title: 'Master Latin Dance Artists & Headliners — FindLatinDance',
  description: 'Explore the world’s leading Latin dance artists, champions, and headliners. Discover their upcoming 2026–2027 festival appearances across Salsa, Bachata, Zouk, and Kizomba.',
  alternates: {
    canonical: 'https://findlatindance.com/artists',
  },
};

export default function ArtistsIndexPage() {
  const allEvents = eventsData as LatinEvent[];
  const festivals = allEvents.filter((e) => e.eventType === 'festival');

  // Map festival count per artist
  const artistsWithFestivals = artistsData.map((artist) => {
    const matchedFestivals = festivals.filter((fest) => {
      const festArtists = Array.isArray(fest.artists) ? fest.artists : [];
      return (
        artist.matchedNames.some((m) =>
          festArtists.some((fa) => fa.toLowerCase().includes(m.toLowerCase()))
        ) ||
        fest.companyName.toLowerCase().includes(artist.name.toLowerCase()) ||
        fest.description.toLowerCase().includes(artist.name.toLowerCase())
      );
    });

    return {
      ...artist,
      festivalCount: matchedFestivals.length,
    };
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-28 pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-amber-400 transition">Home</Link>
          <span>/</span>
          <span className="text-zinc-200 font-medium">Artists</span>
        </nav>

        {/* Hero Section */}
        <header className="relative rounded-3xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-violet-950/40 border border-amber-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl mb-12">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 mb-4">
              <Users className="h-3.5 w-3.5" />
              <span>International Headliner Directory</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              World-Class Latin Dance Artists &amp; Instructors
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
              Track your favorite global artists and world champions across Salsa, Bachata, Brazilian Zouk, and Kizomba. Find the 2026–2027 festivals, congresses, and masterclasses where they headline.
            </p>
          </div>
        </header>

        {/* Artists Grid */}
        <section aria-label="Artists Directory">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artistsWithFestivals.map((artist) => (
              <div
                key={artist.id}
                className="group relative rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 p-6 flex flex-col justify-between transition duration-300 hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300">
                      {artist.nickname}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-400">
                      <MapPin className="h-3 w-3 text-amber-400" />
                      {artist.city}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                    <Link href={`/artists/${artist.id}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {artist.name}
                    </Link>
                  </h2>

                  <p className="text-xs font-medium text-amber-400/90 mt-1">
                    {artist.role}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                    {artist.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {artist.styles.map((style) => (
                      <span
                        key={style}
                        className="rounded-lg bg-white/5 border border-white/5 px-2 py-0.5 text-[11px] text-zinc-400"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" />
                    <strong className="text-white">{artist.festivalCount}</strong> upcoming festival{artist.festivalCount === 1 ? '' : 's'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition duration-200">
                    View Schedule <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
