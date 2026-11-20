'use client';

import { useRef, type ReactNode } from 'react';
import { useSiteMotion } from '@/hooks/useSiteMotion';
import { gsap, registerGsap, useGSAP } from '@/lib/motion/gsap';

interface PortfolioMotionProps {
  children: ReactNode;
  revision?: string;
}

function addPointerTilt(stage: HTMLElement, planes: HTMLElement[]) {
  const tilts = planes.map((plane) => ({
    x: gsap.quickTo(plane, 'rotationX', { duration: 0.45, ease: 'power3.out' }),
    y: gsap.quickTo(plane, 'rotationY', { duration: 0.45, ease: 'power3.out' }),
  }));
  let bounds: DOMRect | undefined;
  let scrollPosition = 0;

  function measure() {
    bounds = stage.getBoundingClientRect();
    scrollPosition = window.scrollY;
  }

  function move(event: PointerEvent) {
    if (!bounds || event.pointerType !== 'mouse') return;
    if (scrollPosition !== window.scrollY) measure();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    for (const [index, tilt] of tilts.entries()) {
      const strength = index ? 0.64 : 1;
      tilt.x(-y * 16 * strength);
      tilt.y(x * 22 * strength);
    }
  }

  function reset() {
    bounds = undefined;
    for (const tilt of tilts) {
      tilt.x(0);
      tilt.y(0);
    }
  }

  stage.addEventListener('pointerenter', measure);
  stage.addEventListener('pointermove', move);
  stage.addEventListener('pointerleave', reset);
  stage.addEventListener('pointercancel', reset);

  return () => {
    stage.removeEventListener('pointerenter', measure);
    stage.removeEventListener('pointermove', move);
    stage.removeEventListener('pointerleave', reset);
    stage.removeEventListener('pointercancel', reset);
  };
}

export default function PortfolioMotion({
  children,
  revision,
}: PortfolioMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const playedIntro = useRef(false);
  const previousRevision = useRef(revision);
  const motionEnabled = useSiteMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
      const changedFilter = previousRevision.current !== revision;
      previousRevision.current = revision;
      if (!root || !motionEnabled) return;

      registerGsap();
      const media = gsap.matchMedia();
      media.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          wide: '(min-width: 760px)',
          pointer: '(hover: hover) and (pointer: fine)',
        },
        ({ conditions }) => {
          if (!conditions?.motion) return;
          const { wide, pointer } = conditions;
          const cleanups: Array<() => void> = [];

          const title = root.querySelector<HTMLElement>('[data-work-intro]');
          if (title && !playedIntro.current) {
            playedIntro.current = true;
            const detail = root.querySelector('[data-work-intro-detail]');
            const entrance = gsap.timeline();
            entrance.fromTo(
              title,
              {
                y: wide ? 38 : 18,
                opacity: 0.52,
                clipPath: 'inset(0% 0% 55% 0%)',
              },
              {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                clearProps: 'clipPath,transform,opacity',
                duration: 0.88,
                ease: 'power3.out',
              }
            );
            if (detail) {
              entrance.from(
                detail,
                {
                  opacity: 0.52,
                  y: 19,
                  clearProps: 'transform,opacity',
                  duration: 0.65,
                },
                0.22
              );
            }
          }

          if (changedFilter) {
            gsap.from(root.querySelectorAll('[data-work-entry="feature"]'), {
              opacity: 0.5,
              y: wide ? 30 : 15,
              stagger: 0.09,
              duration: 0.58,
              clearProps: 'transform,opacity',
            });
          }

          const stages = root.querySelectorAll<HTMLElement>(
            '[data-work-frame]:not([data-variant="thumbnail"])'
          );

          stages.forEach((stage, index) => {
            const scene = stage.querySelector<HTMLElement>('[data-work-scene]');
            if (!scene) return;

            const planes = Array.from(
              scene.querySelectorAll<HTMLElement>('[data-work-plane]')
            );
            const sweep = stage.querySelector<HTMLElement>('[data-work-sweep]');
            const direction = index % 2 === 0 ? 1 : -1;
            const wideMovement = stage.dataset.variant === 'detail' ? 15 : 23;
            const timeline = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: stage,
                start: 'top 96%',
                end: wide ? 'bottom 20%' : 'top 35%',
                scrub: wide ? 0.6 : true,
              },
            });

            timeline.from(
              scene,
              {
                transformPerspective: 900,
                rotationX: wide ? 12 : 0,
                rotationY: wide ? direction * wideMovement : 0,
                scale: wide ? 0.84 : 0.975,
                xPercent: wide ? direction * 7 : 0,
                y: wide ? 52 : 15,
                duration: 0.73,
              },
              0
            );

            if (wide) {
              timeline.to(
                scene,
                {
                  y: -26,
                  scale: 1.04,
                  rotationY: -direction * 4,
                  duration: 0.27,
                },
                0.73
              );
            }

            if (wide && planes.length > 1) {
              timeline.from(
                planes,
                {
                  xPercent: (planeIndex) => (planeIndex === 0 ? -20 : 18),
                  yPercent: (planeIndex) => (planeIndex === 0 ? 4 : 10),
                  rotationZ: (planeIndex) => (planeIndex === 0 ? -9 : 7),
                  duration: 0.68,
                },
                0
              );
            }

            if (wide && sweep) {
              timeline.fromTo(
                sweep,
                { xPercent: -145, opacity: 0.82 },
                { xPercent: 290, opacity: 0, duration: 0.86 },
                0
              );
            }

            if (wide && pointer) {
              cleanups.push(addPointerTilt(stage, planes));
            }
          });

          root
            .querySelectorAll<HTMLElement>(
              '[data-work-enter], [data-work-entry="index"]'
            )
            .forEach((element) => {
              gsap.from(element, {
                y: 22,
                opacity: 0.64,
                duration: 0.65,
                scrollTrigger: {
                  trigger: element,
                  start: 'top 88%',
                  once: true,
                },
              });
            });

          return () => cleanups.forEach((cleanup) => cleanup());
        }
      );

      return () => media.revert();
    },
    {
      scope: rootRef,
      dependencies: [motionEnabled, revision],
      revertOnUpdate: true,
    }
  );

  return <div ref={rootRef}>{children}</div>;
}
