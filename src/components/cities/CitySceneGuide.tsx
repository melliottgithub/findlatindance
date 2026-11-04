import { BookOpen, CheckCircle2, Clock, HelpCircle, Layers, MapPin, Music2, ShieldCheck, Sparkles } from 'lucide-react';
import type { LatinEvent } from '@/types';

interface CitySceneGuideProps {
  cityName: string;
  countryName: string;
  events: LatinEvent[];
}

export function CitySceneGuide({ cityName, countryName, events }: CitySceneGuideProps) {
  const venues = Array.from(
    new Set(events.map((e) => e.location.split(',')[0].trim()).filter(Boolean))
  ).slice(0, 6);

  const styleSet = new Set<string>();
  for (const e of events) {
    for (const s of e.danceStyles) styleSet.add(s);
  }
  const stylesList = Array.from(styleSet);

  const faqs = [
    {
      q: `How do multi-room Latin dance congresses and socials work in ${cityName}?`,
      a: `In ${cityName}, major Latin dance festivals feature dedicated ballrooms separated by genre: Room 1 is dedicated to Salsa (Mambo On2 and Cuban Timba), Room 2 to Bachata Sensual & Moderna, Room 3 to Brazilian Zouk, and Room 4 to Kizomba / Urban Kiz. Dancers float freely between rooms throughout the night.`,
    },
    {
      q: `Do I need a dance partner to attend Latin dance events in ${cityName}?`,
      a: `No partner is needed. Every workshop and academy class in ${cityName} utilizes rotational partner changes so all attendees learn to lead and follow with multiple partners. Social floors are welcoming and open to dancers of all backgrounds.`,
    },
    {
      q: `What pass tier should I choose for a multi-room festival in ${cityName}?`,
      a: `Choose a Full Pass if you plan to attend daytime workshops, artist masterclasses, and late-night socials. If you only want to dance at night, purchase a Party Pass or Evening Pass, which grants full access to all ballrooms from 21:00 until morning.`,
    },
    {
      q: `What shoes and clothing are recommended for multi-genre dancing in ${cityName}?`,
      a: `Wear comfortable attire with good ventilation. Because multi-room events often last 6+ hours, dancers frequently bring an extra shirt and multiple pairs of dance shoes (e.g. suede-soled Latin dance shoes for Salsa/Bachata and flexible split-sole dance sneakers for Zouk/Kizomba).`,
    },
  ];

  return (
    <section className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-b from-[#12121a] to-[#08080c] p-6 sm:p-10 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-amber-400" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Multi-Room Intelligence & Local Scene Guide
        </span>
      </div>
      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
        The {cityName} Multi-Room Latin Dance Scene
      </h2>
      <p className="mt-2 text-sm text-zinc-300 max-w-3xl leading-relaxed">
        Essential local knowledge for social dancers, festival-goers, and travelers visiting {cityName}, {countryName}.
      </p>

      {/* 3-Column Highlights Matrix */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Multi-Room Ballrooms */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
            <Layers className="h-4 w-4" />
            <span>Ballroom Ecosystem</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Events in {cityName} frequently feature 2 to 4 separate sound rooms catering to Salsa, Bachata, Brazilian Zouk, and Kizomba.
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {stylesList.map((style) => (
              <span key={style} className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] text-amber-300 font-medium">
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Column 2: Peak Hours & Social Rhythm */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-3">
            <Clock className="h-4 w-4" />
            <span>Weekly Social Rhythm</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Multi-room congresses run intensive workshops from 11:00 to 18:00, with social dancing igniting across all rooms from 22:00 to 05:00.
          </p>
          <div className="mt-3 text-xs text-zinc-400 space-y-1">
            <p>• Daytime Workshops: 11:00 – 18:00</p>
            <p>• Evening Shows: 21:30 – 22:30</p>
            <p>• All-Night Social Dancing: 22:30 – Sunrise</p>
          </div>
        </div>

        {/* Column 3: Local Dance Etiquette */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
            <ShieldCheck className="h-4 w-4" />
            <span>Floor Etiquette</span>
          </div>
          <ul className="text-xs text-zinc-300 space-y-1.5 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Adapt your styling to the room: keep head movements controlled in crowded Zouk/Bachata rooms.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Respect rotation lines in masterclasses; never hog the instructor view.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Say &ldquo;thank you&rdquo; and stay hydrated throughout the marathon nights.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Featured Venues Strip */}
      {venues.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 text-zinc-300 font-bold text-xs uppercase tracking-wider mb-3">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>Notable Dance Venues & Studios in {cityName}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {venues.map((venue) => (
              <span key={venue} className="rounded-lg bg-black/40 border border-white/10 px-3 py-1 text-xs text-zinc-300">
                {venue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Princeton GEO 200-Word Q&A Chunks */}
      <div className="mt-10 border-t border-white/10 pt-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
          <HelpCircle className="h-4 w-4" />
          <span>Frequently Asked Questions & Dancer Intel</span>
        </div>
        <h3 className="font-display text-xl font-bold text-white mb-6">
          Everything You Need to Know Before Dancing in {cityName}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-white/5 bg-black/30 p-5">
              <h4 className="font-semibold text-white text-sm mb-2">
                {faq.q}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
