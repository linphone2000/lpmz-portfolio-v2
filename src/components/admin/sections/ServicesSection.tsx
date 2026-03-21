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

export function ServicesSection({ data, setData }: Props) {
  const s = data.services;

  const patch = (next: typeof s) =>
    setData((prev) => ({ ...prev, services: next }));

  return (
    <div className="space-y-6">
      <SectionCard
        title="Services hero"
        description="Top of the services page."
      >
        <Field label="Badge">
          <TextInput
            value={s.hero.badge}
            onChange={(e) =>
              patch({
                ...s,
                hero: { ...s.hero, badge: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Title">
          <TextInput
            value={s.hero.title}
            onChange={(e) =>
              patch({
                ...s,
                hero: { ...s.hero, title: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Description">
          <TextArea
            value={s.hero.description}
            onChange={(e) =>
              patch({
                ...s,
                hero: { ...s.hero, description: e.target.value },
              })
            }
          />
        </Field>
      </SectionCard>

      <SectionCard title="Web development block">
        <Field label="Title">
          <TextInput
            value={s.web.title}
            onChange={(e) =>
              patch({
                ...s,
                web: { ...s.web, title: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Description">
          <TextArea
            value={s.web.description}
            onChange={(e) =>
              patch({
                ...s,
                web: { ...s.web, description: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Bullets (one per line)">
          <TextArea
            value={s.web.bullets.join('\n')}
            onChange={(e) =>
              patch({
                ...s,
                web: {
                  ...s.web,
                  bullets: e.target.value
                    .split('\n')
                    .map((l) => l.trim())
                    .filter(Boolean),
                },
              })
            }
          />
        </Field>
      </SectionCard>

      <SectionCard title="Mobile development block">
        <Field label="Title">
          <TextInput
            value={s.mobile.title}
            onChange={(e) =>
              patch({
                ...s,
                mobile: { ...s.mobile, title: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Description">
          <TextArea
            value={s.mobile.description}
            onChange={(e) =>
              patch({
                ...s,
                mobile: { ...s.mobile, description: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Bullets (one per line)">
          <TextArea
            value={s.mobile.bullets.join('\n')}
            onChange={(e) =>
              patch({
                ...s,
                mobile: {
                  ...s.mobile,
                  bullets: e.target.value
                    .split('\n')
                    .map((l) => l.trim())
                    .filter(Boolean),
                },
              })
            }
          />
        </Field>
      </SectionCard>
    </div>
  );
}
