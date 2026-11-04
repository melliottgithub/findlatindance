/**
 * Wikidata Canonical Entity Registry (SOP-FR-04: Semantic Entity Disambiguation)
 *
 * Provides permanent, disambiguated Wikidata Q-IDs and URIs for concepts,
 * musical genres, and major cities for FindLatinDance.
 */

export interface WikidataEntity {
  name: string;
  type: string;
  wikidataUri: string;
  description?: string;
}

export const WIKIDATA_CONCEPTS: Record<string, WikidataEntity> = {
  latinDance: {
    name: 'Latin dance',
    type: 'Thing',
    wikidataUri: 'https://www.wikidata.org/wiki/Q3827473',
    description: 'A general term for partner and social dances originated in Latin America',
  },
  salsaDance: {
    name: 'Salsa (dance)',
    type: 'Thing',
    wikidataUri: 'https://www.wikidata.org/wiki/Q189825',
    description: 'A syncretic dance form with origins from Cuba and Puerto Rico',
  },
  bachataDance: {
    name: 'Bachata (dance)',
    type: 'Thing',
    wikidataUri: 'https://www.wikidata.org/wiki/Q40461',
    description: 'A style of social dance from the Dominican Republic',
  },
  brazilianZouk: {
    name: 'Brazilian Zouk',
    type: 'Thing',
    wikidataUri: 'https://www.wikidata.org/wiki/Q660057',
    description: 'A group of partner dance styles evolved from Lambada',
  },
  kizomba: {
    name: 'Kizomba',
    type: 'Thing',
    wikidataUri: 'https://www.wikidata.org/wiki/Q1056581',
    description: 'A genre of music and partner dance originated in Angola',
  },
  socialDance: {
    name: 'Social dance',
    type: 'Thing',
    wikidataUri: 'https://www.wikidata.org/wiki/Q3209069',
    description: 'Category of dances that have a social function and context',
  },
  danceFestival: {
    name: 'Dance festival',
    type: 'Thing',
    wikidataUri: 'https://www.wikidata.org/wiki/Q2393315',
    description: 'Multi-room congress featuring dedicated ballrooms for multiple Latin dance genres',
  },
};

export const WIKIDATA_CITIES: Record<string, string> = {
  'new-york': 'https://www.wikidata.org/wiki/Q60',
  'london': 'https://www.wikidata.org/wiki/Q84',
  'madrid': 'https://www.wikidata.org/wiki/Q2807',
  'barcelona': 'https://www.wikidata.org/wiki/Q1492',
  'paris': 'https://www.wikidata.org/wiki/Q90',
  'havana': 'https://www.wikidata.org/wiki/Q1563',
  'cali': 'https://www.wikidata.org/wiki/Q51103',
  'san-juan': 'https://www.wikidata.org/wiki/Q41211',
  'miami': 'https://www.wikidata.org/wiki/Q8652',
  'los-angeles': 'https://www.wikidata.org/wiki/Q65',
  'chicago': 'https://www.wikidata.org/wiki/Q1297',
  'berlin': 'https://www.wikidata.org/wiki/Q64',
  'warsaw': 'https://www.wikidata.org/wiki/Q270',
  'rome': 'https://www.wikidata.org/wiki/Q220',
  'milan': 'https://www.wikidata.org/wiki/Q490',
  'san-francisco': 'https://www.wikidata.org/wiki/Q62',
  'houston': 'https://www.wikidata.org/wiki/Q16555',
  'dallas': 'https://www.wikidata.org/wiki/Q16557',
  'austin': 'https://www.wikidata.org/wiki/Q16559',
  'san-diego': 'https://www.wikidata.org/wiki/Q16552',
  'seattle': 'https://www.wikidata.org/wiki/Q5083',
  'boston': 'https://www.wikidata.org/wiki/Q100',
  'atlanta': 'https://www.wikidata.org/wiki/Q23556',
  'toronto': 'https://www.wikidata.org/wiki/Q172',
  'montreal': 'https://www.wikidata.org/wiki/Q340',
  'vancouver': 'https://www.wikidata.org/wiki/Q2463',
  'sydney': 'https://www.wikidata.org/wiki/Q3130',
  'melbourne': 'https://www.wikidata.org/wiki/Q3141',
  'amsterdam': 'https://www.wikidata.org/wiki/Q727',
  'vienna': 'https://www.wikidata.org/wiki/Q1741',
  'munich': 'https://www.wikidata.org/wiki/Q1726',
  'frankfurt': 'https://www.wikidata.org/wiki/Q1794',
  'prague': 'https://www.wikidata.org/wiki/Q1085',
  'budapest': 'https://www.wikidata.org/wiki/Q1781',
  'valencia': 'https://www.wikidata.org/wiki/Q8818',
  'sevilla': 'https://www.wikidata.org/wiki/Q8717',
  'seville': 'https://www.wikidata.org/wiki/Q8717',
  'malaga': 'https://www.wikidata.org/wiki/Q8851',
  'lisbon': 'https://www.wikidata.org/wiki/Q597',
  'tokyo': 'https://www.wikidata.org/wiki/Q1490',
  'singapore': 'https://www.wikidata.org/wiki/Q334',
  'washington-dc': 'https://www.wikidata.org/wiki/Q61',
  'denver': 'https://www.wikidata.org/wiki/Q16554',
  'orlando': 'https://www.wikidata.org/wiki/Q49233',
  'tampa': 'https://www.wikidata.org/wiki/Q49255',
  'las-vegas': 'https://www.wikidata.org/wiki/Q23768',
};

export function getCityWikidataUri(slugOrCity: string): string | undefined {
  if (!slugOrCity) return undefined;
  const normalized = slugOrCity
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
  return WIKIDATA_CITIES[normalized];
}

export function getLatinWikidataEntities() {
  return Object.values(WIKIDATA_CONCEPTS).map((c) => ({
    '@type': c.type,
    name: c.name,
    sameAs: c.wikidataUri,
    description: c.description,
  }));
}
