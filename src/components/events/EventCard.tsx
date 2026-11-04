import { Calendar, Clock, Crown, ExternalLink, MapPin, Sparkles, Users } from 'lucide-react';
import { FestivalPoster } from '@/components/festivals/FestivalPoster';
import { countryForCity } from '@/lib/city-country';
import type { LatinDanceEvent } from '@/types';

interface EventCardProps {
  event: LatinDanceEvent;
}

function bandGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  const h2 = (h + 35) % 360;
  return `linear-gradient(135deg, hsl(${h} 50% 16%), hsl(${h2} 55% 10%))`;
}

export function EventCard({ event }: EventCardProps) {
  const isFestival = event.eventType === 'festival';
  const isSocial = event.eventType === 'social';
  const country = countryForCity(event.city, event.country);

  // 1. Rich Congress / Festival Poster Card
  if (isFestival) {
    const noFlyerBand = (
      <div className="fcard-band" style={{ background: bandGradient(event.city || event.companyName) }} aria-hidden="true">
        <div className="fcard-band-glow" />
        <span className="text-4xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">{country.flag}</span>
        {event.city && (
          <span className="text-[11px] font-semibold tracking-wider text-amber-200/70 uppercase mt-1">
            {event.city}
          </span>
        )}
      </div>
    );

    return (
      <article className="fcard group">
        {/* Media Container: Full uncropped poster + blurred backdrop */}
        <div className="fcard-media">
          {event.imageUrl ? (
            <FestivalPoster
              key={event.imageUrl}
              src={event.imageUrl}
              alt={`${event.companyName} festival flyer`}
              placeholder={noFlyerBand}
            />
          ) : (
            noFlyerBand
          )}

          {/* Floating Badges */}
          <div className="fcard-badges">
            <span className="fcard-badge">
              <Crown className="h-3 w-3 text-amber-400" />
              {event.ballroomCount ? `${event.ballroomCount} Rooms` : 'Latin Congress'}
            </span>
            {event.price && (
              <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-black/80 px-2 py-0.5 text-[10px] font-bold text-amber-300 backdrop-blur-md">
                {event.price}
              </span>
            )}
          </div>

          {/* Floating Country Flag */}
          <span className="fcard-flag" aria-hidden="true">
            {country.flag}
          </span>
        </div>

        {/* Content Body */}
        <div className="fcard-body">
          <div>
            <div className="fcard-meta">
              <Calendar className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>
                {event.date}
                {event.endDate && event.endDate !== event.date ? ` – ${event.endDate}` : ''}
              </span>
              <span>·</span>
              <span className="truncate">{event.city}, {country.name}</span>
            </div>

            <h3 className="fcard-title">
              {event.companyName}
            </h3>

            {/* Headline Artists (if available) */}
            {event.artists && event.artists.length > 0 && (
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-200/80 truncate">
                <Users className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span className="truncate">{event.artists.slice(0, 3).join(', ')}{event.artists.length > 3 ? '…' : ''}</span>
              </div>
            )}

            <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Bottom Actions & Styles */}
          <div className="fcard-actions">
            <div className="flex flex-wrap items-center gap-1">
              {event.danceStyles.slice(0, 3).map((style) => (
                <span key={style} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-medium text-amber-200/90">
                  {style}
                </span>
              ))}
            </div>

            <a
              href={event.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-primary text-xs py-1.5 px-3.5"
            >
              Get Passes
              <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  // 2. Rich Social & Class Card
  return (
    <article className="glass-gold-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-6">
      <div>
        {/* Top Header Pill Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
              isSocial ? 'badge-prestige-gold' : 'bg-purple-950/60 border border-purple-400/30 text-purple-300'
            }`}>
              {event.eventType}
            </span>
            {event.danceStyles.map((style) => (
              <span key={style} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-zinc-300">
                {style}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-sm" aria-hidden="true">{country.flag}</span>
            {event.price && (
              <span className="text-xs font-bold text-amber-300">
                {event.price}
              </span>
            )}
          </div>
        </div>

        {/* Optional Event Flyer Thumbnail for Socials */}
        {event.imageUrl && (
          <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl border border-white/5 bg-black/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.imageUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101016] via-transparent to-transparent" />
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition leading-snug">
          {event.companyName}
        </h3>

        {/* Date & Time */}
        <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-amber-400" />
            <span>{event.dateTime.day ? `${event.dateTime.day}, ` : ''}{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-zinc-500" />
            <span>{event.dateTime.startTime} – {event.dateTime.endTime}</span>
          </div>
        </div>

        {/* Location */}
        <div className="mt-2.5 flex items-start gap-1.5 text-xs sm:text-sm text-zinc-400">
          <MapPin className="h-4 w-4 shrink-0 text-amber-500/70 mt-0.5" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Bottom Action CTA */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-xs font-medium text-zinc-400">
          {event.city}, {country.name}
        </span>
        <a
          href={event.eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-primary text-xs py-1.5 px-3.5"
        >
          {isSocial ? 'Join Social' : 'Class Info'}
          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
