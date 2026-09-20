'use client';

import Lenis from 'lenis';
import { gsap, registerGsap, ScrollTrigger } from '@/lib/motion/gsap';

export type HomeLenisHandle = {
  lenis: Lenis;
  destroy: () => void;
};

/** Creates Lenis + ScrollTrigger bridge. Caller must destroy on unmount. */
export function createHomeLenis(): HomeLenisHandle {
  registerGsap();

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    touchMultiplier: 1.4,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.refresh();
    },
  };
}
