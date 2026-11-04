import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#070709] py-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-white">
                Find<span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">LatinDance</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The premier global portal uniting all Latin social dance cultures: Salsa, Bachata, Brazilian Zouk, Kizomba, and Merengue worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-300">
              Worldwide Congresses
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/festivals" className="hover:text-amber-300 transition">Multi-Room Festivals</Link></li>
              <li><Link href="/cities/miami" className="hover:text-amber-300 transition">Miami Latin Nights</Link></li>
              <li><Link href="/cities/madrid" className="hover:text-amber-300 transition">Madrid Latin Scene</Link></li>
              <li><Link href="/cities/new-york" className="hover:text-amber-300 transition">New York Congresses</Link></li>
            </ul>
          </div>

          {/* Dance Styles Covered */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-amber-300">
              Dance Styles
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>Salsa (On1, On2, Cuban, Cali)</li>
              <li>Bachata (Sensual, Traditional, Fusion)</li>
              <li>Brazilian Zouk & Lambada</li>
              <li>Kizomba, Semba & Urban Kiz</li>
              <li>Merengue & Dominican Rhythms</li>
            </ul>
          </div>

          {/* Sister Specialized Portals */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Specialized Portals
            </h4>
            <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
              Explore dedicated deep-niche directories:
            </p>
            <div className="mt-3 flex flex-col gap-2.5 text-sm">
              <a href="https://findsalsa.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-rose-400 hover:underline">
                FindSalsa.com (On1/On2/Cuban) →
              </a>
              <a href="https://findbachata.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-purple-400 hover:underline">
                FindBachata.com (Sensual/Trad) →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/5 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} FindLatinDance.com · The Global Latin Dance Network.</p>
          <p className="mt-2 sm:mt-0">Prestige directory for social dancers worldwide.</p>
        </div>
      </div>
    </footer>
  );
}
