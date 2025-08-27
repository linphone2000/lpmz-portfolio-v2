'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ScrollToTop: React.FC = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 rounded-full bg-black text-white dark:bg-white dark:text-black w-11 h-11 grid place-items-center shadow-lg transition-all duration-200"
      aria-label="Back to top"
    >
      ↑
    </motion.button>
  );
};
