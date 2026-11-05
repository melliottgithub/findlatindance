import Link from 'next/link';
import { BookOpen, Crown, MapPin, PlusCircle, Search, Users } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-900/10 dark:border-white/5 bg-[var(--header-bg)] backdrop-blur-2xl transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-amber-500/30 bg-amber-950/20 p-1.5 shadow-[0_0_15px_-3px_rgba(212,175,55,0.4)] transition group-hover:scale-105 group-hover:border-amber-400">
            <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
              <defs>
                <linearGradient id="hdrGold" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#926f21" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>
              </defs>
              <path d="M36 24 C38 36, 40 54, 42 66 C42 70, 48 76, 68 76 C75 76, 80 73, 82 71" 
                    stroke="url(#hdrGold)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M42 34 C58 22, 78 30, 78 50 C78 68, 56 75, 42 70" 
                    stroke="url(#hdrGold)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              Find<span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 bg-clip-text text-transparent">LatinDance</span>
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-zinc-300">
          <Link href="/festivals" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white">
            <Crown className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            Congresses
          </Link>
          <Link href="/search" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white">
            <Search className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            Search
          </Link>
          <Link href="/artists" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white">
            <Users className="h-4 w-4 text-purple-500 dark:text-purple-400" />
            Artists
          </Link>
          <Link href="/learn" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white">
            <BookOpen className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            Learn
          </Link>
        </nav>

        {/* Right Sister Network Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 border-r border-slate-200 dark:border-white/10 pr-3 text-xs font-semibold">
            <a href="https://findsalsa.com" target="_blank" rel="noopener noreferrer" className="rounded px-2 py-1 text-rose-500 dark:text-rose-400 transition hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/20">
              FINDSALSA
            </a>
            <span className="text-slate-300 dark:text-zinc-600">·</span>
            <a href="https://findbachata.com" target="_blank" rel="noopener noreferrer" className="rounded px-2 py-1 text-purple-500 dark:text-purple-400 transition hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/20">
              FINDBACHATA
            </a>
          </div>

          <ThemeToggle />

          <Link href="/add-event" className="btn-gold-primary text-xs sm:text-sm">
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Add Event
          </Link>
        </div>

      </div>
    </header>
  );
}
