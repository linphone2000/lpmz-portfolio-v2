'use client';

import React, { useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

interface BlobsProps {
  activeTab?: string;
}

// Global animated background blobs
export const Blobs: React.FC<BlobsProps> = React.memo(({ activeTab = 'overview' }) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Performance optimization: disable animations on mobile/low-power devices
  const [isLowPower, setIsLowPower] = useState(false);
  
  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768;
      const isLowPowerDevice = navigator.hardwareConcurrency <= 4;
      setIsLowPower(isMobile || isLowPowerDevice);
    };
    
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  // Determine which blobs to show based on active tab
  const getVisibleBlobs = () => {
    switch (activeTab) {
      case 'overview':
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // All 10 blobs
      case 'portfolio':
        return [0, 1, 2, 3, 4, 5]; // 6 blobs
      case 'education':
        return [0, 1, 2, 3]; // 4 blobs
      default:
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // Default to all
    }
  };

  const visibleBlobs = getVisibleBlobs();

  // All blob configurations - 3 colors: cyan, purple, pink
  const allBlobs = [
    { color: 'bg-cyan-300/30', size: 'h-80 w-80', position: '-top-32 -left-32', animation: 'animate-blob-1', delayClass: 'blob-delay-0' },
    { color: 'bg-purple-400/25', size: 'h-80 w-80', position: '-bottom-16 -right-16', animation: 'animate-blob-2', delayClass: 'blob-delay-0' },
    { color: 'bg-pink-400/25', size: 'h-64 w-64', position: 'top-1/6 left-1/5', animation: 'animate-blob-1', delayClass: 'blob-delay-1' },
    { color: 'bg-cyan-300/25', size: 'h-68 w-68', position: 'bottom-2/8 right-1/6', animation: 'animate-blob-2', delayClass: 'blob-delay-2' },
    { color: 'bg-purple-400/20', size: 'h-56 w-56', position: 'top-2/5 left-1/8', animation: 'animate-blob-1', delayClass: 'blob-delay-3' },
    { color: 'bg-pink-400/20', size: 'h-60 w-60', position: 'bottom-2/5 right-1/8', animation: 'animate-blob-2', delayClass: 'blob-delay-4' },
    { color: 'bg-cyan-300/20', size: 'h-48 w-48', position: 'top-1/3 right-1/6', animation: 'animate-blob-1', delayClass: 'blob-delay-5' },
    { color: 'bg-purple-400/20', size: 'h-52 w-52', position: 'bottom-1/3 left-1/6', animation: 'animate-blob-2', delayClass: 'blob-delay-6' },
    { color: 'bg-pink-400/20', size: 'h-68 w-68', position: 'top-6/8 right-2/3', animation: 'animate-blob-1', delayClass: 'blob-delay-7' },
    { color: 'bg-cyan-300/20', size: 'h-40 w-40', position: 'top-7/8 left-1/3', animation: 'animate-blob-2', delayClass: 'blob-delay-8' },
  ];

  if (prefersReducedMotion || isLowPower) {
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
            className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} blur-3xl ${blob.animation} ${blob.delayClass}`}
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
