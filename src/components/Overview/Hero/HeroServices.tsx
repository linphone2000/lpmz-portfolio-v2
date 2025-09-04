import React, { useMemo } from 'react';
import { Badge } from '@/components/Common/Badge';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface HeroServicesProps {
  heroData: {
    services: Array<{
      title: string;
      description: string;
      icon: string;
      technologies: string[];
    }>;
  };
  isInView: boolean;
}

export const HeroServices: React.FC<HeroServicesProps> = React.memo(
  ({ heroData, isInView }) => {
    // Memoize services for rendering
    const servicesList = useMemo(
      () =>
        heroData.services.map((service, index) => {
          // Simple icon mapping
          const ServiceIcon =
            service.icon === 'mobile'
              ? BriefcaseIcon
              : service.icon === 'fullstack'
                ? AcademicCapIcon
                : service.icon === 'architecture'
                  ? StarIcon
                  : BriefcaseIcon;

          return (
            <div
              key={service.title}
              className={`p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 animation-delay-${index * 100}`}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <ServiceIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                {service.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {service.description}
              </p>
              <Badge className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                {service.technologies.join(' • ')}
              </Badge>
            </div>
          );
        }),
      [heroData.services]
    );

    return (
      <div
        className={`transition-all duration-700 ease-out ${
          isInView
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-6 scale-95'
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
          What I Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-6">{servicesList}</div>
      </div>
    );
  }
);

HeroServices.displayName = 'HeroServices';
