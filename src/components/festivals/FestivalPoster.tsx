'use client';

import { useState, type ReactNode } from 'react';
import { FallbackImg } from '@/components/ui/FallbackImg';

interface FestivalPosterProps {
  /** The festival's flyer (already through the image rule, lib/event-image.mjs). */
  src: string;
  /** This festival's FindBachata share card, tried once when the flyer fails. */
  fallbackSrc?: string;
  alt: string;
  /** Shown when every source failed: the card's no-flyer band, never an empty box. */
  placeholder: ReactNode;
}

/**
 * The FestivalCard poster (ticket 131): blurred backdrop + uncropped foreground,
 * both following ONE source. Flyer fails -> share card -> placeholder. Before
 * this, a broken flyer left an empty 224px black panel (17 of 61 cards on
 * /festivals/november-2026), because each <img> just disappeared on its own.
 */
export function FestivalPoster({ src, fallbackSrc, alt, placeholder }: FestivalPosterProps) {
  // No effect re-syncing from props (same reason as FestivalFlyerHero, ticket 125):
  // callers key this component by src instead.
  const [shown, setShown] = useState<string | null>(src);
  if (!shown) return <>{placeholder}</>;

  return (
    <>
      {/* Ambient blurred backdrop fills container without letterbox voids */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shown}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        data-testid="festival-poster-backdrop"
        className="fposter-bg"
      />
      {/* Crisp uncropped foreground poster — all headline artists & branding 100% visible */}
      <FallbackImg
        src={src}
        fallbackSrc={fallbackSrc}
        onSourceChange={setShown}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="fposter-fg group-hover:scale-[1.02]"
      />
      <div className="fposter-shade" />
    </>
  );
}
