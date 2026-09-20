'use client';

import { useEffect, useRef } from 'react';
import {
  canHoverFinePointer,
  gsap,
  prefersReducedMotion,
  registerGsap,
} from '@/lib/motion/gsap';

/** Home-only custom cursor (dot + follower). Fine pointer only. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !canHoverFinePointer()) return;

    registerGsap();
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('home-custom-cursor');

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' });

    const onMove = (event: MouseEvent) => {
      xDot(event.clientX);
      yDot(event.clientY);
      xRing(event.clientX);
      yRing(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [data-magnetic], [data-cursor-grow]'
      );
      gsap.to(ring, {
        scale: interactive ? 1.8 : 1,
        opacity: interactive ? 0.45 : 0.7,
        duration: 0.25,
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    return () => {
      document.documentElement.classList.remove('home-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
    >
      <div
        ref={ringRef}
        className="home-cursor-ring absolute top-0 left-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-500/50"
      />
      <div
        ref={dotRef}
        className="home-cursor-dot absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500"
      />
    </div>
  );
}
