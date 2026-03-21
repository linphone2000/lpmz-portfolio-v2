'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  ADMIN_TAB_ORDER,
  type AdminTabId,
} from '@/components/admin/admin-tabs';
import { PortfolioEditorTabs } from '@/components/admin/PortfolioEditorTabs';
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

export function PortfolioEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState<PortfolioCMSData>(fallbackPortfolioContent);
  const [tab, setTab] = useState<AdminTabId>('profile');

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
      } catch {
        setError('Unable to load portfolio content');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  const save = async () => {
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

      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed unexpectedly');
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-neutral-600 dark:text-neutral-300">
          Loading editor…
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Edit portfolio
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Structured sections—no raw JSON. Save sends everything to your
              database.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm dark:border-neutral-600"
            >
              Log out
            </button>
          </div>
        </header>

        <PortfolioEditorTabs
          tabs={ADMIN_TAB_ORDER}
          active={tab}
          onChange={setTab}
        />

        <div className="mt-8 pb-24">
          {tab === 'profile' && (
            <ProfileSection data={data} setData={setData} />
          )}
          {tab === 'experience' && (
            <ExperienceSection data={data} setData={setData} />
          )}
          {tab === 'projects' && (
            <ProjectsSection data={data} setData={setData} />
          )}
          {tab === 'skills' && <SkillsSection data={data} setData={setData} />}
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

        <footer className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-neutral-50/95 px-4 py-3 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95 md:px-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            {error ? (
              <span className="text-sm text-red-600">{error}</span>
            ) : null}
            {saved && !error ? (
              <span className="text-sm text-green-600">
                Saved successfully.
              </span>
            ) : null}
          </div>
        </footer>
      </div>
    </main>
  );
}
