/**
 * TRUTH GATE: Invariant AST Sentinel for FindLatinDance
 * 
 * Enforces zero false marketing claims, zero invented counts, zero fake scarcity/urgency,
 * and zero unbacked "verified" claims across all pages, components, and templates.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = join(__dirname, '..');

const RULES: { name: string; re: RegExp }[] = [
  {
    name: 'hard-coded count',
    re: /\b(?!(?:19|20)\d\d\b)\d[\d,.]*\+?\s*(?:cities|countries|dancers|attendees|festivals|organizers|socials|classes|spots|venues|dance capitals)(?![\p{L}_])/iu,
  },
  {
    name: 'hard-coded "more than N"',
    re: /(?:more than|over|plus de|über)\s+\d{2,}/iu,
  },
  {
    name: 'invented scarcity / urgency / activity',
    re: /limited spots|spots? (?:left|remaining)|only \d+ (?:left|spots|tickets|places|passes)|selling fast|almost (?:gone|full|sold out)|last chance|\bhurry\b|closes soon|filling (?:up|fast)|trusted by/i,
  },
  {
    name: '"verified" claim without a stored check',
    re: /(?<![\p{L}])(?:verified|hand-verified|verificad[oa]s?)(?![\p{L}])/iu,
  },
  {
    name: '"curated" claim without the stored curated flag',
    re: /hand-?curated|human-curated|curated (?:global |worldwide )?directory|curated by/iu,
  },
  {
    name: 'review/response time promise',
    re: /within (?:\d+\s*[-–]\s*)?\d+\s*(?:h\b|hours?|days?|minutes?)|\b\d+\s*[-–]\s*\d+\s*h\b|\d+-hour review|under \d+ seconds/iu,
  },
  {
    name: 'borrowed Google feature name ("AI Overview")',
    re: /\bAI Overviews?\b/,
  },
];

function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*/g, '$1');
}

function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const out: string[] = [];
  for (const entry of entries) {
    if (entry.startsWith('.') || entry === 'node_modules' || entry === '__tests__' || entry === 'data') continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...collectSourceFiles(full));
    } else if (/\.(tsx?|jsx?|mjs)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

describe('Truth Gate AST Sentinel', () => {
  const files = collectSourceFiles(ROOT);

  it('scans at least 10 source files', () => {
    expect(files.length).toBeGreaterThanOrEqual(10);
  });

  for (const file of files) {
    const rel = relative(ROOT, file);

    for (const rule of RULES) {
      it(`${rel} satisfies ${rule.name}`, () => {
        const raw = readFileSync(file, 'utf8');
        const code = stripComments(raw);
        const match = code.match(rule.re);
        if (match) {
          const idx = match.index ?? 0;
          const line = code.slice(0, idx).split('\n').length;
          const snippet = code.slice(Math.max(0, idx - 40), Math.min(code.length, idx + 60)).replace(/\s+/g, ' ');
          expect.fail(`Truth Gate invariant failed in ${rel}:${line} [${rule.name}]\nFound: "${match[0]}" in "...${snippet}..."`);
        }
      });
    }
  }
});
