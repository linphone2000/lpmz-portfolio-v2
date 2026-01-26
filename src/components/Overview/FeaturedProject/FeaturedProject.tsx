'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { DATA } from '@/lib/data';
import { Button } from '@/components/Common/Button';
import { SectionDivider } from '@/components/Common/SectionDivider';

import { useInView } from '@/hooks/useInView';
import {
  ProjectHeader,
  ProjectFeatures,
  ProjectTechStack,
  ProjectPreview,
} from './index';
import { ProjectModal } from '@/components/Common/ProjectModal';

export const FeaturedProject: React.FC = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Direct data access for simplicity
  const featuredProject =
    DATA.projects.find((p) => p.highlight) || DATA.projects[0];

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
    if (
      featuredProject?.preview?.screenshots &&
      featuredProject.preview.screenshots.length > 0
    ) {
      return featuredProject.preview.screenshots[0].src;
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
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 animate-gradient-x">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-10">
                <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12">
                  {/* Left side - Project details */}
                  <div>
                    {/* Project Header */}
                    <ProjectHeader project={featuredProject} />

                    {/* Project Description */}
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4 sm:mb-6 leading-relaxed">
                      {featuredProject.blurb}
                    </p>

                    {/* Project Features */}
                    <ProjectFeatures features={featuredProject.features} />

                    {/* Tech Stack */}
                    <ProjectTechStack stack={featuredProject.stack} />

                    {/* Call to Action */}
                    <Button
                      onClick={handleOpenModal}
                      className="w-full md:w-auto cursor-pointer"
                    >
                      View Project Details →
                    </Button>
                  </div>

                  {/* Right side - Project Preview */}
                  <ProjectPreview
                    project={featuredProject}
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
});

FeaturedProject.displayName = 'FeaturedProject';
