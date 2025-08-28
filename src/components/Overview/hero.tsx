'use client';

import React, { useCallback, useMemo } from 'react';
import Typewriter from 'typewriter-effect';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { Button } from '../Common/Button';
import { useInView } from '../../hooks/useInView';

import {
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export const Hero: React.FC = React.memo(() => {
  // Use custom in-view hooks for performance-optimized animations
  const [heroRef, isHeroInView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });
  const [achievementsRef, isAchievementsInView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });
  const [servicesRef, isServicesInView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true 
  });

  // Memoized callbacks for performance
  const handleLinkedInClick = useCallback(() => {
    window.open(DATA.links.linkedin, '_blank');
  }, []);

  const handleCallClick = useCallback(() => {
    window.open(`tel:${DATA.phone.replace(/\s/g, '')}`, '_self');
  }, []);

  // Memoize achievements for rendering
  const achievementsList = useMemo(() => 
    DATA.achievements.slice(0, 3).map((achievement, index) => (
      <div
        key={achievement.title}
        className={`flex items-start gap-3 transition-all duration-600 ease-out ${
          isAchievementsInView 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-6'
        }`}
        style={{
          transitionDelay: `${index * 100}ms`
        }}
      >
        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
          {achievement.category === 'Academic' && (
            <StarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          )}
          {achievement.category === 'Professional' && (
            <RocketLaunchIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          )}
          {achievement.category !== 'Academic' &&
            achievement.category !== 'Professional' && (
              <BriefcaseIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            )}
        </div>
        <div>
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
            {achievement.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {achievement.description}
          </p>
        </div>
      </div>
    ))
  , [isAchievementsInView]);

  // Memoize services for rendering
  const servicesList = useMemo(() => 
    DATA.services.map((service, index) => (
      <div
        key={service.title}
        className={`p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-600 ease-out ${
          isServicesInView 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-6 scale-95'
        }`}
        style={{
          transitionDelay: `${index * 100}ms`
        }}
      >
        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
          {service.icon === 'mobile' && (
            <BriefcaseIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          )}
          {service.icon === 'fullstack' && (
            <AcademicCapIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          )}
          {service.icon === 'architecture' && (
            <StarIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
          {service.title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
          {service.description}
        </p>
        <Badge className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
          {service.technologies.join(' • ')}
        </Badge>
      </div>
    ))
  , [isServicesInView]);

  return (
    <section
      id="about"
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-16 w-full">
        <div
          ref={heroRef}
          className={`space-y-16 transition-all duration-700 ease-out ${
            isHeroInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Hero Content */}
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <Badge>{DATA.about.availability}</Badge>
                <Badge>{DATA.location}</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
                {DATA.name}
              </h1>
              <div className="mt-2 text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
                <Typewriter
                  options={{
                    strings: DATA.about.typewriterStrings,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300 max-w-1.5xl">
                {DATA.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={handleLinkedInClick}>LinkedIn</Button>
                <Button
                  onClick={handleCallClick}
                  variant="ghost"
                >
                  Call
                </Button>
              </div>
            </div>

            {/* Enhanced Tech Snapshot */}
            <Card className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-primary-500/20 to-secondary-400/10 blur-2xl" />
              <div className="relative">
                <h3 className="font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                  Tech Expertise
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {DATA.skills.frontend.map((skill) => (
                        <Badge key={skill} className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Backend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {DATA.skills.backend.map((skill) => (
                        <Badge key={skill} className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      Databases
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {DATA.skills.databases.map((skill) => (
                        <Badge key={skill} className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {DATA.about.tagline}
                </p>
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.about.yearsOfExperience}+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Years Experience
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.about.totalProjects}+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Projects Built
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.about.technologiesMastered}+
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Technologies
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                {DATA.education.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Qualifications
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div ref={achievementsRef}>
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
              Recent Achievements
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {achievementsList}
            </div>
          </div>

          {/* Call-to-Action Cards */}
          <div ref={servicesRef}>
            <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
              What I Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {servicesList}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
