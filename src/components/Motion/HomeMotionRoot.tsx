'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useHomeMotion } from '@/hooks/useHomeMotion';
import { useSiteMotion } from '@/hooks/useSiteMotion';
import { createHomeLenis } from '@/lib/motion/lenis';
import 'lenis/dist/lenis.css';

const Sculpture = dynamic(() => import('@/components/Home/Sculpture'), {
  ssr: false,
});

export default function HomeMotionRoot({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const enabled = useSiteMotion();
  useHomeMotion(root, enabled);

  useEffect(() => {
    if (!enabled) return;
    const desktop = window.matchMedia('(min-width: 960px) and (pointer: fine)');
    let handle: ReturnType<typeof createHomeLenis> | undefined;

    function sync() {
      handle?.destroy();
      handle = desktop.matches ? createHomeLenis() : undefined;
    }

    sync();
    desktop.addEventListener('change', sync);
    return () => {
      desktop.removeEventListener('change', sync);
      handle?.destroy();
    };
  }, [enabled]);

  return <div ref={root}>{children}</div>;
}

export function HomeArt() {
  const enabled = useSiteMotion();

  return (
    <div className="home-art" data-home-art>
      <div className="home-art-grid" aria-hidden="true" />
      <Image
        className="home-art-poster"
        src="/copper-knot.webp"
        alt=""
        width={1100}
        height={1100}
        sizes="(max-width: 680px) 92vw, (max-width: 1440px) 48vw, 675px"
        priority
      />
      {enabled && <Sculpture active={enabled} />}
    </div>
  );
}
