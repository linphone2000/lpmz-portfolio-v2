'use client';

import type { PortfolioCMSData } from '@/lib/portfolio-content-shared';
import type { PricingTab } from '@/lib/pricing';
import {
  CheckboxField,
  Field,
  SectionCard,
  TextArea,
  TextInput,
} from '@/components/admin/AdminFields';
import { parseTextareaLines } from '@/lib/admin-textarea-lines';

type Props = {
  data: PortfolioCMSData;
  setData: React.Dispatch<React.SetStateAction<PortfolioCMSData>>;
};

const TABS: { id: PricingTab; label: string }[] = [
  { id: 'web', label: 'Web pricing cards' },
  { id: 'mobile', label: 'Mobile pricing cards' },
];

export function PricingSection({ data, setData }: Props) {
  const pricing = data.pricing;

  const updateCard = (
    tab: PricingTab,
    index: number,
    card: (typeof pricing.web)[number]
  ) => {
    setData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [tab]: prev.pricing[tab].map((c, i) => (i === index ? card : c)),
      },
    }));
  };

  const addCard = (tab: PricingTab) => {
    setData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [tab]: [
          ...prev.pricing[tab],
          {
            title: 'New tier',
            price: '0K',
            desc: 'Description',
            bullets: ['Bullet 1'],
            highlight: false,
          },
        ],
      },
    }));
  };

  const removeCard = (tab: PricingTab, index: number) => {
    setData((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [tab]: prev.pricing[tab].filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="space-y-10">
      {TABS.map(({ id: tab, label }) => (
        <div key={tab} className="space-y-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {label}
          </h2>
          {pricing[tab].map((card, index) => (
            <SectionCard key={index} title={`${card.title} (${tab})`}>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => removeCard(tab, index)}
                >
                  Remove card
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title">
                  <TextInput
                    value={card.title}
                    onChange={(e) =>
                      updateCard(tab, index, {
                        ...card,
                        title: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="Price display">
                  <TextInput
                    value={card.price}
                    onChange={(e) =>
                      updateCard(tab, index, {
                        ...card,
                        price: e.target.value,
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Short description">
                <TextArea
                  value={card.desc}
                  onChange={(e) =>
                    updateCard(tab, index, { ...card, desc: e.target.value })
                  }
                />
              </Field>
              <CheckboxField
                label="Highlight card"
                checked={!!card.highlight}
                onChange={(checked) =>
                  updateCard(tab, index, { ...card, highlight: checked })
                }
              />
              <Field label="Bullets (one per line)">
                <TextArea
                  value={card.bullets.join('\n')}
                  onChange={(e) =>
                    updateCard(tab, index, {
                      ...card,
                      bullets: parseTextareaLines(e.target.value),
                    })
                  }
                />
              </Field>
            </SectionCard>
          ))}
          <button
            type="button"
            onClick={() => addCard(tab)}
            className="w-full rounded-xl border border-dashed border-neutral-400 py-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            + Add {tab} pricing card
          </button>
        </div>
      ))}
    </div>
  );
}
