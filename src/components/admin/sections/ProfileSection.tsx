'use client';

import type { PortfolioCMSData } from '@/lib/portfolio-content-shared';
import {
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from '@/components/admin/AdminFields';
import { parseTextareaLines } from '@/lib/admin-textarea-lines';

type ClientWorkLinks = PortfolioCMSData['about']['clientWorkLinks'];

type Props = {
  data: PortfolioCMSData;
  setData: React.Dispatch<React.SetStateAction<PortfolioCMSData>>;
};

export function ProfileSection({ data, setData }: Props) {
  const a = data.about;

  const setAbout = (patch: Partial<typeof a>) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...patch },
    }));
  };

  const setNestedAbout = (patch: Partial<(typeof a)['about']>) => {
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        about: { ...prev.about.about, ...patch },
      },
    }));
  };

  const clientLinks = Object.entries(
    (a.clientWorkLinks ?? {}) as Record<string, string>
  );

  return (
    <div className="space-y-6">
      <SectionCard
        title="Identity & contact"
        description="Shown in the hero, footer, and contact sections."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <TextInput
              value={a.name}
              onChange={(e) => setAbout({ name: e.target.value })}
            />
          </Field>
          <Field label="Professional title">
            <TextInput
              value={a.title}
              onChange={(e) => setAbout({ title: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <TextInput
              value={a.location}
              onChange={(e) => setAbout({ location: e.target.value })}
            />
          </Field>
          <Field label="Phone">
            <TextInput
              value={a.phone}
              onChange={(e) => setAbout({ phone: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <TextInput
              type="email"
              value={a.email}
              onChange={(e) => setAbout({ email: e.target.value })}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="LinkedIn URL">
            <TextInput
              value={a.links.linkedin}
              onChange={(e) =>
                setAbout({
                  links: { ...a.links, linkedin: e.target.value },
                })
              }
            />
          </Field>
          <Field label="GitHub URL">
            <TextInput
              value={a.links.github}
              onChange={(e) =>
                setAbout({
                  links: { ...a.links, github: e.target.value },
                })
              }
            />
          </Field>
        </div>
        <Field
          label="Summary (fallback line)"
          hint="Used when value proposition is empty."
        >
          <TextArea
            value={a.summary}
            onChange={(e) => setAbout({ summary: e.target.value })}
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="Hero copy & stats"
        description="Headline area: availability badge, typewriter, and stat numbers."
      >
        <Field label="Value proposition">
          <TextArea
            value={a.about.valueProposition}
            onChange={(e) =>
              setNestedAbout({ valueProposition: e.target.value })
            }
          />
        </Field>
        <Field label="Tagline (secondary)">
          <TextInput
            value={a.about.tagline ?? ''}
            onChange={(e) => setNestedAbout({ tagline: e.target.value })}
          />
        </Field>
        <Field label="Availability badge text">
          <TextInput
            value={a.about.availability}
            onChange={(e) => setNestedAbout({ availability: e.target.value })}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Years of experience (number)">
            <TextInput
              type="number"
              value={a.about.yearsOfExperience}
              onChange={(e) =>
                setNestedAbout({
                  yearsOfExperience: Number(e.target.value) || 0,
                })
              }
            />
          </Field>
          <Field label="Years label">
            <TextInput
              value={a.about.yearsLabel ?? ''}
              onChange={(e) => setNestedAbout({ yearsLabel: e.target.value })}
            />
          </Field>
          <Field label="Total projects (number)">
            <TextInput
              type="number"
              value={a.about.totalProjects}
              onChange={(e) =>
                setNestedAbout({
                  totalProjects: Number(e.target.value) || 0,
                })
              }
            />
          </Field>
          <Field label="Technologies mastered (number)">
            <TextInput
              type="number"
              value={a.about.technologiesMastered}
              onChange={(e) =>
                setNestedAbout({
                  technologiesMastered: Number(e.target.value) || 0,
                })
              }
            />
          </Field>
        </div>
        <Field
          label="Typewriter strings"
          hint="One line per rotating headline in the hero."
        >
          <TextArea
            value={a.about.typewriterStrings.join('\n')}
            onChange={(e) =>
              setNestedAbout({
                typewriterStrings: parseTextareaLines(e.target.value),
              })
            }
          />
        </Field>
      </SectionCard>

      <SectionCard
        title="Client work links"
        description="Optional URLs keyed by client name (e.g. Technortal)."
      >
        <div className="space-y-3">
          {clientLinks.length === 0 ? (
            <p className="text-sm text-neutral-500">No links yet.</p>
          ) : null}
          {clientLinks.map(([key, url], i) => (
            <div
              key={`${key}-${i}`}
              className="flex flex-wrap items-end gap-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-600"
            >
              <div className="min-w-[140px] flex-1">
                <Field label="Client name">
                  <TextInput
                    value={key}
                    onChange={(e) => {
                      const next = {
                        ...((a.clientWorkLinks ?? {}) as Record<
                          string,
                          string
                        >),
                      };
                      delete next[key];
                      next[e.target.value.trim()] = url;
                      setAbout({ clientWorkLinks: next as ClientWorkLinks });
                    }}
                  />
                </Field>
              </div>
              <div className="min-w-[200px] flex-[2]">
                <Field label="URL">
                  <TextInput
                    value={url}
                    onChange={(e) => {
                      const next = {
                        ...((a.clientWorkLinks ?? {}) as Record<
                          string,
                          string
                        >),
                      };
                      next[key] = e.target.value;
                      setAbout({ clientWorkLinks: next as ClientWorkLinks });
                    }}
                  />
                </Field>
              </div>
              <button
                type="button"
                className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/40"
                onClick={() => {
                  const next = {
                    ...((a.clientWorkLinks ?? {}) as Record<string, string>),
                  };
                  delete next[key];
                  setAbout({ clientWorkLinks: next as ClientWorkLinks });
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="rounded-lg border border-dashed border-neutral-400 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
            onClick={() => {
              const base = (a.clientWorkLinks ?? {}) as Record<string, string>;
              const n = Object.keys(base).length + 1;
              setAbout({
                clientWorkLinks: {
                  ...base,
                  [`New client ${n}`]: 'https://',
                } as ClientWorkLinks,
              });
            }}
          >
            + Add client link
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
