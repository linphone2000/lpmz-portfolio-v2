'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { DATA } from '@/lib/data';
import { Badge } from '@/components/Common/Badge';
import { Button } from '@/components/Common/Button';
import { useInView } from '@/hooks/useInView';
import {
  CodeBracketIcon,
  TrophyIcon,
  ChartBarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface HeroProps {
  onTabChange?: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = React.memo(() => {
  const [heroRef, isHeroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Animated counter for stats
  const [counts, setCounts] = useState({
    years: 0,
    projects: 0,
    tech: 0,
  });

  useEffect(() => {
    if (isHeroInView) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const targets = {
        years: DATA.about.yearsOfExperience,
        projects: DATA.about.totalProjects,
        tech: DATA.about.technologiesMastered,
      };

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          years: Math.floor(targets.years * progress),
          projects: Math.floor(targets.projects * progress),
          tech: Math.floor(targets.tech * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setCounts(targets);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isHeroInView]);

  const handleLinkedInClick = useCallback(() => {
    window.open(DATA.links.linkedin, '_blank');
  }, []);

  const handleGitHubClick = useCallback(() => {
    window.open(DATA.links.github, '_blank');
  }, []);

  // Top 6 skills for display
  const topSkills = [
    ...DATA.skills.frontend.slice(0, 2),
    ...DATA.skills.backend.slice(0, 2),
    ...DATA.skills.databases.slice(0, 2),
  ];

  return (
    <section id="about" className="relative py-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div
          ref={heroRef}
          className={`transition-all duration-1000 ease-out ${
            isHeroInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)]">
            {/* Main Card - Spans 2 rows, 6 columns */}
            <div
              className={`md:col-span-6 md:row-span-2 group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-white/80 to-white/40 dark:from-neutral-900/80 dark:to-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]`}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all duration-500" />

              <div className="relative z-10 space-y-6">
                {/* Badges */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                    {DATA.about.availability}
                  </Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                    📍 {DATA.location}
                  </Badge>
                </div>

                {/* Name */}
                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight text-neutral-900 dark:text-neutral-100">
                    {DATA.name}
                  </h1>
                  <div className="text-xl text-neutral-600 dark:text-neutral-300 min-h-[32px]">
                    <Typewriter
                      options={{
                        strings: DATA.about.typewriterStrings,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </div>
                </div>

                {/* Value Proposition */}
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {DATA.about.valueProposition || DATA.summary}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    href="/services"
                    className="group/btn relative overflow-hidden"
                  >
                    <span className="relative z-10">View Services →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  </Button>
                  <Button onClick={handleLinkedInClick} variant="ghost">
                    LinkedIn →
                  </Button>
                  <Button onClick={handleGitHubClick} variant="ghost">
                    GitHub →
                  </Button>
                </div>
              </div>

              {/* Decorative gradient orb */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Stats Card */}
            <div className="md:col-span-3 md:row-span-1 rounded-3xl p-6 bg-gradient-to-br from-primary-50/80 to-primary-100/40 dark:from-primary-900/20 dark:to-primary-800/10 backdrop-blur-xl border border-primary-200/50 dark:border-primary-700/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
              <div className="flex items-center gap-2 mb-4">
                <ChartBarIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Stats
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {counts.years}+
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {DATA.about.yearsLabel || 'Years Coding'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {counts.projects}+
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Projects Built
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {counts.tech}+
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    Technologies
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="md:col-span-3 md:row-span-1 rounded-3xl p-6 bg-gradient-to-br from-secondary-50/80 to-secondary-100/40 dark:from-secondary-900/20 dark:to-secondary-800/10 backdrop-blur-xl border border-secondary-200/50 dark:border-secondary-700/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
              <div className="flex items-center gap-2 mb-4">
                <CodeBracketIcon className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Tech Stack
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((skill, index) => (
                  <Badge
                    key={skill}
                    className={`text-xs bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 border-secondary-200 dark:border-secondary-800 hover:scale-110 transition-transform duration-300 opacity-0 animate-[fadeInScale_0.4s_ease-out_forwards]`}
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Achievement Card */}
            <div className="md:col-span-3 md:row-span-1 rounded-3xl p-6 bg-gradient-to-br from-amber-50/80 to-amber-100/40 dark:from-amber-900/20 dark:to-amber-800/10 backdrop-blur-xl border border-amber-200/50 dark:border-amber-700/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
              <div className="flex items-center gap-2 mb-3">
                <TrophyIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Latest
                </h3>
              </div>
              <div>
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {DATA.achievements[0]?.title}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  {DATA.achievements[0]?.description}.
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            {/* <div className="md:col-span-3 md:row-span-1 rounded-3xl p-6 bg-gradient-to-br from-purple-50/80 to-purple-100/40 dark:from-purple-900/20 dark:to-purple-800/10 backdrop-blur-xl border border-purple-200/50 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
              <div className="flex items-center gap-2 mb-3">
                <RocketLaunchIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Quick Access
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Portfolio', icon: BriefcaseIcon },
                  { label: 'Experience', icon: AcademicCapIcon },
                  { label: 'Contact', icon: EnvelopeIcon },
                ].map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={`#${link.label.toLowerCase()}`}
                      onClick={(e) => handleQuickLinkClick(link.label, e)}
                      className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors hover:translate-x-1 transform duration-200 cursor-pointer"
                    >
                      <IconComponent className="w-4 h-4" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div> */}

            {/* Location Card */}
            <div className="md:col-span-3 md:row-span-1 rounded-3xl p-6 bg-gradient-to-br from-purple-50/80 to-purple-100/40 dark:from-purple-900/20 dark:to-purple-800/10 backdrop-blur-xl border border-purple-200/50 dark:border-purple-700/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
              <div className="flex items-center gap-2 mb-3">
                <MapPinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Location
                </h3>
              </div>
              <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {DATA.location}
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">
                On-site & Remote
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
