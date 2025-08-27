'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

export const Card: React.FC<
  React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>
> = ({ className, style, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={cx(
      'rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/5 backdrop-blur p-5 shadow-lg',
      'text-neutral-900 dark:text-neutral-100',
      className
    )}
    style={style}
  >
    {children}
  </motion.div>
);
