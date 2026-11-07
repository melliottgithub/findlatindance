import recsData from '@/data/recs.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, ExternalLink, MapPin, Sparkles, Tag, Users, Flame, PartyPopper } from 'lucide-react';
import eventsData from '@/data/events.json';
import { eventCanonicalSlug } from '@/lib/slugs';
import { countryForCity } from '@/lib/city-country';
import { generateBreadcrumbJsonLd, generateEventJsonLd, safeJsonLdString } from '@/lib/structured-data';
import { FallbackImg } from '@/components/ui/FallbackImg';
import { NextNav } from '@/components/events/NextNav';
import { ThisWeekInCity } from '@/components/events/ThisWeekInCity';
import type { Metadata } from 'next';
import type { LatinEvent } from '@/types';

const events = eventsData as LatinEvent[];
const eventMap = new Map<string, LatinEvent>();
for (const e of events) {
  eventMap.set(eventCanonicalSlug(e), e);
}

export async function generateStaticParams() {
  return events.map((e) => ({
    slug: eventCanonicalSlug(e),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = eventMap.get(slug);
  if (!event) return { title: 'Event Not Found — FindLatinDance' };

  const country = countryForCity(event.city, event.country);
  const title = `${event.companyName} in ${event.city}, ${country.name} (${event.date}) — FindLatinDance`;
  const description = `${event.companyName} on ${event.date} at ${event.location}. Multi-room Latin dance event with schedules, ballroom styles, and passes on FindLatinDance.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://findlatindance.com/events/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://findlatindance.com/events/${slug}`,
      images: event.imageUrl ? [{ url: event.imageUrl }] : undefined,
    },
  };
}

function googleCalendarUrl(event: LatinEvent): string {
  const title = encodeURIComponent(event.companyName);
  const details = encodeURIComponent(`${event.description}\n\nInfo: ${event.eventUrl}`);
  const location = encodeURIComponent(event.location);
  const start = event.date.replace(/-/g, '');
  const end = (event.endDate || event.date).replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventMap.get(slug);
  if (!event) notFound();

  const country = countryForCity(event.city, event.country);
  const isFestival = event.eventType === 'festival';

  // Multi-tier recommender resolution (FindBachata SOTA architecture)
  const baked = (recsData as any).events?.[slug];
  const resolveList = (slugs?: string[]): LatinEvent[] => {
    if (!slugs || slugs.length === 0) return [];
    return slugs
      .map((s) => eventMap.get(s))
      .filter((e): e is LatinEvent => Boolean(e) && eventCanonicalSlug(e!) !== slug);
  };

  const bakedInCity = resolveList(baked?.relatedInCity);
  const relatedInCity = bakedInCity.length > 0
    ? bakedInCity.slice(0, 6)
    : events.filter((e) => e.city.toLowerCase() === event.city.toLowerCase() && eventCanonicalSlug(e) !== slug).slice(0, 6);

  const relatedSocials = resolveList(baked?.relatedSocials).slice(0, 6);
  const relatedFestivals = resolveList(baked?.relatedFestivals).slice(0, 6);

  const eventJsonLd = generateEventJsonLd(event, slug);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    [
      { name: 'Home', url: '/' },
      { name: 'Cities', url: '/search' },
      { name: event.city, url: `/cities/${event.citySlug}` },
      { name: event.companyName, url: `/events/${slug}` },
    ],
    'https://findlatindance.com'
  );

  // Schema.org ItemList for crawl equity across recommended events
  const primaryRecs = relatedInCity.length > 0 ? relatedInCity : relatedSocials;
  const recsItemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Recommended Latin Dance Events and Festivals related to ${event.companyName}`,
    itemListElement: primaryRecs.map((rel, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: rel.companyName,
        startDate: rel.date,
        location: {
          '@type': 'Place',
          name: rel.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: rel.city,
            addressCountry: rel.country,
          },
        },
        url: `https://findlatindance.com/events/${eventCanonicalSlug(rel)}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(breadcrumbJsonLd) }}
      />
      {recsItemListJsonLd.itemListElement.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLdString(recsItemListJsonLd) }}
        />
      )}

      <main className="min-h-screen bg-[#08080c] text-zinc-100 pb-20">
        {/* Navigation Breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-4">
          <nav className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href={`/cities/${event.citySlug}`} className="hover:text-white transition">
              {event.city}
            </Link>
            <span>/</span>
            <span className="text-zinc-200 truncate">{event.companyName}</span>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Link
              href={`/cities/${event.citySlug}`}
              className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to {event.city} Latin Scene
            </Link>
            <NextNav />
          </div>
        </div>

        {/* Main Event Card */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#12121a] to-[#0a0a10] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Media / Poster Tile */}
              <div className="md:col-span-5 flex flex-col items-center">
                {event.imageUrl ? (
                  <div className="relative w-full max-w-[340px] aspect-[3/4] overflow-hidden rounded-2xl border border-white/15 shadow-xl bg-black/50">
                    <FallbackImg
                      src={event.imageUrl}
                      alt={`${event.companyName} flyer`}
                      className="h-full w-full object-cover"
                      placeholder={
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-amber-950/40 via-zinc-900 to-black p-6 text-center">
                          <span className="text-5xl">{country.flag}</span>
                        </div>
                      }
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-[340px] aspect-[3/4] rounded-2xl border border-white/10 bg-gradient-to-br from-amber-950/30 via-zinc-900 to-black flex flex-col items-center justify-center p-6 text-center shadow-inner">
                    <span className="text-6xl drop-shadow-md mb-3">{country.flag}</span>
                    <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">{event.city}</span>
                    <span className="text-lg font-bold text-white mt-1">{event.companyName}</span>
                  </div>
                )}
              </div>

              {/* Event Content & Action Details */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-semibold text-amber-300 uppercase tracking-wider">
                      {event.ballroomCount ? `${event.ballroomCount} Rooms` : event.eventType}
                    </span>
                    {event.danceStyles.map((style) => (
                      <span key={style} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-zinc-300">
                        {style}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-800/80 px-3 py-1 text-xs text-zinc-300">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                    {event.companyName}
                  </h1>

                  {/* Date & Time */}
                  <div className="mt-5 space-y-2.5 text-sm sm:text-base text-zinc-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                      <span className="font-semibold text-white">
                        {event.dateTime.day ? `${event.dateTime.day}, ` : ''}{event.date}
                        {event.endDate && event.endDate !== event.date ? ` – ${event.endDate}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                      <span>{event.dateTime.startTime} – {event.dateTime.endTime}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4 w-4 text-amber-500/70 shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-white">{event.location}</p>
                        <p className="text-xs text-zinc-400">{event.city}, {country.name}</p>
                      </div>
                    </div>

                    {event.price && (
                      <div className="flex items-center gap-2.5">
                        <Tag className="h-4 w-4 text-amber-400 shrink-0" />
                        <span className="font-semibold text-emerald-400">{event.price}</span>
                      </div>
                    )}
                  </div>

                  {/* Artists Lineup (if festival) */}
                  {event.artists && event.artists.length > 0 && (
                    <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                        <Users className="h-4 w-4" />
                        Featured Master Artists & Ballrooms
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {event.artists.map((artist) => (
                          <span key={artist} className="rounded-md bg-black/40 border border-amber-400/20 px-2.5 py-1 text-xs text-amber-200">
                            {artist}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      About this {event.eventType}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
                  <a
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-primary py-3 px-6 text-sm font-bold shadow-lg shadow-amber-950/50"
                  >
                    {isFestival ? 'Get Festival Passes' : 'Visit Official Page'}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>

                  <a
                    href={googleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-3 text-xs font-semibold text-zinc-200 transition"
                  >
                    + Add to Google Calendar
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-3 text-xs font-semibold text-zinc-200 transition"
                  >
                    Get Directions
                  </a>
                </div>

                {/* This Week in City Discovery Strip */}
                <div className="mt-8">
                  <ThisWeekInCity
                    city={event.city}
                    currentEventId={event.id}
                    events={events.filter((e) => e.city.toLowerCase() === event.city.toLowerCase())}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Step-Through Navigation */}
          <div className="mt-8 flex justify-center">
            <NextNav />
          </div>

          {/* TIER 1: More Latin Dance in City */}
          {relatedInCity.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span>More Latin Dance in {event.city}</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Explore multi-room socials and dance academies nearby
                  </p>
                </div>
                <Link
                  href={`/cities/${event.citySlug}`}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                >
                  View All in {event.city} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedInCity.map((rel) => (
                  <Link
                    key={eventCanonicalSlug(rel)}
                    href={`/events/${eventCanonicalSlug(rel)}`}
                    className="group rounded-2xl border border-white/10 bg-[#101016] p-4 transition-all hover:-translate-y-1 hover:border-amber-400/30"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {rel.eventType} · {rel.date}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition mt-1 truncate">
                      {rel.companyName}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{rel.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* TIER 2: Featured Congresses & Festivals (FindBachata SOTA Parity) */}
          {relatedFestivals.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <PartyPopper className="w-5 h-5 text-amber-400" />
                    <span>Upcoming Multi-Room Congresses & Festivals</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Weekend festivals with Salsa, Bachata, Kizomba & Zouk rooms
                  </p>
                </div>
                <Link
                  href="/festivals"
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition"
                >
                  Full 2027 Calendar →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedFestivals.map((fest) => (
                  <Link
                    key={eventCanonicalSlug(fest)}
                    href={`/events/${eventCanonicalSlug(fest)}`}
                    className="group rounded-2xl border border-amber-500/20 bg-[#14120e] p-4 transition-all hover:-translate-y-1 hover:border-amber-400/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        Congress · {fest.date}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">{fest.city}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition mt-1 truncate">
                      {fest.companyName}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{fest.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* TIER 3: Style-Matched Socials You Might Like */}
          {relatedSocials.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span>More Social Dances & Academies You'll Love</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Curated multi-genre Latin dance nights and weekly party schedules
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedSocials.map((soc) => (
                  <Link
                    key={eventCanonicalSlug(soc)}
                    href={`/events/${eventCanonicalSlug(soc)}`}
                    className="group rounded-2xl border border-white/10 bg-[#101016] p-4 transition-all hover:-translate-y-1 hover:border-amber-400/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {soc.eventType} · {soc.date}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-medium">{soc.city}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition mt-1 truncate">
                      {soc.companyName}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{soc.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
