import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'What to Wear to a Latin Dance Social: Shoes, Soles & Outfit Essentials — FindLatinDance',
  description: 'The definitive dress code guide for weekly Latin socials and weekend festivals: suede-soled dance shoes, breathable fabrics, and floor bag essentials.',
  alternates: {
    canonical: 'https://findlatindance.com/learn/what-to-wear-latin-dance-social',
  },
};

export default function WhatToWearLatinDanceSocialPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What to Wear to a Latin Dance Social: Shoes, Soles & Outfit Essentials',
    description: 'The definitive guide to Latin dance footwear, fabrics, layers, and personal floor bags for weekly socials and weekend congresses.',
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
    datePublished: '2026-04-01',
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
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 5 min read</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> April 2026</span>
          </div>
        </div>

        <header className="rounded-3xl bg-zinc-900/60 border border-white/10 p-8 sm:p-12 mb-10">
          <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
            Social Guide
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            What to Wear to a Latin Dance Social: Shoes, Soles &amp; Outfit Essentials
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            Attending your first Latin dance social or traveling to a multi-day weekend congress? Getting your footwear and clothing right is the difference between effortless spins and painful blisters or soaked shirts.
          </p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              1. The #1 Investment: Suede or Smooth Leather Dance Soles
            </h2>
            <p>
              Standard rubber athletic sneakers create high friction with dance studio hardwood floors. When executing multiple spins or pivots, rubber soles stick, transferring rotational torque directly into your meniscus and knee ligaments.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li><strong className="text-white">Suede Soles:</strong> The international standard. Provides controlled slip and grip on polished hardwood. Requires a wire shoe brush to maintain texture.</li>
              <li><strong className="text-white">Smooth Leather / Dance Sneakers:</strong> Excellent for club floors, concrete, or tile where street dust ruins suede.</li>
              <li><strong className="text-white">Dance Socks / Soles Stickers:</strong> An inexpensive slip-on band that wraps over regular sneakers to allow smooth pivoting for beginners.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              2. Clothing: Breathability, Range of Motion &amp; Comfort
            </h2>
            <p>
              Social dance venues get hot and humid within an hour of opening. Wear lightweight, moisture-wicking fabrics that allow 360-degree shoulder and hip movement.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
              <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                <strong className="text-amber-400 block mb-1">For Leads:</strong>
                Lightweight cotton or performance blend button-downs or fitted tees. Avoid heavy wool or restrictive jackets. Always pack 1–2 backup shirts in your social bag.
              </div>
              <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                <strong className="text-amber-400 block mb-1">For Follows:</strong>
                Fitted tops or bodysuits that stay securely in place during spins. Stretchy leggings, culottes, or skirts with secure built-in bike shorts. Avoid heavy jewelry that can snag partner hands.
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-amber-400" />
              <span>3. The Essential Social Dance Bag Checklist</span>
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Breath mints (never chew gum while dancing)</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Small hand towel or microfiber cloth</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Clean backup t-shirt / blouse</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Shoe brush for suede soles</span>
              </div>
            </div>
          </section>
        </article>

        <footer className="mt-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Find a Social Near You Tonight</h3>
          <p className="text-xs sm:text-sm text-zinc-300 mb-4 max-w-lg mx-auto">
            Put your dancing shoes to work. Browse weekly socials across 39+ metropolitan areas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/search"
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition shadow"
            >
              Explore Latin Socials
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
