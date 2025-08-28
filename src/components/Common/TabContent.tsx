'use client';

import React, { useMemo } from 'react';
import { Hero } from '../Overview/hero';
import { Experience } from '../Overview/experience';
import { FeaturedProject } from '../Overview/FeaturedProject';
import { Projects } from '../Portfolio/projects';
import { Skills } from '../Portfolio/skills';
import { Education } from '../Education/education';
import { Certifications } from '../Education/certifications';

interface TabContentProps {
  activeTab: string;
}

export const TabContent: React.FC<TabContentProps> = React.memo(({ activeTab }) => {
  // Memoize tab content to prevent unnecessary re-renders
  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <Hero />
            <FeaturedProject />
            <Experience />
          </div>
        );
      case 'portfolio':
        return (
          <div>
            <Projects />
            <Skills />
          </div>
        );
      case 'education':
        return (
          <div>
            <Education />
            <Certifications />
          </div>
        );
      default:
        return (
          <div>
            <Hero />
            <FeaturedProject />
            <Experience />
          </div>
        );
    }
  }, [activeTab]);

  return tabContent;
});

TabContent.displayName = 'TabContent';
