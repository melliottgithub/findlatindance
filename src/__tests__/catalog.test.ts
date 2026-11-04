import { describe, it, expect } from 'vitest';
import eventsData from '../data/events.json';
import type { LatinDanceEvent } from '../types';

describe('FindLatinDance Event Catalog Integrity', () => {
  const events = eventsData as LatinDanceEvent[];

  it('contains verified initial events', () => {
    expect(events.length).toBeGreaterThanOrEqual(8);
  });

  it('enforces required fields on all events', () => {
    for (const ev of events) {
      expect(ev.id).toBeTruthy();
      expect(ev.companyName).toBeTruthy();
      expect(['social', 'class', 'festival']).toContain(ev.eventType);
      expect(ev.danceStyles.length).toBeGreaterThan(0);
      expect(ev.city).toBeTruthy();
      expect(ev.citySlug).toBeTruthy();
      expect(ev.country).toBeTruthy();
      expect(ev.location).toBeTruthy();
      expect(ev.eventUrl).toMatch(/^https?:\/\//);
      expect(ev.status).toBe('approved');
    }
  });

  it('has valid date format YYYY-MM-DD', () => {
    for (const ev of events) {
      expect(ev.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('rejects competitor and aggregator domains in eventUrl', () => {
    const bannedAggregators = ['danceus.org', 'salsavida.com', 'latindancecalendar.com', 'where-to-dance'];
    for (const ev of events) {
      for (const banned of bannedAggregators) {
        expect(ev.eventUrl).not.toContain(banned);
      }
    }
  });

  it('verifies multi-room festival ballroom counts', () => {
    const festivals = events.filter((e) => e.eventType === 'festival');
    for (const fest of festivals) {
      if (fest.ballroomCount) {
        expect(fest.ballroomCount).toBeGreaterThanOrEqual(2);
      }
    }
  });
});
