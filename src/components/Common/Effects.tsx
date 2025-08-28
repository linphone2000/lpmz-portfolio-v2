'use client';

import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

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
    { color: 'bg-cyan-300/30', size: 'h-80 w-80', position: '-top-24 -left-24', animation: 'animate-blob-1', delay: '0s' },
    { color: 'bg-purple-400/25', size: 'h-96 w-96', position: '-bottom-24 -right-24', animation: 'animate-blob-2', delay: '0s' },
    { color: 'bg-pink-400/25', size: 'h-64 w-64', position: 'top-1/4 left-1/3', animation: 'animate-blob-1', delay: '1s' },
    { color: 'bg-cyan-300/25', size: 'h-72 w-72', position: 'bottom-1/4 right-1/3', animation: 'animate-blob-2', delay: '2s' },
    { color: 'bg-purple-400/20', size: 'h-56 w-56', position: 'top-1/2 left-1/4', animation: 'animate-blob-1', delay: '3s' },
    { color: 'bg-pink-400/20', size: 'h-60 w-60', position: 'bottom-1/2 right-1/4', animation: 'animate-blob-2', delay: '4s' },
    { color: 'bg-cyan-300/20', size: 'h-48 w-48', position: 'top-1/3 right-1/2', animation: 'animate-blob-1', delay: '5s' },
    { color: 'bg-purple-400/20', size: 'h-52 w-52', position: 'bottom-1/3 left-1/2', animation: 'animate-blob-2', delay: '6s' },
    { color: 'bg-pink-400/20', size: 'h-44 w-44', position: 'top-3/4 left-1/6', animation: 'animate-blob-1', delay: '7s' },
    { color: 'bg-cyan-300/20', size: 'h-68 w-68', position: 'bottom-1/6 right-1/6', animation: 'animate-blob-2', delay: '8s' },
  ];

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
            className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} blur-3xl ${blob.animation}`}
            style={{ animationDelay: blob.delay }}
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
        className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-transform duration-100 ease-out"
        style={{ 
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
});

ScrollProgress.displayName = 'ScrollProgress';
