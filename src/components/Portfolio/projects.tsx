'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { Button } from '../Common/Button';

export const Projects: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Projects</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A collection of my recent work, showcasing various technologies and
            problem-solving approaches.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{project.name}</h3>
                    {project.highlight && (
                      <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm leading-relaxed">
                    {project.blurb}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.stack.slice(0, 4).map((tech) => (
                      <Badge
                        key={tech}
                        className="text-xs bg-neutral-100 dark:bg-neutral-800"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.stack.length > 4 && (
                      <Badge className="text-xs bg-neutral-100 dark:bg-neutral-800">
                        +{project.stack.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
                {project.href && (
                  <Button
                    href={project.href}
                    className="w-full mt-auto"
                    variant="ghost"
                  >
                    View Details →
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
