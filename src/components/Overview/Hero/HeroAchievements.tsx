import React, { useMemo } from 'react';
import {
  StarIcon,
  RocketLaunchIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';

interface HeroAchievementsProps {
  heroData: {
    achievements: Array<{
      title: string;
      description: string;
      category: string;
    }>;
  };
  isInView: boolean;
}

export const HeroAchievements: React.FC<HeroAchievementsProps> = React.memo(
  ({ heroData, isInView }) => {
    // Memoize achievements for rendering
    const achievementsList = useMemo(
      () =>
        heroData.achievements.map((achievement, index) => {
          // Simple icon mapping
          const CategoryIcon =
            achievement.category === 'Academic'
              ? StarIcon
              : achievement.category === 'Professional'
                ? RocketLaunchIcon
                : BriefcaseIcon;

          return (
            <div
              key={achievement.title}
              className={`animation-delay-${index * 100}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <CategoryIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          );
        }),
      [heroData.achievements]
    );

    return (
      <div
        className={`transition-all duration-700 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
          Recent Achievements
        </h2>
        <div className="grid md:grid-cols-3 gap-6">{achievementsList}</div>
      </div>
    );
  }
);

HeroAchievements.displayName = 'HeroAchievements';
