'use client';

import React from 'react';
import Link from 'next/link';
import { DATA } from '../lib/data';
import { Button } from './Common/Button';
import { useDarkMode } from '../hooks/hooks';

// Utility function for conditional classes
const cx = (...cls: Array<string | undefined | false>) =>
  cls.filter(Boolean).join(' ');

// Navigation component
export const Navigation: React.FC<{ currentPage: string }> = ({
  currentPage,
}) => {
  const { dark, toggle } = useDarkMode();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Education', path: '/education' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-[#0B1220]/50 border-b border-black/5 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold tracking-tight text-lg">
          LPMZ<span className="text-sky-600">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className={cx(
                'px-3 py-2 rounded-lg text-sm font-medium transition',
                currentPage === page.path
                  ? 'bg-black/5 dark:bg-white/10'
                  : 'hover:bg-black/5 dark:hover:bg-white/10'
              )}
            >
              {page.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={toggle} aria-label="Toggle theme">
            {dark ? '☀️' : '🌙'}
          </Button>
          <Button href={`mailto:${DATA.email}`}>Contact</Button>
        </div>
      </div>
    </header>
  );
};
