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
    x: gsap.quickTo(plane, 'rotationX', { duration: 0.5, ease: 'power3.out' }),
    y: gsap.quickTo(plane, 'rotationY', { duration: 0.5, ease: 'power3.out' }),
  }));
  let bounds: DOMRect | undefined;

  function measure() {
    bounds = stage.getBoundingClientRect();
  }

  function move(event: PointerEvent) {
    if (!bounds || event.pointerType !== 'mouse') return;

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    for (const [index, tilt] of tilts.entries()) {
      const strength = index ? 0.64 : 1;
      tilt.x(-y * 12 * strength);
      tilt.y(x * 16 * strength);
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
  const motionEnabled = useSiteMotion();

  useGSAP(
    () => {
      const root = rootRef.current;
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
            gsap.fromTo(
              title,
              {
                y: wide ? 38 : 18,
                opacity: 0.66,
                clipPath: 'inset(0% 0% 28% 0%)',
              },
              {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                clearProps: 'clipPath,transform,opacity',
                duration: 0.78,
                ease: 'power3.out',
                onComplete: () => {
                  playedIntro.current = true;
                },
              }
            );
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
            const timeline = gsap.timeline({
              defaults: { duration: 1, ease: 'none' },
              scrollTrigger: {
                trigger: stage,
                start: 'top 96%',
                end: 'top 32%',
                scrub: wide ? 0.55 : true,
              },
            });

            timeline.from(
              scene,
              {
                transformPerspective: 1000,
                rotationX: wide ? 15 : 0,
                rotationY: wide ? direction * 13 : 0,
                scale: wide ? 0.88 : 0.975,
                y: wide ? 48 : 16,
              },
              0
            );

            if (wide && planes.length > 1) {
              timeline.from(
                planes,
                {
                  xPercent: (planeIndex) => (planeIndex === 0 ? -11 : 11),
                  rotationZ: (planeIndex) => (planeIndex === 0 ? -7 : 6),
                },
                0
              );
            }

            if (wide && sweep) {
              timeline.fromTo(
                sweep,
                { xPercent: -145, opacity: 0.65 },
                { xPercent: 290, opacity: 0 },
                0
              );
            }

            if (wide && pointer) {
              cleanups.push(addPointerTilt(stage, planes));
            }
          });

          root
            .querySelectorAll<HTMLElement>('[data-work-enter]')
            .forEach((element) => {
              gsap.from(element, {
                y: 24,
                opacity: 0.72,
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
