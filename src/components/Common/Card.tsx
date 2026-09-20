'use client';

import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react';
import { useInView } from '@/hooks/useInView';
import { cx } from '@/lib/utils';

export const Card = ({
  className,
  style,
  children,
  animateIn = true,
  ...rest
}: PropsWithChildren<
  {
    className?: string;
    style?: CSSProperties;
    /** When false, skip IntersectionObserver fade (parent GSAP owns motion). */
    animateIn?: boolean;
  } & HTMLAttributes<HTMLDivElement>
>) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={cx(
        'rounded-2xl border border-neutral-200 bg-white/80 text-neutral-900 shadow-lg backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/5 dark:text-neutral-100',
        'transition-all duration-600 ease-out',
        animateIn
          ? isInView
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'
          : 'translate-y-0 opacity-100',
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};
