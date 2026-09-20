'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import CustomCursor from '@/components/Motion/CustomCursor';
import HomeLoadOverlay from '@/components/Motion/HomeLoadOverlay';
import { useHomeMotion } from '@/hooks/useHomeMotion';
import { createHomeLenis } from '@/lib/motion/lenis';
import { prefersReducedMotion } from '@/lib/motion/gsap';
import 'lenis/dist/lenis.css';

interface HomeMotionRootProps {
  children: ReactNode;
}

/**
 * Home-only showcase shell: Lenis, cursor, load overlay, home timelines.
 * Mount exclusively from `/` page.
 */
export default function HomeMotionRoot({ children }: HomeMotionRootProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useHomeMotion(rootRef);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const handle = createHomeLenis();
    return () => handle.destroy();
  }, []);

  return (
    <div ref={rootRef} data-home-showcase className="relative">
      <HomeLoadOverlay />
      <CustomCursor />
      {children}
    </div>
  );
}
