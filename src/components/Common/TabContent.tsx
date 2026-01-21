'use client';

import React, { useMemo } from 'react';
import { Hero } from '@/components/Overview/Hero/hero';
import { Experience } from '@/components/Overview/Experience/experience';
import { FeaturedProject } from '@/components/Overview/FeaturedProject/FeaturedProject';
import { Projects } from '../Portfolio/projects';
import { Skills } from '../Portfolio/skills';
import { Education } from '../Education/education';
import { Certifications } from '../Education/certifications';
import { ServicesContent } from '../Services/ServicesContent';

interface TabContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabContent: React.FC<TabContentProps> = React.memo(
  ({ activeTab, onTabChange }) => {
    // Memoize tab content to prevent unnecessary re-renders
    const tabContent = useMemo(() => {
      switch (activeTab) {
        case 'home':
          return (
            <div>
              <Hero onTabChange={onTabChange} />
              <FeaturedProject />
              <Experience />
            </div>
          );
        case 'services':
          return (
            <div>
              <ServicesContent />
            </div>
          );
        case 'portfolio':
          return (
            <div>
              <Projects />
              <Skills />
            </div>
          );
        case 'about':
          return (
            <div>
              <Education />
              <Certifications />
            </div>
          );
        default:
          return (
            <div>
              <ServicesContent />
            </div>
          );
      }
    }, [activeTab, onTabChange]);

    return tabContent;
  }
);

TabContent.displayName = 'TabContent';
