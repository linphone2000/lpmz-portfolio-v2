'use client';

import { useCallback, useRef } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/motion/gsap';

const PARTICLE_COUNT = 18;

/** One-shot particle burst for the primary home CTA. */
export function useCtaBurst() {
  const layerRef = useRef<HTMLSpanElement>(null);

  const burst = useCallback((origin?: HTMLElement | null) => {
    if (prefersReducedMotion()) return;
    const layer = layerRef.current;
    if (!layer) return;

    registerGsap();
    layer.innerHTML = '';

    const rect = origin?.getBoundingClientRect();
    const ox = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const oy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const particles: HTMLSpanElement[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const p = document.createElement('span');
      p.className =
        'pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-primary-400';
      p.style.left = `${ox}px`;
      p.style.top = `${oy}px`;
      layer.appendChild(p);
      particles.push(p);
    }

    gsap.to(particles, {
      x: () => gsap.utils.random(-90, 90),
      y: () => gsap.utils.random(-110, 40),
      opacity: 0,
      scale: () => gsap.utils.random(0.4, 1.4),
      duration: 0.7,
      stagger: 0.01,
      ease: 'power2.out',
      onComplete: () => {
        layer.innerHTML = '';
      },
    });
  }, []);

  const BurstLayer = (
    <span
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
    />
  );

  return { burst, BurstLayer };
}
