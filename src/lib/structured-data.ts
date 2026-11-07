import type { LatinEvent } from '@/types';
import { getCityWikidataUri, WIKIDATA_CONCEPTS } from './wikidata';

export function safeJsonLdString(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function generateEventJsonLd(event: LatinEvent, slug: string, baseUrl: string = 'https://findlatindance.com') {
  const isFestival = event.eventType === 'festival';
  const isClass = event.eventType === 'class';
  const schemaType = isFestival ? 'Festival' : isClass ? 'EducationEvent' : 'DanceEvent';
  const startTime = event.dateTime?.startTime || '20:00';
  const endTime = event.dateTime?.endTime || '02:00';
  const startDate = `${event.date}T${startTime}:00`;
  const endDate = `${event.endDate || event.date}T${endTime}:00`;

  const venueParts = (event.location || event.city).split(',');
  const venueName = venueParts[0]?.trim() || event.companyName;
  const street = venueParts.length > 1 ? venueParts.slice(1).join(',').trim() : undefined;
  const cityUri = getCityWikidataUri(event.city);

  const priceMatch = (event.price || '').match(/\d+([.,]\d+)?/);
  const numericPrice = priceMatch ? priceMatch[0].replace(',', '.') : undefined;
  const currency = (event.price || '').includes('€') || (event.price || '').includes('EUR') ? 'EUR' : 'USD';

  return {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${baseUrl}/events/${slug}#event`,
    name: event.companyName,
    description: event.description,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${baseUrl}/events/${slug}`,
    image: event.imageUrl ? [event.imageUrl] : undefined,
    location: {
      '@type': 'Place',
      name: venueName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        streetAddress: street,
        addressCountry: event.country || 'USA',
      },
      ...(cityUri ? { sameAs: cityUri } : {}),
    },
    organizer: {
      '@type': 'Organization',
      name: event.companyName,
      url: event.eventUrl || `${baseUrl}/events/${slug}`,
    },
    ...(numericPrice ? {
      offers: {
        '@type': 'Offer',
        price: numericPrice,
        priceCurrency: currency,
        url: event.eventUrl || `${baseUrl}/events/${slug}`,
        availability: 'https://schema.org/InStock',
        validFrom: event.date,
      },
    } : {}),
    about: [
      {
        '@type': WIKIDATA_CONCEPTS.latinDance.type,
        name: WIKIDATA_CONCEPTS.latinDance.name,
        sameAs: WIKIDATA_CONCEPTS.latinDance.wikidataUri,
      },
      {
        '@type': WIKIDATA_CONCEPTS.socialDance.type,
        name: WIKIDATA_CONCEPTS.socialDance.name,
        sameAs: WIKIDATA_CONCEPTS.socialDance.wikidataUri,
      },
    ],
  };
}

export function generateBreadcrumbJsonLd(
  breadcrumbs: { name: string; url: string }[],
  baseUrl: string = 'https://findlatindance.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.url.startsWith('http') ? b.url : `${baseUrl}${b.url}`,
    })),
  };
}

export function generateCityWebPageJsonLd(
  cityName: string,
  slug: string,
  counts: { total: number; social: number; class: number; festival: number },
  baseUrl: string = 'https://findlatindance.com'
) {
  const cityUri = getCityWikidataUri(slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${baseUrl}/cities/${slug}#collection`,
    url: `${baseUrl}/cities/${slug}`,
    name: `Latin Dancing in ${cityName} — Multi-Room Congresses & Social Nights`,
    description: `Directory of ${counts.total} upcoming Latin dance events in ${cityName}: ${counts.social} multi-room socials, ${counts.class} academy classes, and ${counts.festival} congresses.`,
    about: [
      {
        '@type': 'Place',
        name: cityName,
        ...(cityUri ? { sameAs: cityUri } : {}),
      },
      {
        '@type': WIKIDATA_CONCEPTS.latinDance.type,
        name: WIKIDATA_CONCEPTS.latinDance.name,
        sameAs: WIKIDATA_CONCEPTS.latinDance.wikidataUri,
      },
      {
        '@type': WIKIDATA_CONCEPTS.socialDance.type,
        name: WIKIDATA_CONCEPTS.socialDance.name,
        sameAs: WIKIDATA_CONCEPTS.socialDance.wikidataUri,
      },
    ],
  };
}

export function generateFAQJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
