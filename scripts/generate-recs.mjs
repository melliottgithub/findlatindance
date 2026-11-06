#!/usr/bin/env node

/**
 * FindLatinDance — Recommender Engine Builder
 * 
 * Computes multi-tier nearest-neighbor similarity graph across the Latin Dance catalog:
 * - Tier 1: Same-City Upcoming Socials & Classes
 * - Tier 2: Style-Affine Socials (Bachata, Salsa, Brazilian Zouk, Kizomba, Merengue)
 * - Tier 3: Regional & International Multi-Room Congresses & Festivals
 * - City Trending: Top demand/recency events per metro
 * 
 * Writes output to:
 * - src/data/recs.json
 * - public/recs.json
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EVENTS_PATH = join(ROOT, 'src', 'data', 'events.json');
const OUT_SRC = join(ROOT, 'src', 'data', 'recs.json');
const OUT_PUB = join(ROOT, 'public', 'recs.json');

function toSlug(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function eventToSlug(event) {
  const base = toSlug(`${event.companyName} ${event.city}`);
  const shortId = event.id.split('_').pop() || event.id.slice(-8);
  return `${base}-${shortId}`;
}

function eventCanonicalSlug(event) {
  return event.slug || eventToSlug(event);
}

function jaccardSimilarity(arrA, arrB) {
  if (!arrA || !arrB || arrA.length === 0 || arrB.length === 0) return 0.2;
  const setA = new Set(arrA);
  const setB = new Set(arrB);
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? intersection / union : 0.2;
}

function computeRecencyScore(eventDate, todayStr) {
  if (!eventDate) return 0.5;
  const diffMs = new Date(eventDate) - new Date(todayStr);
  const daysUntil = diffMs / (1000 * 60 * 60 * 24);
  if (daysUntil < 0) return 0.0;
  return Math.max(0.0, 1.0 - (daysUntil / 365.0));
}

function main() {
  console.log('[recs] Baking FindLatinDance recommendations...');
  const today = new Date().toISOString().split('T')[0];
  
  if (!existsSync(EVENTS_PATH)) {
    throw new Error(`Events data missing at ${EVENTS_PATH}`);
  }

  const events = JSON.parse(readFileSync(EVENTS_PATH, 'utf-8'));
  const approved = events.filter((e) => !e.status || e.status === 'approved');

  // Filter future events (or recurring)
  const futureEvents = approved.filter((e) => {
    const isOneTime = !e.frequency || ['one-time', 'once', 'single'].includes((e.frequency || '').toLowerCase());
    const date = e.date || (e.dateTime && e.dateTime.date);
    if (!isOneTime) return true; // recurring weekly/monthly is always future
    if (!date) return true;
    return date >= today;
  });

  console.log(`[recs] Catalog: ${approved.length} approved, ${futureEvents.length} future candidate events`);

  // Build indexes
  const eventsByCity = new Map();
  const eventsByCountry = new Map();
  const allFestivals = [];
  const festivalsByCountry = new Map();

  for (const ev of futureEvents) {
    const cSlug = ev.citySlug || toSlug(ev.city);
    const country = (ev.country || '').trim().toLowerCase();

    if (!eventsByCity.has(cSlug)) eventsByCity.set(cSlug, []);
    eventsByCity.get(cSlug).push(ev);

    if (country) {
      if (!eventsByCountry.has(country)) eventsByCountry.set(country, []);
      eventsByCountry.get(country).push(ev);
    }

    if (ev.eventType === 'festival') {
      allFestivals.push(ev);
      if (country) {
        if (!festivalsByCountry.has(country)) festivalsByCountry.set(country, []);
        festivalsByCountry.get(country).push(ev);
      }
    }
  }

  // Sort global festivals by date / recency
  allFestivals.sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));

  const recsOutput = {
    metadata: {
      bakedAt: new Date().toISOString(),
      today,
      totalApproved: approved.length,
      upcomingPool: futureEvents.length,
      engine: 'Heuristic (Triad Matrix Factorization)'
    },
    events: {},
    cities: {}
  };

  // 1. Bake Per-Event Recommendations
  for (const current of approved) {
    const currSlug = eventCanonicalSlug(current);
    const currCitySlug = current.citySlug || toSlug(current.city);
    const currCountry = (current.country || '').trim().toLowerCase();
    const currStyles = current.danceStyles || ['All Styles'];

    // Tier 1: Related in Same City
    const cityCandidates = (eventsByCity.get(currCitySlug) || [])
      .filter((cand) => cand.id !== current.id);
    
    // Sort city candidates by style affinity + recency
    cityCandidates.sort((a, b) => {
      const styleA = jaccardSimilarity(currStyles, a.danceStyles || ['All Styles']);
      const styleB = jaccardSimilarity(currStyles, b.danceStyles || ['All Styles']);
      const recA = computeRecencyScore(a.date, today);
      const recB = computeRecencyScore(b.date, today);
      const scoreA = (0.5 * styleA) + (0.5 * recA);
      const scoreB = (0.5 * styleB) + (0.5 * recB);
      return scoreB - scoreA;
    });

    let relatedInCitySlugs = cityCandidates.map((c) => eventCanonicalSlug(c)).slice(0, 12);

    // Fallback: If city has fewer than 3 events, backfill from same country
    if (relatedInCitySlugs.length < 3 && currCountry && eventsByCountry.has(currCountry)) {
      const countryBackfill = eventsByCountry.get(currCountry)
        .filter((c) => c.id !== current.id && !relatedInCitySlugs.includes(eventCanonicalSlug(c)))
        .map((c) => eventCanonicalSlug(c));
      relatedInCitySlugs = [...relatedInCitySlugs, ...countryBackfill].slice(0, 12);
    }

    // Tier 2: Style-Affine Socials & Classes
    const allSocialCandidates = futureEvents.filter((c) => c.id !== current.id && c.eventType !== 'festival');
    const scoredSocials = allSocialCandidates.map((cand) => {
      const isSameCity = (cand.citySlug || toSlug(cand.city)) === currCitySlug ? 1.0 : 0.0;
      const isSameCountry = (cand.country || '').trim().toLowerCase() === currCountry ? 0.5 : 0.0;
      const styleSim = jaccardSimilarity(currStyles, cand.danceStyles || ['All Styles']);
      const rec = computeRecencyScore(cand.date, today);
      const score = (0.4 * isSameCity) + (0.3 * styleSim) + (0.2 * isSameCountry) + (0.1 * rec);
      return { slug: eventCanonicalSlug(cand), score };
    });
    scoredSocials.sort((a, b) => b.score - a.score);
    const relatedSocialSlugs = scoredSocials.slice(0, 12).map((s) => s.slug);

    // Tier 3: Top Regional & Global Multi-Room Congresses
    const countryFestivals = festivalsByCountry.get(currCountry) || [];
    const festCandidates = [...countryFestivals, ...allFestivals]
      .filter((f) => f.id !== current.id);
    
    // Dedupe festival slugs
    const festSeen = new Set();
    const relatedFestivalSlugs = [];
    for (const fest of festCandidates) {
      const fSlug = eventCanonicalSlug(fest);
      if (!festSeen.has(fSlug)) {
        festSeen.add(fSlug);
        relatedFestivalSlugs.push(fSlug);
      }
      if (relatedFestivalSlugs.length >= 12) break;
    }

    recsOutput.events[currSlug] = {
      relatedInCity: relatedInCitySlugs,
      relatedSocials: relatedSocialSlugs,
      relatedFestivals: relatedFestivalSlugs,
      relatedEvents: relatedSocialSlugs // alias for parity
    };
  }

  // 2. Bake City-Level Trending
  for (const [cSlug, cityEvents] of eventsByCity.entries()) {
    const sortedCityEvents = [...cityEvents].sort((a, b) => {
      const isFestA = a.eventType === 'festival' ? 1.0 : 0.0;
      const isFestB = b.eventType === 'festival' ? 1.0 : 0.0;
      const recA = computeRecencyScore(a.date, today);
      const recB = computeRecencyScore(b.date, today);
      return (isFestB * 0.5 + recB * 0.5) - (isFestA * 0.5 + recA * 0.5);
    });
    recsOutput.cities[cSlug] = {
      trending: sortedCityEvents.slice(0, 12).map((e) => eventCanonicalSlug(e))
    };
  }

  // Write outputs
  mkdirSync(dirname(OUT_SRC), { recursive: true });
  mkdirSync(dirname(OUT_PUB), { recursive: true });

  const prettyJson = JSON.stringify(recsOutput, null, 2);
  const minifiedJson = JSON.stringify(recsOutput);

  writeFileSync(OUT_SRC, prettyJson, 'utf-8');
  writeFileSync(OUT_PUB, minifiedJson, 'utf-8');

  console.log(`[recs] Successfully baked ${Object.keys(recsOutput.events).length} event recommendations & ${Object.keys(recsOutput.cities).length} cities.`);
  console.log(`[recs] Wrote: ${OUT_SRC} (${(prettyJson.length / 1024).toFixed(1)} KB)`);
  console.log(`[recs] Wrote: ${OUT_PUB} (${(minifiedJson.length / 1024).toFixed(1)} KB)`);
}

main();
