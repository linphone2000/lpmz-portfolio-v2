'use client';

import React from 'react';

export const ScrollToTop: React.FC = () => {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 rounded-full bg-black text-white dark:bg-white dark:text-black w-11 h-11 grid place-items-center shadow-lg transition-all duration-200 hover:scale-110"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};
