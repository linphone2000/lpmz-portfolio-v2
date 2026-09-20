'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import { PhoneFrame } from './PhoneFrame';
import {
  CalendarIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  LinkIcon,
  UserIcon,
  KeyIcon,
  CheckIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Project } from '../../lib/types';

type PreviewScreenshot = NonNullable<
  NonNullable<Project['preview']>['screenshots']
>[number];

const MAX_HIGHLIGHTS = 4;

function getScreenshotPresentation(
  project: Project,
  shot: PreviewScreenshot
): 'mobile' | 'web' {
  if (shot.presentation === 'mobile' || shot.presentation === 'web') {
    return shot.presentation;
  }
  return project.category === 'Mobile Development' ? 'mobile' : 'web';
}

function galleryUsesMobileGrid(
  project: Project,
  shots: PreviewScreenshot[] | undefined
): boolean {
  if (!shots?.length) return false;
  return shots.every((s) => getScreenshotPresentation(project, s) === 'mobile');
}

function getGalleryLgColumnCount(
  project: Project,
  shots: PreviewScreenshot[] | undefined
): 3 | 4 {
  const explicit = project.preview?.galleryLgColumns;
  if (explicit === 3 || explicit === 4) return explicit;
  return galleryUsesMobileGrid(project, shots) ? 4 : 3;
}

function getHeroSrc(project: Project): string | undefined {
  if (typeof project.preview?.screenshot === 'string') {
    return project.preview.screenshot;
  }
  return project.preview?.screenshots?.[0]?.src;
}

function isMobileProject(project: Project): boolean {
  return (
    project.category === 'Mobile Development' ||
    project.stack.includes('React Native') ||
    project.stack.includes('Expo')
  );
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ProjectModal = ({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) => {
  const [copiedItem, setCopiedItem] = useState<'email' | 'password' | null>(
    null
  );

  const handleCopy = useCallback(
    async (text: string, type: 'email' | 'password') => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedItem(type);
        setTimeout(() => setCopiedItem(null), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    },
    []
  );

  const galleryShots = project.preview?.screenshots;
  const galleryLgCols = getGalleryLgColumnCount(project, galleryShots);
  const highlights = project.features
    .filter((feature) => feature.length > 0)
    .slice(0, MAX_HIGHLIGHTS);
  const heroSrc = getHeroSrc(project);
  const showMobileHero = isMobileProject(project);
  const secondaryShots = galleryShots?.slice(1, 3) ?? [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.name} size="xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
            {project.category}
          </Badge>
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            {project.status}
          </Badge>
          {project.highlight && (
            <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-300">
              Featured
            </Badge>
          )}
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <CalendarIcon className="w-4 h-4" />
            <span>{project.year}</span>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 cursor-pointer"
            >
              <GlobeAltIcon className="w-4 h-4" />
              Live site
            </a>
          )}
        </div>

        {/* Visual strip */}
        {heroSrc && (
          <div
            className={
              showMobileHero
                ? 'flex flex-wrap items-end justify-center gap-4 sm:gap-6'
                : 'space-y-3'
            }
          >
            {showMobileHero ? (
              <>
                <div className="w-36 sm:w-44 shrink-0">
                  <PhoneFrame
                    src={heroSrc}
                    alt={`${project.name} preview`}
                    className="w-full"
                    showHoverEffect={false}
                  />
                </div>
                {secondaryShots.map((shot) => (
                  <div key={shot.id} className="w-28 sm:w-32 shrink-0 opacity-90">
                    <PhoneFrame
                      src={shot.src}
                      alt={`${project.name} - ${shot.title}`}
                      className="w-full"
                      showHoverEffect={false}
                      thinBorder
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-950">
                <div className="relative aspect-video w-full">
                  <Image
                    src={heroSrc}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        <div>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-[15px]">
            {project.blurb}
          </p>
          {project.preview?.featurePills &&
            project.preview.featurePills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.preview.featurePills
                  .filter((pill) => pill.length > 0)
                  .slice(0, 4)
                  .map((pill) => (
                    <span
                      key={pill}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {pill}
                    </span>
                  ))}
              </div>
            )}
        </div>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
              Highlights
            </h3>
            <ul className="space-y-2.5">
              {highlights.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckCircleIcon className="w-5 h-5 text-primary-500 dark:text-primary-400 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-[15px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stack */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
            Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {galleryShots && galleryShots.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
              Gallery
            </h3>
            <div
              className={`grid gap-5 ${
                galleryLgCols === 4
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {galleryShots.map((screenshot) => (
                <div key={screenshot.id}>
                  {getScreenshotPresentation(project, screenshot) ===
                  'mobile' ? (
                    <PhoneFrame
                      src={screenshot.src}
                      alt={`${project.name} - ${screenshot.title}`}
                      className="mb-2"
                      showHoverEffect
                    />
                  ) : (
                    <div className="mb-2 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 relative">
                      <Image
                        src={screenshot.src}
                        alt={`${project.name} - ${screenshot.title}`}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <p className="text-center text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {screenshot.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Try it out */}
        {(project.liveUrl || project.demoAccount) && (
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
              Try it out
            </h3>
            <div className="space-y-4">
              {project.liveUrl && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-lg bg-primary-500/10 dark:bg-primary-400/10 shrink-0">
                      <LinkIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-0.5">
                        Live website
                      </p>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm break-all underline decoration-dotted underline-offset-2 transition-colors cursor-pointer"
                      >
                        {project.liveUrl}
                      </a>
                    </div>
                  </div>
                  <Button
                    href={project.liveUrl}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg shrink-0 cursor-pointer"
                  >
                    <GlobeAltIcon className="w-4 h-4 mr-2" />
                    Visit site
                  </Button>
                </div>
              )}
              {project.startupNote && (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <InformationCircleIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{project.startupNote}</span>
                </div>
              )}
              {project.demoAccount && (
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 shrink-0">
                      <UserIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                        Demo account
                      </p>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <UserIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Email:
                          </span>
                          <code className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-800 dark:text-neutral-200 font-mono">
                            {project.demoAccount.email}
                          </code>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(project.demoAccount!.email, 'email')
                            }
                            className="p-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                            title="Copy email"
                            aria-label="Copy email"
                          >
                            {copiedItem === 'email' ? (
                              <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <KeyIcon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Password:
                          </span>
                          <code className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-800 dark:text-neutral-200 font-mono">
                            {project.demoAccount.password}
                          </code>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                project.demoAccount!.password,
                                'password'
                              )
                            }
                            className="p-1 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                            title="Copy password"
                            aria-label="Copy password"
                          >
                            {copiedItem === 'password' ? (
                              <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center pt-2 border-t border-neutral-200 dark:border-neutral-700">
          <Button
            onClick={onClose}
            variant="ghost"
            className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold py-2.5 px-8 rounded-xl border border-neutral-200 dark:border-neutral-700 cursor-pointer"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ProjectModal.displayName = 'ProjectModal';
