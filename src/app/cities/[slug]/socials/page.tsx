import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, PartyPopper } from 'lucide-react';
import { EventCard } from '@/components/events/EventCard';
import { countryForCity } from '@/lib/city-country';
import { generateBreadcrumbJsonLd, safeJsonLdString } from '@/lib/structured-data';
import eventsData from '@/data/events.json';
import type { Metadata } from 'next';
import type { LatinEvent } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const events = eventsData as LatinEvent[];

export async function generateStaticParams() {
  const slugs = Array.from(new Set(events.map((e) => e.citySlug)));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cityEvents = events.filter((e) => e.citySlug === slug && e.eventType === 'social');
  const anyCityEvent = events.find((e) => e.citySlug === slug);
  if (!anyCityEvent) return { title: 'Socials Not Found — FindLatinDance' };

  const cityName = anyCityEvent.city;
  const country = countryForCity(cityName, anyCityEvent.country);
  const shouldIndex = cityEvents.length >= 2;
  const title = `Latin Dance Socials in ${cityName}, ${country.name} — Multi-Room Parties`;
  const description = `Find upcoming Latin dance socials in ${cityName}. Browse multi-room dance nights across Salsa, Bachata, Brazilian Zouk, and Kizomba updated daily.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://findlatindance.com/cities/${slug}/socials`,
    },
    robots: {
      index: shouldIndex,
      follow: true,
    },
  };
}

export default async function CitySocialsPage({ params }: PageProps) {
  const { slug } = await params;
  const allCityEvents = events.filter((e) => e.citySlug === slug);
  if (allCityEvents.length === 0) notFound();

  const socialEvents = allCityEvents.filter((e) => e.eventType === 'social');
  const cityName = allCityEvents[0].city;
  const country = countryForCity(cityName, allCityEvents[0].country);

  const breadcrumbs = generateBreadcrumbJsonLd(
    [
      { name: 'Home', url: '/' },
      { name: 'Cities', url: '/search' },
      { name: cityName, url: `/cities/${slug}` },
      { name: 'Socials', url: `/cities/${slug}/socials` },
    ],
    'https://findlatindance.com'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(breadcrumbs) }}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/cities/${slug}`} className="hover:text-white transition">{cityName}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-300 font-medium">Socials</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/cities/${slug}`}
            className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300 transition mb-3"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            All {cityName} Latin Dance Events
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Latin Dance Socials & Dance Nights in {cityName}
          </h1>
          <p className="mt-2 text-sm text-zinc-300 max-w-2xl leading-relaxed">
            Weekly multi-room parties, weekend dance socials, and Latin clubs across {cityName}, {country.name}.
          </p>

          {/* Quick Sub-navigation Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Link
              href={`/cities/${slug}`}
              className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 text-xs font-semibold text-zinc-300 transition"
            >
              All Events ({allCityEvents.length})
            </Link>
            <span className="rounded-full bg-amber-500 text-black px-4 py-1.5 text-xs font-bold">
              Socials ({socialEvents.length})
            </span>
            <Link
              href={`/cities/${slug}/classes`}
              className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 text-xs font-semibold text-zinc-300 transition"
            >
              Classes ({allCityEvents.filter((e) => e.eventType === 'class').length})
            </Link>
            <Link
              href={`/cities/${slug}/festivals`}
              className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 text-xs font-semibold text-zinc-300 transition"
            >
              Congresses ({allCityEvents.filter((e) => e.eventType === 'festival').length})
            </Link>
          </div>
        </div>

        {/* Socials List */}
        {socialEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-10 text-center">
            <PartyPopper className="mx-auto h-8 w-8 text-zinc-500 mb-3" />
            <h2 className="text-lg font-bold text-white">No weekly socials currently scheduled</h2>
            <p className="mt-1 text-xs text-zinc-400 max-w-md mx-auto">
              Check out upcoming multi-room festivals or explore dance classes in {cityName}.
            </p>
            <Link
              href={`/cities/${slug}`}
              className="btn-gold-primary inline-flex mt-4 py-2 px-5 text-xs"
            >
              Explore {cityName} Scene
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
