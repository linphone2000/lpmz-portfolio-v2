'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { useInView } from '../../hooks/useInView';
import { 
  PaintBrushIcon, 
  CogIcon, 
  ServerIcon, 
  CodeBracketIcon, 
  WrenchScrewdriverIcon, 
  CpuChipIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline';import { Contact } from '../Common/contact';

export const Skills: React.FC = () => {
  const skillCategories = [
    { title: 'Frontend', skills: DATA.skills.frontend, icon: <PaintBrushIcon className="w-8 h-8" /> },
    { title: 'Backend', skills: DATA.skills.backend, icon: <CogIcon className="w-8 h-8" /> },
    { title: 'Databases', skills: DATA.skills.databases, icon: <ServerIcon className="w-8 h-8" /> },
    { title: 'Languages', skills: DATA.skills.languages, icon: <CodeBracketIcon className="w-8 h-8" /> },
    { title: 'Tools', skills: DATA.skills.tools, icon: <WrenchScrewdriverIcon className="w-8 h-8" /> },
    { title: 'AI/ML', skills: DATA.skills.aiml, icon: <CpuChipIcon className="w-8 h-8" /> },
    { title: 'Soft Skills', skills: DATA.skills.soft, icon: <UserGroupIcon className="w-8 h-8" /> },
  ];

  // Use custom in-view hook for animations
  const [containerRef, isContainerInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
            Skills & Technologies
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and tools I use to
            build modern applications.
          </p>
        </div>

        <div
          ref={containerRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ease-out ${
            isContainerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-out animation-delay-${index * 100}`}
            >
              <Card className="h-full">
                <div className="text-2xl mb-3 text-primary-500">{category.icon}</div>
                <h3 className="text-lg font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-neutral-100 dark:bg-neutral-800 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <Contact />
    </section>
  );
};
