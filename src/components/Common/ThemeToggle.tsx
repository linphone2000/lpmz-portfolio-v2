'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

interface ThemeToggleProps {
  dark: boolean;
  toggle: () => void;
  mounted: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  dark,
  toggle,
  mounted,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (!mounted) {
    return (
      <div className="h-4 w-8 rounded-full bg-neutral-200/80 dark:bg-neutral-800/60 animate-pulse" />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle theme"
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
      className={[
        'relative h-4 w-8 rounded-full transition-colors duration-300',
        'bg-white/70 dark:bg-neutral-900/70 backdrop-blur',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'focus-visible:ring-rose-400 dark:focus-visible:ring-amber-300',
        'focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
        'border border-neutral-200/70 dark:border-neutral-700/70',
        'overflow-hidden',
      ].join(' ')}
    >
      {/* Dark-mode ambient glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{ opacity: dark ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background:
            'linear-gradient(135deg, rgba(255,88,120,0.25), rgba(255,200,64,0.25))',
          filter: 'blur(3px)',
        }}
      />

      {/* Sparkles layer (Sun sparkles in light, stars in dark) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Sun sparkles (only in light) */}
        <motion.span
          initial={false}
          animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-[6px] top-1/2 -translate-y-1/2"
        >
          {/* Three tiny rays around the sun */}
          <motion.span
            className="absolute h-[6px] w-[1.5px] rounded-full bg-rose-400/70"
            style={{ left: 12, top: -9 }}
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute h-[6px] w-[1.5px] rounded-full bg-amber-400/70"
            style={{ left: 18, top: -1, rotate: 45 }}
            animate={{ opacity: [0.2, 0.9, 0.2], scaleY: [0.8, 1.15, 0.8] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute h-[6px] w-[1.5px] rounded-full bg-rose-400/70"
            style={{ left: 12, top: 7, rotate: -25 }}
            animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.85, 1.1, 0.85] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.span>

        {/* Moon stars (only in dark) */}
        <motion.span
          initial={false}
          animate={{ opacity: dark ? 1 : 0, scale: dark ? 1 : 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="absolute right-[14px] top-[3px] h-0.5 w-0.5 rounded-full bg-white/90"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute right-[6px] top-[6px] h-0.5 w-0.5 rounded-full bg-white/70"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute right-[10px] bottom-[4px] h-0.5 w-0.5 rounded-full bg-white/60"
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.85, 1, 0.85] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.span>
      </div>

      {/* Knob */}
      <motion.div
        className="absolute left-0.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white dark:bg-neutral-100 shadow-md will-change-transform"
        initial={false}
        animate={{
          x: dark ? 18 : 0, // exact travel for 32px track, 12px knob, 2px padding
          boxShadow: dark
            ? '0 3px 9px rgba(255,88,120,0.35)'
            : '0 3px 9px rgba(0,0,0,0.15)',
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 600, damping: 32 }
        }
      >
        {/* Icon holder */}
        <div className="flex h-full w-full items-center justify-center">
          <motion.div
            initial={false}
            animate={{ rotate: dark ? 0 : 180, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="leading-none"
          >
            {dark ? (
              <MoonIcon className="h-2.5 w-2.5 text-amber-300 drop-shadow-[0_0_3px_rgba(255,200,64,0.6)]" />
            ) : (
              <SunIcon className="h-2.5 w-2.5 text-rose-500 drop-shadow-[0_0_3px_rgba(255,88,120,0.6)]" />
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  );
};
