'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Button } from '../Common/Button';
import { Badge } from '../Common/Badge';
import { SectionDivider } from '../Common/SectionDivider';
import { ProjectModal } from '../Common/ProjectModal';
import { 
  CalendarIcon, 
  CheckCircleIcon, 
  CodeBracketIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

export const FeaturedProject: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuredProject =
    DATA.projects.find((p) => p.highlight) || DATA.projects[0];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SectionDivider className="py-8" />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Featured Project</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            A showcase of my most impactful work, demonstrating technical skills
            and problem-solving approach.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated border container */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 animate-gradient-x">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-10">
              <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12">
                <div>
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
                          {featuredProject.category}
                        </Badge>
                        <Badge className="bg-green-500/10 text-green-700 dark:text-green-300">
                          {featuredProject.status}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                        {featuredProject.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{featuredProject.year}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CodeBracketIcon className="w-4 h-4" />
                          <span>{featuredProject.stack.length} technologies</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                    {featuredProject.blurb}
                  </p>

                  {/* Project Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                      Key Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {featuredProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.stack.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-neutral-100 dark:bg-neutral-800 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <Button
                    onClick={handleOpenModal}
                    className="w-full md:w-auto"
                  >
                    View Project Details →
                  </Button>
                </div>

                {/* Project Preview */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950/20 dark:to-secondary-950/20 rounded-xl p-8 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                      <RocketLaunchIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      Live Demo Available
                    </h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                      Experience the full functionality with interactive features
                    </p>
                    <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
                      {featuredProject.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>
      
      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={featuredProject}
      />
    </>
  );
};
