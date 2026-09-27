'use client';

import { useCallback, useEffect, useState, type PointerEvent } from 'react';
import dynamic from 'next/dynamic';
import Typewriter from 'typewriter-effect';
import { Button } from '@/components/Common/Button';
import { useCtaBurst } from '@/components/Motion/CtaBurst';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  CodeBracketIcon,
  TrophyIcon,
  ChartBarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/Common/Badge';

const HeroField = dynamic(() => import('@/components/Motion/HeroField'), {
  ssr: false,
});

const PROOF_INTERVAL_MS = 4200;

export const Hero = () => {
  const {
    data: { about: portfolio, skills, achievements },
  } = usePortfolioData();
  const reducedMotion = useReducedMotion();
  const { burst, BurstLayer } = useCtaBurst();
  const [counts, setCounts] = useState({ years: 0, projects: 0, tech: 0 });
  const [proofIndex, setProofIndex] = useState(0);
  const [proofVisible, setProofVisible] = useState(true);

  const latest = achievements[0];

  const proofLines = [
    portfolio.summary,
    latest
      ? `${latest.title} — ${latest.description.split('—')[0].trim()}.`
      : 'Shipping mobile and web products end to end.',
    `${portfolio.about.yearsOfExperience}+ years shipping for clients.`,
  ].filter(Boolean);

  const topSkills = [
    ...skills.frontend.slice(0, 4),
    ...skills.backend.slice(0, 3),
    ...skills.databases.slice(0, 2),
  ];

  const typewriterStrings = portfolio.about.typewriterStrings.filter(
    (s) => s.length > 0
  );

  useEffect(() => {
    if (reducedMotion) {
      setCounts({
        years: portfolio.about.yearsOfExperience,
        projects: portfolio.about.totalProjects,
        tech: portfolio.about.technologiesMastered,
      });
      return;
    }

    const targets = {
      years: portfolio.about.yearsOfExperience,
      projects: portfolio.about.totalProjects,
      tech: portfolio.about.technologiesMastered,
    };
    const duration = 1600;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setCounts({
        years: Math.floor(targets.years * eased),
        projects: Math.floor(targets.projects * eased),
        tech: Math.floor(targets.tech * eased),
      });
      if (t < 1) frame = requestAnimationFrame(tick);
      else setCounts(targets);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [
    reducedMotion,
    portfolio.about.yearsOfExperience,
    portfolio.about.totalProjects,
    portfolio.about.technologiesMastered,
  ]);

  useEffect(() => {
    if (reducedMotion || proofLines.length < 2) return;

    let intervalId = 0;
    let fadeTimeout = 0;

    const start = () => {
      intervalId = window.setInterval(() => {
        setProofVisible(false);
        fadeTimeout = window.setTimeout(() => {
          setProofIndex((i) => (i + 1) % proofLines.length);
          setProofVisible(true);
        }, 220);
      }, PROOF_INTERVAL_MS);
    };

    const onVisibility = () => {
      if (document.hidden) {
        window.clearInterval(intervalId);
        window.clearTimeout(fadeTimeout);
      } else {
        start();
      }
    };

    if (!document.hidden) start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(fadeTimeout);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion, proofLines.length]);

  const handleLinkedInClick = useCallback(() => {
    window.open(portfolio.links.linkedin, '_blank');
  }, [portfolio.links.linkedin]);

  const handleGitHubClick = useCallback(() => {
    window.open(portfolio.links.github, '_blank');
  }, [portfolio.links.github]);

  const handlePrimaryCta = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      burst(event.currentTarget);
    },
    [burst]
  );

  return (
    <>
      <section
        id="about"
        data-home-chapter
        className="relative flex min-h-[100dvh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-24"
      >
        {BurstLayer}
        <HeroField />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-neutral-50 via-neutral-50/70 to-transparent dark:from-neutral-950 dark:via-neutral-950/60 md:from-neutral-50/95 md:via-neutral-50/40 md:to-transparent dark:md:from-neutral-950/90 dark:md:via-neutral-950/35" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div
            data-hero-stage
            data-reveal="from-left"
            className="max-w-2xl space-y-8 md:max-w-xl lg:max-w-2xl"
          >
            <p
              data-chip
              className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-primary-600 dark:text-primary-400"
            >
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary-500" />
              {portfolio.about.availability}
            </p>

            <div className="space-y-4">
              <h1
                data-hero-name
                className="text-5xl font-black leading-[0.95] tracking-tight text-neutral-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                {portfolio.name}
              </h1>
              <div className="min-h-[28px] text-lg text-neutral-600 dark:text-neutral-400 md:text-xl">
                {reducedMotion ? (
                  <span>{typewriterStrings[0] ?? portfolio.title}</span>
                ) : (
                  <Typewriter
                    options={{
                      strings: typewriterStrings,
                      autoStart: true,
                      loop: true,
                    }}
                  />
                )}
              </div>
            </div>

            <p
              aria-live="polite"
              className={`max-w-lg text-base leading-relaxed text-neutral-600 transition-opacity duration-300 dark:text-neutral-300 md:text-lg ${
                proofVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {proofLines[proofIndex]}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <span
                data-magnetic
                data-cursor-grow
                onPointerDown={handlePrimaryCta}
              >
                <Button href="/portfolio" className="relative overflow-hidden">
                  View work →
                </Button>
              </span>
              <span data-magnetic>
                <Button onClick={handleLinkedInClick} variant="ghost">
                  LinkedIn →
                </Button>
              </span>
              <span data-magnetic>
                <Button onClick={handleGitHubClick} variant="ghost">
                  GitHub →
                </Button>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Proof"
        data-home-chapter
        data-proof-rail
        className="relative border-t border-neutral-200 bg-neutral-50 px-6 py-16 dark:border-neutral-800 dark:bg-neutral-950 md:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              {
                key: 'stats',
                from: 'from-left' as const,
                icon: (
                  <ChartBarIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                ),
                title: 'Stats',
                body: (
                  <div className="space-y-3">
                    {(
                      [
                        [
                          counts.years,
                          portfolio.about.yearsLabel || 'Years Coding',
                        ],
                        [counts.projects, 'Projects Built'],
                        [counts.tech, 'Technologies'],
                      ] as const
                    ).map(([value, label]) => (
                      <div
                        key={label}
                        className="metrics-tile metrics-tile-bump"
                      >
                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 sm:text-3xl">
                          {value}+
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                key: 'tech',
                from: 'from-right' as const,
                icon: (
                  <CodeBracketIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                ),
                title: 'Tech Stack',
                body: (
                  <div className="flex flex-wrap gap-2">
                    {topSkills.map((skill) => (
                      <Badge
                        key={skill}
                        data-chip
                        className="cap-in border-neutral-200 bg-neutral-100 text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ),
              },
              {
                key: 'latest',
                from: 'from-left' as const,
                icon: (
                  <TrophyIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                ),
                title: 'Latest',
                body: (
                  <>
                    <div className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">
                      {latest?.title ?? 'Perfume Tower'}
                    </div>
                    <div className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {latest?.description ??
                        'Fragrance commerce — mobile app + web storefront.'}
                    </div>
                  </>
                ),
              },
              {
                key: 'location',
                from: 'from-right' as const,
                icon: (
                  <MapPinIcon className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                ),
                title: 'Location',
                body: (
                  <>
                    <div className="mb-1 text-2xl font-bold text-neutral-900 dark:text-white">
                      {portfolio.location}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      On-site & Remote
                    </div>
                  </>
                ),
              },
            ] as const
          ).map((tile) => (
            <div
              key={tile.key}
              data-hero-stage
              data-reveal={tile.from}
              data-proof-tile
              className="rounded-2xl border border-neutral-200 bg-white/80 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"
            >
              <div className="mb-4 flex items-center gap-2">
                {tile.icon}
                <h3 className="text-sm font-semibold tracking-wide text-neutral-900 dark:text-white">
                  {tile.title}
                </h3>
              </div>
              {tile.body}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

Hero.displayName = 'Hero';
