'use client';

import { useEffect, useState } from 'react';
import { gsap, prefersReducedMotion, registerGsap } from '@/lib/motion/gsap';

/** Short home enter veil — content remains underneath if JS fails mid-flight. */
export default function HomeLoadOverlay() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDone(true);
      return;
    }

    registerGsap();
    const el = document.querySelector<HTMLElement>('[data-home-overlay]');
    if (!el) {
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });
    tl.to(el, {
      yPercent: -110,
      duration: 0.65,
      ease: 'power4.inOut',
      delay: 0.15,
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (done) return null;

  return (
    <div
      data-home-overlay
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] bg-neutral-950 dark:bg-neutral-100"
    />
  );
}
