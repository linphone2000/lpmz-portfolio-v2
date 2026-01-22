'use client';

import React, { useMemo } from 'react';
import { useInView } from '@/hooks/useInView';
import { DATA } from '@/lib/data';
import { Card } from '@/components/Common/Card';
import { Badge } from '@/components/Common/Badge';
import { SectionDivider } from '@/components/Common/SectionDivider';
import {
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

interface ClientProject {
  clientName: string;
  projectType: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ClientWork: React.FC = () => {
  const [containerRef, isInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Extract and parse client data from freelance experience
  const clientProjects = useMemo(() => {
    const freelanceExp = DATA.experience.find(
      (exp) => exp.type === 'Freelance'
    );
    if (!freelanceExp || !freelanceExp.bullets) return [];

    const projects: ClientProject[] = [];

    freelanceExp.bullets.forEach((bullet) => {
      // Extract client name from parentheses - handle both "Client: X" and direct name formats
      const clientMatchWithLabel = bullet.match(/\(Client:\s*([^)]+)\)/);
      const clientMatchDirect = bullet.match(/\(([^)]+)\)/);

      let clientName: string | null = null;
      if (clientMatchWithLabel) {
        clientName = clientMatchWithLabel[1];
      } else if (clientMatchDirect && !bullet.includes('Client:')) {
        // Check if it's a client name (not just project info in parentheses)
        const potentialClient = clientMatchDirect[1];
        // If it looks like a company/institution name (has capital letters, not just tech terms)
        if (/^[A-Z]/.test(potentialClient) && potentialClient.length > 3) {
          clientName = potentialClient;
        }
      }

      // Extract project type (text before colon or parentheses)
      const projectTypeMatch = bullet.match(/^([^:(]+?)(?:\s*\(|:)/);
      const projectType = projectTypeMatch
        ? projectTypeMatch[1].trim()
        : 'Project';

      // Extract description (text after colon, clean up)
      const descriptionMatch = bullet.match(/:\s*(.+)/);
      let description = descriptionMatch ? descriptionMatch[1].trim() : bullet;

      // Remove client reference from description if present
      description = description.replace(/\(Client:\s*[^)]+\)/g, '').trim();
      // Remove direct client name in parentheses if it appears
      if (clientName) {
        description = description
          .replace(new RegExp(`\\(${clientName}\\)`, 'g'), '')
          .trim();
      }
      // Remove project name prefix if it appears in description
      description = description.replace(/^[^:]+:\s*/, '').trim();

      // Truncate description to reasonable length
      if (description.length > 150) {
        description = description.substring(0, 150) + '...';
      }

      // Determine icon based on project type
      let icon: React.ComponentType<{ className?: string }> =
        BuildingOfficeIcon;
      if (
        projectType.toLowerCase().includes('e-commerce') ||
        projectType.toLowerCase().includes('commerce')
      ) {
        icon = ShoppingBagIcon;
      } else if (
        projectType.toLowerCase().includes('edtech') ||
        projectType.toLowerCase().includes('education')
      ) {
        icon = AcademicCapIcon;
      } else if (
        projectType.toLowerCase().includes('mobile') ||
        projectType.toLowerCase().includes('pos')
      ) {
        icon = DevicePhoneMobileIcon;
      }

      // Handle projects without explicit client names
      if (!clientName) {
        // Mobile First POS System doesn't have a client
        if (projectType.toLowerCase().includes('mobile first pos')) {
          projects.push({
            clientName: 'Ongoing Project',
            projectType: 'Mobile POS System',
            description,
            icon,
          });
        }
      } else {
        projects.push({
          clientName,
          projectType,
          description,
          icon,
        });
      }
    });

    return projects;
  }, []);

  if (clientProjects.length === 0) return null;

  return (
    <>
      <SectionDivider className="py-8" />
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
              Client Work
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Active freelance projects and client collaborations, delivering
              scalable solutions across mobile and web platforms.
            </p>
          </div>

          <div
            ref={containerRef}
            className={`relative transition-all duration-700 ease-out ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div
              className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/30 via-primary-500/15 to-primary-500/30 pointer-events-none"
              aria-hidden
            />

            <div className="space-y-12 md:space-y-16">
              {clientProjects.map((project, index) => {
                const IconComponent = project.icon;
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`relative md:grid md:grid-cols-2 md:items-center md:gap-8 lg:gap-12 transition-all duration-500 ease-out animation-delay-${index * 100}`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[22px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="absolute h-full w-full rounded-full bg-primary-500/20" />
                        <span className="relative h-3 w-3 rounded-full bg-primary-600 border-2 border-white dark:border-neutral-900" />
                      </span>
                    </div>

                    {/* Card wrapper */}
                    <div
                      className={`${
                        isLeft
                          ? 'md:pr-12 md:text-right md:pl-0'
                          : 'md:col-start-2 md:pl-12 md:text-left'
                      } ml-10 md:ml-0 relative`}
                    >
                      <div
                        className={`hidden md:block absolute top-1/2 h-px w-12 bg-primary-500/20 ${
                          isLeft
                            ? 'right-1/2 translate-x-3'
                            : 'left-1/2 -translate-x-3'
                        }`}
                        aria-hidden
                      />

                      <Card className="relative overflow-hidden px-6 py-5 md:px-8 md:py-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-900/30 flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                              <div>
                                <h3 className="text-xl font-bold mb-1 text-neutral-900 dark:text-neutral-100">
                                  {project.clientName}
                                </h3>
                                <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 w-fit">
                                  {project.projectType}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
