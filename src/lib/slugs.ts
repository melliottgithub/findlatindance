export function toSlug(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function cityToSlug(city: string): string {
  const normalized = toSlug(city);
  if (normalized === 'roma') return 'rome';
  if (normalized === 'warszawa') return 'warsaw';
  if (normalized === 'wien') return 'vienna';
  return normalized;
}

export function cityCanonicalSlug(city: { city: string; citySlug?: string } | string): string {
  if (typeof city === 'string') return cityToSlug(city);
  return city.citySlug || cityToSlug(city.city);
}

export function slugToCity(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function resolveCityFromSlug(cities: { city: string; citySlug?: string }[], slug: string): string {
  const match = cities.find((city) => cityCanonicalSlug(city) === slug);
  return match?.city ?? slugToCity(slug);
}

export function eventToSlug(event: { companyName: string; city: string; id: string }): string {
  const base = toSlug(`${event.companyName} ${event.city}`);
  const shortId = event.id.split('_').pop() || event.id.slice(-8);
  return `${base}-${shortId}`;
}

export function eventCanonicalSlug(event: { companyName: string; city: string; id: string; slug?: string }): string {
  return event.slug || eventToSlug(event);
}
