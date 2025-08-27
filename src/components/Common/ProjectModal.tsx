'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import { 
  CalendarIcon, 
  CheckCircleIcon, 
  CodeBracketIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Project {
  name: string;
  stack: string[];
  blurb: string;
  href?: string;
  highlight?: boolean;
  category: string;
  year: number;
  status: string;
  features: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  project 
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.name}
      size="xl"
    >
      <div className="space-y-8">
        {/* Project Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300">
                {project.category}
              </Badge>
              <Badge className="bg-green-500/10 text-green-700 dark:text-green-300">
                {project.status}
              </Badge>
              {project.highlight && (
                <Badge className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300">
                  Featured
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <CodeBracketIcon className="w-4 h-4" />
                <span>{project.stack.length} technologies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                <span>{project.features.length} features</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            Project Overview
          </h3>
          <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {project.blurb}
          </p>
        </div>

        {/* Key Features */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Key Features
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
              >
                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
            <div className="flex items-center gap-2 mb-2">
              <RocketLaunchIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Development Approach
              </h4>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Built with modern development practices, focusing on scalability, maintainability, and user experience.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
            <div className="flex items-center gap-2 mb-2">
              <UserGroupIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                Target Users
              </h4>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Designed for {project.category.toLowerCase()} professionals and end-users seeking efficient solutions.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          {project.href && project.href !== '#' && (
            <Button href={project.href} className="flex-1">
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              View Live Project
            </Button>
          )}
          <Button 
            onClick={onClose} 
            variant="ghost" 
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
