'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

export const AnimatedSection: React.FC<
  React.PropsWithChildren<{ id: string; title: string; className?: string }>
> = ({ id, title, className, children }) => (
  <section id={id} className={cx('scroll-mt-24 py-16', className)}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-4"
    >
      <div className="flex items-end justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-neutral-200 via-transparent to-transparent dark:from-neutral-700" />
      </div>
      {children}
    </motion.div>
  </section>
);
