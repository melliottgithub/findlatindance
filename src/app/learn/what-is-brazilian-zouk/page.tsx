import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What is Brazilian Zouk? Roots, Music, Circular Flow & Head Movement Dynamics — FindLatinDance',
  description: 'Everything you need to know about Brazilian Zouk: from Brazilian Lambada roots to modern lyrical music, counterbalances, boneca, and safe head movement mechanics.',
  alternates: {
    canonical: 'https://findlatindance.com/learn/what-is-brazilian-zouk',
  },
};

export default function WhatIsBrazilianZoukPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is Brazilian Zouk? Roots, Music, Circular Flow & Head Movement Dynamics',
    description: 'A comprehensive beginner to intermediate guide explaining Brazilian Zouk history, rhythm, connection principles, and safe head movement mechanics.',
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
    datePublished: '2026-03-20',
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
          <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300">
            Dance Spotlight
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            What is Brazilian Zouk? Roots, Music, Circular Flow & Head Movement Dynamics
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Brazilian Zouk has grown into a worldwide dance phenomenon. Fusing the raw, rapid hip rotations of 1980s Brazilian Lambada with smooth contemporary partnerwork, Zouk gives dancers an unparalleled feeling of flight, centrifugal flow, and connection.
          </p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              1. The Transition from Lambada to Brazilian Zouk
            </h2>
            <p>
              In the late 1980s, the Brazilian dance craze known as Lambada took the world by storm. When Lambada music production tapered off in the early 1990s, dancers in Rio de Janeiro (led by masters like Jaime Arôxa, Adilio Porto, and Renata Peçanha) began dancing Lambada steps to slower, French Caribbean &quot;Zouk&quot; music from Martinique and Guadeloupe (Kassav&apos;).
            </p>
            <p className="mt-3">
              The slower tempo allowed dancers to modify the dance: steps were grounded, rotational movements were lengthened, and complex circular head rolls were integrated with biomechanical control.
            </p>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              2. The Characteristic Rhythm: &quot;Boom... Chic-Chic&quot;
            </h2>
            <p>
              Unlike Salsa&apos;s rapid 1-2-3 timing or Bachata&apos;s 1-2-3-tap cadence, Brazilian Zouk is anchored on a syncopated three-beat pattern inside a measure:
            </p>
            <div className="mt-4 rounded-xl bg-purple-950/20 border border-purple-500/20 p-4 text-xs sm:text-sm text-purple-200">
              <span className="font-bold text-white block mb-1">Timing Cadence:</span>
              <strong>Count 1 (Boom):</strong> Slow, deep weight transfer, chest grounded.<br />
              <strong>Count 2 &amp; 3 (Chic-Chic):</strong> Two quick steps transferring weight across the floor.
            </div>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <span>3. Biomechanical Safety: Head Movements &amp; Torsion</span>
            </h2>
            <p>
              One of the most visually stunning elements of Brazilian Zouk is the follower&apos;s hair sweeps and head rolls (such as <em>Toalha</em>, <em>Bate Cabelo</em>, and <em>Boneca</em>).
            </p>
            <div className="mt-3 space-y-2 text-xs sm:text-sm">
              <p>
                <strong className="text-white">Safety Invariant 1: Head movements come from the thoracic spine:</strong> Never wrench the follower&apos;s neck with your hands. Head motion is a natural continuation of the upper torso and ribcage tilt.
              </p>
              <p>
                <strong className="text-white">Safety Invariant 2: Constant active counterbalance:</strong> Leaders must offer a grounded, stable base before initiating tilted turns or dips.
              </p>
              <p>
                <strong className="text-white">Safety Invariant 3: Clean floor clearance:</strong> Leaders must always scan the 360-degree perimeter to protect the follower from colliding with other couples.
              </p>
            </div>
          </section>
        </article>

        <footer className="mt-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Experience Brazilian Zouk at a 2026 Congress</h3>
          <p className="text-xs sm:text-sm text-zinc-300 mb-4 max-w-lg mx-auto">
            Discover multi-room Latin congresses featuring dedicated Brazilian Zouk rooms with non-stop day-and-night socials.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/festivals/2026"
              className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition shadow"
            >
              Explore 2026 Latin Festivals
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
