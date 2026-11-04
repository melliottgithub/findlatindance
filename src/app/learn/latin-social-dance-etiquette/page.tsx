import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Clock, Calendar, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Unwritten Rules of Latin Social Dancing: Floor Craft, Asking & Respect — FindLatinDance',
  description: 'Master the community norms that keep socials fun, safe, and welcoming: how to invite someone to dance, handling refusals, navigation in crowded rooms, and hygiene.',
  alternates: {
    canonical: 'https://findlatindance.com/learn/latin-social-dance-etiquette',
  },
};

export default function LatinSocialDanceEtiquettePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The Unwritten Rules of Latin Social Dancing: Floor Craft, Asking & Respect',
    description: 'A comprehensive guide to Latin social dance etiquette covering floor craft, invitations, consent, hygiene, and safe partnerwork.',
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
    datePublished: '2026-04-05',
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
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> April 2026</span>
          </div>
        </div>

        <header className="rounded-3xl bg-zinc-900/60 border border-white/10 p-8 sm:p-12 mb-10">
          <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-xs font-semibold text-rose-300">
            Community Etiquette
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            The Unwritten Rules of Latin Social Dancing: Floor Craft, Asking &amp; Respect
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed">
            The Latin dance community is one of the most welcoming, global, and diverse subcultures in the world. You can land in Madrid, Tokyo, Melbourne, or Chicago and dance with strangers without speaking a single word in common. Here are the core guidelines that keep the scene safe and joyous.
          </p>
        </header>

        <article className="prose prose-invert max-w-none space-y-8 text-zinc-300 text-sm sm:text-base leading-relaxed">
          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              1. Asking Anyone to Dance &amp; The Graceful Refusal
            </h2>
            <p>
              In modern Latin dance, <strong>anyone can ask anyone to dance</strong> regardless of gender, role, or skill level. Followers frequently ask leaders, leaders ask followers, and role-reversal is widely embraced.
            </p>
            <div className="mt-3 space-y-2 text-xs sm:text-sm">
              <p>
                <strong className="text-white">How to ask:</strong> Make friendly eye contact, extend an open hand, and ask simply: &quot;Would you like to dance?&quot;
              </p>
              <p>
                <strong className="text-white">Accepting a &quot;No&quot;:</strong> Anyone is free to decline a dance for any reason (fatigue, resting their feet, hydrating, or saving a dance for a friend). Never take a refusal personally or demand an explanation. A polite smile and &quot;No problem, enjoy your night!&quot; keeps the environment positive.
              </p>
            </div>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <span>2. Floor Craft: Protecting Your Partner in Packed Rooms</span>
            </h2>
            <p>
              During peak hours at festivals and popular socials, dance floors are packed shoulder-to-shoulder.
            </p>
            <ul className="mt-2 space-y-2 list-disc list-inside text-xs sm:text-sm">
              <li><strong className="text-white">Adjust move size:</strong> When space is tight, keep spins compact and eliminate wide arm flings or extended kicks.</li>
              <li><strong className="text-white">Never perform aerials on a social floor:</strong> Acrobatic lifts, drops, and throws belong only in stage performances or choreography rehearsals, never on a social dance floor where adjacent couples can be struck.</li>
              <li><strong className="text-white">Collision protocol:</strong> If you accidentally bump another couple, immediately apologize, make sure everyone is uninjured, and resume dancing.</li>
            </ul>
          </section>

          <section className="rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-amber-400" />
              <span>3. Never Teach on the Social Dance Floor</span>
            </h2>
            <p>
              Unless your partner explicitly asks for feedback (&quot;Can you show me where I lost my balance on that turn?&quot;), <strong>never critique, correct, or give unsolicited lessons</strong> to your partner during a social dance. Social dancing is for expression, connection, and music appreciation. Save instructional critique for studio workshops.
            </p>
          </section>
        </article>

        <footer className="mt-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-white mb-2">Join the Global Latin Dance Community</h3>
          <p className="text-xs sm:text-sm text-zinc-300 mb-4 max-w-lg mx-auto">
            Discover welcoming beginner classes, weekend socials, and international festivals in your area.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/cities"
              className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-500 transition shadow"
            >
              Browse Cities Worldwide
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
