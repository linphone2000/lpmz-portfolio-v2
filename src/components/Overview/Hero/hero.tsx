'use client';

import React, { useCallback } from 'react';
import Typewriter from 'typewriter-effect';
import { DATA } from '@/lib/data';
import { Badge } from '@/components/Common/Badge';
import { Button } from '@/components/Common/Button';
import { useInView } from '@/hooks/useInView';
import {
  HeroStats,
  HeroTechSnapshot,
  HeroAchievements,
  HeroServices,
} from './index';

export const Hero: React.FC = React.memo(() => {
  // Direct data access for simplicity
  const heroData = {
    achievements: DATA.achievements.slice(0, 3),
    services: DATA.services,
    about: DATA.about,
    skills: DATA.skills,
    links: DATA.links,
    phone: DATA.phone,
    location: DATA.location,
    name: DATA.name,
    summary: DATA.summary,
  };

  const stats = {
    yearsExperience: DATA.about.yearsOfExperience,
    totalProjects: DATA.about.totalProjects,
    technologiesMastered: DATA.about.technologiesMastered,
    educationCount: DATA.education.length,
  };

  // Use custom in-view hooks for performance-optimized animations
  const [heroRef, isHeroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [achievementsRef, isAchievementsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [servicesRef, isServicesInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Memoized callbacks for performance
  const handleLinkedInClick = useCallback(() => {
    window.open(heroData.links.linkedin, '_blank');
  }, [heroData.links.linkedin]);

  const handleGitHubClick = useCallback(() => {
    window.open(heroData.links.github, '_blank');
  }, [heroData.links.github]);

  return (
    <section id="about" className="relative min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-16 w-full">
        <div
          ref={heroRef}
          className={`space-y-16 transition-all duration-700 ease-out ${
            isHeroInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Main Hero Content */}
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <Badge>{heroData.about.availability}</Badge>
                <Badge>{heroData.location}</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
                {heroData.name}
              </h1>
              <div className="mt-2 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
                <Typewriter
                  options={{
                    strings: heroData.about.typewriterStrings,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-1.5xl">
                {heroData.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={handleLinkedInClick}>LinkedIn</Button>
                <Button onClick={handleGitHubClick} variant="ghost">
                  GitHub
                </Button>
              </div>
            </div>

            {/* Enhanced Tech Snapshot */}
            <HeroTechSnapshot heroData={heroData} />
          </div>

          {/* Quick Stats */}
          <HeroStats stats={stats} />

          {/* Recent Achievements */}
          <div ref={achievementsRef}>
            <HeroAchievements
              heroData={heroData}
              isInView={isAchievementsInView}
            />
          </div>

          {/* Call-to-Action Cards */}
          <div ref={servicesRef}>
            <HeroServices heroData={heroData} isInView={isServicesInView} />
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
