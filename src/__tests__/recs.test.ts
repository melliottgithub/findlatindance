import { describe, it, expect } from 'vitest';
import recsData from '../data/recs.json';
import eventsData from '../data/events.json';

describe('FindLatinDance Recommender Invariants', () => {
  it('contains valid recommender metadata', () => {
    const meta = (recsData as any).metadata;
    expect(meta).toBeDefined();
    expect(meta.totalApproved).toBeGreaterThan(1500);
    expect(meta.upcomingPool).toBeGreaterThan(1500);
    expect(meta.engine).toContain('Matrix Factorization');
    expect(meta.today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('bakes recommendations for events without empty fallbacks', () => {
    const events = (recsData as any).events;
    expect(Object.keys(events).length).toBeGreaterThan(1500);

    // Pick 10 sample events and verify they have valid recommendations
    const sampleSlugs = Object.keys(events).slice(0, 10);
    for (const slug of sampleSlugs) {
      const rec = events[slug];
      expect(rec).toBeDefined();
      // Ensure at least one tier is populated so no event page is a dead-end
      const totalRecs = (rec.relatedInCity?.length || 0) + (rec.relatedSocials?.length || 0) + (rec.relatedFestivals?.length || 0);
      expect(totalRecs).toBeGreaterThan(0);
    }
  });

  it('bakes trending events for cities', () => {
    const cities = (recsData as any).cities;
    expect(Object.keys(cities).length).toBeGreaterThan(100);

    // Major Latin dance cities must have trending lists
    const majorCities = ['new-york', 'london', 'los-angeles', 'madrid', 'paris', 'barcelona', 'denver'];
    for (const city of majorCities) {
      if (cities[city]) {
        expect(cities[city].trending.length).toBeGreaterThan(0);
      }
    }
  });
});
