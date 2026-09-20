'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PixelAssembleProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Desktop showcase surface for pixel-assemble scrub.
 * Mobile / reduced-motion: plain image. Canvas is driven by useHomeMotion.
 */
export default function PixelAssemble({
  src,
  alt,
  className,
}: PixelAssembleProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- canvas source / reduced-motion fallback
      <img
        src={src}
        alt={alt}
        className={`h-full w-full rounded-2xl object-cover ${className ?? ''}`}
      />
    );
  }

  return (
    <div
      data-pixel-assemble
      data-pixel-src={src}
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-950 ${className ?? ''}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- non-optimized source for canvas sampling */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover lg:opacity-0"
      />
      <canvas
        aria-hidden
        className="absolute inset-0 hidden h-full w-full lg:block"
      />
    </div>
  );
}
