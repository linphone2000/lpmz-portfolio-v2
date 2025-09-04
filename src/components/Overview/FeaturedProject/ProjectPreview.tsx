import React, { useMemo } from 'react';
import { PhoneFrame } from '@/components/Common/PhoneFrame';

interface ProjectPreviewProps {
  project: {
    category: string;
    preview?: {
      featurePills?: string[];
    };
  };
  screenshotSrc: string;
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = React.memo(
  ({ project, screenshotSrc }) => {
    // Memoize feature pills
    const featurePills = useMemo(
      () =>
        project.preview?.featurePills?.map((pill: string, index: number) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded-full ${
              index === 0
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            }`}
          >
            {pill}
          </span>
        )) || (
          <>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
              Real-time Trading
            </span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
              Portfolio Analytics
            </span>
          </>
        ),
      [project.preview?.featurePills]
    );

    return (
      <div className="hidden md:block h-full">
        {/* Project Preview Card */}
        <div className="relative group h-full">
          {/* Gradient border */}
          <div className="project-preview-border p-[1px] rounded-2xl h-full">
            {/* Card body */}
            <div
              className="relative rounded-2xl project-preview-card
      shadow-sm transition-all duration-300
      group-hover:shadow-xl group-hover:-translate-y-1 h-full flex flex-col justify-center"
            >
              {/* Soft spotlight */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-300 spotlight-gradient"
              />

              {/* Sheen on hover */}
              <span
                className="pointer-events-none absolute -inset-y-6 -left-1/3 w-2/3 rotate-6
            sheen-effect blur-md opacity-0
            group-hover:opacity-100 group-hover:translate-x-[120%]
            transition-all duration-700"
              />

              <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center">
                {/* App Screenshot */}
                <div className="relative mb-4 sm:mb-6">
                  {/* Phone frame */}
                  <div className="relative w-30 h-64 sm:w-34 sm:h-72">
                    <PhoneFrame
                      src={screenshotSrc}
                      alt="PropertyApp Screenshot"
                      showHoverEffect={false}
                    />
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 w-40 h-64 sm:w-44 sm:h-72 phone-glow -z-10"></div>
                </div>

                {/* Title */}
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2 tracking-tight text-sm sm:text-base text-center">
                  {project.category === 'Mobile Development'
                    ? 'Property Investment App'
                    : 'Live Demo Available'}
                </h4>

                {/* Copy */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-md text-center">
                  {project.category === 'Mobile Development'
                    ? 'Advanced trading platform with real-time P&L tracking and portfolio analytics.'
                    : 'Experience the full functionality with interactive features.'}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {featurePills}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProjectPreview.displayName = 'ProjectPreview';
