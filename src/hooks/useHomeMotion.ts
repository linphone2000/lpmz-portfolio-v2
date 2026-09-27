'use client';

import { useEffect, type RefObject } from 'react';
import {
  gsap,
  prefersReducedMotion,
  registerGsap,
  ScrollTrigger,
} from '@/lib/motion/gsap';
import { splitWords } from '@/lib/motion/splitText';

const DESKTOP_MQ = '(min-width: 1024px)';

function revealOffset(el: HTMLElement): { x: number; y: number } {
  const dir = el.dataset.reveal;
  if (dir === 'from-left') return { x: -96, y: 18 };
  if (dir === 'from-right') return { x: 96, y: 18 };
  if (dir === 'from-bottom') return { x: 0, y: 72 };
  return { x: 0, y: 40 };
}

/**
 * Home showcase motion — Lando-style cinematic reveals:
 * side entrances, scrubbed chapter pins, featured wipe.
 * Skips entirely under reduced motion.
 */
export function useHomeMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    registerGsap();
    const reverts: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Split-word section titles
      const splitTargets = gsap.utils.toArray<HTMLElement>(
        '[data-split-title]',
        root
      );
      splitTargets.forEach((el) => {
        const split = splitWords(el, { chars: false });
        reverts.push(split.revert);
        gsap.set(split.words, { opacity: 0, y: 28, x: -12 });
        gsap.to(split.words, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.045,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true,
          },
        });
      });

      const heroName = root.querySelector<HTMLElement>('[data-hero-name]');
      if (heroName) {
        const split = splitWords(heroName, { chars: true });
        reverts.push(split.revert);
        gsap.from(split.chars, {
          opacity: 0,
          y: 42,
          x: -8,
          rotateX: -48,
          transformOrigin: '50% 100%',
          duration: 0.75,
          stagger: 0.018,
          ease: 'power3.out',
          delay: 0.28,
        });
      }

      // Generic side / fade reveals (once) — works on mobile + desktop
      const revealEls = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
      revealEls.forEach((el) => {
        // Chapter pins own their nested reveal motion on desktop
        if (el.closest('[data-client-work-chapter], [data-featured-pin]')) {
          return;
        }
        const { x, y } = revealOffset(el);
        gsap.set(el, { opacity: 0, x, y, force3D: true });
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });

      // Proof rail: staggered side entrances as a horizontal feel
      const proofTiles = gsap.utils.toArray<HTMLElement>(
        '[data-proof-tile]',
        root
      );
      if (proofTiles.length > 0) {
        gsap.set(proofTiles, { opacity: 0, y: 48 });
        gsap.to(proofTiles, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.85,
          stagger: {
            each: 0.12,
            from: 'start',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.querySelector('[data-proof-rail]') ?? proofTiles[0],
            start: 'top 80%',
            once: true,
          },
        });
        proofTiles.forEach((tile, i) => {
          const fromLeft = i % 2 === 0;
          gsap.fromTo(
            tile,
            { x: fromLeft ? -64 : 64 },
            {
              x: 0,
              duration: 0.85,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: root.querySelector('[data-proof-rail]') ?? tile,
                start: 'top 80%',
                once: true,
              },
            }
          );
        });
      }

      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MQ, () => {
        // Client Work chapters: pin + media/copy enter from opposite sides
        const chapters = gsap.utils.toArray<HTMLElement>(
          '[data-client-work-chapter]',
          root
        );

        chapters.forEach((chapter) => {
          const isLeft = chapter.dataset.clientWork === 'left';
          const mask = chapter.querySelector<HTMLElement>(
            '[data-client-work-mask]'
          );
          const media = chapter.querySelector<HTMLElement>(
            '[data-client-work-media]'
          );
          const copyLayers = gsap.utils.toArray<HTMLElement>(
            '[data-client-work-copy]',
            chapter
          );

          const mediaFromX = isLeft ? 120 : -120;
          const copyFromX = isLeft ? -100 : 100;

          if (mask) gsap.set(mask, { opacity: 0, scale: 0.94 });
          if (media) gsap.set(media, { opacity: 0, x: mediaFromX });
          if (copyLayers.length > 0) {
            gsap.set(copyLayers, { opacity: 0, x: copyFromX, y: 24 });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: 'top 16%',
              end: '+=110%',
              pin: true,
              scrub: 0.65,
              anticipatePin: 1,
            },
          });

          if (media) {
            tl.to(media, { opacity: 1, x: 0, ease: 'none', duration: 1 }, 0);
          }
          if (mask) {
            tl.to(mask, { opacity: 1, scale: 1, ease: 'none', duration: 1 }, 0);
          }
          if (copyLayers.length > 0) {
            tl.to(
              copyLayers,
              {
                opacity: 1,
                x: 0,
                y: 0,
                ease: 'none',
                duration: 1,
                stagger: 0.1,
              },
              0.12
            );
          }
        });

        // Featured: copy from left, media from right + pin wipe
        const featured = root.querySelector<HTMLElement>('[data-featured-pin]');
        const preview = root.querySelector<HTMLElement>('[data-preview-card]');
        const previewHead = root.querySelector<HTMLElement>(
          '[data-preview-head]'
        );
        const previewMask = root.querySelector<HTMLElement>(
          '[data-preview-mask]'
        );

        if (featured && preview) {
          gsap.set(preview, {
            rotateX: 14,
            rotateY: -8,
            x: 80,
            opacity: 0.35,
            scale: 0.9,
            transformPerspective: 1200,
          });
          if (previewHead) {
            gsap.set(previewHead, { opacity: 0, x: -72, y: 20 });
          }
          if (previewMask) {
            gsap.set(previewMask, { clipPath: 'inset(0 100% 0 0)' });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: featured,
              start: 'top top',
              end: '+=140%',
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
            },
          });

          if (previewHead) {
            tl.to(
              previewHead,
              { opacity: 1, x: 0, y: 0, ease: 'none', duration: 1 },
              0
            );
          }
          tl.to(
            preview,
            {
              rotateX: 0,
              rotateY: 0,
              x: 0,
              opacity: 1,
              scale: 1,
              ease: 'none',
              duration: 1,
            },
            0
          );
          if (previewMask) {
            tl.to(
              previewMask,
              { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 1 },
              0.05
            );
          }
        }

        // Contact SVG draw-on
        const paths = gsap.utils.toArray<SVGPathElement>(
          '[data-draw-path]',
          root
        );
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: path.closest('section') ?? path,
              start: 'top 75%',
              once: true,
            },
          });
        });
      });

      // Mobile / tablet: lighter once-reveals for chapters (no pin)
      mm.add('(max-width: 1023px)', () => {
        const chapterBits = gsap.utils.toArray<HTMLElement>(
          '[data-client-work-copy], [data-client-work-media], [data-preview-head], [data-preview-card]',
          root
        );
        chapterBits.forEach((el, i) => {
          const fromLeft = i % 2 === 0;
          gsap.set(el, {
            opacity: 0,
            x: fromLeft ? -48 : 48,
            y: 24,
          });
          gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          });
        });
      });

      reverts.push(() => mm.revert());
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      reverts.forEach((fn) => fn());
      ctx.revert();
    };
  }, [rootRef]);
}
