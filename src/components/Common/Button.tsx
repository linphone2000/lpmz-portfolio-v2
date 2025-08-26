'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

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
      'bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',
    variant === 'ghost' &&
      'bg-transparent hover:bg-black/5 dark:hover:bg-white/10',
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
