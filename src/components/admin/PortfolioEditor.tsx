'use client';

import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  ADMIN_TAB_ORDER,
  type AdminTabId,
} from '@/components/admin/admin-tabs';
import {
  AdminButtonGhost,
  AdminButtonPrimary,
  AdminButtonSecondary,
} from '@/components/admin/AdminFields';
import { AdminLoadingSkeleton } from '@/components/admin/AdminLoadingSkeleton';
import { PortfolioEditorNav } from '@/components/admin/PortfolioEditorNav';
import { CertsAchievementsSection } from '@/components/admin/sections/CertsAchievementsSection';
import { EducationSection } from '@/components/admin/sections/EducationSection';
import { EstimateFeaturesSection } from '@/components/admin/sections/EstimateFeaturesSection';
import { ExperienceSection } from '@/components/admin/sections/ExperienceSection';
import { PricingSection } from '@/components/admin/sections/PricingSection';
import { ProfileSection } from '@/components/admin/sections/ProfileSection';
import { ProjectsSection } from '@/components/admin/sections/ProjectsSection';
import { ServicesSection } from '@/components/admin/sections/ServicesSection';
import { SkillsSection } from '@/components/admin/sections/SkillsSection';
import { syncAboutEmbedded } from '@/lib/admin-normalize';
import {
  fallbackPortfolioContent,
  type PortfolioCMSData,
} from '@/lib/portfolio-content-shared';
import { stableJsonStringify } from '@/lib/stable-json';
import { cx } from '@/lib/utils';

export function PortfolioEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState<PortfolioCMSData>(fallbackPortfolioContent);
  const [baseline, setBaseline] = useState<string>('');
  const [tab, setTab] = useState<AdminTabId>('profile');

  const dirty = useMemo(() => {
    if (!baseline) return false;
    return stableJsonStringify(data) !== baseline;
  }, [data, baseline]);

  const activeMeta = useMemo(
    () => ADMIN_TAB_ORDER.find((t) => t.id === tab),
    [tab]
  );

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      const payload = syncAboutEmbedded(data);
      const response = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errBody = (await response.json()) as { error?: string };
        setError(errBody.error || 'Failed to save');
        return;
      }

      setBaseline(stableJsonStringify(payload));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed unexpectedly');
    } finally {
      setSaving(false);
    }
  }, [data]);

  useEffect(() => {
    const init = async () => {
      try {
        const me = await fetch('/api/admin/me');
        if (!me.ok) {
          router.push('/admin/login');
          return;
        }

        const response = await fetch('/api/portfolio');
        const next = response.ok
          ? ((await response.json()) as PortfolioCMSData)
          : fallbackPortfolioContent;

        setData(next);
        setBaseline(stableJsonStringify(next));
      } catch {
        setError('Unable to load portfolio content');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (!saving) void save();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save, saving]);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <main className="admin-editor-layout min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/35 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/85 px-4 py-3 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-900/85 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-xl">
                Portfolio CMS
              </h1>
              <span
                className={cx(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                  dirty
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-100'
                    : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                )}
              >
                {dirty ? 'Unsaved changes' : 'All changes saved'}
              </span>
            </div>
            <p className="mt-0.5 truncate text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {activeMeta?.label}
              </span>
              <span className="text-neutral-400 dark:text-neutral-500">
                {' '}
                ·{' '}
              </span>
              <span className="hidden sm:inline">
                {activeMeta?.description}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <AdminButtonGhost
              type="button"
              className="!gap-1.5"
              onClick={() => window.open('/', '_blank', 'noopener,noreferrer')}
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              View site
            </AdminButtonGhost>
            <AdminButtonSecondary type="button" onClick={() => logout()}>
              Log out
            </AdminButtonSecondary>
            <AdminButtonPrimary
              type="button"
              disabled={saving || !dirty}
              onClick={() => void save()}
            >
              {saving ? 'Saving…' : 'Save'}
            </AdminButtonPrimary>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <PortfolioEditorNav active={tab} onChange={setTab} />

          <div className="min-w-0 flex-1 pb-28">
            <div className="mb-6 border-b border-neutral-200/80 pb-4 dark:border-neutral-800/80 lg:hidden">
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {activeMeta?.label}
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {activeMeta?.description}
              </p>
            </div>

            {tab === 'profile' && (
              <ProfileSection data={data} setData={setData} />
            )}
            {tab === 'experience' && (
              <ExperienceSection data={data} setData={setData} />
            )}
            {tab === 'projects' && (
              <ProjectsSection data={data} setData={setData} />
            )}
            {tab === 'skills' && (
              <SkillsSection data={data} setData={setData} />
            )}
            {tab === 'education' && (
              <EducationSection data={data} setData={setData} />
            )}
            {tab === 'certs' && (
              <CertsAchievementsSection data={data} setData={setData} />
            )}
            {tab === 'services' && (
              <ServicesSection data={data} setData={setData} />
            )}
            {tab === 'pricing' && (
              <PricingSection data={data} setData={setData} />
            )}
            {tab === 'estimate' && (
              <EstimateFeaturesSection data={data} setData={setData} />
            )}
          </div>
        </div>
      </div>

      {/* Bottom status + quick save (thumb-friendly) */}
      <div
        className={cx(
          'fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200/90 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90 md:px-6'
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
            {error ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-red-600 dark:text-red-400">
                <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
                <span className="truncate">{error}</span>
              </span>
            ) : saved ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-success-600 dark:text-success-400">
                <CheckCircleIcon className="h-5 w-5 shrink-0" />
                Saved successfully
              </span>
            ) : (
              <span className="text-neutral-500 dark:text-neutral-400">
                <kbd className="rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  ⌘
                </kbd>
                <kbd className="ml-1 rounded border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-700 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  S
                </kbd>
                <span className="ml-2 hidden sm:inline">to save quickly</span>
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <AdminButtonPrimary
              type="button"
              disabled={saving || !dirty}
              onClick={() => void save()}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </AdminButtonPrimary>
          </div>
        </div>
      </div>
    </main>
  );
}
