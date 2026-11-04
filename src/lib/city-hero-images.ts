/**
 * Canonical mapping of top dance capital slugs to photographic nocturnal city hero images.
 * These provide immersive, high-resolution visual photography matching our design blueprint,
 * replacing flat fallback gradients or text-heavy OG share cards.
 */

const CITY_HERO_SLUGS = new Set<string>([
  'amsterdam',
  'barcelona',
  'berlin',
  'chicago',
  'denver',
  'frankfurt',
  'houston',
  'london',
  'los-angeles',
  'madrid',
  'miami',
  'milan',
  'new-york',
  'paris',
  'rome',
  'toronto',
  'warsaw',
]);

/**
 * Returns the public path to the city hero image (webp preferred), or null if none is available.
 */
export function getCityHeroImage(slug: string): string | null {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  if (CITY_HERO_SLUGS.has(normalized)) {
    return `/images/cities/${normalized}.webp`;
  }
  return null;
}

/**
 * Returns the public path to the city hero JPEG (for OpenGraph/social fallback if needed).
 */
export function getCityHeroJpg(slug: string): string | null {
  if (!slug) return null;
  const normalized = slug.trim().toLowerCase();
  if (CITY_HERO_SLUGS.has(normalized)) {
    return `/images/cities/${normalized}.jpg`;
  }
  return null;
}

export function hasCityHeroImage(slug: string): boolean {
  if (!slug) return false;
  return CITY_HERO_SLUGS.has(slug.trim().toLowerCase());
}

/**
 * Ticket 132 (speed audit): small variants of each hero photo, written by
 * scripts/generate-city-hero-variants.mjs (mirror of its WIDTHS) to
 * /images/cities/w<W>/<slug>.{avif,webp}. A ~200 px card picks a ~35 KB file
 * instead of the ~200 KB 1200 px original.
 */
export const CITY_HERO_WIDTHS = [384, 640] as const;

export interface CityHeroSources {
  /** <source type="image/avif"> srcset. */
  avif: string;
  /** <img> srcset (WebP, original 1200 px as the widest). */
  webp: string;
  /** <img> src: the 640 px WebP. */
  src: string;
}

export function getCityHeroSources(slug: string): CityHeroSources | null {
  if (!hasCityHeroImage(slug)) return null;
  const s = slug.trim().toLowerCase();
  const set = (ext: string) => CITY_HERO_WIDTHS.map((w) => `/images/cities/w${w}/${s}.${ext} ${w}w`).join(', ');
  return {
    avif: set('avif'),
    webp: `${set('webp')}, /images/cities/${s}.webp 1200w`,
    src: `/images/cities/w640/${s}.webp`,
  };
}
