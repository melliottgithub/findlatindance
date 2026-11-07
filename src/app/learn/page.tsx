import Link from 'next/link';
import type { Metadata } from 'next';
import { BookOpen, Sparkles, ArrowRight, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ARTICLES } from '@/data/learn-articles';

export const metadata: Metadata = {
  title: 'Learn Latin Dance — Style Guides, Rhythms & Floor Etiquette — FindLatinDance',
  description: 'Master Latin dance styles from Salsa and Bachata to Brazilian Zouk and Kizomba. Learn timing, dance history, what to wear to socials, and floor craft etiquette.',
  alternates: {
    canonical: 'https://findlatindance.com/learn',
  },
};

export default function LearnIndexPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-28 pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-zinc-400">
          <Link href="/" className="hover:text-amber-400 transition">Home</Link>
          <span>/</span>
          <span className="text-zinc-200 font-medium">Learn</span>
        </nav>

        {/* Hero Banner */}
        <header className="relative rounded-3xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-violet-950/40 border border-amber-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Latin Dance Knowledge Base</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Master the Styles, Rhythms & Culture of Latin Dancing
            </h1>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
              Whether you are stepping onto the floor for your first salsa lesson or mastering the counterbalances of Brazilian Zouk, our comprehensive guides give you the rhythm breakdowns, dress codes, and floor craft etiquette to dance with confidence worldwide.
            </p>
          </div>
        </header>

        {/* Articles Grid */}
        <section className="mt-12" aria-label="Editorial Guides">
          <div className="grid gap-6 md:grid-cols-2">
            {ARTICLES.map((article, idx) => (
              <article
                key={article.slug}
                className="group relative rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-amber-500/40 transition duration-300 p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <span className="font-semibold text-amber-400 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-amber-300 transition leading-snug">
                    <Link href={`/learn/${article.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {article.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold group-hover:translate-x-1 transition duration-200">
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span>Published {article.publishDate}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quick Style Reference Matrix */}
        <section className="mt-16 rounded-3xl bg-zinc-900/40 border border-white/10 p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Compass className="h-5 w-5 text-amber-400" />
            <span>Which Style Fits Your Musical Taste?</span>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="rounded-xl bg-white/5 p-4 border border-white/5">
              <h3 className="font-bold text-amber-400 text-sm mb-1">Salsa</h3>
              <p className="text-zinc-300">Fast, energetic brass, timbales & cowbell. Linear (On1/On2) or circular Cuban Casino.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4 border border-white/5">
              <h3 className="font-bold text-rose-400 text-sm mb-1">Bachata</h3>
              <p className="text-zinc-300">Romantic bongos & syncopated requinto guitar. Sensual body rolls or Traditional Dominican footwork.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4 border border-white/5">
              <h3 className="font-bold text-purple-400 text-sm mb-1">Brazilian Zouk</h3>
              <p className="text-zinc-300">Boom-chic-chic rhythm, contemporary pop/R&B remixes, continuous circular momentum & hair sweeps.</p>
            </div>
            <div className="rounded-xl bg-white/5 p-4 border border-white/5">
              <h3 className="font-bold text-emerald-400 text-sm mb-1">Kizomba</h3>
              <p className="text-zinc-300">Grounded chest-to-chest connection, Angolan Semba roots, subtle weight transfers & syncopated leg slides.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
