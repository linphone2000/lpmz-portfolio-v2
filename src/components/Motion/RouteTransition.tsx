'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSiteMotion } from '@/hooks/useSiteMotion';

export default function RouteTransition() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [transition, setTransition] = useState<string | null>(null);
  const active = useSiteMotion();

  useEffect(() => {
    document.documentElement.dataset.siteMotion = active ? 'on' : 'off';
  }, [active]);

  useEffect(() => {
    if (!active) {
      setTransition(null);
    } else if (previous.current !== pathname) {
      setTransition(pathname);
    }
    previous.current = pathname;
  }, [pathname, active]);

  return (
    <>
      <div className="site-scroll-meter" aria-hidden="true" />
      {active && transition && (
        <div
          className="site-route-transition"
          key={transition}
          aria-hidden="true"
          onAnimationEnd={(event) => {
            if (event.animationName === 'site-route-settle') {
              setTransition((current) =>
                current === transition ? null : current
              );
            }
          }}
        />
      )}
    </>
  );
}
