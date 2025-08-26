'use client';

import React from 'react';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

export const Section: React.FC<
  React.PropsWithChildren<{ title: string; className?: string }>
> = ({ title, className, children }) => (
  <section className={cx('py-16', className)}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-end justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-black/20 via-transparent to-transparent dark:from-white/20" />
      </div>
      {children}
    </div>
  </section>
);
