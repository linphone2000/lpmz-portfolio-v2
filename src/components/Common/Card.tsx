'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import { cx } from '@/lib/utils';

export const Card: React.FC<
  React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>
> = ({ className, style, children }) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cx(
        'rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/5 backdrop-blur p-5 shadow-lg',
        'text-neutral-900 dark:text-neutral-100',
        'transition-all duration-600 ease-out',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
