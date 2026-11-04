import type { MetadataRoute } from 'next';
import eventsData from '@/data/events.json';
import artistsData from '@/data/artists.json';
import { ARTICLES } from '@/data/learn-articles';
import { eventCanonicalSlug } from '@/lib/slugs';
import type { LatinEvent } from '@/types';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://findlatindance.com';
  const events = eventsData as LatinEvent[];
  const citySlugs = Array.from(new Set(events.map((e) => e.citySlug)));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/festivals`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/festivals/2026`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/festivals/2027`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/festivals/this-month`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/festivals/this-weekend`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/artists`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/add-event`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const learnRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/learn/${article.slug}`,
    lastModified: new Date(article.publishDate),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const artistRoutes: MetadataRoute.Sitemap = artistsData.map((artist) => ({
    url: `${baseUrl}/artists/${artist.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const cityRoutes: MetadataRoute.Sitemap = citySlugs.flatMap((slug) => [
    { url: `${baseUrl}/cities/${slug}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/cities/${slug}/classes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/cities/${slug}/socials`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/cities/${slug}/festivals`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]);

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/events/${eventCanonicalSlug(event)}`,
    lastModified: new Date(),
    changeFrequency: event.eventType === 'festival' ? 'weekly' : 'monthly',
    priority: event.eventType === 'festival' ? 0.7 : 0.6,
  }));

  return [
    ...staticRoutes,
    ...learnRoutes,
    ...artistRoutes,
    ...cityRoutes,
    ...eventRoutes,
  ];
}
