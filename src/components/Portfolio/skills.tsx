'use client';

import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { DATA } from '../../lib/data';
import { Badge } from '../Common/Badge';
import { useInView } from '../../hooks/useInView';
import {
  PaintBrushIcon,
  CogIcon,
  ServerIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Contact } from '../Common/contact';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Skills: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Enhanced skill categories with more creative styling
  const skillCategories = useMemo(() => {
    const categories = [
      {
        title: 'Frontend',
        subtitle: 'User Experience',
        skills: DATA.skills.frontend,
        icon: <PaintBrushIcon className="w-8 h-8" />,
        color: 'text-blue-500',
        bgColor:
          'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        glowColor: 'shadow-blue-200/50 dark:shadow-blue-800/50',
        description: 'Creating beautiful, responsive user interfaces',
        accent: 'from-blue-400 to-indigo-500',
      },
      {
        title: 'Backend',
        subtitle: 'Server Logic',
        skills: DATA.skills.backend,
        icon: <CogIcon className="w-8 h-8" />,
        color: 'text-green-500',
        bgColor:
          'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        glowColor: 'shadow-green-200/50 dark:shadow-green-800/50',
        description: 'Building robust server-side applications',
        accent: 'from-green-400 to-emerald-500',
      },
      {
        title: 'Databases',
        subtitle: 'Data Management',
        skills: DATA.skills.databases,
        icon: <ServerIcon className="w-8 h-8" />,
        color: 'text-purple-500',
        bgColor:
          'bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        glowColor: 'shadow-purple-200/50 dark:shadow-purple-800/50',
        description: 'Designing efficient data storage solutions',
        accent: 'from-purple-400 to-violet-500',
      },
      {
        title: 'Languages',
        subtitle: 'Code Foundation',
        skills: DATA.skills.languages,
        icon: <CodeBracketIcon className="w-8 h-8" />,
        color: 'text-orange-500',
        bgColor:
          'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        glowColor: 'shadow-orange-200/50 dark:shadow-orange-800/50',
        description: 'Mastering multiple programming languages',
        accent: 'from-orange-400 to-amber-500',
      },
      {
        title: 'Tools',
        subtitle: 'Development Arsenal',
        skills: DATA.skills.tools,
        icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
        color: 'text-red-500',
        bgColor:
          'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        glowColor: 'shadow-red-200/50 dark:shadow-red-800/50',
        description: 'Essential tools for modern development',
        accent: 'from-red-400 to-rose-500',
      },
      {
        title: 'AI/ML',
        subtitle: 'Future Tech',
        skills: DATA.skills.aiml,
        icon: <CpuChipIcon className="w-8 h-8" />,
        color: 'text-indigo-500',
        bgColor:
          'bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
        borderColor: 'border-indigo-200 dark:border-indigo-800',
        glowColor: 'shadow-indigo-200/50 dark:shadow-indigo-800/50',
        description: 'Exploring artificial intelligence and machine learning',
        accent: 'from-indigo-400 to-purple-500',
      },
      {
        title: 'Soft Skills',
        subtitle: 'Human Touch',
        skills: DATA.skills.soft,
        icon: <UserGroupIcon className="w-8 h-8" />,
        color: 'text-pink-500',
        bgColor:
          'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
        borderColor: 'border-pink-200 dark:border-pink-800',
        glowColor: 'shadow-pink-200/50 dark:shadow-pink-800/50',
        description: 'Essential skills for team collaboration',
        accent: 'from-pink-400 to-rose-500',
      },
    ];

    return categories;
  }, []);

  // Use custom in-view hook for animations
  const [containerRef, isContainerInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 border border-primary-200 dark:border-primary-800 mb-6">
            <SparklesIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Technical Arsenal
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-neutral-900 via-primary-600 to-secondary-600 dark:from-neutral-100 dark:via-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
            A comprehensive arsenal of modern technologies and tools I use to
            craft exceptional digital experiences.
          </p>
        </div>

        {/* Skills Carousel - Swiper Implementation */}
        <div
          ref={containerRef}
          className={`relative transition-all duration-700 ease-out ${
            isContainerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            className="relative pt-8 pb-16 mx-auto overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView="auto"
              loop={true}
              loopAdditionalSlides={2}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={5000}
              allowTouchMove={true}
              grabCursor={true}
              className="skills-swiper"
              style={
                {
                  '--swiper-navigation-color': '#0ea5e9',
                  '--swiper-pagination-color': '#0ea5e9',
                } as React.CSSProperties
              }
            >
              {skillCategories.map((category, index) => (
                <SwiperSlide key={category.title} className="!w-80">
                  <div
                    className="h-full"
                    onMouseEnter={() => setHoveredCategory(category.title)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div
                      className={`group relative h-72 rounded-3xl border-2 ${category.borderColor} ${category.bgColor} p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-${category.glowColor} cursor-pointer flex flex-col`}
                    >
                      {/* Floating Icon */}
                      <div
                        className={`absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-gradient-to-br ${category.accent} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {category.icon}
                      </div>

                      {/* Category Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                          {category.subtitle}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                          {category.description}
                        </p>
                      </div>

                      {/* Skills Grid - Fixed height with scroll */}
                      <div className="flex-1 overflow-hidden">
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 scrollbar-track-transparent">
                          {category.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skill}
                              className="bg-white/80 dark:bg-neutral-800/80 text-sm hover:scale-110 hover:shadow-md transition-all duration-200 border border-white/40 dark:border-neutral-700/40"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      {hoveredCategory === category.title && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Contact */}
      <Contact />
    </section>
  );
};
