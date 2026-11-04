import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Compass, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Complete Guide to Latin Dance Styles — Salsa, Bachata, Zouk & Kizomba — FindLatinDance',
  description: 'Understand the rhythm, posture, music, and energy of Latin dance styles: Salsa (On1/On2/Cuban), Bachata (Sensual/Dominican), Brazilian Zouk, Kizomba, and Merengue.',
  alternates: {
    canonical: 'https://findlatindance.com/learn/latin-dance-styles-guide',
  },
};

export default function LatinDanceStylesGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Complete Guide to Latin Dance Styles: Salsa, Bachata, Zouk & Kizomba Compared',
    description: 'Compare rhythm, origins, posture, partner dynamics, and musicality across Salsa, Bachata, Brazilian Zouk, Kizomba, and Merengue.',
    author: {
      '@type': 'Organization',
      name: 'FindLatinDance Editorial Board',
      url: 'https://findlatindance.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FindLatinDance',
      url: 'https://findlatindance.com',
    },
    datePublished: '2026-03-15',
    dateModified: '2026-03-15',
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-28 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
          <Link href="/learn" className="inline-flex items-center gap-1.5 hover:text-amber-400 transition">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Learn Hub
          </Link>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 7 min read</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> March 2026</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="rounded-3xl bg-zinc-900/60 border border-white/10 p-8 sm:p-12 mb-10">
          <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
            Style Overview
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            The Complete Guide to Latin Dance Styles: Salsa, Bachata, Zouk & Kizomba Compared
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Walk into any modern Latin dance festival or weekend congress in Madrid, Paris, New York, or Tokyo, and you will see multiple dedicated ballrooms vibrating with distinct tempos, rhythms, and partner connections. Here is the definitive roadmap to understand each genre.
          </p>
        </header>

        {/* Content Body */}
        <article className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              1. Salsa: Explosive Energy & Complex Geometry
            </h2>
            <p>
              Salsa originated in New York City during the 1960s and 70s as a fusion of Cuban son, mambo, Puerto Rican bomba and plena, and American big band jazz. Characterized by explosive brass lines, rapid timbales, and syncopated cowbell beats, salsa is danced over an 8-beat musical phrase with steps on counts 1-2-3 and 5-6-7 (with pauses or weight transitions on 4 and 8).
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl bg-white/5 p-3">
                <strong className="text-white block mb-1">Linear Salsa (On1 / On2):</strong>
                Danced inside a narrow rectangular slot. On1 (LA Style) breaks forward on count 1 with theatrical power. On2 (NY Mambo) breaks on count 2 with silky, syncopated jazz swing.
              </div>
              <div className="rounded-xl bg-white/5 p-3">
                <strong className="text-white block mb-1">Cuban Casino:</strong>
                Danced circularly with interlocking knot-like arm work and continuous rotational body movement, often danced in groups as Rueda de Casino.
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              2. Bachata: Romance, Syncopation & Sensual Flow
            </h2>
            <p>
              Born in the rural Dominican Republic in the early 1960s, Bachata is defined by the syncopated bongo, the driving güira scraper, and the weeping requinto guitar melody. Bachata uses an 8-count structure with a characteristic hip tap or accent on counts 4 and 8.
            </p>
            <p className="mt-3">
              Modern bachata has split into three dominant branches:
            </p>
            <ul className="mt-2 space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li><strong className="text-white">Traditional / Dominican Bachata:</strong> Heavy emphasis on playful syncopated footwork, musicality with guitar breaks, and close chest-to-chest connection.</li>
              <li><strong className="text-white">Sensual Bachata:</strong> Created in Spain by Korke & Judith, emphasizing upper body isolations, wave dynamics, circular frame leading, and musical interpretation of melodic vocals.</li>
              <li><strong className="text-white">Moderna:</strong> Cross-body lead turns and pretzel hand patterns adapted from linear salsa.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              3. Brazilian Zouk: Infinite Waves & Head Movements
            </h2>
            <p>
              When French Caribbean Zouk music reached Rio de Janeiro and São Paulo in the 1990s, Brazilian Lambada dancers adapted their lightning-fast hip movements into a smoother, grounded, continuous dance now known as Brazilian Zouk.
            </p>
            <p className="mt-3">
              Zouk is characterized by continuous momentum, counterbalances (tilted turns, boneca), and three-dimensional head movements (toalha, bate cabelo, chicote). It is danced to modern pop remixes, lyrical R&B, and dubstep rhythms with a heartbeat &quot;Boom... Chic-Chic&quot; cadence.
            </p>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              4. Kizomba & Urban Kiz: African Grounding
            </h2>
            <p>
              Originating in Angola in the late 1970s and 1980s, Kizomba translates literally to &quot;party&quot; in Kimbundu. Evolving from traditional Angolan Semba mixed with Caribbean cadence rhythms, it is celebrated for deep, grounded connection between dance partners, subtle weight shifts, and understated elegance without forced acrobatics.
            </p>
            <p className="mt-3">
              In France and across Europe, the style evolved into <strong>Urban Kiz</strong>, danced in an upright linear posture with syncopated taps, pivots, and electronic Ghetto Zouk beats.
            </p>
          </section>

          {/* Quick Comparison Table */}
          <section className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 overflow-x-auto">
            <h3 className="text-lg font-bold text-white mb-4">Direct Comparison Matrix</h3>
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-amber-400 font-bold">
                  <th className="pb-3">Style</th>
                  <th className="pb-3">Rhythm</th>
                  <th className="pb-3">Primary Frame</th>
                  <th className="pb-3">Music Tempo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2.5 font-bold text-white">Salsa (Linear)</td>
                  <td className="py-2.5">1-2-3 (pause 4) 5-6-7 (pause 8)</td>
                  <td className="py-2.5">Elastic slot tension</td>
                  <td className="py-2.5">160–220 BPM (Fast)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Bachata</td>
                  <td className="py-2.5">Step-step-step-TAP (1-2-3-4)</td>
                  <td className="py-2.5">Close chest or open frame</td>
                  <td className="py-2.5">110–140 BPM (Moderate)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Brazilian Zouk</td>
                  <td className="py-2.5">Boom... Chic-Chic (Slow-Quick-Quick)</td>
                  <td className="py-2.5">Rotational & counterbalance frame</td>
                  <td className="py-2.5">70–95 BPM (Lyrical)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Kizomba</td>
                  <td className="py-2.5">Ground-rooted 1-2 cadence</td>
                  <td className="py-2.5">Chest-to-chest connection</td>
                  <td className="py-2.5">85–105 BPM (Steady)</td>
                </tr>
              </tbody>
            </table>
          </section>
        </article>

        {/* CTA Footer */}
        <footer className="mt-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Ready to dance?</h3>
          <p className="text-xs sm:text-sm text-zinc-300 mb-4 max-w-lg mx-auto">
            Find beginners classes, multi-room weekend socials, and international festivals in your city.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition shadow"
            >
              Search Events Worldwide
            </Link>
            <Link
              href="/festivals"
              className="rounded-xl bg-white/10 border border-white/20 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
            >
              Browse 2026 Festivals
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
