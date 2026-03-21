'use client';

import type { ComponentType } from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalculatorIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  RectangleStackIcon,
  SparklesIcon,
  TrophyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import type { AdminTabId } from '@/components/admin/admin-tabs';
import { ADMIN_TAB_ORDER } from '@/components/admin/admin-tabs';
import { cx } from '@/lib/utils';

const ICONS: Record<AdminTabId, ComponentType<{ className?: string }>> = {
  profile: UserCircleIcon,
  experience: BriefcaseIcon,
  projects: RectangleStackIcon,
  skills: CpuChipIcon,
  education: AcademicCapIcon,
  certs: TrophyIcon,
  services: SparklesIcon,
  pricing: CurrencyDollarIcon,
  estimate: CalculatorIcon,
};

export function PortfolioEditorNav({
  active,
  onChange,
}: {
  active: AdminTabId;
  onChange: (id: AdminTabId) => void;
}) {
  return (
    <>
      {/* Mobile / tablet: native select — fast to scan, no horizontal pill maze */}
      <div className="mb-6 lg:hidden">
        <label
          htmlFor="admin-section"
          className="mb-2 block text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
        >
          Section
        </label>
        <div className="relative">
          <select
            id="admin-section"
            value={active}
            onChange={(e) => onChange(e.target.value as AdminTabId)}
            className={cx(
              'w-full appearance-none rounded-xl border border-neutral-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-neutral-900 shadow-sm',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30',
              'dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100'
            )}
          >
            {ADMIN_TAB_ORDER.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            ▼
          </span>
        </div>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          {ADMIN_TAB_ORDER.find((t) => t.id === active)?.description}
        </p>
      </div>

      {/* Desktop: sticky sidebar — stays visible while main content scrolls */}
      <aside
        className={cx(
          'hidden lg:block lg:w-56 lg:shrink-0 xl:w-64',
          'lg:sticky lg:z-30 lg:self-start',
          /* Below sticky header; tweak in globals if header height changes */
          'lg:top-[var(--admin-sidebar-top,4.75rem)]',
          /* Scroll nav if taller than viewport minus header + bottom bar */
          'lg:max-h-[calc(100vh-var(--admin-sidebar-top,4.75rem)-var(--admin-bottom-bar-h,4.75rem))] lg:overflow-y-auto lg:overflow-x-hidden lg:pb-2 lg:pr-1 scrollbar-thin'
        )}
        aria-label="Editor sections"
      >
        <nav>
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Sections
          </p>
          <ul className="flex flex-col gap-0.5">
            {ADMIN_TAB_ORDER.map((t) => {
              const Icon = ICONS[t.id];
              const isActive = active === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => onChange(t.id)}
                    className={cx(
                      'flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      isActive
                        ? 'bg-primary-600/10 text-primary-800 ring-1 ring-primary-600/25 dark:bg-primary-500/15 dark:text-primary-100'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800/80'
                    )}
                  >
                    <Icon
                      className={cx(
                        'mt-0.5 h-5 w-5 shrink-0',
                        isActive
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-neutral-400 dark:text-neutral-500'
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-snug">
                        {t.label}
                      </span>
                      <span className="mt-0.5 block text-xs font-normal text-neutral-500 dark:text-neutral-400">
                        {t.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
