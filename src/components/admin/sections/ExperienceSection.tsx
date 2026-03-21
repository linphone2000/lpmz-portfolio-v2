'use client';

import type { PortfolioCMSData } from '@/lib/portfolio-content-shared';
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from '@/components/admin/AdminFields';

type Props = {
  data: PortfolioCMSData;
  setData: React.Dispatch<React.SetStateAction<PortfolioCMSData>>;
};

export function ExperienceSection({ data, setData }: Props) {
  const items = data.experience;

  const updateAt = (index: number, patch: (typeof items)[0]) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((row, i) => (i === index ? patch : row)),
    }));
  };

  const add = () => {
    setData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: 'Company',
          role: 'Role',
          period: 'Period',
          location: 'Location',
          type: 'Full-time',
          bullets: ['Describe impact and responsibilities.'],
          technologies: ['TypeScript'],
        },
      ],
    }));
  };

  const remove = (index: number) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {items.map((exp, index) => (
        <SectionCard
          key={index}
          title={`Role ${index + 1}: ${exp.company}`}
          description="Bullets: one line each. Technologies: comma-separated."
        >
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-red-600 hover:underline"
              onClick={() => remove(index)}
            >
              Remove role
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Company">
              <TextInput
                value={exp.company}
                onChange={(e) =>
                  updateAt(index, { ...exp, company: e.target.value })
                }
              />
            </Field>
            <Field label="Role">
              <TextInput
                value={exp.role}
                onChange={(e) =>
                  updateAt(index, { ...exp, role: e.target.value })
                }
              />
            </Field>
            <Field label="Period">
              <TextInput
                value={exp.period}
                onChange={(e) =>
                  updateAt(index, { ...exp, period: e.target.value })
                }
              />
            </Field>
            <Field label="Location">
              <TextInput
                value={exp.location}
                onChange={(e) =>
                  updateAt(index, { ...exp, location: e.target.value })
                }
              />
            </Field>
            <Field label="Employment type">
              <TextInput
                value={exp.type}
                onChange={(e) =>
                  updateAt(index, { ...exp, type: e.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Bullets (one per line)">
            <TextArea
              value={exp.bullets.join('\n')}
              onChange={(e) =>
                updateAt(index, {
                  ...exp,
                  bullets: e.target.value
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
          <Field label="Technologies (comma-separated)">
            <TextInput
              value={exp.technologies.join(', ')}
              onChange={(e) =>
                updateAt(index, {
                  ...exp,
                  technologies: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
        </SectionCard>
      ))}

      <button
        type="button"
        onClick={add}
        className="w-full rounded-xl border border-dashed border-neutral-400 py-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        + Add experience
      </button>
    </div>
  );
}
