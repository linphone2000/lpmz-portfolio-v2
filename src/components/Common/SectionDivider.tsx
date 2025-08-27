'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent"
        />
      </div>
    </div>
  );
};
