#!/usr/bin/env node

/**
 * Dynamic Catalog Refresh Script (FindLatinDance)
 * 
 * Fetches approved latin dance events from the multi-tenant AWS API Gateway
 * and hydrates `src/data/events.json` before building recommendations.
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EVENTS_PATH = join(ROOT, 'src', 'data', 'events.json');

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://qgwputmm66.execute-api.us-east-1.amazonaws.com/prod';

async function refreshCatalog() {
  const brand = 'findlatindance';
  console.log(`[FindLatinDance Catalog Refresh] Fetching fresh catalog from ${API_URL}/events?brand=${brand}...`);

  try {
    const allEvents = [];
    let nextToken;

    do {
      const url = new URL(`${API_URL}/events`);
      url.searchParams.set('brand', brand);
      url.searchParams.set('limit', '500');
      if (nextToken) url.searchParams.set('nextToken', nextToken);

      const res = await fetch(url.toString(), {
        headers: {
          'x-brand': brand,
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(15000),
      });

      if (!res.ok) {
        console.warn(`[FindLatinDance Catalog Refresh] API returned HTTP ${res.status}. Falling back to cached events.json.`);
        return;
      }

      const body = await res.json();
      const page = body.data?.data || body.data || body.events;

      if (Array.isArray(page) && page.length > 0) {
        allEvents.push(...page);
        nextToken = body.data?.nextToken;
      } else {
        break;
      }
    } while (nextToken && allEvents.length < 10000);

    if (allEvents.length > 0) {
      writeFileSync(EVENTS_PATH, JSON.stringify(allEvents, null, 2), 'utf8');
      console.log(`[FindLatinDance Catalog Refresh] Successfully updated ${allEvents.length} approved events in src/data/events.json`);
    } else {
      console.warn('[FindLatinDance Catalog Refresh] API returned 0 events. Preserving existing catalog.');
    }
  } catch (err) {
    console.warn(`[FindLatinDance Catalog Refresh] Network unreachable (${err.message}). Using local fallback catalog.`);
  }
}

refreshCatalog();
