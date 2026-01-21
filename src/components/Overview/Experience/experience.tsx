'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import { DATA } from '@/lib/data';
import { Card } from '@/components/Common/Card';
import { Badge } from '@/components/Common/Badge';

export const Experience: React.FC = () => {
  const [containerRef, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });
  return (
    <>
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
              Experience
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              My professional journey in software development, focusing on
              mobile and web technologies.
            </p>
          </div>

          <div
            ref={containerRef}
            className={`space-y-6 transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {DATA.experience.map((exp, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ease-out animation-delay-${index * 100}`}
              >
                <Card className="relative overflow-hidden px-8 py-4">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500" />
                  <div className="">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                          {exp.role}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
                        <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 w-fit">
                          {exp.period}
                        </Badge>
                        {exp.type && exp.type !== 'Full-time' && (
                          <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-300 w-fit border border-blue-500/20">
                            {exp.type}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={bulletIndex}
                          className="flex items-start gap-2 text-neutral-600 dark:text-neutral-300"
                        >
                          <span className="text-primary-500 mt-1.5">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
