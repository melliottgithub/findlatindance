/**
 * List navigation state for FindLatinDance.
 * Allows visitors browsing any list (city hub, sub-route, search results, festivals)
 * to step through events using NextNav ("3 of 14 in Miami · Next ›") with swiping,
 * keyboard arrows, and prev/next buttons without bouncing back to search engines.
 */

export const LIST_NAV_KEY = 'fld_list_nav';
export const LIST_NAV_TTL_MS = 30 * 60 * 1000;
const MAX_HREFS = 600;

export interface ListNavState {
  v: 1;
  key: string;
  label: string;
  listPath: string;
  hrefs: string[];
  visited: string[];
  scrollY: number;
  savedAt: number;
}

export interface ListPosition {
  index: number;
  total: number;
  prev: string | null;
  next: string | null;
}

export function normalizePath(href: string): string {
  let path = href;
  try {
    path = new URL(href, 'https://findlatindance.com').pathname;
  } catch {
    /* keep as-is */
  }
  return path.replace(/\/+$/, '') || '/';
}

export function isEventPath(path: string): boolean {
  return /^\/events\/[^/]+$/.test(normalizePath(path));
}

export function orderedEventPaths(hrefs: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const href of hrefs) {
    const path = normalizePath(href);
    if (!isEventPath(path) || seen.has(path)) continue;
    seen.add(path);
    out.push(path);
    if (out.length >= MAX_HREFS) break;
  }
  return out;
}

export function readListNav(now = Date.now()): ListNavState | null {
  try {
    const raw = window.sessionStorage.getItem(LIST_NAV_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Partial<ListNavState>;
    if (s.v !== 1 || !Array.isArray(s.hrefs) || !Array.isArray(s.visited)) return null;
    if (typeof s.savedAt !== 'number' || now - s.savedAt > LIST_NAV_TTL_MS) return null;
    return {
      v: 1,
      key: String(s.key ?? ''),
      label: String(s.label ?? ''),
      listPath: String(s.listPath ?? ''),
      hrefs: s.hrefs.map(String),
      visited: s.visited.map(String),
      scrollY: typeof s.scrollY === 'number' ? s.scrollY : 0,
      savedAt: s.savedAt,
    };
  } catch {
    return null;
  }
}

export function writeListNav(state: ListNavState): void {
  try {
    window.sessionStorage.setItem(LIST_NAV_KEY, JSON.stringify(state));
  } catch {
    /* storage blocked: the control simply never shows */
  }
}

export function saveListTap(input: {
  key: string;
  label: string;
  listPath: string;
  hrefs: string[];
  tapped: string;
  scrollY: number;
  now?: number;
}): ListNavState | null {
  const hrefs = orderedEventPaths(input.hrefs);
  const tapped = normalizePath(input.tapped);
  if (!hrefs.includes(tapped)) return null;
  const state: ListNavState = {
    v: 1,
    key: input.key,
    label: input.label,
    listPath: normalizePath(input.listPath),
    hrefs,
    visited: [tapped],
    scrollY: Math.max(0, Math.round(input.scrollY)),
    savedAt: input.now ?? Date.now(),
  };
  writeListNav(state);
  return state;
}

export function listPosition(state: ListNavState | null, path: string): ListPosition | null {
  if (!state) return null;
  const p = normalizePath(path);
  if (!state.visited.includes(p)) return null;
  const index = state.hrefs.indexOf(p);
  if (index < 0 || state.hrefs.length < 2) return null;
  return {
    index,
    total: state.hrefs.length,
    prev: index > 0 ? state.hrefs[index - 1] : null,
    next: index < state.hrefs.length - 1 ? state.hrefs[index + 1] : null,
  };
}

export function markVisited(state: ListNavState, path: string, now = Date.now()): ListNavState {
  const p = normalizePath(path);
  const visited = state.visited.includes(p) ? state.visited : [...state.visited, p];
  const next = { ...state, visited, savedAt: now };
  writeListNav(next);
  return next;
}

export type SwipeDirection = 'next' | 'prev' | null;

export function swipeDirection(
  start: { x: number; y: number; t: number },
  end: { x: number; y: number; t: number },
  viewportWidth: number,
): SwipeDirection {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (start.x < 24 || start.x > viewportWidth - 24) return null;
  if (end.t - start.t > 800) return null;
  if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.5) return null;
  return dx < 0 ? 'next' : 'prev';
}
