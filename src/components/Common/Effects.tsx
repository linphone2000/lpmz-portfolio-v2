'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollProgress } from '@/hooks/useScrollProgress';

interface BlobsProps {
  activeTab?: string;
}

/** Soft ambient blobs — capped count, no scroll scrub, off on mobile/low-power. */
export const Blobs = ({ activeTab = 'home' }: BlobsProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [isLowPower, setIsLowPower] = useState(true);

  useEffect(() => {
    const check = () => {
      setIsLowPower(
        window.innerWidth < 768 || navigator.hardwareConcurrency <= 4
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const count =
    activeTab === 'home' ? 3 : activeTab === 'about' ? 2 : 3;

  const blobs = [
    {
      color: 'bg-cyan-300/25',
      size: 'h-72 w-72',
      position: '-top-24 -left-24',
      animation: 'animate-blob-1',
    },
    {
      color: 'bg-purple-400/20',
      size: 'h-64 w-64',
      position: '-bottom-20 -right-16',
      animation: 'animate-blob-2',
    },
    {
      color: 'bg-pink-400/15',
      size: 'h-56 w-56',
      position: 'top-1/3 right-1/5',
      animation: 'animate-blob-1',
    },
  ].slice(0, count);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} blur-3xl ${
            prefersReducedMotion || isLowPower ? '' : blob.animation
          }`}
        />
      ))}
    </div>
  );
};

export const ScrollProgress = () => {
  const prefersReducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress();

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};
