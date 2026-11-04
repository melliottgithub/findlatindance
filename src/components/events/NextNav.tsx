'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trackListNext, trackRecClick } from '@/lib/analytics';
import {
  listPosition,
  markVisited,
  readListNav,
  swipeDirection,
  type ListNavState,
  type ListPosition,
} from '@/lib/list-nav';

interface Active {
  state: ListNavState;
  pos: ListPosition;
}

const BUTTON =
  'inline-flex items-center gap-1 rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-all hover:border-amber-500/50 hover:bg-zinc-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none shadow-sm';

export function NextNav() {
  const pathname = usePathname() || '/';
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    const state = readListNav();
    const pos = listPosition(state, pathname);
    setActive(state && pos ? { state, pos } : null);
  }, [pathname]);

  return active ? <NextNavControls active={active} /> : null;
}

function NextNavControls({ active }: { active: Active }) {
  const router = useRouter();

  const go = useCallback(
    (direction: 'next' | 'prev', method: 'button' | 'swipe' | 'keyboard') => {
      const target = direction === 'next' ? active.pos.next : active.pos.prev;
      if (!target) return;
      const position = active.pos.index + (direction === 'next' ? 2 : 0);
      markVisited(active.state, target);
      trackListNext({ direction, method, position, total: active.pos.total, list_key: active.state.key });
      trackRecClick({ module: 'next_nav', position, list_key: active.state.key });
      router.replace(target);
    },
    [active, router],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'ArrowLeft' && active.pos.prev) {
        e.preventDefault();
        go('prev', 'keyboard');
      } else if (e.key === 'ArrowRight' && active.pos.next) {
        e.preventDefault();
        go('next', 'keyboard');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, go]);

  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  useEffect(() => {
    const skip = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('input, textarea, select, [data-no-swipe], .overflow-x-auto');
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch' || skip(e.target)) {
        start.current = null;
        return;
      }
      start.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    };
    const finish = (x: number, y: number) => {
      const s = start.current;
      start.current = null;
      if (!s) return;
      const dir = swipeDirection(s, { x, y, t: Date.now() }, window.innerWidth);
      if (dir) go(dir, 'swipe');
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === 'touch') finish(e.clientX, e.clientY);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t) finish(t.clientX, t.clientY);
    };
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [active, go]);

  const { pos, state } = active;

  return (
    <nav
      aria-label={`Browse ${state.label}`}
      className="flex items-center justify-between gap-3 py-2 px-1"
      data-testid="next-nav"
    >
      <button type="button" className={BUTTON} onClick={() => go('prev', 'button')} disabled={!pos.prev}>
        <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Prev</span>
      </button>
      <p className="min-w-0 truncate text-xs text-zinc-400" aria-live="polite">
        <span className="font-bold text-white">
          {pos.index + 1} of {pos.total}
        </span>
        {state.label && <span className="text-zinc-500"> · {state.label}</span>}
      </p>
      <button type="button" className={BUTTON} onClick={() => go('next', 'button')} disabled={!pos.next}>
        <span>Next</span>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </nav>
  );
}
