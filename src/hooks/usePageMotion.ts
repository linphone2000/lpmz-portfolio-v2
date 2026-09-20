'use client';

import { useEffect, type RefObject } from 'react';
import {
  canHoverFinePointer,
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from '@/lib/motion/gsap';

/**
 * Lean page motion: batch scroll reveals (once) + optional magnetic CTAs.
 * No Lenis, no cursor follower, no continuous scrub/pin.
 */
export function usePageMotion(
  rootRef: RefObject<HTMLElement | null>,
  scopeKey?: string
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();

    if (prefersReducedMotion()) {
      root.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const magnetCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>('.reveal', root);
      if (reveals.length > 0) {
        gsap.set(reveals, { opacity: 0, y: 28 });
        ScrollTrigger.batch(reveals, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out',
              overwrite: true,
            });
          },
        });
      }

      if (!canHoverFinePointer()) return;

      root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3' });

        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.25);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.25);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        magnetCleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    }, root);

    return () => {
      magnetCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [rootRef, scopeKey]);
}
