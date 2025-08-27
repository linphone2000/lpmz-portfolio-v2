'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { SectionDivider } from '../Common/SectionDivider';

export const Experience: React.FC = () => {
  return (
    <>
      <SectionDivider className="py-8" />
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Experience</h2>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            My professional journey in software development, focusing on mobile
            and web technologies.
          </p>
        </div>

        <div className="space-y-12">
          {DATA.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500" />
                <div className="pl-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">{exp.role}</h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <Badge className="bg-primary-500/10 text-primary-700 dark:text-primary-300 w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-neutral-600 dark:text-neutral-300"
                      >
                        <span className="text-primary-500 mt-1.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
    </>
  );
};
