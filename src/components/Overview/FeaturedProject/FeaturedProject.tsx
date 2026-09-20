'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SectionDivider } from '@/components/Common/SectionDivider';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import {
  getCaseStudyMeta,
  getDisplayName,
  getHeroScreenshot,
  getProjectSlug,
} from '@/lib/project-utils';

export default function FeaturedProject() {
  const {
    data: { projects },
  } = usePortfolioData();
  const featured = projects.find((p) => p.highlight) || projects[0];
  if (!featured) return null;

  const meta = getCaseStudyMeta(featured);
  const hero = getHeroScreenshot(featured);
  const slug = getProjectSlug(featured);
  const title = getDisplayName(featured);

  return (
    <>
      <SectionDivider className="py-8" />
      <section className="px-4 py-14 md:px-6">
        <div className="reveal mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-primary-500">
              Featured
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">
              {meta.outcome}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href={`/portfolio/${slug}`}
              data-magnetic
              className="mt-8 inline-flex cursor-pointer rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              View case study
            </Link>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 md:aspect-[5/6]">
            {hero ? (
              <Image
                src={hero.src}
                alt={hero.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
