'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { AnimatedSection } from '../Common/AnimatedSection';

export const Experience: React.FC = () => {
  return (
    <AnimatedSection id="experience" title="Experience">
      <motion.div
        className="space-y-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {DATA.experience.map((exp) => (
          <motion.div
            key={exp.company}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Card className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">{exp.role}</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {exp.company}
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {exp.period}
                </p>
              </div>
              <motion.ul
                className="mt-3 space-y-2 list-disc list-inside marker:text-sky-600"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 1 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {exp.bullets.map((b, i) => (
                  <motion.li
                    className="text-sm leading-relaxed"
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    {b}
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
};
