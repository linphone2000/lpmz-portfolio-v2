'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Button } from '../Common/Button';
import { Badge } from '../Common/Badge';

export const FeaturedProject: React.FC = () => {
  const featuredProject =
    DATA.projects.find((p) => p.highlight) || DATA.projects[0];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Project</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A showcase of my most impactful work, demonstrating technical skills
            and problem-solving approach.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated border container */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 animate-gradient-x">
            <div className="bg-white dark:bg-[#0B1220] rounded-2xl p-8">
              <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold">
                      {featuredProject.name}
                    </h3>
                    <Badge className="bg-sky-500/10 text-sky-700 dark:text-sky-300">
                      Featured
                    </Badge>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {featuredProject.blurb}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.stack.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-slate-100 dark:bg-slate-800"
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
                <div className="bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/20 dark:to-cyan-950/20 rounded-xl p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚀</div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
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
