import { Calendar, Clock, Crown, ExternalLink, MapPin, Sparkles, Users } from 'lucide-react';
import { FestivalPoster } from '@/components/festivals/FestivalPoster';
import { FallbackImg } from '@/components/ui/FallbackImg';
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

  // 2. Rich Social & Class Card (FindBachata parity: left thumbnail tile + FallbackImg)
  return (
    <article className="glass-gold-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-[2px] hover:border-amber-400/40">
      <div>
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Flyer Thumbnail (if present) OR Date Column (if absent) */}
          {event.imageUrl ? (
            <div className="relative flex-shrink-0">
              <FallbackImg
                src={event.imageUrl}
                alt={`${event.companyName} flyer`}
                loading="lazy"
                decoding="async"
                className="h-24 w-20 rounded-xl object-cover border border-white/15 shadow-lg bg-white/[0.02]"
                placeholder={
                  <div
                    aria-hidden="true"
                    className="h-24 w-20 rounded-xl border border-white/15 bg-gradient-to-br from-amber-600/30 via-orange-700/20 to-purple-900/20"
                  />
                }
              />
              <div className="absolute -bottom-2 -left-1 rounded-lg bg-black/85 px-2 py-0.5 text-[10px] font-bold text-white border border-white/15 backdrop-blur-md shadow-sm">
                {event.dateTime.day?.slice(0, 3) ?? ''} {event.date?.slice(8, 10) ?? ''}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-3 py-2.5 min-w-[60px] border border-white/10 shadow-inner flex-shrink-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300/80">
                {event.dateTime.day?.slice(0, 3) ?? ''}
              </span>
              <span className="text-xl font-bold text-white leading-tight">
                {event.date?.slice(8, 10) ?? ''}
              </span>
              <span className="text-[11px] text-white/50">
                {event.date?.slice(5, 7)}/{event.date?.slice(2, 4)}
              </span>
            </div>
          )}

          {/* Details Column */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  isSocial ? 'badge-prestige-gold' : 'bg-purple-950/60 border border-purple-400/30 text-purple-300'
                }`}>
                  {event.eventType}
                </span>
                {event.danceStyles.slice(0, 3).map((style) => (
                  <span key={style} className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
                    {style}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs" aria-hidden="true">{country.flag}</span>
                {event.price && (
                  <span className="text-[11px] font-bold text-amber-300">
                    {event.price}
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition leading-snug truncate">
              {event.companyName}
            </h3>

            <div className="mt-2 space-y-1 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <span>{event.dateTime.startTime} – {event.dateTime.endTime}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="h-3.5 w-3.5 text-amber-500/70 shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* Bottom Action CTA */}
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="text-xs font-medium text-zinc-400 truncate mr-2">
          {event.city}, {country.name}
        </span>
        <a
          href={event.eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-primary text-xs py-1.5 px-3.5 flex-shrink-0"
        >
          {isSocial ? 'Join Social' : 'Class Info'}
          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
