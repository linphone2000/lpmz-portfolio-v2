'use client';

import React, { useMemo, useState } from 'react';
import { DATA } from '../../lib/data';
import { Card } from '../Common/Card';
import { Badge } from '../Common/Badge';
import { Button } from '../Common/Button';
import { AnimatedSection } from '../Common/AnimatedSection';

// Utility function for filtering projects
const normalize = (s: string) =>
  (s ?? '').toLowerCase().trim().replace(/\s+/g, ' ');

type Project = {
  name: string;
  stack: string[];
  blurb: string;
  href?: string;
  highlight?: boolean;
};

export function filterProjects(projects: Project[], query: string): Project[] {
  const q = normalize(query);
  if (!q) return projects;
  return projects.filter((p) => {
    const name = normalize(p.name);
    const stacks = (p.stack ?? []).map((s: string) => normalize(s));
    return name.includes(q) || stacks.some((s: string) => s.includes(q));
  });
}

export const Projects: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(
    () => filterProjects(DATA.projects, query),
    [query]
  );

  return (
    <AnimatedSection id="projects" title="Projects">
      <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Explore featured work and academic builds.
        </p>
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name or tech…"
            className="w-full sm:w-64 rounded-xl border border-black/10 dark:border-white/20 bg-white/70 dark:bg-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <Card
            key={p.name}
            className={p.highlight ? 'ring-1 ring-sky-500/30' : ''}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold leading-tight">{p.name}</h3>
              {p.highlight && <Badge className="bg-sky-500/10">Featured</Badge>}
            </div>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              {p.blurb}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s: string) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
            {p.href && (
              <div className="mt-4">
                <Button href={p.href} variant="ghost">
                  View details →
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </AnimatedSection>
  );
};
