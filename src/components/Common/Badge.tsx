'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

export const Badge: React.FC<
  React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>
> = ({ className, style, children }) => (
  <motion.span
    whileHover={{ scale: 1.05 }}
    className={cx(
      'inline-flex items-center rounded-full border border-black/10 dark:border-white/20 px-3 py-1 text-xs font-medium',
      'bg-gradient-to-b from-white/70 to-white/40 dark:from-white/10 dark:to-white/5',
      className
    )}
    style={style}
  >
    {children}
  </motion.span>
);
