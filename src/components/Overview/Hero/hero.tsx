'use client';

import { useCallback, useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Badge } from '@/components/Common/Badge';
import { Button } from '@/components/Common/Button';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  CodeBracketIcon,
  TrophyIcon,
  ChartBarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const PROOF_INTERVAL_MS = 4200;

export const Hero = () => {
  const {
    data: { about: portfolio, skills, achievements },
  } = usePortfolioData();
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState({ years: 0, projects: 0, tech: 0 });
  const [proofIndex, setProofIndex] = useState(0);
  const [proofVisible, setProofVisible] = useState(true);
  const [statusKey, setStatusKey] = useState(0);

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
    if (document.hidden) return;

    const id = window.setInterval(() => {
      setProofVisible(false);
      window.setTimeout(() => {
        setProofIndex((i) => (i + 1) % proofLines.length);
        setProofVisible(true);
      }, 220);
    }, PROOF_INTERVAL_MS);

    const onVisibility = () => {
      if (document.hidden) window.clearInterval(id);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion, proofLines.length]);

  const handleLinkedInClick = useCallback(() => {
    window.open(portfolio.links.linkedin, '_blank');
  }, [portfolio.links.linkedin]);

  const handleGitHubClick = useCallback(() => {
    window.open(portfolio.links.github, '_blank');
  }, [portfolio.links.github]);

  const statusPills = [
    portfolio.about.availability,
    'Open to freelance',
    'Remote-friendly',
  ];

  return (
    <section id="about" className="relative flex items-center overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="spark-float absolute top-[18%] left-[12%] h-1.5 w-1.5 rounded-full bg-primary-400/70" />
        <span className="spark-float spark-float-delay absolute top-[42%] right-[18%] h-1 w-1 rounded-full bg-secondary-400/60" />
        <span className="spark-float spark-float-delay-2 absolute bottom-[22%] left-[28%] h-1.5 w-1.5 rounded-full bg-pink-400/50" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid auto-rows-[minmax(120px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
          <div
            data-hero-stage
            data-tilt
            className="group relative overflow-hidden rounded-3xl border border-neutral-200/50 bg-gradient-to-br from-white/80 to-white/40 p-8 shadow-xl backdrop-blur-xl dark:border-neutral-700/50 dark:from-neutral-900/80 dark:to-neutral-900/40 md:col-span-6 md:row-span-2"
          >
            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {statusPills.map((pill, index) => (
                  <button
                    key={pill}
                    type="button"
                    data-chip
                    onClick={() => setStatusKey(index)}
                    className={`cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                      statusKey === index
                        ? 'border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900/40 dark:text-green-300'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                    }`}
                  >
                    <span className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />
                    {pill}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-black leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
                  {portfolio.name}
                </h1>
                <div className="min-h-[32px] text-xl text-neutral-600 dark:text-neutral-300">
                  <Typewriter
                    options={{
                      strings: portfolio.about.typewriterStrings.filter(
                        (s) => s.length > 0
                      ),
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </div>

              <p
                aria-live="polite"
                className={`max-w-xl text-sm leading-relaxed text-neutral-600 transition-opacity duration-300 dark:text-neutral-400 md:text-base ${
                  proofVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {proofLines[proofIndex]}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <span data-magnetic>
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

          <div
            data-hero-stage
            data-hero-parallax
            data-tile
            className="rounded-3xl border border-primary-200/50 bg-gradient-to-br from-primary-50/80 to-primary-100/40 p-6 shadow-lg backdrop-blur-xl dark:border-primary-700/30 dark:from-primary-900/20 dark:to-primary-800/10 md:col-span-3"
          >
            <div className="mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Stats
              </h3>
            </div>
            <div className="space-y-3">
              {(
                [
                  [counts.years, portfolio.about.yearsLabel || 'Years Coding'],
                  [counts.projects, 'Projects Built'],
                  [counts.tech, 'Technologies'],
                ] as const
              ).map(([value, label]) => (
                <div
                  key={label}
                  className={`metrics-tile ${statusKey > 0 ? 'metrics-tile-bump' : ''}`}
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 sm:text-3xl">
                    {value}+
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-hero-stage
            data-tile
            className="rounded-3xl border border-secondary-200/50 bg-gradient-to-br from-secondary-50/80 to-secondary-100/40 p-6 shadow-lg backdrop-blur-xl dark:border-secondary-700/30 dark:from-secondary-900/20 dark:to-secondary-800/10 md:col-span-3"
          >
            <div className="mb-4 flex items-center gap-2">
              <CodeBracketIcon className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Tech Stack
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((skill) => (
                <Badge
                  key={skill}
                  data-chip
                  className="cap-in border-secondary-200 bg-secondary-100 text-xs text-secondary-700 dark:border-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div
            data-hero-stage
            data-tile
            className="rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-amber-100/40 p-6 shadow-lg backdrop-blur-xl dark:border-amber-700/30 dark:from-amber-900/20 dark:to-amber-800/10 md:col-span-3"
          >
            <div className="mb-3 flex items-center gap-2">
              <TrophyIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Latest
              </h3>
            </div>
            <div className="mb-1 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {latest?.title ?? 'Perfume Tower'}
            </div>
            <div className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
              {latest?.description ??
                'Fragrance commerce — mobile app + web storefront.'}
            </div>
          </div>

          <div
            data-hero-stage
            data-tile
            className="rounded-3xl border border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-purple-100/40 p-6 shadow-lg backdrop-blur-xl dark:border-purple-700/30 dark:from-purple-900/20 dark:to-purple-800/10 md:col-span-3"
          >
            <div className="mb-3 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Location
              </h3>
            </div>
            <div className="mb-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {portfolio.location}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              On-site & Remote
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';
