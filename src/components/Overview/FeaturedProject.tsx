'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { OPTIMIZED_DATA } from '../../lib/optimizedData';
import { getAnimationClassName } from '../../lib/animationConfig';
import { Button } from '../Common/Button';
import { SectionDivider } from '../Common/SectionDivider';

import { useInView } from '../../hooks/useInView';
import { ProjectHeader, ProjectFeatures, ProjectTechStack, ProjectPreview } from './FeaturedProject/index';
import { ProjectModal } from '../Common/ProjectModal';

export const FeaturedProject: React.FC = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use optimized data instead of finding project on every render
  const { featuredProject } = OPTIMIZED_DATA;

  // Use custom in-view hook
  const [headerRef, isHeaderInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [containerRef, isContainerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Memoized callbacks
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);



  // Memoize screenshot source to avoid re-computation
  const screenshotSrc = useMemo(() => 
    featuredProject?.preview?.screenshot || '/property-project/home1.png',
    [featuredProject?.preview?.screenshot]
  );

  return (
    <>
      <SectionDivider className="py-8" />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={headerRef}
            className={`text-center mb-16 ${getAnimationClassName(isHeaderInView, 'hero')}`}
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
            className={`max-w-5xl mx-auto relative ${getAnimationClassName(isContainerInView, 'featuredProject')} animation-delay-200`}
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
                      className="w-full md:w-auto"
                    >
                      View Project Details →
                    </Button>
                  </div>

                  {/* Right side - Project Preview */}
                  <ProjectPreview project={featuredProject} screenshotSrc={screenshotSrc} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

              {/* Project Modal */}
        {isModalOpen && (
          <ProjectModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            project={featuredProject}
          />
        )}
    </>
  );
});

FeaturedProject.displayName = 'FeaturedProject';
