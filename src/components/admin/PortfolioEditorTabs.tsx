'use client';

import type { AdminTabId } from '@/components/admin/admin-tabs';
import { cx } from '@/lib/utils';

type TabDef = { id: AdminTabId; label: string };

export function PortfolioEditorTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: TabDef[];
  active: AdminTabId;
  onChange: (id: AdminTabId) => void;
}) {
  return (
    <div className="-mx-1 flex gap-1 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cx(
            'shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors',
            active === t.id
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
