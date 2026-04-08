'use client';

import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/Common/Button';
import { SectionDivider } from '@/components/Common/SectionDivider';
import { Badge } from '@/components/Common/Badge';

import { useInView } from '@/hooks/useInView';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import { ProjectPreview } from './ProjectPreview';
import { ProjectModal } from '@/components/Common/ProjectModal';
import type { ProjectPreviewScreenshot } from '@/lib/types';

export const FeaturedProject = () => {
  const {
    data: { projects },
  } = usePortfolioData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Direct data access for simplicity
  const featuredProject = projects.find((p) => p.highlight) || projects[0];

  // Use custom in-view hook
  const [headerRef, isHeaderInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  const [containerRef, isContainerInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Memoized callbacks
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Memoize screenshot source to avoid re-computation
  const screenshotSrc = useMemo(() => {
    const screenshot = featuredProject?.preview?.screenshot;
    if (typeof screenshot === 'string') {
      return screenshot;
    } else if (screenshot && Array.isArray(screenshot)) {
      // Type guard: TypeScript now knows screenshot is an array
      const screenshotArray = screenshot as Array<{
        id: number;
        src: string;
        title: string;
        description: string;
      }>;
      if (screenshotArray.length > 0) {
        return screenshotArray[0].src;
      }
    }
    const gallery = featuredProject?.preview?.screenshots as
      | ProjectPreviewScreenshot[]
      | undefined;
    if (gallery && gallery.length > 0) {
      const preferred =
        gallery.find((s) => s.presentation === 'mobile') ??
        gallery.find((s) => s.presentation !== 'web') ??
        gallery[0];
      return preferred.src;
    }
    return '/property-project/home1.png';
  }, [
    featuredProject?.preview?.screenshot,
    featuredProject?.preview?.screenshots,
  ]);

  return (
    <>
      <SectionDivider className="py-8" />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-700 ease-out ${
              isHeaderInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
              Featured Project
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              A showcase of my most impactful work, demonstrating technical
              skills and problem-solving approach.
            </p>
          </div>

          <div
            ref={containerRef}
            className={`max-w-5xl mx-auto relative transition-all duration-700 ease-out ${
              isContainerInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Animated border container */}
            <div className="relative rounded-2xl p-[2px] bg-linear-to-r from-primary-500 to-secondary-500 animate-gradient-x">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-10">
                <div className="grid md:grid-cols-[1.15fr_.85fr] gap-10 items-center">
                  {/* Left side - Project details */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs">
                        {featuredProject.category}
                      </Badge>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {featuredProject.year}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3">
                      {featuredProject.name}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed line-clamp-2">
                      {featuredProject.blurb}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.stack.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-neutral-100 dark:bg-neutral-800 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <Button
                        onClick={handleOpenModal}
                        className="w-full sm:w-auto cursor-pointer"
                      >
                        View Project Details →
                      </Button>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Open full case study in modal
                      </span>
                    </div>
                  </div>

                  {/* Right side - Project Preview */}
                  <ProjectPreview
                    projectName={featuredProject.name}
                    screenshotSrc={screenshotSrc}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal: keep mounted to allow close animation */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={featuredProject}
      />
    </>
  );
};

FeaturedProject.displayName = 'FeaturedProject';
