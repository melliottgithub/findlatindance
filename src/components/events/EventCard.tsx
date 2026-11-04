import { Calendar, Clock, Crown, ExternalLink, MapPin } from 'lucide-react';
import type { LatinDanceEvent } from '@/types';

interface EventCardProps {
  event: LatinDanceEvent;
}

export function EventCard({ event }: EventCardProps) {
  const isFestival = event.eventType === 'festival';

  return (
    <article className="glass-gold-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6">
      
      {/* Top Meta: Badges */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {event.ballroomCount ? (
              <span className="badge-prestige-gold rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Crown className="h-3 w-3 text-amber-400" />
                {event.ballroomCount} Ballrooms
              </span>
            ) : (
              <span className="rounded-full bg-zinc-800 text-zinc-300 px-2.5 py-0.5 text-xs font-semibold uppercase">
                {event.eventType}
              </span>
            )}

            {event.danceStyles.map((style) => (
              <span key={style} className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-zinc-300">
                {style}
              </span>
            ))}
          </div>

          {event.price && (
            <span className="text-xs font-bold text-amber-300">
              {event.price}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition leading-snug">
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

      {/* Action */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-xs font-medium text-zinc-400">
          {event.city}, {event.country}
        </span>
        <a
          href={event.eventUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-primary text-xs py-1.5 px-4"
        >
          {isFestival ? 'View Congress Guide' : 'Visit Event'}
          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
        </a>
      </div>

    </article>
  );
}
