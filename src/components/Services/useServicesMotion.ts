'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { useSiteMotion } from '@/hooks/useSiteMotion';
import { gsap, registerGsap, useGSAP } from '@/lib/motion/gsap';

export function useServicesMotion(page: RefObject<HTMLDivElement | null>) {
  const motion = useSiteMotion();
  const introPlayed = useRef(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!page.current || !('IntersectionObserver' in window)) return;

    const steps = Array.from(
      page.current.querySelectorAll<HTMLElement>('[data-service-step]')
    );
    let observer: IntersectionObserver;

    function watchSteps() {
      observer?.disconnect();
      const bandTop = Math.round(window.innerHeight * 0.42);
      const bandBottom = window.innerHeight - bandTop - 2;
      observer = new IntersectionObserver(
        (entries) => {
          const visibleStep = entries.find(
            ({ isIntersecting }) => isIntersecting
          );
          if (visibleStep) {
            setCurrentStep(steps.indexOf(visibleStep.target as HTMLElement));
          }
        },
        { rootMargin: `-${bandTop}px 0px -${bandBottom}px 0px` }
      );
      steps.forEach((step) => observer.observe(step));
    }

    watchSteps();
    window.addEventListener('resize', watchSteps);
    return () => {
      window.removeEventListener('resize', watchSteps);
      observer.disconnect();
    };
  }, [page]);

  useGSAP(
    () => {
      const root = page.current;
      if (!motion || !root) return;

      registerGsap();
      const media = gsap.matchMedia(root);

      media.add(
        {
          desktop: '(min-width: 880px)',
          pointer: '(pointer: fine) and (hover: hover)',
          base: 'all',
        },
        ({ conditions }) => {
          const { desktop, pointer } = conditions ?? {};
          const hero = root.querySelector('[data-service-hero]');
          const stage = root.querySelector<HTMLElement>('[data-service-stage]');
          const projection = root.querySelector('[data-service-perspective]');
          const parallax = root.querySelector('[data-service-parallax]');
          const light = root.querySelector('[data-service-light]');
          const process = root.querySelector('[data-service-process]');
          const progress = root.querySelector('[data-service-progress]');

          if (
            !introPlayed.current &&
            window.scrollY < 80 &&
            !window.location.hash
          ) {
            gsap
              .timeline({ defaults: { ease: 'power3.out' } })
              .from('[data-service-title]', {
                yPercent: 36,
                opacity: 0.68,
                duration: 0.8,
              })
              .from(
                '[data-service-intro]',
                { y: 16, opacity: 0.62, duration: 0.55, stagger: 0.07 },
                0.12
              )
              .from(
                '[data-service-media]',
                {
                  yPercent: desktop ? 25 : 10,
                  opacity: 0.58,
                  duration: 1.05,
                  stagger: 0.14,
                },
                0.08
              );
          }
          introPlayed.current = true;

          if (desktop && hero && parallax && light) {
            const exit = gsap.timeline({
              scrollTrigger: {
                trigger: hero,
                start: 'top 64px',
                end: 'bottom 12%',
                scrub: 0.45,
              },
              defaults: { ease: 'none' },
            });
            exit.to(parallax, { yPercent: -14, scale: 1.12, rotationZ: -3 }, 0);
            exit.to(light, { yPercent: 43, opacity: 0.3 }, 0);
          }

          root
            .querySelectorAll<HTMLElement>('[data-service-reveal]')
            .forEach((item) => {
              gsap.from(item, {
                y: desktop ? 26 : 13,
                opacity: 0.73,
                duration: 0.65,
                scrollTrigger: { trigger: item, start: 'top 91%', once: true },
              });
            });

          if (desktop && process && progress) {
            gsap.fromTo(
              progress,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: process,
                  start: 'top 45%',
                  end: 'bottom 60%',
                  scrub: true,
                },
              }
            );
          }

          if (!desktop || !pointer || !stage || !projection) return;
          let bounds: DOMRect | undefined;
          const pitch = gsap.quickTo(projection, 'rotationX', {
            duration: 0.6,
          });
          const yaw = gsap.quickTo(projection, 'rotationY', { duration: 0.6 });

          function enter() {
            bounds = stage?.getBoundingClientRect();
          }

          function move(event: PointerEvent) {
            if (!bounds || event.pointerType !== 'mouse') return;
            pitch(-9 * ((event.clientY - bounds.top) / bounds.height - 0.5));
            yaw(15 * ((event.clientX - bounds.left) / bounds.width - 0.5));
          }

          function reset() {
            bounds = undefined;
            pitch(0);
            yaw(0);
          }

          stage.addEventListener('pointerenter', enter);
          stage.addEventListener('pointermove', move);
          stage.addEventListener('pointerleave', reset);
          stage.addEventListener('pointercancel', reset);

          return () => {
            stage.removeEventListener('pointerenter', enter);
            stage.removeEventListener('pointermove', move);
            stage.removeEventListener('pointerleave', reset);
            stage.removeEventListener('pointercancel', reset);
          };
        }
      );

      return () => media.revert();
    },
    { scope: page, dependencies: [motion], revertOnUpdate: true }
  );

  return currentStep;
}
