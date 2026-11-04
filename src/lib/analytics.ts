/**
 * GA4 and Telemetry event helpers for FindLatinDance.
 * No-ops when gtag is not present, safe in SSR.
 */

type GtagParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: GtagParams): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: name, ...params });
  }
}

export type OutboundClickParams = GtagParams & {
  outbound_url: string;
  button?: string;
  destination_type?: string;
};

export function trackOutboundClick(params: OutboundClickParams): void {
  trackEvent('outbound_click', {
    event_category: 'engagement',
    transport_type: 'beacon',
    ...params,
  });
}

export type RecClickParams = {
  module: 'keep_going' | 'next_nav' | 'this_week_in_city';
  position: number;
  from_event_id?: string;
  to_event_id?: string;
  tier?: string;
  list_key?: string;
};

export function trackRecClick(params: RecClickParams): void {
  trackEvent('rec_click', params);
}

export type ListNextParams = {
  direction: 'next' | 'prev';
  method: 'button' | 'swipe' | 'keyboard';
  position: number;
  total: number;
  list_key: string;
};

export function trackListNext(params: ListNextParams): void {
  trackEvent('list_next', params);
}
