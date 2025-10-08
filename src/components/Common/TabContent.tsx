'use client';

import React, { useMemo } from 'react';
import { Hero } from '@/components/Overview/Hero/hero';
import { Experience } from '@/components/Overview/Experience/experience';
import { FeaturedProject } from '@/components/Overview/FeaturedProject/FeaturedProject';
import { Projects } from '../Portfolio/projects';
import { Skills } from '../Portfolio/skills';
import { Education } from '../Education/education';
import { Certifications } from '../Education/certifications';

interface TabContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabContent: React.FC<TabContentProps> = React.memo(
  ({ activeTab, onTabChange }) => {
    // Memoize tab content to prevent unnecessary re-renders
    const tabContent = useMemo(() => {
      switch (activeTab) {
        case 'overview':
          return (
            <div>
              <Hero onTabChange={onTabChange} />
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
              <Hero onTabChange={onTabChange} />
              <FeaturedProject />
              <Experience />
            </div>
          );
      }
    }, [activeTab, onTabChange]);

    return tabContent;
  }
);

TabContent.displayName = 'TabContent';
