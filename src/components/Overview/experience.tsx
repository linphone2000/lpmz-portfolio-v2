'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';

export const Experience: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My professional journey in software development, focusing on mobile
            and web technologies.
          </p>
        </div>

        <div className="space-y-8">
          {DATA.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-500 to-cyan-500" />
                <div className="pl-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-sky-600 dark:text-sky-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <Badge className="bg-sky-500/10 text-sky-700 dark:text-sky-300 w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-sky-500 mt-1.5">•</span>
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
  );
};
