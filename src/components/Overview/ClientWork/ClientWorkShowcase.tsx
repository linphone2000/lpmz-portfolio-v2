'use client';

import Image from 'next/image';
import {
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { Badge } from '@/components/Common/Badge';
import { PhoneFrame } from '@/components/Common/PhoneFrame';
import type { ClientWorkEntry } from '@/lib/types';

interface ClientWorkShowcaseProps {
  entry: ClientWorkEntry;
  index: number;
  isLast: boolean;
}

const statusStyles: Record<ClientWorkEntry['status'], string> = {
  Completed:
    'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300',
  'In Development':
    'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300',
  Ongoing: 'bg-sky-500/10 text-sky-700 border-sky-500/20 dark:text-sky-300',
};

function MobileScreenshotCollage({
  screenshots,
  clientName,
  isLeft,
}: {
  screenshots: [string, string, string];
  clientName: string;
  isLeft: boolean;
}) {
  const sizeClasses = [
    'w-16 sm:w-20',
    'w-[4.5rem] sm:w-24',
    'w-16 sm:w-20',
  ] as const;

  return (
    <div
      className={`flex items-end justify-center gap-1.5 sm:gap-2 ${
        isLeft ? 'lg:justify-end' : 'lg:justify-start'
      }`}
    >
      {screenshots.map((src, index) => (
        <div
          key={src + index}
          className={`shrink-0 ${sizeClasses[index]} ${
            index === 1 ? 'z-10' : 'opacity-90'
          }`}
        >
          <PhoneFrame
            src={src}
            alt={`${clientName} preview ${index + 1}`}
            className="h-full w-full"
            showHoverEffect={false}
            thinBorder
          />
        </div>
      ))}
    </div>
  );
}

function ClientWorkInlinePreview({
  entry,
  isLeft,
}: {
  entry: ClientWorkEntry;
  isLeft: boolean;
}) {
  const screenshot = entry.featuredScreenshot;

  if (!screenshot) {
    return (
      <div className="w-full rounded-xl border border-dashed border-neutral-300 bg-neutral-50/80 p-4 dark:border-neutral-600 dark:bg-neutral-800/40">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 dark:bg-primary-900/30">
            <BuildingOfficeIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          </div>
          <ul className="space-y-1.5 text-sm text-neutral-600 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary-500">•</span>
              <span>App Store certification & provisioning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary-500">•</span>
              <span>Release management & version updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary-500">•</span>
              <span>Apple Developer account compliance</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (screenshot.presentation === 'mobile') {
    const collageScreenshots =
      screenshot.screenshots ??
      ([screenshot.src, screenshot.src, screenshot.src] as [
        string,
        string,
        string,
      ]);

    return (
      <MobileScreenshotCollage
        screenshots={collageScreenshots}
        clientName={entry.clientName}
        isLeft={isLeft}
      />
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-md dark:border-neutral-700 dark:bg-neutral-950">
      <div className="relative aspect-video w-full">
        <Image
          src={screenshot.src}
          alt={`${entry.clientName} web preview`}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function ClientWorkShowcase({
  entry,
  index,
  isLast,
}: ClientWorkShowcaseProps) {
  const isLeft = index % 2 === 0;
  const showDeliverables = entry.deliverables && entry.deliverables.length > 1;
  const lgSpineContent = isLeft ? 'lg:ml-auto lg:max-w-md' : 'lg:max-w-md';
  const side = isLeft ? 'from-left' : 'from-right';

  return (
    <article
      data-client-work={isLeft ? 'left' : 'right'}
      data-client-work-chapter
      data-reveal={side}
      className="relative py-6 lg:grid lg:min-h-[70vh] lg:grid-cols-2 lg:items-center lg:gap-6 lg:py-10 xl:gap-10"
    >
      <div className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-primary-500/20" />
          <span className="relative h-3 w-3 rounded-full border-2 border-white bg-primary-600 dark:border-neutral-900" />
        </span>
      </div>

      <div
        className={`relative ${
          isLeft
            ? 'lg:pr-12 lg:text-right'
            : 'lg:col-start-2 lg:pl-12 lg:text-left'
        }`}
      >
        <div
          className={`absolute top-1/2 hidden h-px w-12 bg-primary-500/20 lg:block ${
            isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'
          }`}
          aria-hidden
        />

        <div className="space-y-4 sm:space-y-5">
          <div
            data-client-work-copy
            data-reveal={side}
            className={`text-center ${isLeft ? 'lg:text-right' : 'lg:text-left'} ${lgSpineContent}`}
          >
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-2xl">
              {entry.clientName}
            </h3>
            <div
              className={`mt-2 flex flex-wrap items-center justify-center gap-2 ${
                isLeft ? 'lg:justify-end' : 'lg:justify-start'
              }`}
            >
              <Badge
                data-chip
                className="bg-primary-500/10 text-primary-700 dark:text-primary-300"
              >
                {entry.engagement}
              </Badge>
              <Badge data-chip className={statusStyles[entry.status]}>
                {entry.status}
              </Badge>
            </div>
          </div>

          <div
            data-client-work-media
            data-reveal={isLeft ? 'from-right' : 'from-left'}
            className={`${isLeft ? 'lg:flex lg:justify-end' : ''} ${lgSpineContent}`}
          >
            <div
              data-client-work-mask
              className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            >
              <ClientWorkInlinePreview entry={entry} isLeft={isLeft} />
            </div>
          </div>

          <div
            className={`h-px w-full bg-linear-to-r from-transparent via-primary-500/25 to-transparent ${lgSpineContent} ${
              isLeft ? 'lg:via-primary-500/20' : ''
            }`}
            aria-hidden
          />

          <div
            data-client-work-copy
            data-reveal={side}
            className="space-y-4 sm:space-y-5"
          >
            <p
              className={`text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base ${lgSpineContent}`}
            >
              {entry.summary}
            </p>

            {showDeliverables && (
              <ul
                className={`space-y-2 ${isLeft ? 'lg:text-right' : ''} ${lgSpineContent}`}
              >
                {entry.deliverables!.map((deliverable) => (
                  <li
                    key={deliverable.title + index}
                    className={`flex flex-col gap-0.5 ${
                      isLeft ? 'lg:items-end' : ''
                    }`}
                  >
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {deliverable.title}
                    </span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {deliverable.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div
              className={`flex flex-wrap gap-2 ${isLeft ? 'lg:justify-end' : ''} ${lgSpineContent}`}
            >
              {entry.technologies.slice(0, 5).map((tech) => (
                <Badge
                  key={tech + index}
                  data-chip
                  className="bg-neutral-100 text-xs dark:bg-neutral-800"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {entry.liveUrl && (
              <div
                className={`${isLeft ? 'lg:flex lg:justify-end' : ''} ${lgSpineContent}`}
              >
                <a
                  href={entry.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  className="group/link inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  {entry.liveUrl.includes('apps.apple.com')
                    ? 'View on App Store'
                    : 'Visit website'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="mt-10 sm:mt-14 lg:hidden" aria-hidden>
          <div className="h-px w-full bg-linear-to-r from-transparent via-primary-500/25 to-transparent" />
        </div>
      )}
    </article>
  );
}
