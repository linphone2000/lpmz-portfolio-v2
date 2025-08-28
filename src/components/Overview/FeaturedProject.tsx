'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { DATA } from '../../lib/data';
import { Button } from '../Common/Button';
import { Badge } from '../Common/Badge';
import { SectionDivider } from '../Common/SectionDivider';
import { ProjectModal } from '../Common/ProjectModal';
import { useInView } from '../../hooks/useInView';
import {
  CalendarIcon,
  CheckCircleIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export const FeaturedProject: React.FC = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Use custom in-view hook
  const [headerRef, isHeaderInView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });
  const [containerRef, isContainerInView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });
  
  // Memoize featured project to prevent recalculation
  const featuredProject = useMemo(() => 
    DATA.projects.find((p) => p.highlight) || DATA.projects[0]
  , []);

  // Memoized callbacks
  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Memoize project features for rendering
  const projectFeatures = useMemo(() => 
    featuredProject.features.map((feature, index) => (
      <div
        key={index}
        className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
      >
        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
        <span>{feature}</span>
      </div>
    ))
  , [featuredProject.features]);

  // Memoize tech stack badges
  const techStackBadges = useMemo(() => 
    featuredProject.stack.map((tech) => (
      <Badge
        key={tech}
        className="bg-neutral-100 dark:bg-neutral-800 text-xs"
      >
        {tech}
      </Badge>
    ))
  , [featuredProject.stack]);

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
                : 'opacity-0 translate-y-8'
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
            className={`max-w-5xl mx-auto relative transition-all duration-800 ease-out delay-200 ${
              isContainerInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Animated border container */}
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 animate-gradient-x">
              <div className="bg-white dark:bg-neutral-900 rounded-2xl p-10">
                <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12">
                  <div>
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
                            {featuredProject.category}
                          </Badge>
                          <Badge className="bg-green-500/10 text-green-700 dark:text-green-300">
                            {featuredProject.status}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                          {featuredProject.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{featuredProject.year}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CodeBracketIcon className="w-4 h-4" />
                            <span>
                              {featuredProject.stack.length} technologies
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                      {featuredProject.blurb}
                    </p>

                    {/* Project Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {projectFeatures}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {techStackBadges}
                      </div>
                    </div>

                    {/* Call to Action */}
                    <Button
                      onClick={handleOpenModal}
                      className="w-full md:w-auto"
                    >
                      View Project Details →
                    </Button>
                  </div>

                  {/* Project Preview (upgraded) */}
                  <div className="relative group">
                    <div className="flex h-full items-center justify-center">
                      {/* Gradient border */}
                      <div className="bg-gradient-to-br from-primary-500/40 via-primary-300/25 to-secondary-400/40 p-[1px] rounded-2xl">
                        {/* Card body */}
                        <div
                          className="relative rounded-2xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur
                   shadow-sm transition-all duration-300
                   group-hover:shadow-xl group-hover:-translate-y-1 h-full flex flex-col justify-center"
                        >
                          {/* Soft spotlight */}
                          <div
                            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                        group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                'radial-gradient(60% 50% at 50% 0%, rgba(79,195,247,0.08) 0%, rgba(0,0,0,0) 70%)',
                            }}
                          />

                          {/* Sheen on hover */}
                          <span
                            className="pointer-events-none absolute -inset-y-6 -left-1/3 w-2/3 rotate-6
                          bg-gradient-to-r from-transparent via-white/30 to-transparent
                          dark:via-white/10 blur-md opacity-0
                          group-hover:opacity-100 group-hover:translate-x-[120%]
                          transition-all duration-700"
                          />

                          <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                            {/* Icon orb */}
                            <div className="relative mb-5">
                              {/* ripple */}
                              <span
                                className="absolute inset-0 rounded-full bg-primary-400/15 dark:bg-primary-300/10
                             animate-ping"
                              />
                              <div
                                className="relative w-16 h-16 rounded-full grid place-content-center
                            bg-gradient-to-br from-primary-100 to-secondary-100
                            dark:from-primary-900/30 dark:to-secondary-900/30
                            ring-1 ring-primary-300/40 dark:ring-primary-700/40
                            shadow-md"
                              >
                                <RocketLaunchIcon className="w-8 h-8 text-primary-600 dark:text-primary-300" />
                              </div>
                            </div>

                            {/* Title */}
                            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 tracking-tight">
                              {featuredProject.category === 'Mobile Development'
                                ? 'Mobile App Demo'
                                : 'Live Demo Available'}
                            </h4>

                            {/* Copy */}
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
                              {featuredProject.category === 'Mobile Development'
                                ? 'Available on iOS & Android with full functionality.'
                                : 'Experience the full functionality with interactive features.'}
                            </p>

                            {/* Badges / Meta */}
                            <div className="flex flex-col items-center gap-2">
                              <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 border border-primary-300/30 dark:border-primary-700/30">
                                {featuredProject.category}
                              </Badge>

                              {featuredProject.category ===
                                'Mobile Development' && (
                                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                  <span className="px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                                    iOS & Android
                                  </span>
                                  <span className="px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                                    Full Features
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={featuredProject}
      />
    </>
  );
});

FeaturedProject.displayName = 'FeaturedProject';
