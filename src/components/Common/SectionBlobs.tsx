'use client';

import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface SectionBlobsProps {
  variant?: 'hero' | 'projects' | 'skills' | 'education' | 'experience' | 'contact';
}

export const SectionBlobs: React.FC<SectionBlobsProps> = React.memo(({ variant = 'hero' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  const blobConfigs = {
    hero: [
      { color: 'bg-purple-400/15', size: 'h-48 w-48', animation: 'animate-blob-1', position: 'top-20 right-10' },
    ],
    projects: [
      { color: 'bg-green-400/15', size: 'h-44 w-44', animation: 'animate-blob-2', position: 'top-10 right-20' },
    ],
    skills: [
      { color: 'bg-orange-400/15', size: 'h-40 w-40', animation: 'animate-blob-1', position: 'top-15 right-15' },
    ],
    education: [
      { color: 'bg-indigo-400/15', size: 'h-52 w-52', animation: 'animate-blob-2', position: 'top-20 left-20' },
    ],
    experience: [
      { color: 'bg-rose-400/15', size: 'h-48 w-48', animation: 'animate-blob-1', position: 'top-10 left-10' },
    ],
    contact: [
      { color: 'bg-blue-400/10', size: 'h-40 w-40', animation: 'animate-blob-2', position: 'top-15 right-15' },
    ],
  };

  const blobs = blobConfigs[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute ${blob.position} ${blob.size} rounded-full ${blob.color} blur-2xl ${blob.animation}`}
          style={{
            animationDelay: `${index * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
});

SectionBlobs.displayName = 'SectionBlobs';
