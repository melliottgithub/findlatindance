'use client';

import { useEffect, useRef, useState, type ImgHTMLAttributes, type ReactNode } from 'react';

interface FallbackImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src: string;
  /** Tried once when `src` fails (e.g. the event's FindBachata share card). */
  fallbackSrc?: string;
  /** Rendered when every source failed. Default: nothing (never a broken-image icon). */
  placeholder?: ReactNode;
  /** Told which source is showing, so a caller can relabel (official flyer -> our card). */
  onSourceChange?: (src: string | null) => void;
}

/**
 * Ticket 125: 73 of 274 festival flyers were broken (65 are 404s under /flyers/),
 * and a broken flyer page converted at 6.7% vs 15.3% (BOARD B5). This <img> swaps
 * to `fallbackSrc` on error, then to `placeholder`.
 *
 * Static export caveat: an image can fail BEFORE React hydrates and attaches
 * onError, so the error event is lost. On mount we also check the element itself
 * (complete && naturalWidth === 0 means it already failed).
 */
export function FallbackImg({ src, fallbackSrc, placeholder = null, onSourceChange, alt = '', ...rest }: FallbackImgProps) {
  const [current, setCurrent] = useState<string | null>(src);
  const ref = useRef<HTMLImageElement>(null);
  // No "reset when src changes" effect: on mount it would run AFTER the failure
  // check below and undo it. A caller that swaps src passes key={src} instead.

  const fail = () => {
    if (current === null) return;
    const next = current === src && fallbackSrc && fallbackSrc !== src ? fallbackSrc : null;
    setCurrent(next);
    onSourceChange?.(next);
  };

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
    // Only on mount / source change: a later failure arrives through onError.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (!current) return <>{placeholder}</>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={current} alt={alt} onError={fail} {...rest} />;
}
