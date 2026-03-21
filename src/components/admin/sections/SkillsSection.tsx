'use client';

import type { PortfolioCMSData } from '@/lib/portfolio-content-shared';
import { Field, SectionCard, TextArea } from '@/components/admin/AdminFields';

type Props = {
  data: PortfolioCMSData;
  setData: React.Dispatch<React.SetStateAction<PortfolioCMSData>>;
};

const SKILL_GROUPS: { key: keyof PortfolioCMSData['skills']; label: string }[] =
  [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'databases', label: 'Databases' },
    { key: 'languages', label: 'Languages' },
    { key: 'tools', label: 'Tools' },
    { key: 'aiml', label: 'AI / ML' },
    { key: 'soft', label: 'Soft skills' },
  ];

const PROF_LEVELS = [
  { key: 'expert' as const, label: 'Expert' },
  { key: 'advanced' as const, label: 'Advanced' },
  { key: 'intermediate' as const, label: 'Intermediate' },
  { key: 'beginner' as const, label: 'Beginner' },
];

export function SkillsSection({ data, setData }: Props) {
  const skills = data.skills;

  const setGroup = (key: keyof PortfolioCMSData['skills'], lines: string) => {
    const arr = lines
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    setData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [key]: arr },
    }));
  };

  const setProficiency = (
    level: keyof PortfolioCMSData['skills']['proficiency'],
    lines: string
  ) => {
    const arr = lines
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        proficiency: { ...prev.skills.proficiency, [level]: arr },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Skill groups"
        description="One skill per line within each group."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map(({ key, label }) => (
            <Field key={key} label={label}>
              <TextArea
                value={(skills[key] as string[]).join('\n')}
                onChange={(e) => setGroup(key, e.target.value)}
              />
            </Field>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Proficiency tiers"
        description="Maps skills to experience levels for the skills visualization."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {PROF_LEVELS.map(({ key, label }) => (
            <Field key={key} label={label}>
              <TextArea
                value={skills.proficiency[key].join('\n')}
                onChange={(e) => setProficiency(key, e.target.value)}
              />
            </Field>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
