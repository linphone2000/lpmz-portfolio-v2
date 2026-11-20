'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useSiteMotion } from '@/hooks/useSiteMotion';
import { gsap, registerGsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap';

export default function ProfileMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playedIntro = useRef(false);
  const motionEnabled = useSiteMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const chapters = Array.from(
      root.querySelectorAll<HTMLElement>('[data-profile-chapter]')
    );
    const links = root.querySelectorAll<HTMLAnchorElement>(
      '[data-profile-link]'
    );
    let observer: IntersectionObserver | undefined;
    let current: HTMLElement | undefined;

    function watchChapters() {
      observer?.disconnect();
      const line = Math.max(115, Math.round(window.innerHeight * 0.31));
      const bottom = Math.max(0, window.innerHeight - line - 1);

      function selectChapter() {
        const chapter = chapters.findLast(
          (item) => item.getBoundingClientRect().top <= line + 1
        );
        if (chapter === current) return;
        current = chapter;
        links.forEach((link) => {
          if (chapter && link.hash === `#${chapter.id}`) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      }

      observer = new IntersectionObserver(selectChapter, {
        rootMargin: `-${line}px 0px -${bottom}px 0px`,
      });
      chapters.forEach((chapter) => observer?.observe(chapter));
      selectChapter();
    }

    watchChapters();
    window.addEventListener('resize', watchChapters);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', watchChapters);
      links.forEach((link) => link.removeAttribute('aria-current'));
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !motionEnabled) return;

      registerGsap();
      const hero = root.querySelector<HTMLElement>('[data-profile-hero]');
      const scene = root.querySelector<HTMLElement>('[data-profile-scene]');
      const lens = root.querySelector<HTMLElement>('[data-profile-lens]');
      const depth = root.querySelector<HTMLElement>('[data-profile-depth]');
      const timeline = root.querySelector<HTMLElement>(
        '[data-profile-timeline]'
      );
      const progress = root.querySelector<HTMLElement>(
        '[data-profile-progress]'
      );
      const roles = root.querySelectorAll<HTMLElement>('[data-profile-role]');

      if (
        !playedIntro.current &&
        !window.location.hash &&
        window.scrollY < 60
      ) {
        const entry = gsap.timeline({ defaults: { ease: 'power3.out' } });
        entry
          .from('[data-profile-name]', {
            yPercent: 72,
            opacity: 0.66,
            duration: 0.92,
            stagger: 0.09,
          })
          .from(
            '[data-profile-opening]',
            { y: 17, opacity: 0.7, duration: 0.68, stagger: 0.08 },
            0.16
          );
        if (scene) {
          entry.from(
            scene,
            { x: 18, scale: 1.035, opacity: 0.62, duration: 1.22 },
            0.05
          );
        }
        playedIntro.current = true;
      }

      if (timeline && progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 73%',
              end: 'bottom 57%',
              scrub: true,
            },
          }
        );
      }

      roles.forEach((role) => {
        ScrollTrigger.create({
          trigger: role,
          start: 'top 73%',
          onEnter: () => role.setAttribute('data-profile-passed', ''),
          onLeaveBack: () => role.removeAttribute('data-profile-passed'),
        });
      });

      const media = gsap.matchMedia();
      media.add(
        { always: 'all', wide: '(min-width: 881px)', fine: '(pointer: fine)' },
        ({ conditions }) => {
          const wide = Boolean(conditions?.wide);

          if (hero && depth) {
            gsap.to(depth, {
              yPercent: wide ? 14 : 6,
              rotationX: wide ? 7 : 0,
              scale: wide ? 0.96 : 0.98,
              ease: 'none',
              scrollTrigger: {
                trigger: hero,
                start: 'top top+=72',
                end: 'bottom top+=72',
                scrub: 0.55,
              },
            });
          }

          const panels = root.querySelectorAll<HTMLElement>(
            '[data-profile-panel]'
          );
          panels.forEach((panel) => {
            gsap.from(panel, {
              y: wide ? 42 : 14,
              rotationX: wide ? 12 : 0,
              opacity: 0.78,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                start: 'top 96%',
                end: wide ? 'top 56%' : 'top 78%',
                scrub: wide ? 0.38 : true,
              },
            });
          });

          const headings = root.querySelectorAll<HTMLElement>(
            '[data-profile-heading]'
          );
          headings.forEach((heading) => {
            gsap.from(heading, {
              x: wide ? 34 : 10,
              opacity: 0.78,
              duration: 0.62,
              scrollTrigger: {
                trigger: heading,
                start: 'top 91%',
                once: true,
              },
            });
          });

          if (!hero || !lens || !wide || !conditions?.fine) return;

          const x = gsap.quickTo(lens, 'x', { duration: 0.68 });
          const y = gsap.quickTo(lens, 'y', { duration: 0.68 });

          function followPointer(event: PointerEvent) {
            if (event.pointerType !== 'mouse' || !hero) return;
            const bounds = hero.getBoundingClientRect();
            x(((event.clientX - bounds.left) / bounds.width - 0.5) * 36);
            y(((event.clientY - bounds.top) / bounds.height - 0.5) * 28);
          }

          function resetPointer() {
            x(0);
            y(0);
          }

          hero.addEventListener('pointermove', followPointer, {
            passive: true,
          });
          hero.addEventListener('pointerleave', resetPointer);

          return () => {
            hero.removeEventListener('pointermove', followPointer);
            hero.removeEventListener('pointerleave', resetPointer);
          };
        }
      );

      return () => {
        media.revert();
        roles.forEach((role) => role.removeAttribute('data-profile-passed'));
      };
    },
    {
      scope: rootRef,
      dependencies: [motionEnabled],
      revertOnUpdate: true,
    }
  );

  return <div ref={rootRef}>{children}</div>;
}
