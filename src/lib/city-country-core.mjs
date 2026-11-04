/**
 * City → country mapping for the 113 cities currently in the catalog.
 * Maintained by hand; if a new city is imported, add it here or the cities
 * page falls back to the "Other" group.
 *
 * Plain ES module (was city-country.ts until ticket 105) so the prebuild's
 * share-card generator (scripts/event-card-spec.mjs) reads the SAME map as the
 * pages, with no mirror to keep in sync. The app keeps importing
 * '@/lib/city-country' (a typed re-export); types are in city-country-core.d.mts.
 *
 * Country codes follow ISO 3166-1 alpha-2 (US, ES, JP, ...) for stable sort.
 */

/** @typedef {{ code: string, name: string, flag: string }} Country */

/** @type {Record<string, Country>} */
export const COUNTRIES = {
  US: { code: 'US', name: 'United States', flag: '🇺🇸' },
  CA: { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  MX: { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  DO: { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  ES: { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  PT: { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  FR: { code: 'FR', name: 'France', flag: '🇫🇷' },
  IT: { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  DE: { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  NL: { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  BE: { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  CH: { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  AT: { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  GB: { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  IE: { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  SE: { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  DK: { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  PL: { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  CZ: { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  HU: { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  HR: { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  BG: { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  LT: { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  EE: { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  AL: { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  IL: { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  TN: { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  JP: { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  KR: { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  VN: { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  TH: { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  MY: { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  PH: { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  AU: { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  RO: { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  GR: { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  TR: { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
  SI: { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  LV: { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  FI: { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  NO: { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  SK: { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  RS: { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  CY: { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  LU: { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  NZ: { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  AD: { code: 'AD', name: 'Andorra', flag: '🇦🇩' },
  BA: { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  BR: { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  AR: { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  CO: { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  CL: { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  PE: { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  AE: { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  EG: { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  MA: { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  IN: { code: 'IN', name: 'India', flag: '🇮🇳' },
  CN: { code: 'CN', name: 'China', flag: '🇨🇳' },
  ZA: { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  OTHER: { code: 'OTHER', name: 'Other', flag: '🌍' },
};

/**
 * Alternate spellings that appear in imported event `location` strings but are
 * not the canonical `COUNTRIES` name. Consumers matching free text against
 * country names should check here too (a tolerant reader — imports come from
 * many sources and spell the same country several ways).
 */
/** @type {Record<string, string>} */
export const COUNTRY_NAME_ALIASES = {
  turkey: 'Türkiye',
  turkiye: 'Türkiye',
  usa: 'United States',
  uk: 'United Kingdom',
  holland: 'Netherlands',
  czechia: 'Czech Republic',
  uae: 'United Arab Emirates',
  'bosnia & herzegovina': 'Bosnia and Herzegovina',
};

/** @type {Record<string, string>} */
const CITY_TO_COUNTRY = {
  // United States
  Albuquerque: 'US', Atlanta: 'US', Austin: 'US', Baltimore: 'US', Boston: 'US',
  Charlotte: 'US', Chicago: 'US', Cincinnati: 'US', Columbus: 'US', Dallas: 'US',
  Denver: 'US', Detroit: 'US', Fresno: 'US', Honolulu: 'US', Houston: 'US',
  Indianapolis: 'US', 'Kansas City': 'US', 'Las Vegas': 'US', 'Los Angeles': 'US',
  Miami: 'US', Milwaukee: 'US', Minneapolis: 'US', Nashville: 'US',
  'New Orleans': 'US', 'New York': 'US', 'New York City': 'US', Orlando: 'US', Philadelphia: 'US',
  Phoenix: 'US', Pittsburgh: 'US', Portland: 'US', Raleigh: 'US', Sacramento: 'US',
  'Salt Lake City': 'US', 'San Antonio': 'US', 'San Diego': 'US',
  'San Francisco': 'US', 'San Jose': 'US', Seattle: 'US', 'St. Louis': 'US',
  Tampa: 'US', Tucson: 'US', 'Washington DC': 'US',
  Reno: 'US', Richmond: 'US', 'West Palm Beach': 'US', Aurora: 'US',
  Bellevue: 'US', Tulsa: 'US', 'Hallandale Beach': 'US', Hollywood: 'US',
  'St. Petersburg': 'US', Frederick: 'US', Cambridge: 'US',

  // Canada
  Calgary: 'CA', Edmonton: 'CA', Montreal: 'CA', Ottawa: 'CA',
  Toronto: 'CA', Vancouver: 'CA',

  // Mexico
  'Mexico City': 'MX', CDMX: 'MX', 'Ciudad de Mexico': 'MX',
  Cancun: 'MX', 'Cancún': 'MX', 'Playa del Carmen': 'MX',
  Guadalajara: 'MX', Monterrey: 'MX', Tijuana: 'MX',
  Oaxaca: 'MX', Puebla: 'MX', Merida: 'MX', 'Mérida': 'MX',
  'Puerto Morelos': 'MX', 'Puerto Vallarta': 'MX',
  'Playas de Rosarito': 'MX', Rosarito: 'MX',

  // Dominican Republic
  'Santo Domingo': 'DO', 'Las Terrenas': 'DO',
  Santiago: 'DO', 'Santiago de los Caballeros': 'DO',
  'Punta Cana': 'DO', Cabarete: 'DO', Bonao: 'DO',

  // Colombia
  Medellin: 'CO', 'Medellín': 'CO', Bogota: 'CO', 'Bogotá': 'CO',
  Cali: 'CO', Cartagena: 'CO',

  // Argentina
  'Buenos Aires': 'AR', Cordoba: 'AR', 'Córdoba': 'AR',

  // Brazil
  'Sao Paulo': 'BR', 'São Paulo': 'BR', 'Rio de Janeiro': 'BR',

  // Spain
  Algeciras: 'ES', Almonte: 'ES', Altafulla: 'ES', Benacazon: 'ES',
  Benidorm: 'ES', Cadiz: 'ES', 'Cádiz': 'ES', Calpe: 'ES', Gandia: 'ES', 'La Manga': 'ES',
  'Las Palmas': 'ES', 'Lloret de Mar': 'ES', 'Lloret de mar': 'ES', Madrid: 'ES', Pollenca: 'ES',
  'Puerto de la Cruz': 'ES', 'Punta Umbria': 'ES', Roses: 'ES',
  'San Adria de Besos': 'ES', 'Santa Susanna': 'ES', 'Santa Susana, Barcelona': 'ES', Santurtzi: 'ES',
  Barcelona: 'ES', Girona: 'ES', Valencia: 'ES', Sevilla: 'ES', Alicante: 'ES', Murcia: 'ES',
  Malaga: 'ES', 'Málaga': 'ES', Bilbao: 'ES', Valladolid: 'ES', Palma: 'ES',
  'Palma de Mallorca': 'ES', 'Santa Cruz de Tenerife': 'ES', 'Tenerife (Las Américas)': 'ES',
  Lugo: 'ES', Pamplona: 'ES', Albacete: 'ES', Huelva: 'ES', Bormujos: 'ES',

  // Portugal
  Lisbon: 'PT', 'Vila Nova de Gaia': 'PT', Porto: 'PT', Sesimbra: 'PT',

  // France
  'Aix-les-Bains': 'FR', Avignon: 'FR', Lyon: 'FR', Paris: 'FR',
  Toulouse: 'FR', Marseille: 'FR', Annecy: 'FR', Nancy: 'FR', Aubagne: 'FR',
  'Saint-Nazaire': 'FR', Angouleme: 'FR', Meyzieu: 'FR', 'La Grande-Motte': 'FR',
  Ecouflant: 'FR', "Villeneuve-d'Ascq": 'FR', Chaponnay: 'FR', 'Brive-la-Gaillarde': 'FR',
  Massy: 'FR', 'Le Muy': 'FR',

  // Italy
  Milan: 'IT', Rome: 'IT',
  Bari: 'IT', Verona: 'IT', Prossedi: 'IT', Genova: 'IT', Treviso: 'IT', Rende: 'IT',
  'Castellaneta Marina': 'IT', 'Castellammare di stabia': 'IT', Torino: 'IT', Ostuni: 'IT',

  // Germany
  Berlin: 'DE', Cologne: 'DE', Dusseldorf: 'DE', 'Düsseldorf': 'DE',
  Frankfurt: 'DE', Hamburg: 'DE', Munich: 'DE', 'München': 'DE', Stuttgart: 'DE',
  Freiburg: 'DE', Würzburg: 'DE', Konstanz: 'DE', Mainz: 'DE', Karlsruhe: 'DE',
  Hürth: 'DE', Böblingen: 'DE',

  // Netherlands
  Amsterdam: 'NL', Rotterdam: 'NL', Hoofddorp: 'NL',

  // Belgium
  Brussels: 'BE', Charleroi: 'BE', Mons: 'BE', Drogenbos: 'BE',

  // Switzerland
  Geneva: 'CH', Zurich: 'CH', 'Zürich': 'CH',

  // United Kingdom
  Edinburgh: 'GB', Liverpool: 'GB', London: 'GB', Manchester: 'GB',
  Birmingham: 'GB', Bristol: 'GB', Leeds: 'GB',

  // Ireland
  Dublin: 'IE',

  // Austria
  Vienna: 'AT',

  // Slovenia
  Ljubljana: 'SI',

  // Sweden
  Stockholm: 'SE', Malmö: 'SE', Gothenburg: 'SE', 'Umeå': 'SE',

  // Norway
  Oslo: 'NO',

  // Finland
  Helsinki: 'FI',

  // Denmark
  Copenhagen: 'DK',

  // Poland
  Katowice: 'PL', Krakow: 'PL', 'Kraków': 'PL', Cracow: 'PL', Warsaw: 'PL', 'Warszawa': 'PL',
  Wroclaw: 'PL', 'Wrocław': 'PL', 'Gdańsk': 'PL', Lodz: 'PL', 'Łódź': 'PL', Olsztyn: 'PL',

  // Czech Republic
  Prague: 'CZ', Praha: 'CZ', Brno: 'CZ',

  // Slovakia
  Nitra: 'SK',

  // Hungary
  Budapest: 'HU',

  // Croatia
  Rovinj: 'HR', Zagreb: 'HR', Split: 'HR', Rijeka: 'HR', Pula: 'HR',
  'Velika Gorica': 'HR', Tisno: 'HR', Zaton: 'HR',

  // Serbia
  Belgrade: 'RS',

  // Romania
  Bucharest: 'RO', Bucuresti: 'RO', 'București': 'RO', 'Cluj-Napoca': 'RO', 'Râmnicu Vâlcea': 'RO',

  // Bulgaria
  Albena: 'BG', Sofia: 'BG', 'Sofia (stolitsa)': 'BG',

  // Greece
  Athens: 'GR', Kos: 'GR', Kalamata: 'GR',

  // Cyprus
  Paphos: 'CY',

  // Luxembourg
  'Luxembourg City': 'LU',

  // Bosnia and Herzegovina
  'Foča': 'BA',

  // Lithuania
  Kaunas: 'LT', Vilnius: 'LT',

  // Estonia
  Tallinn: 'EE',

  // Latvia
  'Rīga': 'LV', Riga: 'LV',

  // Albania
  Golem: 'AL', Tirana: 'AL',

  // Turkey
  Istanbul: 'TR', 'İstanbul': 'TR', Antalya: 'TR', Ankara: 'TR', 'Eskişehir': 'TR',

  // United Arab Emirates
  Dubai: 'AE', 'Abu Dhabi': 'AE',

  // Israel
  'Tel Aviv': 'IL', Jerusalem: 'IL', Eilat: 'IL',

  // Egypt
  'Sharm El Sheikh': 'EG',

  // Tunisia
  Gammarth: 'TN',

  // Morocco
  'TANGER': 'MA', Tangier: 'MA',

  // Japan
  Tokyo: 'JP', Osaka: 'JP',

  // South Korea
  Seoul: 'KR', Busan: 'KR', Jeju: 'KR',

  // Vietnam
  'Da Nang': 'VN', 'Vung Tau': 'VN',

  // Thailand
  Bangkok: 'TH', Phuket: 'TH', 'Chiang Mai': 'TH',

  // China
  Shenzhen: 'CN',

  // Malaysia
  'Kuala Lumpur': 'MY',

  // Philippines
  Manila: 'PH',

  // Australia
  Brisbane: 'AU', Melbourne: 'AU', Sydney: 'AU', Perth: 'AU',

  // New Zealand
  Queenstown: 'NZ',
};

// Name & alias lookup index (populated once at module load)
/** @type {Record<string, Country>} */
const NAME_TO_COUNTRY = {};
for (const country of Object.values(COUNTRIES)) {
  NAME_TO_COUNTRY[country.name.toLowerCase()] = country;
  NAME_TO_COUNTRY[country.code.toLowerCase()] = country;
}
for (const [alias, canonical] of Object.entries(COUNTRY_NAME_ALIASES)) {
  const c = NAME_TO_COUNTRY[canonical.toLowerCase()];
  if (c) {
    NAME_TO_COUNTRY[alias.toLowerCase()] = c;
  }
}

/**
 * @param {string} [nameOrCode]
 * @returns {Country | undefined}
 */
export function countryByNameOrCode(nameOrCode) {
  if (!nameOrCode) return undefined;
  const clean = nameOrCode.trim().toLowerCase();
  return NAME_TO_COUNTRY[clean];
}

/**
 * @param {string} city
 * @param {string} [countryHint]
 * @returns {Country}
 */
export function countryForCity(city, countryHint) {
  const code = CITY_TO_COUNTRY[city];
  if (code && COUNTRIES[code]) return COUNTRIES[code];

  if (countryHint) {
    const fromHint = countryByNameOrCode(countryHint);
    if (fromHint) return fromHint;
  }

  // Fallback: check if the city string itself is a recognized country name or alias
  const fromCityName = countryByNameOrCode(city);
  if (fromCityName) return fromCityName;

  return COUNTRIES.OTHER;
}

