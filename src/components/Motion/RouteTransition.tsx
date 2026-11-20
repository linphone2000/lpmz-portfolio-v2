'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSiteMotion } from '@/hooks/useSiteMotion';

export default function RouteTransition() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [transition, setTransition] = useState(0);
  const active = useSiteMotion();

  useEffect(() => {
    document.documentElement.dataset.siteMotion = active ? 'on' : 'off';
  }, [active]);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (active) setTransition((current) => current + 1);
  }, [pathname, active]);

  return (
    <>
      <div className="site-scroll-meter" aria-hidden="true" />
      {active && transition > 0 && (
        <div
          className="site-route-transition"
          key={transition}
          aria-hidden="true"
        />
      )}
    </>
  );
}
