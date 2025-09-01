'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className = '',
}) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className={`w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={ref}
          className={`h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent transition-transform duration-800 ease-in-out origin-left ${
            isInView ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>
    </div>
  );
};
