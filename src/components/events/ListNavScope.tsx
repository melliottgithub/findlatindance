'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { normalizePath, readListNav, saveListTap } from '@/lib/list-nav';

let returnedByHistory = false;
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    returnedByHistory = true;
  });
}

interface ListNavScopeProps {
  listKey: string;
  label: string;
  children: ReactNode;
  className?: string;
}

export function ListNavScope({ listKey, label, children, className }: ListNavScopeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '/';

  useEffect(() => {
    if (!returnedByHistory) return;
    returnedByHistory = false;
    const state = readListNav();
    if (!state || state.listPath !== normalizePath(pathname)) return;
    const last = state.visited[state.visited.length - 1];
    const restore = () => {
      const anchors = Array.from(ref.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []);
      const target = anchors.find((a) => normalizePath(a.getAttribute('href') || '') === last);
      if (target && target.getClientRects().length > 0) {
        target.scrollIntoView({ block: 'center' });
      } else {
        window.scrollTo(0, state.scrollY);
      }
    };
    const raf = window.requestAnimationFrame(restore);
    const timer = window.setTimeout(restore, 120);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const anchor = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!anchor || !ref.current) return;
    const tapped = anchor.getAttribute('href') || '';
    const hrefs = Array.from(ref.current.querySelectorAll<HTMLAnchorElement>('a[href]')).map(
      (a) => a.getAttribute('href') || '',
    );
    saveListTap({
      key: listKey,
      label,
      listPath: pathname,
      hrefs,
      tapped,
      scrollY: window.scrollY,
    });
  };

  return (
    <div ref={ref} onClick={onClick} className={className} data-list-nav={listKey}>
      {children}
    </div>
  );
}
