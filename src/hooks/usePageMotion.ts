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
 * Portfolio motion from documents/animations.md (items 1–29).
 * Skips optional extras 30–42 (Lenis, pin, custom cursor, etc.).
 */
export function usePageMotion(
  rootRef: RefObject<HTMLElement | null>,
  scopeKey?: string
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    registerGsap();
    const cleanups: Array<() => void> = [];
    const homeShowcase = Boolean(root.querySelector('[data-home-showcase]'));

    if (prefersReducedMotion()) {
      root
        .querySelectorAll<HTMLElement>(
          '.reveal, [data-hero-stage], [data-section-title], [data-agenda-row], [data-chip], [data-tile], [data-table-row], [data-carousel-enter], [data-preview-card], [data-hero-parallax], [data-preview-head], [data-client-work-media], [data-client-work-copy]'
        )
        .forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Hero staggered entrance
      const heroStages = gsap.utils.toArray<HTMLElement>(
        '[data-hero-stage]',
        root
      );
      if (heroStages.length > 0) {
        gsap.set(heroStages, { opacity: 0, y: 24 });
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .to(heroStages, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
          });
      }

      // 2. Hero metrics board parallax (single light scrub)
      const heroParallax = root.querySelector<HTMLElement>(
        '[data-hero-parallax]'
      );
      if (heroParallax) {
        gsap.to(heroParallax, {
          y: -36,
          ease: 'none',
          scrollTrigger: {
            trigger: heroParallax,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }

      // 3. Section h2 titles (skip split-owned home titles)
      const titles = gsap.utils.toArray<HTMLElement>(
        '[data-section-title]:not([data-split-title])',
        root
      );
      titles.forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          y: 22,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            once: true,
          },
        });
      });

      // 4. Batch reveals
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

      // 5. Agenda / experience rows
      const agenda = gsap.utils.toArray<HTMLElement>('[data-agenda-row]', root);
      if (agenda.length > 0) {
        gsap.set(agenda, { opacity: 0, x: -18 });
        ScrollTrigger.batch(agenda, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              duration: 0.65,
              stagger: 0.07,
              ease: 'power3.out',
              overwrite: true,
            });
          },
        });
      }

      // 5b. Client work scrub parallax — skipped on home (pin/horizontal owns it)
      if (!homeShowcase) {
        const clientWorks = gsap.utils.toArray<HTMLElement>(
          '[data-client-work]',
          root
        );
        clientWorks.forEach((entry) => {
          const isLeft = entry.dataset.clientWork === 'left';
          const media = entry.querySelector<HTMLElement>(
            '[data-client-work-media]'
          );
          const copyLayers = gsap.utils.toArray<HTMLElement>(
            '[data-client-work-copy]',
            entry
          );

          if (media) {
            gsap.fromTo(
              media,
              { y: isLeft ? 40 : 28 },
              {
                y: isLeft ? -48 : -36,
                ease: 'none',
                scrollTrigger: {
                  trigger: entry,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.7,
                },
              }
            );
          }

          copyLayers.forEach((layer) => {
            gsap.fromTo(
              layer,
              { y: isLeft ? -14 : 14 },
              {
                y: isLeft ? 22 : -22,
                ease: 'none',
                scrollTrigger: {
                  trigger: entry,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                },
              }
            );
          });
        });
      }

      // 6. Chips scale-in
      const chips = gsap.utils.toArray<HTMLElement>('[data-chip]', root);
      if (chips.length > 0) {
        gsap.set(chips, { opacity: 0, scale: 0.55 });
        ScrollTrigger.batch(chips, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.04,
              ease: 'back.out(1.6)',
              overwrite: true,
            });
          },
        });
      }

      // 7–8. Preview un-tilt + head parallax — skipped on home (pin/mask owns it)
      if (!homeShowcase) {
        const preview = root.querySelector<HTMLElement>('[data-preview-card]');
        if (preview) {
          gsap.fromTo(
            preview,
            { rotateX: 8, scale: 0.96, transformPerspective: 900 },
            {
              rotateX: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: preview,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 0.5,
              },
            }
          );
        }
        const previewHead = root.querySelector<HTMLElement>(
          '[data-preview-head]'
        );
        if (previewHead) {
          gsap.to(previewHead, {
            y: -24,
            ease: 'none',
            scrollTrigger: {
              trigger: previewHead,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
        }
      }

      // 9. Tiles pop-in
      const tiles = gsap.utils.toArray<HTMLElement>('[data-tile]', root);
      if (tiles.length > 0) {
        gsap.set(tiles, { opacity: 0, scale: 0.92 });
        ScrollTrigger.batch(tiles, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.06,
              ease: 'back.out(1.4)',
              overwrite: true,
            });
          },
        });
      }

      // 10. Table / list rows
      const rows = gsap.utils.toArray<HTMLElement>('[data-table-row]', root);
      if (rows.length > 0) {
        gsap.set(rows, { opacity: 0, x: 16 });
        ScrollTrigger.batch(rows, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              duration: 0.55,
              stagger: 0.05,
              ease: 'power3.out',
              overwrite: true,
            });
          },
        });
      }

      // 11. Carousel / skills block enter
      const carousels = gsap.utils.toArray<HTMLElement>(
        '[data-carousel-enter]',
        root
      );
      carousels.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });

      if (!canHoverFinePointer()) return;

      // 12. Magnetic
      root.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3' });
        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.28);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.28);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });

      // 13. Card tilt
      root.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        gsap.set(el, { transformPerspective: 800 });
        const rotX = gsap.quickTo(el, 'rotationX', {
          duration: 0.35,
          ease: 'power3',
        });
        const rotY = gsap.quickTo(el, 'rotationY', {
          duration: 0.35,
          ease: 'power3',
        });
        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          rotY(px * 8);
          rotX(-py * 8);
        };
        const onLeave = () => {
          rotX(0);
          rotY(0);
        };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [rootRef, scopeKey]);
}
