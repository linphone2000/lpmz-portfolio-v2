'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Button } from '../Common/Button';
import { Badge } from '../Common/Badge';

export const FeaturedProject: React.FC = () => {
  const featuredProject =
    DATA.projects.find((p) => p.highlight) || DATA.projects[0];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Featured Project</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            A showcase of my most impactful work, demonstrating technical skills
            and problem-solving approach.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Animated border container */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 animate-gradient-x">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-10">
              <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {featuredProject.name}
                    </h3>
                    <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
                      Featured
                    </Badge>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                    {featuredProject.blurb}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {featuredProject.stack.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-neutral-100 dark:bg-neutral-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {featuredProject.href && (
                    <Button
                      href={featuredProject.href}
                      className="w-full md:w-auto"
                    >
                      View Project Details →
                    </Button>
                  )}
                </div>
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/20 dark:to-secondary-950/20 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Interactive demo available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
