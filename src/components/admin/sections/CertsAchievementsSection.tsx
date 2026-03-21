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

export function CertsAchievementsSection({ data, setData }: Props) {
  const certs = data.certs;
  const achievements = data.achievements;

  const updateCert = (index: number, row: (typeof certs)[number]) => {
    setData((prev) => ({
      ...prev,
      certs: prev.certs.map((c, i) => (i === index ? row : c)),
    }));
  };

  const addCert = () => {
    setData((prev) => ({
      ...prev,
      certs: [
        ...prev.certs,
        {
          name: 'Certification name',
          year: new Date().getFullYear(),
          issuer: 'Issuer',
          description: '',
        },
      ],
    }));
  };

  const removeCert = (index: number) => {
    setData((prev) => ({
      ...prev,
      certs: prev.certs.filter((_, i) => i !== index),
    }));
  };

  const updateAch = (index: number, row: (typeof achievements)[number]) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a, i) => (i === index ? row : a)),
    }));
  };

  const addAch = () => {
    setData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          title: 'Achievement title',
          description: '',
          year: new Date().getFullYear(),
          category: 'Professional',
        },
      ],
    }));
  };

  const removeAch = (index: number) => {
    setData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Certifications
        </h2>
        {certs.map((cert, index) => (
          <SectionCard key={index} title={`Cert ${index + 1}: ${cert.name}`}>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-red-600 hover:underline"
                onClick={() => removeCert(index)}
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name">
                <TextInput
                  value={cert.name}
                  onChange={(e) =>
                    updateCert(index, { ...cert, name: e.target.value })
                  }
                />
              </Field>
              <Field label="Issuer">
                <TextInput
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCert(index, { ...cert, issuer: e.target.value })
                  }
                />
              </Field>
              <Field label="Year">
                <TextInput
                  type="number"
                  value={cert.year}
                  onChange={(e) =>
                    updateCert(index, {
                      ...cert,
                      year: Number(e.target.value) || cert.year,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Description">
              <TextArea
                value={cert.description}
                onChange={(e) =>
                  updateCert(index, { ...cert, description: e.target.value })
                }
              />
            </Field>
          </SectionCard>
        ))}
        <button
          type="button"
          onClick={addCert}
          className="w-full rounded-xl border border-dashed border-neutral-400 py-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          + Add certification
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Achievements
        </h2>
        {achievements.map((ach, index) => (
          <SectionCard key={index} title={`${index + 1}. ${ach.title}`}>
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-red-600 hover:underline"
                onClick={() => removeAch(index)}
              >
                Remove
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <TextInput
                  value={ach.title}
                  onChange={(e) =>
                    updateAch(index, { ...ach, title: e.target.value })
                  }
                />
              </Field>
              <Field label="Category">
                <TextInput
                  value={ach.category}
                  onChange={(e) =>
                    updateAch(index, { ...ach, category: e.target.value })
                  }
                />
              </Field>
              <Field label="Year">
                <TextInput
                  type="number"
                  value={ach.year}
                  onChange={(e) =>
                    updateAch(index, {
                      ...ach,
                      year: Number(e.target.value) || ach.year,
                    })
                  }
                />
              </Field>
            </div>
            <Field label="Description">
              <TextArea
                value={ach.description}
                onChange={(e) =>
                  updateAch(index, { ...ach, description: e.target.value })
                }
              />
            </Field>
          </SectionCard>
        ))}
        <button
          type="button"
          onClick={addAch}
          className="w-full rounded-xl border border-dashed border-neutral-400 py-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          + Add achievement
        </button>
      </div>
    </div>
  );
}
