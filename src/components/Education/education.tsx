'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { useInView } from '../../hooks/useInView';
import {
  AcademicCapIcon,
  MapPinIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

export const Education: React.FC = () => {
  // Use custom in-view hook for animations
  const [containerRef, isContainerInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Education
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            My academic background and continuous learning journey in software
            development and computing.
          </p>
        </div>

        <div
          ref={containerRef}
          className={`grid md:grid-cols-2 gap-6 transition-all duration-700 ease-out ${
            isContainerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {DATA.education.map((edu, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out animation-delay-${index * 100}`}
            >
              <Card className="h-full flex flex-col px-8 py-4">
                <div className="text-2xl mb-3 text-primary-500">
                  <AcademicCapIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                  {edu.school}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-3">
                  {edu.credential}
                </p>

                {/* Location and Period */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 flex items-center gap-1">
                    <MapPinIcon className="w-3 h-3" />
                    {edu.location}
                  </Badge>
                  <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
                    {edu.period}
                  </Badge>
                  {edu.gpa && (
                    <Badge className="bg-green-500/10 text-green-700 dark:text-green-300 flex items-center gap-1">
                      <TrophyIcon className="w-3 h-3" />
                      {edu.gpa}
                    </Badge>
                  )}
                </div>

                {/* Relevant Courses */}
                {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                      Relevant Courses
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, courseIndex) => (
                        <Badge
                          key={courseIndex}
                          className="text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors border-neutral-200 dark:border-neutral-700"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
