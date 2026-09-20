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

/**
 * Home showcase motion: split titles, client-work chapter pins,
 * featured pin+mask. Skips entirely under reduced motion.
 */
export function useHomeMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    registerGsap();
    const reverts: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Split-word section titles + hero name
      const splitTargets = gsap.utils.toArray<HTMLElement>(
        '[data-split-title]',
        root
      );
      splitTargets.forEach((el) => {
        const split = splitWords(el, { chars: false });
        reverts.push(split.revert);
        gsap.set(split.words, { opacity: 0, y: 28 });
        gsap.to(split.words, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
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
          y: 36,
          rotateX: -40,
          transformOrigin: '50% 100%',
          duration: 0.7,
          stagger: 0.02,
          ease: 'power3.out',
          delay: 0.35,
        });
      }

      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MQ, () => {
        // Client Work: vertical chapter pins — media mask wipe + copy slide
        const chapters = gsap.utils.toArray<HTMLElement>(
          '[data-client-work-chapter]',
          root
        );

        chapters.forEach((chapter) => {
          const mask = chapter.querySelector<HTMLElement>(
            '[data-client-work-mask]'
          );
          const copyLayers = gsap.utils.toArray<HTMLElement>(
            '[data-client-work-copy]',
            chapter
          );

          if (mask) {
            gsap.set(mask, {
              opacity: 0,
            });
          }
          if (copyLayers.length > 0) {
            gsap.set(copyLayers, {
              opacity: 0,
            });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: 'top 18%',
              end: '+=85%',
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
            },
          });

          if (mask) {
            tl.to(
              mask,
              {
                opacity: 1,
                ease: 'none',
                duration: 1,
              },
              0
            );
          }
          if (copyLayers.length > 0) {
            tl.to(
              copyLayers,
              {
                opacity: 1,
                ease: 'none',
                duration: 1,
                stagger: 0.08,
              },
              0.1
            );
          }
        });

        // Featured pin + mask wipe + 3D un-tilt
        const featured = root.querySelector<HTMLElement>(
          '[data-featured-pin]'
        );
        const preview = root.querySelector<HTMLElement>('[data-preview-card]');
        const previewMask = root.querySelector<HTMLElement>(
          '[data-preview-mask]'
        );

        if (featured && preview) {
          gsap.set(preview, {
            rotateX: 12,
            scale: 0.92,
            transformPerspective: 1000,
          });
          if (previewMask) {
            gsap.set(previewMask, { clipPath: 'inset(100% 0 0 0)' });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: featured,
              start: 'top top',
              end: '+=120%',
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
            },
          });

          tl.to(
            preview,
            { rotateX: 0, scale: 1, ease: 'none', duration: 1 },
            0
          );
          if (previewMask) {
            tl.to(
              previewMask,
              { clipPath: 'inset(0% 0 0 0)', ease: 'none', duration: 1 },
              0
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
