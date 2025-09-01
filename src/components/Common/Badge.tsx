'use client';

import React from 'react';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

export const Badge: React.FC<
  React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>
> = ({ className, style, children }) => (
  <span
    className={cx(
      'inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1 text-xs font-medium',
      'bg-gradient-to-b from-white/70 to-white/40 dark:from-neutral-800/10 dark:to-neutral-800/5',
      'text-neutral-600 dark:text-neutral-300',
      'transition-transform duration-200 hover:scale-105',
      className
    )}
    style={style}
  >
    {children}
  </span>
);
