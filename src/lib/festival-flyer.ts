import curatedFlyers from '@/data/curated-festival-flyers.json';
import { isUsableImageUrl, usableEventImage } from './event-image.mjs';

const FLYER_MAP = curatedFlyers as Record<string, string>;

function normalizeHttps(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://')) {
    return 'https://' + url.slice(7);
  }
  return url;
}

export interface FlyerEventLike {
  id?: string;
  slug?: string;
  companyName?: string;
  flyerUrl?: string;
  imageUrl?: string;
  imageSource?: string;
}

export function resolveFestivalFlyer(
  festival: FlyerEventLike,
  slug?: string,
): string | undefined {
  const own = usableEventImage(festival);
  if (own) return normalizeHttps(own);
  for (const key of [festival.id, slug, festival.slug]) {
    const curated = key ? FLYER_MAP[key] : undefined;
    if (curated && isUsableImageUrl(curated)) return normalizeHttps(curated);
  }
  return undefined;
}
