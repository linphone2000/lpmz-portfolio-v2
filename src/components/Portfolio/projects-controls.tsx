'use client';

import {
  ArrowsUpDownIcon,
  CheckIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';

type SortOption = 'order' | 'year' | 'name';
type FilterOption = 'all' | 'mobile' | 'web';

interface ProjectsControlsProps {
  filterBy: FilterOption;
  sortBy: SortOption;
  onFilterChange: (filter: FilterOption) => void;
  onSortChange: (sort: SortOption) => void;
}

const filterOptions: Array<{ id: FilterOption; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
];

const sortOptions: Array<{ id: SortOption; label: string; hint: string }> = [
  { id: 'order', label: 'Default', hint: 'Portfolio flow' },
  { id: 'year', label: 'Newest', hint: 'Latest first' },
  { id: 'name', label: 'Name', hint: 'Alphabetical' },
];

export const ProjectsControls = ({
  filterBy,
  sortBy,
  onFilterChange,
  onSortChange,
}: ProjectsControlsProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activePlatformIndex = filterOptions.findIndex(
    (option) => option.id === filterBy
  );
  const selectedSortLabel = useMemo(
    () =>
      sortOptions.find((option) => option.id === sortBy)?.label ?? 'Default',
    [sortBy]
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const segmentButtonClass = (isActive: boolean) =>
    `group relative z-10 inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
      isActive
        ? 'text-white'
        : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
    }`;

  return (
    <div className="rounded-2xl bg-white/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-700/90 shadow-sm dark:shadow-black/20 p-3 sm:p-1.5">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
        <div className="relative grid grid-cols-3 gap-1 rounded-xl p-1 bg-transparent min-w-[220px]">
          <span
            className="absolute left-1 top-1 bottom-1 w-[calc((100%-0.5rem-0.5rem)/3)] rounded-lg bg-primary-500 transition-transform duration-200 ease-out"
            style={{
              transform: `translateX(calc(${Math.max(activePlatformIndex, 0)} * 100% + ${Math.max(activePlatformIndex, 0)} * 0.25rem))`,
            }}
          />
          {filterOptions.map((option) => {
            const isActive = filterBy === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onFilterChange(option.id)}
                aria-pressed={isActive}
                className={segmentButtonClass(isActive)}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex sm:justify-end">
          <div ref={dropdownRef} className="relative min-w-[180px]">
            <button
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="w-full inline-flex items-center justify-between gap-2 rounded-xl bg-white dark:bg-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-800 dark:text-neutral-100 border border-neutral-200/80 dark:border-neutral-700 transition-colors duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              aria-expanded={isSortOpen}
              aria-haspopup="listbox"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowsUpDownIcon className="w-4 h-4 text-neutral-500" />
                {selectedSortLabel}
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                  isSortOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-2 w-full origin-top rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 p-1.5 shadow-lg z-20 transition-all duration-150 ${
                isSortOpen
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
              }`}
              role="listbox"
            >
              {sortOptions.map((option) => {
                const isActive = sortBy === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onSortChange(option.id);
                      setIsSortOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150 flex items-center justify-between ${
                      isActive
                        ? 'bg-primary-500/10 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    role="option"
                    aria-selected={isActive}
                    title={option.hint}
                  >
                    <span>{option.label}</span>
                    {isActive && <CheckIcon className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
