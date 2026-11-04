/**
 * City → country mapping for the app. The implementation (data + lookups) lives
 * in city-country-core.mjs, a plain ES module, so the prebuild's share-card
 * generator (scripts/event-card-spec.mjs, ticket 105) reads the same map as the
 * pages without a mirror. This file keeps the '@/lib/city-country' import path
 * and its types unchanged for every caller.
 */
export { COUNTRIES, COUNTRY_NAME_ALIASES, countryByNameOrCode, countryForCity } from './city-country-core.mjs';
export type { Country } from './city-country-core.mjs';
