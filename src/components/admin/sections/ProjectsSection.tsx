'use client';

import { useState } from 'react';
import type { PortfolioCMSData } from '@/lib/portfolio-content-shared';
import {
  CheckboxField,
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from '@/components/admin/AdminFields';

type Project = PortfolioCMSData['projects'][number];

type Props = {
  data: PortfolioCMSData;
  setData: React.Dispatch<React.SetStateAction<PortfolioCMSData>>;
};

function defaultProject(): Project {
  const y = new Date().getFullYear();
  return {
    name: 'New project',
    stack: ['React', 'TypeScript'],
    blurb: '',
    href: '#',
    highlight: false,
    category: 'Mobile Development',
    year: y,
    status: 'In Development',
    features: [],
    preview: {
      platform: '',
      featurePills: [],
      screenshot: '',
      screenshots: [],
    },
  };
}

export function ProjectsSection({ data, setData }: Props) {
  const updateAt = (index: number, next: Project) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p, i) => (i === index ? next : p)),
    }));
  };

  const add = () => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, defaultProject()],
    }));
  };

  const remove = (index: number) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Edit each project in its own card. Stack and feature pills use commas.
        Screenshots support gallery + modal on the public site.
      </p>
      {data.projects.map((project, index) => (
        <ProjectEditor
          key={index}
          index={index}
          project={project}
          onChange={(next) => updateAt(index, next)}
          onRemove={() => remove(index)}
        />
      ))}
      <button
        type="button"
        onClick={add}
        className="w-full rounded-xl border border-dashed border-neutral-400 py-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
      >
        + Add project
      </button>
    </div>
  );
}

function ProjectEditor({
  index,
  project,
  onChange,
  onRemove,
}: {
  index: number;
  project: Project;
  onChange: (p: Project) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(index === 0);
  const preview = (project.preview ?? {}) as Record<string, unknown>;
  const screenshots =
    (preview.screenshots as
      | Array<{
          id: number;
          src: string;
          title: string;
          description: string;
        }>
      | undefined) ?? [];

  /** Project preview is a wide union in `data.ts`; merge loosely then cast for the editor. */
  const mergePreview = (patch: Record<string, unknown>) => {
    onChange({
      ...project,
      preview: { ...preview, ...patch },
    } as Project);
  };

  return (
    <SectionCard
      title={`${index + 1}. ${project.name || 'Untitled project'}`}
      description="Expand to edit details, features, and media."
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full rounded-lg bg-neutral-100 px-3 py-2 text-left text-sm font-medium text-neutral-800 dark:bg-neutral-700/80 dark:text-neutral-100"
      >
        {open ? '▼ Collapse' : '▶ Expand'} project editor
      </button>

      {open ? (
        <div className="space-y-4 border-t border-neutral-200 pt-4 dark:border-neutral-600">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 dark:border-red-800"
            >
              Remove project
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Project name">
              <TextInput
                value={project.name}
                onChange={(e) =>
                  onChange({ ...project, name: e.target.value } as Project)
                }
              />
            </Field>
            <Field label="Category">
              <TextInput
                value={project.category}
                onChange={(e) =>
                  onChange({ ...project, category: e.target.value } as Project)
                }
              />
            </Field>
            <Field label="Year">
              <TextInput
                type="number"
                value={project.year}
                onChange={(e) =>
                  onChange({
                    ...project,
                    year: Number(e.target.value) || project.year,
                  } as Project)
                }
              />
            </Field>
            <Field label="Status">
              <TextInput
                value={project.status}
                onChange={(e) =>
                  onChange({ ...project, status: e.target.value } as Project)
                }
              />
            </Field>
            <Field label="Link (href)">
              <TextInput
                value={project.href ?? ''}
                onChange={(e) =>
                  onChange({ ...project, href: e.target.value } as Project)
                }
              />
            </Field>
            <Field label="Live URL (optional)">
              <TextInput
                value={project.liveUrl ?? ''}
                onChange={(e) =>
                  onChange({
                    ...project,
                    liveUrl: e.target.value || undefined,
                  } as Project)
                }
              />
            </Field>
          </div>

          <CheckboxField
            label="Highlight / featured"
            checked={!!project.highlight}
            onChange={(checked) =>
              onChange({ ...project, highlight: checked } as Project)
            }
          />

          <Field label="Stack (comma-separated)">
            <TextInput
              value={project.stack.join(', ')}
              onChange={(e) =>
                onChange({
                  ...project,
                  stack: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                } as Project)
              }
            />
          </Field>

          <Field label="Short description (blurb)">
            <TextArea
              value={project.blurb}
              onChange={(e) =>
                onChange({ ...project, blurb: e.target.value } as Project)
              }
            />
          </Field>

          <Field label="Features (one per line)">
            <TextArea
              value={project.features.join('\n')}
              onChange={(e) =>
                onChange({
                  ...project,
                  features: e.target.value
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean),
                } as Project)
              }
            />
          </Field>

          <Field label="Startup note (optional)">
            <TextArea
              value={project.startupNote ?? ''}
              onChange={(e) =>
                onChange({
                  ...project,
                  startupNote: e.target.value || undefined,
                } as Project)
              }
            />
          </Field>

          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-600">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Demo account (optional)
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Email">
                <TextInput
                  value={project.demoAccount?.email ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...project,
                      demoAccount: {
                        email: e.target.value,
                        password: project.demoAccount?.password ?? '',
                      },
                    } as Project)
                  }
                />
              </Field>
              <Field label="Password">
                <TextInput
                  value={project.demoAccount?.password ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...project,
                      demoAccount: {
                        email: project.demoAccount?.email ?? '',
                        password: e.target.value,
                      },
                    } as Project)
                  }
                />
              </Field>
            </div>
            {(project.demoAccount?.email || project.demoAccount?.password) && (
              <button
                type="button"
                className="mt-2 text-xs text-red-600 hover:underline"
                onClick={() =>
                  onChange({ ...project, demoAccount: undefined } as Project)
                }
              >
                Clear demo account
              </button>
            )}
          </div>

          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-600">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Preview block
            </h3>
            <div className="mt-3 space-y-4">
              <Field label="Platform line">
                <TextInput
                  value={String(preview.platform ?? '')}
                  onChange={(e) => mergePreview({ platform: e.target.value })}
                />
              </Field>
              <Field label="Feature pills (comma-separated)">
                <TextInput
                  value={
                    Array.isArray(preview.featurePills)
                      ? (preview.featurePills as string[]).join(', ')
                      : ''
                  }
                  onChange={(e) =>
                    mergePreview({
                      featurePills: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
              <Field label="Primary screenshot URL">
                <TextInput
                  value={
                    typeof preview.screenshot === 'string'
                      ? preview.screenshot
                      : ''
                  }
                  onChange={(e) => mergePreview({ screenshot: e.target.value })}
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Portfolio value (optional UI)">
                  <TextInput
                    value={String(preview.portfolioValue ?? '')}
                    onChange={(e) =>
                      mergePreview({ portfolioValue: e.target.value })
                    }
                  />
                </Field>
                <Field label="Daily gain (optional UI)">
                  <TextInput
                    value={String(preview.dailyGain ?? '')}
                    onChange={(e) =>
                      mergePreview({ dailyGain: e.target.value })
                    }
                  />
                </Field>
                <Field label="Buy/sell (optional UI)">
                  <TextInput
                    value={String(preview.buysell ?? '')}
                    onChange={(e) => mergePreview({ buysell: e.target.value })}
                  />
                </Field>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-600">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Screenshot gallery
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Used in the project modal carousel. IDs should be unique numbers.
            </p>
            <div className="mt-3 space-y-4">
              {screenshots.map((shot, si) => (
                <div
                  key={shot.id ?? si}
                  className="grid gap-2 rounded-md border border-neutral-100 p-3 dark:border-neutral-700"
                >
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs text-red-600 hover:underline"
                      onClick={() => {
                        const next = screenshots.filter((_, j) => j !== si);
                        mergePreview({ screenshots: next });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-4">
                    <Field label="ID">
                      <TextInput
                        type="number"
                        value={shot.id}
                        onChange={(e) => {
                          const next = [...screenshots];
                          next[si] = {
                            ...shot,
                            id: Number(e.target.value) || shot.id,
                          };
                          mergePreview({ screenshots: next });
                        }}
                      />
                    </Field>
                    <Field label="Image src">
                      <TextInput
                        className="sm:col-span-3"
                        value={shot.src}
                        onChange={(e) => {
                          const next = [...screenshots];
                          next[si] = { ...shot, src: e.target.value };
                          mergePreview({ screenshots: next });
                        }}
                      />
                    </Field>
                  </div>
                  <Field label="Title">
                    <TextInput
                      value={shot.title}
                      onChange={(e) => {
                        const next = [...screenshots];
                        next[si] = { ...shot, title: e.target.value };
                        mergePreview({ screenshots: next });
                      }}
                    />
                  </Field>
                  <Field label="Description">
                    <TextArea
                      value={shot.description}
                      onChange={(e) => {
                        const next = [...screenshots];
                        next[si] = { ...shot, description: e.target.value };
                        mergePreview({ screenshots: next });
                      }}
                    />
                  </Field>
                </div>
              ))}
              <button
                type="button"
                className="rounded-lg border border-dashed border-neutral-400 px-3 py-2 text-sm dark:border-neutral-600"
                onClick={() => {
                  const maxId = screenshots.reduce(
                    (m, s) => Math.max(m, s.id),
                    0
                  );
                  mergePreview({
                    screenshots: [
                      ...screenshots,
                      {
                        id: maxId + 1,
                        src: '/placeholder.png',
                        title: 'Screen title',
                        description: 'What this screen shows.',
                      },
                    ],
                  });
                }}
              >
                + Add screenshot
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </SectionCard>
  );
}
