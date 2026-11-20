'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { gsap, registerGsap, ScrollTrigger } from '@/lib/motion/gsap';

const wideScreen = '(min-width: 960px) and (min-height: 700px)';

export function useHomeMotion(
  rootRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  const playedIntro = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !enabled) return;

    registerGsap();
    const media = gsap.matchMedia(root);
    let disposed = false;

    media.add({ wide: wideScreen, active: 'all' }, ({ conditions }) => {
      const hero = root.querySelector<HTMLElement>('[data-home-hero]');
      const intro = root.querySelector('[data-home-intro]');
      const art = root.querySelector('[data-home-art]');
      const reel = root.querySelector<HTMLElement>('[data-project-reel]');
      const track = root.querySelector<HTMLElement>('[data-project-track]');
      const viewport = root.querySelector<HTMLElement>('[data-project-window]');
      const progress = root.querySelector('[data-project-progress]');

      const shouldPlayIntro =
        !playedIntro.current && window.scrollY < 80 && !window.location.hash;
      playedIntro.current = true;

      if (shouldPlayIntro) {
        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .from('[data-name-line]', {
            yPercent: 108,
            rotate: 3,
            duration: 0.95,
            stagger: 0.11,
          })
          .from(
            '[data-intro-reveal]',
            { opacity: 0, y: 18, duration: 0.58, stagger: 0.085 },
            0.28
          );
      }

      if (hero && intro && art && conditions?.wide) {
        const flight = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top 64px',
            end: 'bottom 15%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        flight.to(intro, { yPercent: -21, opacity: 0.28 }, 0);
        flight.to(art, { yPercent: 25, scale: 1.12, opacity: 0.44 }, 0);
      }

      gsap.utils
        .toArray<HTMLElement>('[data-home-reveal]', root)
        .forEach((item) => {
          gsap.from(item, {
            y: 42,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 91%', once: true },
          });
        });

      if (!reel || !track || !viewport) return;

      const frames = Array.from(
        track.querySelectorAll<HTMLElement>('[data-project-frame]')
      );

      if (!conditions?.wide) {
        frames.forEach((frame) => {
          const plane = frame.querySelector('[data-project-plane]');
          if (!plane) return;
          gsap.fromTo(
            plane,
            { yPercent: -7, scale: 1.08 },
            {
              yPercent: 8,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
        return;
      }

      reel.dataset.reel = 'active';
      const jumpButtons = Array.from(
        reel.querySelectorAll<HTMLButtonElement>('[data-project-jump]')
      );
      const distance = () =>
        Math.max(0, track.scrollWidth - viewport.clientWidth);
      let reelDistance = distance();
      let frameOffsets = frames.map((frame) =>
        Math.min(frame.offsetLeft, reelDistance)
      );
      let currentProject = -1;
      const setProgress = progress
        ? gsap.quickSetter(progress, 'scaleX')
        : undefined;

      function markCurrentProject(value: number) {
        const position = value * reelDistance;
        let nearestIndex = 0;
        let nearestDistance = Infinity;
        frameOffsets.forEach((offset, index) => {
          const difference = Math.abs(offset - position);
          if (difference < nearestDistance) {
            nearestDistance = difference;
            nearestIndex = index;
          }
        });
        if (currentProject === nearestIndex) return;
        jumpButtons[currentProject]?.removeAttribute('aria-current');
        jumpButtons[nearestIndex]?.setAttribute('aria-current', 'true');
        currentProject = nearestIndex;
      }

      const traverse = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: reel,
          start: 'top 96px',
          end: () => '+=' + distance(),
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: ({ progress: value }) => {
            reelDistance = distance();
            frameOffsets = frames.map((frame) =>
              Math.min(frame.offsetLeft, reelDistance)
            );
            setProgress?.(value);
            markCurrentProject(value);
          },
          onUpdate: ({ progress: value }) => {
            setProgress?.(value);
            markCurrentProject(value);
          },
        },
      });

      frames.forEach((frame) => {
        const plane = frame.querySelector('[data-project-plane]');
        if (!plane) return;
        gsap.fromTo(
          plane,
          { rotateY: -17, xPercent: 8, scale: 1.15 },
          {
            rotateY: 15,
            xPercent: -8,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              containerAnimation: traverse,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      function scrollToFrame(frame: HTMLElement, smooth = false) {
        const trigger = traverse.scrollTrigger;
        const offset = frameOffsets[frames.indexOf(frame)];
        if (!trigger || offset === undefined) return;
        const top = trigger.start + offset;
        if (smooth) {
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
        trigger.scroll(top);
        ScrollTrigger.update();
      }

      // Bring the focused link into the clipped rail when tabbing between cards.
      function showFocusedProject(event: FocusEvent) {
        if (!(event.target instanceof HTMLElement) || !viewport) return;
        const frame = event.target.closest<HTMLElement>('[data-project-frame]');
        if (!frame) return;
        const bounds = viewport.getBoundingClientRect();
        const card = frame.getBoundingClientRect();
        if (card.left >= bounds.left - 2 && card.right <= bounds.right + 2)
          return;
        scrollToFrame(frame);
      }

      function jumpToProject(event: MouseEvent) {
        if (!(event.target instanceof HTMLElement)) return;
        const button = event.target.closest<HTMLElement>('[data-project-jump]');
        if (!button) return;
        const frame = frames[Number(button.dataset.projectJump)];
        if (frame) scrollToFrame(frame, true);
      }

      track.addEventListener('focusin', showFocusedProject);
      reel.addEventListener('click', jumpToProject);
      return () => {
        delete reel.dataset.reel;
        track.removeEventListener('focusin', showFocusedProject);
        reel.removeEventListener('click', jumpToProject);
        jumpButtons[currentProject]?.removeAttribute('aria-current');
        if (progress instanceof HTMLElement)
          progress.style.removeProperty('transform');
      };
    });

    void document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      media.revert();
    };
  }, [rootRef, enabled]);
}
