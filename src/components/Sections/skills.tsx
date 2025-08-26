'use client';

import React from 'react';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { AnimatedSection } from '../Common/AnimatedSection';

export const Skills: React.FC = () => {
  return (
    <AnimatedSection id="skills" title="Skills">
      <div className="grid md:grid-cols-2 gap-5">
        {Object.entries(DATA.skills).map(([group, items], index) => (
          <Card
            key={group}
            className="hover:scale-105 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <h3 className="font-semibold mb-2 capitalize">{group}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map((s, i) => (
                <Badge
                  key={s}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
};
