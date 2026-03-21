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

export function EducationSection({ data, setData }: Props) {
  const items = data.education;

  const updateAt = (index: number, row: (typeof items)[number]) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e, i) => (i === index ? row : e)),
    }));
  };

  const add = () => {
    setData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          school: 'School name',
          credential: 'Degree or program',
          period: 'Years',
          location: 'City, Country',
          gpa: '',
          relevantCourses: ['Course name'],
        },
      ],
    }));
  };

  const remove = (index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {items.map((ed, index) => (
        <SectionCard key={index} title={`Education ${index + 1}: ${ed.school}`}>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-red-600 hover:underline"
              onClick={() => remove(index)}
            >
              Remove entry
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="School">
              <TextInput
                value={ed.school}
                onChange={(e) =>
                  updateAt(index, { ...ed, school: e.target.value })
                }
              />
            </Field>
            <Field label="Credential">
              <TextInput
                value={ed.credential}
                onChange={(e) =>
                  updateAt(index, { ...ed, credential: e.target.value })
                }
              />
            </Field>
            <Field label="Period">
              <TextInput
                value={ed.period}
                onChange={(e) =>
                  updateAt(index, { ...ed, period: e.target.value })
                }
              />
            </Field>
            <Field label="Location">
              <TextInput
                value={ed.location}
                onChange={(e) =>
                  updateAt(index, { ...ed, location: e.target.value })
                }
              />
            </Field>
            <Field label="GPA / honours">
              <TextInput
                value={ed.gpa}
                onChange={(e) =>
                  updateAt(index, { ...ed, gpa: e.target.value })
                }
              />
            </Field>
          </div>
          <Field label="Relevant courses (one per line)">
            <TextArea
              value={ed.relevantCourses.join('\n')}
              onChange={(e) =>
                updateAt(index, {
                  ...ed,
                  relevantCourses: e.target.value
                    .split('\n')
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
        + Add education
      </button>
    </div>
  );
}
