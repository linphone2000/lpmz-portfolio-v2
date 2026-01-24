'use client';

import React from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { cx } from '@/lib/utils';

export const ScrollToTop: React.FC = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cx(
        'fixed bottom-5 left-5 z-30',
        'w-10 h-10 rounded-full',
        'bg-white/70 dark:bg-neutral-900/70',
        'backdrop-blur-md',
        'border border-neutral-200/70 dark:border-neutral-700/70',
        'text-neutral-600 dark:text-neutral-400',
        'hover:text-neutral-900 dark:hover:text-neutral-200',
        'hover:bg-white/90 dark:hover:bg-neutral-900/90',
        'shadow-sm hover:shadow-md',
        'transition-all duration-200',
        'flex items-center justify-center',
        'hover:scale-110 active:scale-95',
        'cursor-pointer'
      )}
      aria-label="Back to top"
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
};
