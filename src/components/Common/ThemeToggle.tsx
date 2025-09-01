'use client';

import React, { useCallback } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ThemeToggleProps {
  dark: boolean;
  toggle: () => void;
  mounted: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({
  dark,
  toggle,
  mounted,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = useCallback(() => {
    toggle();
  }, [toggle]);



  if (!mounted) {
    return (
      <div className="h-5 w-10 rounded-full bg-neutral-200/80 dark:bg-neutral-800/60 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle theme"
      className={[
        'relative h-5 w-10 rounded-full transition-all duration-300',
        'bg-white/80 dark:bg-neutral-900/80',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'focus-visible:ring-rose-400 dark:focus-visible:ring-amber-300',
        'focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
        'border border-neutral-200/70 dark:border-neutral-700/70',
        'overflow-hidden',
        // CSS animations for hover and tap
        'hover:scale-105 active:scale-95',
        prefersReducedMotion ? '' : 'transform-gpu',
      ].join(' ')}
    >
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          dark 
            ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-100' 
            : 'bg-gradient-to-r from-pink-400/20 to-orange-400/20 opacity-100'
        }`}
      />

      {/* Knob */}
      <div
        className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white dark:bg-gray-700 shadow-md transition-transform duration-300 ease-out ${
          dark ? 'translate-x-[22px]' : 'translate-x-[2px]'
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          {dark ? (
            <MoonIcon className="h-3 w-3 text-amber-300 drop-shadow-[0_0_3px_rgba(255,200,64,0.6)]" />
          ) : (
            <SunIcon className="h-3 w-3 text-rose-500 drop-shadow-[0_0_3px_rgba(255,88,120,0.6)]" />
          )}
        </div>
      </div>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
