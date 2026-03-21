'use client';

import type { PortfolioCMSData } from '@/lib/portfolio-content-shared';
import type { ProductType } from '@/lib/features';
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

const TABS: { id: ProductType; label: string }[] = [
  { id: 'web', label: 'Web estimator features' },
  { id: 'mobile', label: 'Mobile estimator features' },
];

export function EstimateFeaturesSection({ data, setData }: Props) {
  const catalog = data.estimateFeatures;

  const updateFeature = (
    product: ProductType,
    index: number,
    row: (typeof catalog.web)[number]
  ) => {
    setData((prev) => ({
      ...prev,
      estimateFeatures: {
        ...prev.estimateFeatures,
        [product]: prev.estimateFeatures[product].map((f, i) =>
          i === index ? row : f
        ),
      },
    }));
  };

  const addFeature = (product: ProductType) => {
    setData((prev) => ({
      ...prev,
      estimateFeatures: {
        ...prev.estimateFeatures,
        [product]: [
          ...prev.estimateFeatures[product],
          {
            id: `feature-${Date.now()}`,
            name: 'New feature',
            baseCost: 100_000,
            desc: '',
            tags: ['custom'],
          },
        ],
      },
    }));
  };

  const removeFeature = (product: ProductType, index: number) => {
    setData((prev) => ({
      ...prev,
      estimateFeatures: {
        ...prev.estimateFeatures,
        [product]: prev.estimateFeatures[product].filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="space-y-10">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Powers the /services/estimate calculator. Costs are in MMK (numbers).
        Tags are comma-separated (e.g. core, auth).
      </p>
      {TABS.map(({ id: product, label }) => (
        <div key={product} className="space-y-6">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {label}
          </h2>
          {catalog[product].map((feat, index) => (
            <SectionCard
              key={feat.id + index}
              title={`${feat.name} (${feat.id})`}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-red-600 hover:underline"
                  onClick={() => removeFeature(product, index)}
                >
                  Remove feature
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="ID (stable key)">
                  <TextInput
                    value={feat.id}
                    onChange={(e) =>
                      updateFeature(product, index, {
                        ...feat,
                        id: e.target.value.trim(),
                      })
                    }
                  />
                </Field>
                <Field label="Base cost (MMK)">
                  <TextInput
                    type="number"
                    value={feat.baseCost}
                    onChange={(e) =>
                      updateFeature(product, index, {
                        ...feat,
                        baseCost: Number(e.target.value) || 0,
                      })
                    }
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Display name">
                    <TextInput
                      value={feat.name}
                      onChange={(e) =>
                        updateFeature(product, index, {
                          ...feat,
                          name: e.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
              </div>
              <Field label="Description (optional)">
                <TextArea
                  value={feat.desc ?? ''}
                  onChange={(e) =>
                    updateFeature(product, index, {
                      ...feat,
                      desc: e.target.value || undefined,
                    })
                  }
                />
              </Field>
              <Field label="Tags (comma-separated)">
                <TextInput
                  value={(feat.tags ?? []).join(', ')}
                  onChange={(e) =>
                    updateFeature(product, index, {
                      ...feat,
                      tags: e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
            </SectionCard>
          ))}
          <button
            type="button"
            onClick={() => addFeature(product)}
            className="w-full rounded-xl border border-dashed border-neutral-400 py-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            + Add {product} feature
          </button>
        </div>
      ))}
    </div>
  );
}
