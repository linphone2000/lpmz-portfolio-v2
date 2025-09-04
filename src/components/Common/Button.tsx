'use client';

import React, { useCallback } from 'react';
import { cx } from '../../lib/utils';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'ghost';
  className?: string;
  download?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = React.memo(
  ({ href, onClick, children, variant = 'solid', className, download }) => {
    const base = cx(
      'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ease-out',
      'transform hover:scale-105 active:scale-95',
      variant === 'solid' &&
        'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400 dark:text-primary-950 dark:hover:bg-primary-300',
      variant === 'ghost' &&
        'text-neutral-600 dark:text-neutral-300 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800',
      className
    );

    const handleClick = useCallback(() => {
      onClick?.();
    }, [onClick]);

    if (href) {
      return (
        <a
          className={base}
          href={href}
          target={download ? undefined : '_blank'}
          rel={download ? undefined : 'noreferrer noopener'}
          download={download}
        >
          {children}
        </a>
      );
    }

    return (
      <button className={base} onClick={handleClick}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
