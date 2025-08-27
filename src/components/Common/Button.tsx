'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { cx } from '../../lib/utils';

export const Button: React.FC<
  React.PropsWithChildren<{
    href?: string;
    onClick?: () => void;
    variant?: 'solid' | 'ghost';
    className?: string;
  }>
> = ({ href, onClick, children, variant = 'solid', className }) => {
  const base = cx(
    'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition',
    variant === 'solid' &&
      'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-400 dark:text-primary-950 dark:hover:bg-primary-300',
    variant === 'ghost' &&
      'text-neutral-600 dark:text-neutral-300 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800',
    className
  );
  if (href)
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        className={base}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </motion.a>
    );
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={base}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
