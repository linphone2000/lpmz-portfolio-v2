'use client';

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface BlobsProps {
  activeTab?: string;
}

// Global animated background blobs
export const Blobs: React.FC<BlobsProps> = React.memo(({ activeTab = 'overview' }) => {
  const prefersReducedMotion = useReducedMotion();

  // Determine which blobs to show based on active tab
  const getVisibleBlobs = () => {
    switch (activeTab) {
      case 'overview':
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // All 14 blobs
      case 'portfolio':
        return [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 9 blobs
      case 'education':
        return [0, 1, 2, 3, 4, 5]; // 6 blobs
      default:
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Default to all
    }
  };

  const visibleBlobs = getVisibleBlobs();

  // All blob configurations - 3 colors: cyan, purple, pink
  // Positioned so they move INTO the screen when scrolling
  const allBlobs = [
    { color: 'bg-cyan-300/30', size: 'h-80 w-80', position: '-top-24 -right-24', animation: 'animate-blob-1', delayClass: 'blob-delay-0' }, // moves right into view
    { color: 'bg-purple-400/25', size: 'h-96 w-96', position: '-bottom-24 left-0', animation: 'animate-blob-2', delayClass: 'blob-delay-0' }, // moves left into view
    { color: 'bg-pink-400/25', size: 'h-64 w-64', position: 'top-1/4 -left-32', animation: 'animate-blob-1', delayClass: 'blob-delay-1' }, // moves right into view
    { color: 'bg-cyan-300/25', size: 'h-72 w-72', position: 'bottom-1/4 -right-32', animation: 'animate-blob-2', delayClass: 'blob-delay-2' }, // moves left into view
    { color: 'bg-purple-400/20', size: 'h-56 w-56', position: 'top-1/2 -left-28', animation: 'animate-blob-1', delayClass: 'blob-delay-3' }, // moves right into view
    { color: 'bg-pink-400/20', size: 'h-60 w-60', position: 'bottom-1/2 -right-30', animation: 'animate-blob-2', delayClass: 'blob-delay-4' }, // moves left into view
    { color: 'bg-cyan-300/20', size: 'h-48 w-48', position: 'top-1/3 -left-24', animation: 'animate-blob-1', delayClass: 'blob-delay-5' }, // moves right into view
    { color: 'bg-purple-400/20', size: 'h-52 w-52', position: 'bottom-1/3 -right-26', animation: 'animate-blob-2', delayClass: 'blob-delay-6' }, // moves left into view
    { color: 'bg-pink-400/20', size: 'h-44 w-44', position: 'top-3/4 -left-22', animation: 'animate-blob-1', delayClass: 'blob-delay-7' }, // moves right into view
    { color: 'bg-cyan-300/20', size: 'h-68 w-68', position: 'bottom-1/6 -right-34', animation: 'animate-blob-2', delayClass: 'blob-delay-8' }, // moves left into view
    // 4 new blobs for more dynamic scroll effects
    { color: 'bg-purple-400/15', size: 'h-36 w-36', position: 'top-1/6 -left-18', animation: 'animate-blob-1', delayClass: 'blob-delay-9' }, // moves right into view
    { color: 'bg-cyan-300/15', size: 'h-88 w-88', position: 'bottom-3/4 -right-44', animation: 'animate-blob-2', delayClass: 'blob-delay-10' }, // moves left into view
    { color: 'bg-pink-400/15', size: 'h-32 w-32', position: 'top-2/3 -left-16', animation: 'animate-blob-1', delayClass: 'blob-delay-11' }, // moves right into view
    { color: 'bg-purple-400/15', size: 'h-76 w-76', position: 'bottom-1/8 -right-38', animation: 'animate-blob-2', delayClass: 'blob-delay-12' }, // moves left into view
  ];

  // Desktop detection (pointer: fine) + min-width guard
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Scroll progress for desktop-driven transforms
  // Cache viewport dimensions to avoid reading window on every scroll
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Slightly lower update rate (still smooth), halves work vs 60fps
  const scrollProgress = useScrollProgress({ throttleMs: 32 });

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {visibleBlobs.map((index) => {
          const blob = allBlobs[index];
          return (
            <div
              key={index}
              className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} blur-3xl`}
            />
          );
        })}
      </div>
    );
  }

  // Desktop: scroll-coupled transforms; Mobile: static (no animation)
  if (isDesktop) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {visibleBlobs.map((index) => {
          const blob = allBlobs[index];
          const intensity = viewport.width || window.innerWidth; // fallback just in case
          const dirX = index % 2 === 0 ? 1 : -1;
          const dirY = index % 3 === 0 ? -1 : 1;
          const translateX = dirX * scrollProgress * intensity;
          const translateY = dirY * scrollProgress * ((viewport.height || window.innerHeight) * 0.8);
          const scale = 1 + (index % 2 === 0 ? 0.5 : -0.3) * scrollProgress;

          return (
            <div
              key={index}
              className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} blur-3xl will-change-transform`}
              style={{ transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})` }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {visibleBlobs.map((index) => {
        const blob = allBlobs[index];
        return (
          <div
            key={index}
            className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} blur-3xl`}
          />
        );
      })}
    </div>
  );
});

Blobs.displayName = 'Blobs';

// Scroll progress bar
export const ScrollProgress: React.FC = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress();

  // Disable scroll progress animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="origin-left fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
      <div 
        className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-transform duration-100 ease-out scroll-progress-bar"
        style={{ 
          transform: `scaleX(${scrollProgress})`,
        }}
      />
    </div>
  );
});

ScrollProgress.displayName = 'ScrollProgress';
