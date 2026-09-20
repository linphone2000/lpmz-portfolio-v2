'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { cx } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** animations.md #28 — show after ~600px */
export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      data-magnetic
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reducedMotion ? 'auto' : 'smooth',
        })
      }
      className={cx(
        'fixed bottom-5 left-5 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200/70 bg-white/70 text-neutral-600 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-white/90 hover:text-neutral-900 hover:shadow-md active:scale-95 dark:border-neutral-700/70 dark:bg-neutral-900/70 dark:text-neutral-400 dark:hover:bg-neutral-900/90 dark:hover:text-neutral-200',
        visible
          ? 'pointer-events-auto opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-2'
      )}
      aria-label="Back to top"
      aria-hidden={!visible}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
};
