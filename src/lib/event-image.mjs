// One rule for "does this event have a real image?" (ticket 131).
//
// WHY: on 2026-10-23 a one-shot pipeline (lab/event_media_pipeline/
// process_all_events.py) wrote imageUrl = flyerUrl =
// https://findbachata.com/flyers/<slug>.webp and imageSource = 'ai_branded'
// straight into the catalog for 2,411 events. Those files were never uploaded
// (public/flyers holds three), so every one is a 404, and the generated images
// carried made-up text, which breaks the project rule "nothing made up". The
// same pipeline also stamped 24 records imageSource 'official' with a /flyers/
// URL that is equally missing.
//
// RULE: an event image is ABSENT when
//   - imageSource is 'ai_branded' (both URLs, whatever they point at), or
//   - the URL is one of our own /flyers/ files (relative, or on findbachata.com)
//     and that file is not in KNOWN_FLYER_FILES, the committed public/flyers
//     listing (a parity test keeps the two equal).
// Third-party URLs pass through unchanged (Postel's Law: we cannot probe them at
// build time; FallbackImg handles a broken one in the browser).
//
// Plain ES module so the prebuild scripts (scripts/catalog-fetch.mjs) and the
// Next.js pages (src/lib/api-server.ts, src/lib/festival-flyer.ts) share it.
// Pure: no fs, safe in client components.

export const AI_BRANDED_IMAGE_SOURCE = 'ai_branded';

/** Files in public/flyers/ (served at /flyers/<file>). Keep equal to the directory listing. */
export const KNOWN_FLYER_FILES = Object.freeze([
  'bristol-bachata-8th-anniversary-2026.webp',
  'bristol-bachata-party-november-2026.webp',
  'bristol-bachata-totos-by-the-river.webp',
  'mssf-poster.jpg',
  'prague-bachata-dominant-congress-2027.jpg',
  'prague-bachata-dominant-congress-2027.webp',
]);

const KNOWN = new Set(KNOWN_FLYER_FILES);

/** The image fields a catalog event carries. */
export const EVENT_IMAGE_FIELDS = Object.freeze(['flyerUrl', 'imageUrl']);

const OWN_FLYER_RE = /^(?:(?:https?:)?\/\/(?:www\.)?findbachata\.com)?\/flyers\/([^?#]*)/i;

/**
 * The file name when `url` points at one of our own /flyers/ files, else null.
 * Query string and fragment are ignored; a URL-encoded name is decoded.
 */
export function ownFlyerFile(url) {
  if (typeof url !== 'string') return null;
  const match = OWN_FLYER_RE.exec(url.trim());
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

/** True when `url` is a non-empty image URL we may render or publish. */
export function isUsableImageUrl(url, knownFlyers = KNOWN) {
  if (typeof url !== 'string' || url.trim() === '') return false;
  const file = ownFlyerFile(url);
  if (file === null) return true;
  return knownFlyers.has(file);
}

/** True when this event's own image fields must be treated as absent wholesale. */
export function isAiBrandedImage(event) {
  return event?.imageSource === AI_BRANDED_IMAGE_SOURCE;
}

/**
 * The event's image URL (flyerUrl first, then imageUrl) when it is usable, else
 * undefined. Never an ai_branded image, never a missing /flyers/ file.
 */
export function usableEventImage(event, knownFlyers = KNOWN) {
  if (!event || isAiBrandedImage(event)) return undefined;
  for (const field of EVENT_IMAGE_FIELDS) {
    if (isUsableImageUrl(event[field], knownFlyers)) return event[field];
  }
  return undefined;
}

/**
 * The event with every unusable image field removed (the catalog boundary,
 * applied once so every page, script and RSC payload downstream sees the same
 * answer). Returns the same object when nothing changes. imageSource goes with
 * the image it described: once no image field survives, it describes nothing.
 */
export function sanitizeEventImages(event, knownFlyers = KNOWN) {
  if (event === null || typeof event !== 'object') return event;
  const dropAll = isAiBrandedImage(event);
  const drop = EVENT_IMAGE_FIELDS.filter(
    (field) => field in event && (dropAll || !isUsableImageUrl(event[field], knownFlyers)),
  );
  if (drop.length === 0) return event;
  const out = { ...event };
  for (const field of drop) delete out[field];
  if (EVENT_IMAGE_FIELDS.every((field) => !(field in out))) delete out.imageSource;
  return out;
}
