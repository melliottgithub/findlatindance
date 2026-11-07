import { notFound } from 'next/navigation';
import Link from 'next/link';
import artistsData from '@/data/artists.json';
import eventsData from '@/data/events.json';
import { EventCard } from '@/components/events/EventCard';
import { ListNavScope } from '@/components/events/ListNavScope';
import type { LatinEvent } from '@/types';
import type { Metadata } from 'next';
import { ArrowLeft, Users, MapPin, Globe2, Sparkles, Calendar } from 'lucide-react';

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface ArtistPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return artistsData.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { id } = await params;
  const artist = artistsData.find((a) => a.id === id);
  if (!artist) return { title: 'Artist Not Found — FindLatinDance' };

  return {
    title: `${artist.name} (${artist.nickname}) — Latin Festivals & Bio — FindLatinDance`,
    description: `Discover upcoming 2026–2027 Latin festivals, congresses, and masterclasses headlined by ${artist.name}. Biography, dance styles (${artist.styles.join(', ')}), and schedule.`,
    alternates: {
      canonical: `https://findlatindance.com/artists/${id}`,
    },
  };
}

export default async function ArtistDetailPage({ params }: ArtistPageProps) {
  const { id } = await params;
  const artist = artistsData.find((a) => a.id === id);
  if (!artist) notFound();

  const allEvents = eventsData as LatinEvent[];
  // Match festivals that have this artist listed or where festival title or description mentions artist
  const festivals = allEvents.filter(
    (e) =>
      e.eventType === 'festival' &&
      (
        (Array.isArray(e.artists) &&
          artist.matchedNames.some((m) =>
            e.artists!.some((ea) => ea.toLowerCase().includes(m.toLowerCase()))
          )) ||
        e.companyName.toLowerCase().includes(artist.name.toLowerCase()) ||
        e.description.toLowerCase().includes(artist.name.toLowerCase())
      )
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    alternateName: artist.nickname,
    description: artist.bio,
    jobTitle: artist.role,
    homeLocation: {
      '@type': 'Place',
      name: `${artist.city}, ${artist.country}`,
    },
    knowsAbout: artist.styles,
    url: `https://findlatindance.com/artists/${id}`,
    sameAs: artist.instagram ? [artist.instagram] : [],
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-28 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
          <Link
            href="/artists"
            className="inline-flex items-center gap-1.5 hover:text-amber-400 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Artists
          </Link>
          <span className="text-zinc-500">Artist Profile</span>
        </div>

        {/* Profile Card Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-violet-950/40 border border-amber-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl mb-12">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
                {artist.nickname}
              </span>
              <span className="flex items-center gap-1 text-xs text-zinc-400">
                <MapPin className="h-3.5 w-3.5 text-amber-400" />
                {artist.city}, {artist.country}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {artist.name}
            </h1>

            <p className="text-sm sm:text-base font-medium text-amber-400/90 mt-1">
              {artist.role}
            </p>

            <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              {artist.bio}
            </p>

            {/* Dance Styles */}
            <div className="mt-6 flex flex-wrap gap-2">
              {artist.styles.map((style) => (
                <span
                  key={style}
                  className="rounded-xl bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-zinc-300"
                >
                  {style}
                </span>
              ))}
            </div>

            {/* Social / Official Link */}
            {artist.instagram && (
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4">
                <a
                  href={artist.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-2 text-xs font-bold text-amber-200 hover:bg-amber-500/20 hover:border-amber-400 transition shadow"
                >
                  <InstagramIcon className="h-4 w-4" />
                  <span>Official Instagram Profile</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Headlining Festivals Feed */}
        <section aria-label={`Upcoming festivals headlined by ${artist.name}`}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-amber-400" />
                <span>Upcoming Festivals &amp; Congresses ({festivals.length})</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Appearances and masterclasses featuring {artist.name}.
              </p>
            </div>
          </div>

          {festivals.length === 0 ? (
            <div className="rounded-2xl bg-zinc-900/40 border border-white/5 p-8 text-center">
              <p className="text-sm text-zinc-400">
                No festivals currently indexed for {artist.name} in this cycle. Check back soon as new 2026/2027 editions are announced.
              </p>
              <Link
                href="/festivals"
                className="inline-block mt-4 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition"
              >
                Browse All 2026 Latin Festivals
              </Link>
            </div>
          ) : (
            <ListNavScope listKey={`artist-${id}`} label={`${artist.name} Festivals`}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {festivals.map((fest) => (
                  <EventCard key={fest.id} event={fest} />
                ))}
              </div>
            </ListNavScope>
          )}
        </section>
      </div>
    </div>
  );
}
