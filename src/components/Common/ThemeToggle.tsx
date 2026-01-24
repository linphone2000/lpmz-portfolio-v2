'use client';

import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    toggle();
  };

  if (!mounted) {
    return (
      <div className="h-5 w-10 rounded-full bg-neutral-200/80 dark:bg-neutral-800/60 animate-pulse" />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle theme"
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
      className={[
        'relative h-5 w-10 rounded-full transition-colors duration-300',
        'bg-white/70 dark:bg-neutral-900/70 backdrop-blur',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'focus-visible:ring-rose-400 dark:focus-visible:ring-amber-300',
        'focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900',
        'border border-neutral-200/70 dark:border-neutral-700/70',
        'overflow-hidden',
        'cursor-pointer',
      ].join(' ')}
    >
      {/* Glow background */}
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

      {/* Sparkles & stars - only on desktop */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0">
          {/* Sun sparkles */}
          <motion.span
            initial={false}
            animate={{ opacity: dark ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute left-[7px] top-1/2 -translate-y-1/2"
          >
            <span
              className="absolute h-[7px] w-[1.5px] rounded-full bg-rose-400/70"
              style={{ left: 14, top: -10 }}
            />
            <span
              className="absolute h-[7px] w-[1.5px] rounded-full bg-amber-400/70"
              style={{ left: 20, top: -1, transform: 'rotate(45deg)' }}
            />
          </motion.span>

          {/* Moon stars */}
          <motion.span
            initial={false}
            animate={{ opacity: dark ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="absolute right-[15px] top-[3px] h-0.5 w-0.5 rounded-full bg-white/90" />
            <span className="absolute right-[7px] top-[7px] h-0.5 w-0.5 rounded-full bg-white/70" />
          </motion.span>
        </div>
      )}

      {/* Knob */}
      <motion.div
        className="absolute left-0.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white dark:bg-neutral-100 shadow-md"
        initial={false}
        animate={{
          x: dark ? 22 : 0, // updated travel distance for larger size
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0.2 }
            : { type: 'spring', stiffness: 600, damping: 32 }
        }
      >
        <div className="flex h-full w-full items-center justify-center">
          {dark ? (
            <MoonIcon className="h-3 w-3 text-amber-300 drop-shadow-[0_0_3px_rgba(255,200,64,0.6)]" />
          ) : (
            <SunIcon className="h-3 w-3 text-rose-500 drop-shadow-[0_0_3px_rgba(255,88,120,0.6)]" />
          )}
        </div>
      </motion.div>
    </motion.button>
  );
};
