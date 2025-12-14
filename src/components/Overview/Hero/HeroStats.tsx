import React from 'react';

interface HeroStatsProps {
  stats: {
    yearsExperience: number;
    totalProjects: number;
    technologiesMastered: number;
    educationCount: number;
  };
}

export const HeroStats: React.FC<HeroStatsProps> = React.memo(({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
          {stats.yearsExperience}+
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Years Coding
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
          {stats.totalProjects}+
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Projects Built
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
          {stats.technologiesMastered}+
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Technologies
        </div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
          {stats.educationCount}
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          Qualifications
        </div>
      </div>
    </div>
  );
});

HeroStats.displayName = 'HeroStats';
