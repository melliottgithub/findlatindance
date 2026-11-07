import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EventCard } from '@/components/events/EventCard';
import { CitySceneGuide } from '@/components/cities/CitySceneGuide';
import { ListNavScope } from '@/components/events/ListNavScope';
import { CityWeekendDigestSignup } from '@/components/cities/CityWeekendDigestSignup';
import { getCityHeroImage, getCityHeroJpg } from '@/lib/city-hero-images';
import { countryForCity } from '@/lib/city-country';
import { generateBreadcrumbJsonLd, generateCityWebPageJsonLd, generateFAQJsonLd, safeJsonLdString } from '@/lib/structured-data';
import eventsData from '@/data/events.json';
import type { LatinEvent } from '@/types';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

const events = eventsData as LatinEvent[];

export async function generateStaticParams() {
  const slugs = Array.from(new Set(events.map((e) => e.citySlug)));
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cityEvents = events.filter((e) => e.citySlug === slug);
  if (cityEvents.length === 0) return { title: 'City Not Found — FindLatinDance' };

  const cityName = cityEvents[0].city;
  const country = countryForCity(cityName, cityEvents[0].country);
  const festivalCount = cityEvents.filter((e) => e.eventType === 'festival').length;
  const socialCount = cityEvents.filter((e) => e.eventType === 'social').length;
  const classCount = cityEvents.filter((e) => e.eventType === 'class').length;

  const title = `Latin Dancing in ${cityName}, ${country.name} — Multi-Room Congresses & Socials — FindLatinDance`;
  const description = `Guide to ${cityEvents.length} upcoming Latin dance events in ${cityName}: ${socialCount} multi-room socials, ${classCount} dance classes, and ${festivalCount} congresses with ballrooms and schedules.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://findlatindance.com/cities/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://findlatindance.com/cities/${slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const cityEvents = events.filter((e) => e.citySlug === slug);

  if (cityEvents.length === 0) {
    notFound();
  }

  const cityName = cityEvents[0].city;
  const countryName = cityEvents[0].country;
  const country = countryForCity(cityName, countryName);
  const heroWebp = getCityHeroImage(slug);
  const heroJpg = getCityHeroJpg(slug);

  const festivalCount = cityEvents.filter((e) => e.eventType === 'festival').length;
  const socialCount = cityEvents.filter((e) => e.eventType === 'social').length;
  const classCount = cityEvents.filter((e) => e.eventType === 'class').length;

  const counts = { total: cityEvents.length, social: socialCount, class: classCount, festival: festivalCount };
  const collectionJsonLd = generateCityWebPageJsonLd(cityName, slug, counts);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    [
      { name: 'Home', url: '/' },
      { name: 'Cities', url: '/search' },
      { name: cityName, url: `/cities/${slug}` },
    ],
    'https://findlatindance.com'
  );

  const faqs = [
    {
      question: `How do multi-room Latin dance congresses and socials work in ${cityName}?`,
      answer: `In ${cityName}, major Latin dance festivals feature dedicated ballrooms separated by genre: Room 1 for Salsa, Room 2 for Bachata Sensual, Room 3 for Brazilian Zouk, and Room 4 for Kizomba. Dancers float freely between ballrooms.`,
    },
    {
      question: `Do I need a dance partner to attend Latin dance events in ${cityName}?`,
      answer: `No partner is needed. Every workshop in ${cityName} utilizes rotational partner changes, and social floors welcome dancers of all levels.`,
    },
    {
      question: `What pass tier should I choose for a multi-room festival in ${cityName}?`,
      answer: `Choose a Full Pass if you want daytime workshops and late-night socials. Choose a Party Pass if you only want all-night social dancing from 21:00 until morning.`,
    },
    {
      question: `What shoes and clothing are recommended for multi-genre dancing in ${cityName}?`,
      answer: `Breathable attire is essential. Many dancers bring an extra shirt and multiple pairs of shoes (e.g. suede-soled Latin dance shoes for Salsa/Bachata and flexible split-sole sneakers for Zouk/Kizomba).`,
    },
  ];
  const faqJsonLd = generateFAQJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdString(faqJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs for SEO */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/search" className="hover:text-white transition">Cities</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-300 font-medium">{cityName}</span>
        </nav>

        {/* Immersive City Hero with Nocturnal Photography */}
        <header className="relative mb-8 overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 px-6 py-10 sm:p-12 shadow-2xl">
          {heroWebp && (
            <>
              <picture>
                <source type="image/webp" srcSet={heroWebp} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroJpg || heroWebp}
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-45 pointer-events-none scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/75 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#08080c]/90 via-[#08080c]/40 to-transparent pointer-events-none" />
            </>
          )}

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl" aria-hidden="true">{country.flag}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {country.name} · Latin Social Dance Hub
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Latin Social Dance in {cityName}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Multi-room Latin congresses, weekly social dances, and masterclasses across Salsa, Bachata, Brazilian Zouk, and Kizomba in {cityName}.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-semibold text-zinc-300">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {cityEvents.length} Total Events
              </span>
              {festivalCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 px-3 py-1">
                  ⭐ {festivalCount} {festivalCount === 1 ? 'Congress' : 'Congresses'}
                </span>
              )}
              {socialCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 px-3 py-1">
                  {socialCount} Multi-Room Socials
                </span>
              )}
              {classCount > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 px-3 py-1">
                  {classCount} Academies & Classes
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Minimal High-Density Tab Bar (Reduces scrolling fatigue) */}
        <div className="sticky top-20 z-20 mb-8 rounded-2xl border border-white/10 bg-[#08080c]/90 backdrop-blur-md p-2 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-xl bg-amber-500 text-black px-3.5 py-1.5 text-xs font-bold shadow-sm">
                All Events ({cityEvents.length})
              </span>
              <Link
                href={`/cities/${slug}/socials`}
                className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition"
              >
                Socials ({socialCount})
              </Link>
              <Link
                href={`/cities/${slug}/classes`}
                className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition"
              >
                Classes ({classCount})
              </Link>
              {festivalCount > 0 && (
                <Link
                  href={`/cities/${slug}/festivals`}
                  className="rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 text-xs font-semibold text-zinc-300 transition"
                >
                  Congresses ({festivalCount})
                </Link>
              )}
            </div>

            <a
              href="#scene-guide"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 px-3 py-1.5 transition hidden sm:inline-block"
            >
              Jump to Local Scene Guide ↓
            </a>
          </div>
        </div>

        {/* Event Cards Grid */}
        <section aria-label={`Latin dance events in ${cityName}`}>
          <ListNavScope listKey={`city:${slug}`} label={cityName}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </ListNavScope>
        </section>

        {/* City Weekend Digest Retention Box */}
        <div className="my-12">
          <CityWeekendDigestSignup cityName={cityName} citySlug={slug} />
        </div>

        {/* Authoritative Local Scene Guide & Frontier GEO Q&As */}
        <div id="scene-guide">
          <CitySceneGuide cityName={cityName} countryName={country.name} events={cityEvents} />
        </div>
      </div>
    </>
  );
}
