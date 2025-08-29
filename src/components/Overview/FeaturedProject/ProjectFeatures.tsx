import React, { useMemo } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface ProjectFeaturesProps {
  features: string[];
}

export const ProjectFeatures: React.FC<ProjectFeaturesProps> = React.memo(({ features }) => {
  // Memoize project features for rendering
  const projectFeatures = useMemo(
    () =>
      features.map((feature: string, index: number) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
        >
          <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span>{feature}</span>
        </div>
      )),
    [features]
  );

  return (
    <div className="mb-6 sm:mb-8">
      <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
        Key Features
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {projectFeatures}
      </div>
    </div>
  );
});

ProjectFeatures.displayName = 'ProjectFeatures';
