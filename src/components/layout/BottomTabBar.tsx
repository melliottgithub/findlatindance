'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Search, Users, BookOpen } from 'lucide-react';

export function BottomTabBar() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Home', href: '/', icon: Home, exact: true },
    { label: 'Festivals', href: '/festivals', icon: Calendar, exact: false },
    { label: 'Search', href: '/search', icon: Search, exact: true },
    { label: 'Artists', href: '/artists', icon: Users, exact: false },
    { label: 'Learn', href: '/learn', icon: BookOpen, exact: false },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition duration-150 ${
                isActive
                  ? 'text-amber-400 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5px] scale-110' : 'stroke-[1.75px]'} transition-transform`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
