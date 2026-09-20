'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { PhoneFrame } from '@/components/Common/PhoneFrame';
import {
  getCaseStudyMeta,
  getDisplayName,
  getHeroScreenshot,
  getStoryFrames,
} from '@/lib/project-utils';
import { cx } from '@/lib/utils';

interface CaseStudyProps {
  project: Project;
}

/** Lightweight case study — stacked sections + .reveal, no pin/scrub. */
export default function CaseStudy({ project }: CaseStudyProps) {
  const meta = getCaseStudyMeta(project);
  const hero = getHeroScreenshot(project);
  const frames = getStoryFrames(project);
  const beats = meta.beats ?? [];
  const title = getDisplayName(project);
  const isMobile =
    project.category === 'Mobile Development' ||
    project.stack.includes('React Native') ||
    project.stack.includes('Expo');

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-24 md:px-6">
      <header className="reveal grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-primary-500">
            {project.year} · {project.category}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-neutral-600 dark:text-neutral-300">
            {meta.outcome}
          </p>
          {meta.role ? (
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-neutral-400">
              {meta.role}
            </p>
          ) : null}
        </div>
        {hero ? (
          <div className="relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            {isMobile && hero.presentation !== 'web' ? (
              <div className="mx-auto max-w-[220px] py-6">
                <PhoneFrame
                  src={hero.src}
                  alt={hero.title}
                  showHoverEffect={false}
                />
              </div>
            ) : (
              <div className="relative aspect-[16/10]">
                <Image
                  src={hero.src}
                  alt={hero.title}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            )}
          </div>
        ) : null}
      </header>

      <section className="reveal mt-20 grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Problem
          </p>
          <p className="mt-3 text-xl font-medium text-neutral-900 dark:text-neutral-50">
            {meta.problem}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            Stack
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {beats.length > 0 ? (
        <div className="mt-16 space-y-16">
          {beats.map((beat, index) => {
            const frame = frames[index] ?? frames[0];
            const reverse = index % 2 === 1;
            return (
              <section
                key={beat.title}
                className={cx(
                  'reveal grid items-center gap-8 md:grid-cols-2',
                  reverse && 'md:[&>*:first-child]:order-2'
                )}
              >
                <div>
                  <p className="font-mono text-xs text-primary-500">
                    0{index + 1}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-50 md:text-3xl">
                    {beat.title}
                  </h2>
                  <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                    {beat.body}
                  </p>
                </div>
                {frame ? (
                  isMobile && frame.presentation !== 'web' ? (
                    <div className="mx-auto max-w-[200px]">
                      <PhoneFrame
                        src={frame.src}
                        alt={frame.title}
                        showHoverEffect={false}
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                      <Image
                        src={frame.src}
                        alt={frame.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )
                ) : null}
              </section>
            );
          })}
        </div>
      ) : null}

      <footer className="reveal mt-20 flex flex-col gap-4 border-t border-neutral-200 pt-10 dark:border-neutral-800 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-neutral-600 dark:text-neutral-300">
          {project.blurb}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="cursor-pointer rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              View live
            </a>
          ) : null}
          <Link
            href="/portfolio"
            data-magnetic
            className="cursor-pointer rounded-full px-5 py-2.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            All projects
          </Link>
        </div>
      </footer>
    </article>
  );
}
