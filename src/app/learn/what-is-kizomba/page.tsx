import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What is Kizomba? Angolan Origins, Semba Connection & Urban Kiz Evolution — FindLatinDance',
  description: 'Understand the soul and culture of Kizomba: Angolan roots, connection principles, musical rhythm, and how European Urban Kiz evolved from traditional Semba.',
  alternates: {
    canonical: 'https://findlatindance.com/learn/what-is-kizomba',
  },
};

export default function WhatIsKizombaPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is Kizomba? Angolan Origins, Semba Connection & Urban Kiz Evolution',
    description: 'A comprehensive beginner to intermediate guide explaining Kizomba history, Semba roots, chest connection, and the emergence of Urban Kiz.',
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
    datePublished: '2026-03-25',
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-28 pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
          <Link href="/learn" className="inline-flex items-center gap-1.5 hover:text-amber-400 transition">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Learn Hub
          </Link>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 6 min read</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> March 2026</span>
          </div>
        </div>

        <header className="rounded-3xl bg-zinc-900/60 border border-white/10 p-8 sm:p-12 mb-10">
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
            Dance Spotlight
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            What is Kizomba? Angolan Origins, Semba Connection &amp; Urban Kiz Evolution
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Few partner dances demand as much genuine presence, subtlety, and heart-to-heart musical communication as Kizomba. Originating in Luanda, Angola, Kizomba is a rich cultural tradition celebrated on dance floors worldwide.
          </p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              1. Angolan Roots: The Word Kizomba and Semba
            </h2>
            <p>
              In Angola&apos;s Kimbundu language, the word <em>Kizomba</em> means &quot;party&quot; or &quot;celebration.&quot; During the late 1970s and 1980s, young Angolan dancers took the joyful, acrobatic steps of <strong>Semba</strong> (the traditional Angolan national partner dance) and slowed them down to dance to Caribbean cadence music and modern Angolan pop productions.
            </p>
            <p className="mt-3">
              Traditional Kizomba is grounded into the floor, with knees bent, pelvis relaxed, and a gentle connection at the chest that allows subtle weight shifts without tension or pulling.
            </p>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              2. Kizomba vs. Urban Kiz: The Modern Split
            </h2>
            <p>
              As Kizomba spread to Lisbon, Paris, London, and beyond, European dancers began experimenting with new electronic music genres like Ghetto Zouk, hip hop, and electro-pop. This gave birth to <strong>Urban Kiz</strong>.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
              <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                <strong className="text-emerald-400 block mb-1 text-base">Traditional Kizomba:</strong>
                Grounded circular movement, bent knees, natural body weight transfers, organic connection, and deep respect for Angolan cultural music.
              </div>
              <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                <strong className="text-violet-400 block mb-1 text-base">Urban Kiz:</strong>
                Danced upright on straight legs, utilizing linear geometries, quick syncopated foot taps, pivots, dynamic freezes, and electronic Ghetto Zouk beats.
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-amber-400" />
              <span>3. Floor Connection &amp; Respect</span>
            </h2>
            <p>
              Because Kizomba involves a close physical connection, personal respect, hygiene, and comfortable partner boundary communication are paramount. Dancers focus on smooth walking, grounded posture, and listening to the music together rather than showing off for spectators.
            </p>
          </section>
        </article>

        <footer className="mt-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Find Kizomba Classes &amp; Multi-Room Festivals</h3>
          <p className="text-xs sm:text-sm text-zinc-300 mb-4 max-w-lg mx-auto">
            Explore local Kizomba studios and international Latin congresses with dedicated Kizomba &amp; Urban Kiz rooms.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow"
            >
              Search Kizomba Events
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
