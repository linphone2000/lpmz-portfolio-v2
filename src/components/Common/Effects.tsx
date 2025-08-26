'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';

// Animated background blobs
export const Blobs: React.FC = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <motion.div
      className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
      animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"
      animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
    />
  </div>
);

// Scroll progress bar
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="origin-left fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 z-50"
    />
  );
};
