'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PageShell } from '@/components/Common/PageShell';
import Link from 'next/link';
import {
  type FeatureCategory,
  type FeatureDefinition,
  type ProductType,
} from '@/lib/features';
import { Modal } from '@/components/Common/Modal';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  DevicePhoneMobileIcon,
  LinkIcon,
  WindowIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import {
  ESTIMATE_PRESETS,
  FEATURE_CATEGORY_LABELS,
  FEATURE_CATEGORY_ORDER,
  getEstimateTierHint,
  getFeatureEffort,
  getFeatureEffortLabel,
  getScopeSummaryLabel,
} from '@/lib/estimate';
import {
  getEstimateSharePath,
  getEstimateShareUrl,
  getSharedEstimateSelection,
  trackEstimateShareEvent,
} from '@/lib/estimateShare';
import styles from './Estimate.module.css';

type SelectedFeature = {
  id: string;
  name: string;
  baseCost: number;
};

type ShareableEstimateSnapshot = {
  tab: ProductType;
  featureIds: string[];
  featureCount: number;
  estimatedTotal: number;
};

type WizardStep = 1 | 2 | 3;

type PendingPreset = {
  label: string;
  description: string;
  featureIds: string[];
};

const PLATFORMS = [
  {
    id: 'web',
    label: 'Website / Web app',
    description: 'Websites, storefronts, dashboards, and browser-based tools.',
    icon: WindowIcon,
  },
  {
    id: 'mobile',
    label: 'Mobile app',
    description:
      'Apps for iOS and Android with features like push notifications or payments.',
    icon: DevicePhoneMobileIcon,
  },
] as const;

const WIZARD_STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: 'Platform' },
  { step: 2, label: 'Features' },
  { step: 3, label: 'Confirm' },
];

function TierHintBanner({
  tab,
  subtotal,
  className = '',
}: {
  tab: ProductType;
  subtotal: number;
  className?: string;
}) {
  const { message } = getEstimateTierHint(tab, subtotal);
  if (!message || subtotal <= 0) return null;

  return (
    <p className={`text-sm text-[var(--site-muted)] ${className}`}>
      {message}. Final scope depends on design and complexity.
    </p>
  );
}

export default function EstimatePage() {
  const {
    data: { estimateFeatures: featuresCatalog },
  } = usePortfolioData();
  const hasHydratedFromUrl = useRef(false);
  const hasTrackedSharedOpen = useRef(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const shouldFocusStep = useRef(false);
  const [tab, setTab] = useState<ProductType>('web');
  const [features, setFeatures] = useState<SelectedFeature[]>([]);
  const [step, setStep] = useState<WizardStep>(1);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [lastSharedEstimate, setLastSharedEstimate] =
    useState<ShareableEstimateSnapshot | null>(null);
  const [shareState, setShareState] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [featureSearch, setFeatureSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<
    Record<FeatureCategory, boolean>
  >({
    essential: true,
    commerce: false,
    education: false,
    platform: false,
  });
  const [pendingPreset, setPendingPreset] = useState<PendingPreset | null>(
    null
  );
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const resetContactForm = () => {
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setSendError(null);
  };

  const catalogById = useMemo(() => {
    const map = new Map<string, FeatureDefinition>();
    for (const feature of featuresCatalog[tab]) {
      map.set(feature.id, feature);
    }
    return map;
  }, [featuresCatalog, tab]);

  const selectedIds = useMemo(
    () => new Set(features.map((feature) => feature.id)),
    [features]
  );

  const buildSelectionFromIds = (featureIds: string[]) =>
    featureIds
      .map((id) => catalogById.get(id))
      .filter((feature): feature is FeatureDefinition => Boolean(feature))
      .map((feature) => ({
        id: feature.id,
        name: feature.name,
        baseCost: feature.baseCost,
      }));

  const removeFeature = (id: string) => {
    if (selectedIds.size === 1 && selectedIds.has(id)) {
      setShowSelectedOnly(false);
    }
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));
  };

  const toggleFeature = (id: string) => {
    if (selectedIds.has(id)) {
      removeFeature(id);
      return;
    }

    const feature = catalogById.get(id);
    if (feature) {
      setFeatures((prev) => [
        ...prev,
        { id, name: feature.name, baseCost: feature.baseCost },
      ]);
    }
  };

  const requestPreset = (preset: PendingPreset) => {
    if (features.length > 0) {
      setPendingPreset(preset);
      return;
    }
    setFeatures(buildSelectionFromIds(preset.featureIds));
  };

  const confirmPresetReplace = () => {
    if (!pendingPreset) return;
    setFeatures(buildSelectionFromIds(pendingPreset.featureIds));
    setPendingPreset(null);
  };

  const subtotal = features.reduce((sum, f) => sum + f.baseCost, 0);
  const tierHint = getEstimateTierHint(tab, subtotal);
  const scopeSummary = getScopeSummaryLabel(features.length);
  const tierHintForEmail = tierHint.message;
  const shareFeatureIds = features.map((feature) => feature.id);

  const canProceedStep2 = features.length > 0;
  const canSubmitStep3 = Boolean(
    contactName.trim() && contactEmail.trim() && contactPhone.trim()
  );

  const filteredCatalog = useMemo(() => {
    const query = featureSearch.trim().toLowerCase();
    let list = featuresCatalog[tab];
    if (showSelectedOnly) {
      list = list.filter((feature) => selectedIds.has(feature.id));
    }
    if (!query) return list;
    return list.filter(
      (feature) =>
        feature.name.toLowerCase().includes(query) ||
        (feature.desc?.toLowerCase().includes(query) ?? false) ||
        (feature.nameMm?.toLowerCase().includes(query) ?? false)
    );
  }, [featureSearch, featuresCatalog, tab, showSelectedOnly, selectedIds]);

  const catalogByCategory = useMemo(() => {
    const grouped = new Map<FeatureCategory, FeatureDefinition[]>();
    for (const category of FEATURE_CATEGORY_ORDER) {
      grouped.set(category, []);
    }
    for (const feature of filteredCatalog) {
      grouped.get(feature.category)?.push(feature);
    }
    return grouped;
  }, [filteredCatalog]);

  const goToStep = (target: WizardStep) => {
    if (sending || target === step) return;
    if (target > step && step === 2 && !canProceedStep2) return;
    shouldFocusStep.current = true;
    setStep(target);
  };

  useEffect(() => {
    if (!shouldFocusStep.current) return;

    shouldFocusStep.current = false;
    stepHeading.current?.focus();
  }, [step]);

  const toggleCategory = (category: FeatureCategory) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    if (typeof window === 'undefined' || hasHydratedFromUrl.current) {
      return;
    }

    const selection = getSharedEstimateSelection(
      new URLSearchParams(window.location.search),
      featuresCatalog
    );
    const hydratedFeatures = selection.featureIds
      .map((id) =>
        featuresCatalog[selection.tab].find((feature) => feature.id === id)
      )
      .filter((feature): feature is NonNullable<typeof feature> =>
        Boolean(feature)
      )
      .map((feature) => ({
        id: feature.id,
        name: feature.name,
        baseCost: feature.baseCost,
      }));

    setTab(selection.tab);
    setFeatures(hydratedFeatures);
    setStep(hydratedFeatures.length > 0 ? 3 : 1);
    hasHydratedFromUrl.current = true;

    if (selection.isShared && !hasTrackedSharedOpen.current) {
      hasTrackedSharedOpen.current = true;
      const estimatedTotal = hydratedFeatures.reduce(
        (sum, feature) => sum + feature.baseCost,
        0
      );

      void trackEstimateShareEvent('shared_estimate_opened', {
        tab: selection.tab,
        featureCount: hydratedFeatures.length,
        estimatedTotal,
        featureIds: hydratedFeatures.map((feature) => feature.id),
      });
    }
  }, [featuresCatalog]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hasHydratedFromUrl.current) {
      return;
    }

    const nextPath = getEstimateSharePath(tab, shareFeatureIds);
    const currentPath = `${window.location.pathname}${window.location.search}`;

    if (currentPath !== nextPath) {
      window.history.replaceState({}, '', nextPath);
    }
  }, [tab, shareFeatureIds]);

  const handleShareEstimate = async (
    snapshot: ShareableEstimateSnapshot = {
      tab,
      featureIds: shareFeatureIds,
      featureCount: features.length,
      estimatedTotal: subtotal,
    }
  ) => {
    if (typeof window === 'undefined') return;

    const shareUrl = getEstimateShareUrl(
      window.location.origin,
      snapshot.tab,
      snapshot.featureIds
    );
    const shareText = `Here’s a project scope for a ${snapshot.tab === 'web' ? 'web' : 'mobile'} build with ${snapshot.featureCount} selected feature${snapshot.featureCount === 1 ? '' : 's'}.`;

    void trackEstimateShareEvent('estimate_share_clicked', {
      tab: snapshot.tab,
      featureCount: snapshot.featureCount,
      estimatedTotal: snapshot.estimatedTotal,
      featureIds: snapshot.featureIds,
    });

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Shared project scope',
          text: shareText,
          url: shareUrl,
        });
        setShareState({
          type: 'success',
          message: 'Scope link shared successfully.',
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareState({
        type: 'success',
        message: 'Scope link copied to your clipboard.',
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setShareState({ type: 'idle', message: '' });
        return;
      }

      console.error('Failed to share estimate', error);
      setShareState({
        type: 'error',
        message: 'Unable to share right now. Please try again.',
      });
    }
  };

  const handleSendConfirmation = async () => {
    if (!canSubmitStep3) {
      setSendError('Please fill in your name, email, and phone.');
      return;
    }

    setSending(true);
    setSendError(null);

    try {
      const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const TEMPLATE_ID_USER = process.env
        .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER as string;
      const TEMPLATE_ID_ADMIN = process.env
        .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN as string;
      const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;
      const ADMIN_EMAIL =
        (process.env.NEXT_PUBLIC_EMAILJS_ADMIN_EMAIL as string) ||
        'linphonem@gmail.com';

      if (
        !SERVICE_ID ||
        !TEMPLATE_ID_USER ||
        !TEMPLATE_ID_ADMIN ||
        !PUBLIC_KEY
      ) {
        throw new Error('Email is not configured');
      }

      const featureLines = features.length
        ? features
            .map((f, idx) => {
              const effort = getFeatureEffortLabel(
                getFeatureEffort(f.baseCost)
              );
              return `${idx + 1}. ${f.name} (${effort})`;
            })
            .join('\n')
        : 'No features selected';

      const comparableLine = tierHintForEmail
        ? `Scope alignment: ${tierHintForEmail}`
        : null;

      const details = [
        `Platform: ${tab === 'web' ? 'Web' : 'Mobile'}`,
        comparableLine,
        `Features:\n${featureLines}`,
        `Selected scope: ${scopeSummary}`,
      ]
        .filter(Boolean)
        .join('\n\n');

      const endpoint = 'https://api.emailjs.com/api/v1.0/email/send';

      const sendEmail = async (
        templateId: string,
        to_email: string,
        to_name: string
      ) => {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: SERVICE_ID,
            template_id: templateId,
            user_id: PUBLIC_KEY,
            template_params: {
              to_email,
              to_name,
              user_name: contactName.trim(),
              user_email: contactEmail.trim(),
              user_phone: contactPhone.trim(),
              details,
              from_name: 'Portfolio Estimator',
            },
          }),
        });

        if (!res.ok) {
          const t = await res.text();
          throw new Error(`EmailJS ${res.status}: ${t}`);
        }
      };

      await sendEmail(
        TEMPLATE_ID_USER,
        contactEmail.trim(),
        contactName.trim()
      );

      await sendEmail(TEMPLATE_ID_ADMIN, ADMIN_EMAIL, 'Lin');

      setLastSharedEstimate({
        tab,
        featureIds: shareFeatureIds,
        featureCount: features.length,
        estimatedTotal: subtotal,
      });
      resetContactForm();
      setFeatures([]);
      setTab('web');
      setStep(1);
      setFeatureSearch('');
      setIsConfirmationOpen(true);
    } catch (error) {
      console.error('Estimator confirmation failed', error);
      setSendError('Unable to send confirmation. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <PageShell>
      <div className={styles.page}>
        <div className={`site-container ${styles.wizard}`}>
          <header className={styles.heading}>
            <Link href="/services" className={styles.backLink}>
              <ArrowLeftIcon aria-hidden /> Services
            </Link>
            <h1>Build a project estimate</h1>
            <p>
              Choose a platform and the features you need. Share the scope or
              send it to me so we can discuss next steps.
            </p>
          </header>

          <ol className={styles.steps} aria-label="Estimate stages">
            {WIZARD_STEPS.map(({ step: stepNumber, label }) => {
              const isActive = step === stepNumber;
              const isPast = step > stepNumber;
              const caption = (
                <>
                  <span aria-hidden>{String(stepNumber).padStart(2, '0')}</span>
                  {label}
                </>
              );

              return (
                <li
                  key={stepNumber}
                  data-state={
                    isActive ? 'active' : isPast ? 'complete' : 'ahead'
                  }
                >
                  {isPast && !sending ? (
                    <button type="button" onClick={() => goToStep(stepNumber)}>
                      {caption}
                    </button>
                  ) : (
                    <span aria-current={isActive ? 'step' : undefined}>
                      {caption}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          <div className={styles.workspace}>
            {step === 1 && (
              <section
                className={`${styles.stepPanel} ${styles.platformPanel}`}
                aria-labelledby="estimate-step-heading"
              >
                <h2
                  id="estimate-step-heading"
                  className={styles.stepTitle}
                  tabIndex={-1}
                  ref={stepHeading}
                >
                  Choose a platform
                </h2>
                <div className={styles.platformChoices}>
                  {PLATFORMS.map(({ id, label, description, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={tab === id}
                      aria-labelledby={`estimate-platform-label-${id}`}
                      aria-describedby={`estimate-platform-${id}`}
                      onClick={() => {
                        if (tab === id) return;
                        setTab(id);
                        setFeatures([]);
                        setFeatureSearch('');
                        setShowSelectedOnly(false);
                      }}
                    >
                      <Icon className={styles.platformIcon} aria-hidden />
                      <span
                        id={`estimate-platform-label-${id}`}
                        className={styles.platformName}
                      >
                        {label}
                      </span>
                      <span
                        id={`estimate-platform-${id}`}
                        className={styles.platformDescription}
                      >
                        {description}
                      </span>
                      <CheckCircleIcon
                        className={styles.platformCheck}
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {step === 2 && (
              <section
                className={styles.stepPanel}
                aria-labelledby="estimate-step-heading"
              >
                <h2
                  id="estimate-step-heading"
                  className={styles.stepTitle}
                  tabIndex={-1}
                  ref={stepHeading}
                >
                  Choose features
                </h2>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,13fr)_minmax(0,7fr)]">
                  <div className="space-y-4 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-[var(--site-ink)]">
                        Feature catalog
                      </h3>
                      <span className="text-xs text-[var(--site-muted)] shrink-0">
                        {tab === 'web' ? 'Web' : 'Mobile'}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--site-muted)] mb-2">
                        Quick starters
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ESTIMATE_PRESETS[tab].map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() =>
                              requestPreset({
                                label: preset.label,
                                description: preset.description,
                                featureIds: preset.featureIds,
                              })
                            }
                            className="text-left px-3 py-2 rounded-lg border border-[var(--site-line)] bg-[var(--site-bg)] hover:border-[var(--site-accent)] hover:bg-[var(--site-surface)] transition-colors cursor-pointer"
                            title={preset.description}
                          >
                            <span className="block text-sm font-semibold text-[var(--site-ink)]">
                              {preset.label}
                            </span>
                            <span className="block text-[11px] text-[var(--site-muted)] mt-0.5">
                              {preset.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <label className="block flex-1 min-w-0">
                        <span className="sr-only">Search features</span>
                        <input
                          type="search"
                          value={featureSearch}
                          onChange={(e) => setFeatureSearch(e.target.value)}
                          placeholder="Search features…"
                          className="w-full rounded-lg border border-[var(--site-line)] bg-[var(--site-bg)] px-3 py-2 text-sm focus:border-[var(--site-accent)] outline-none"
                        />
                      </label>
                      <button
                        type="button"
                        aria-pressed={showSelectedOnly}
                        onClick={() => setShowSelectedOnly((value) => !value)}
                        disabled={features.length === 0}
                        className={`shrink-0 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          showSelectedOnly
                            ? 'border-[var(--site-accent)] bg-[var(--site-bg)] text-[var(--site-accent)]'
                            : 'border-[var(--site-line)] text-[var(--site-muted)] hover:border-[var(--site-accent)]'
                        }`}
                      >
                        Selected only ({features.length})
                      </button>
                    </div>
                    <p className="text-[11px] text-[var(--site-muted)]">
                      Select a feature to add it. Select it again to remove it.
                    </p>

                    <div className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
                      {FEATURE_CATEGORY_ORDER.map((category) => {
                        const items = catalogByCategory.get(category) ?? [];
                        if (items.length === 0) return null;
                        const isOpen = expandedCategories[category];
                        const selectedInCategory = items.filter((item) =>
                          selectedIds.has(item.id)
                        ).length;

                        return (
                          <div
                            key={category}
                            className="rounded-xl border border-[var(--site-line)] overflow-hidden"
                          >
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => toggleCategory(category)}
                              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-[var(--site-bg)] text-left cursor-pointer"
                            >
                              <span className="text-sm font-semibold text-[var(--site-ink)]">
                                {FEATURE_CATEGORY_LABELS[category]}
                                <span className="ml-2 text-xs font-normal text-[var(--site-muted)]">
                                  {items.length} features
                                  {selectedInCategory > 0 && (
                                    <span className="ml-1 text-[var(--site-accent)] font-medium">
                                      · {selectedInCategory} selected
                                    </span>
                                  )}
                                </span>
                              </span>
                              <ChevronDownIcon
                                className={`h-4 w-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                              />
                            </button>
                            {isOpen && (
                              <div className="p-2 grid sm:grid-cols-2 gap-2">
                                {items.map((f) => {
                                  const isSelected = selectedIds.has(f.id);
                                  return (
                                    <button
                                      key={f.id}
                                      type="button"
                                      onClick={() => toggleFeature(f.id)}
                                      aria-pressed={isSelected}
                                      className={`relative text-left p-3 rounded-lg border text-sm transition-colors cursor-pointer ${
                                        isSelected
                                          ? 'border-[var(--site-accent)] bg-[var(--site-bg)]'
                                          : 'border-[var(--site-line)] bg-[var(--site-bg)] hover:border-[var(--site-accent)] hover:bg-[var(--site-surface)]'
                                      }`}
                                      title={f.desc ?? f.name}
                                    >
                                      {isSelected && (
                                        <CheckCircleIcon
                                          className="absolute top-2 right-2 h-5 w-5 text-[var(--site-accent)]"
                                          aria-hidden
                                        />
                                      )}
                                      <div className="font-semibold leading-tight pr-6 text-[var(--site-ink)]">
                                        {f.name}
                                      </div>
                                      <div className="text-xs mt-1 text-[var(--site-muted)]">
                                        {getFeatureEffortLabel(
                                          getFeatureEffort(f.baseCost)
                                        )}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {filteredCatalog.length === 0 && (
                        <p className="text-sm text-[var(--site-muted)] py-4 text-center">
                          No features match your search.
                        </p>
                      )}
                    </div>

                    <TierHintBanner tab={tab} subtotal={subtotal} />
                  </div>

                  <div className="min-w-0 flex flex-col">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--site-muted)]">
                        Selected
                      </h3>
                      {features.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFeatures([]);
                            setShowSelectedOnly(false);
                          }}
                          className="text-[11px] font-semibold text-[var(--site-muted)] hover:text-[var(--site-accent)] cursor-pointer"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    {features.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-[var(--site-line)] px-3 py-2.5 text-xs text-[var(--site-muted)] leading-snug">
                        Add features from the catalog or a quick starter.
                      </div>
                    ) : (
                      <div className="rounded-lg border border-[var(--site-line)] bg-[var(--site-bg)] divide-y divide-[var(--site-line)] max-h-[28rem] overflow-y-auto">
                        {features.map((f) => (
                          <div
                            key={f.id}
                            className="flex items-start gap-1.5 px-2 py-1.5"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[var(--site-ink)] leading-snug line-clamp-2">
                                {f.name}
                              </p>
                              <p className="text-[10px] text-[var(--site-muted)] mt-0.5">
                                {getFeatureEffortLabel(
                                  getFeatureEffort(f.baseCost)
                                )}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFeature(f.id)}
                              aria-label={`Remove ${f.name}`}
                              className="shrink-0 text-[11px] font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-1 py-0.5 rounded cursor-pointer"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {features.length > 0 && (
                      <p className="mt-2 text-xs font-semibold text-[var(--site-ink)]">
                        {scopeSummary}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {step === 3 && (
              <section
                className={`${styles.stepPanel} space-y-6`}
                aria-labelledby="estimate-step-heading"
              >
                <h2
                  id="estimate-step-heading"
                  className={styles.stepTitle}
                  tabIndex={-1}
                  ref={stepHeading}
                >
                  Review your scope
                </h2>
                <div className="rounded-xl border border-[var(--site-line)] bg-[var(--site-bg)] p-4 space-y-2 max-h-64 overflow-auto">
                  {features.length === 0 ? (
                    <p className="text-sm text-[var(--site-muted)]">
                      No features selected yet.
                    </p>
                  ) : (
                    features.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="text-[var(--site-ink)] min-w-0">
                          {f.name}
                        </div>
                        <div className="shrink-0 text-[var(--site-muted)] text-xs">
                          {getFeatureEffortLabel(getFeatureEffort(f.baseCost))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[var(--site-muted)] font-semibold">
                      Selected scope
                    </p>
                    <p className="text-xl font-black text-[var(--site-ink)]">
                      {scopeSummary}
                    </p>
                    <TierHintBanner
                      tab={tab}
                      subtotal={subtotal}
                      className="mt-2"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      void handleShareEstimate();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--site-line)] text-[var(--site-ink)] hover:border-[var(--site-accent)] hover:text-[var(--site-accent)] transition-colors cursor-pointer"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Share this scope
                  </button>
                </div>

                {shareState.type !== 'idle' && (
                  <p
                    role="status"
                    className={`text-sm ${
                      shareState.type === 'success'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {shareState.message}
                  </p>
                )}

                <form
                  className="grid gap-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleSendConfirmation();
                  }}
                >
                  <label className="space-y-1 text-sm font-medium text-[var(--site-ink)]">
                    Full name
                    <input
                      autoComplete="name"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={sending}
                      aria-disabled={sending}
                      className="w-full rounded-lg border border-[var(--site-line)] bg-[var(--site-bg)] px-3 py-2 focus:border-[var(--site-accent)]"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="space-y-1 text-sm font-medium text-[var(--site-ink)]">
                    Email
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={sending}
                      aria-disabled={sending}
                      className="w-full rounded-lg border border-[var(--site-line)] bg-[var(--site-bg)] px-3 py-2 focus:border-[var(--site-accent)]"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="space-y-1 text-sm font-medium text-[var(--site-ink)]">
                    Phone
                    <input
                      type="tel"
                      autoComplete="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      disabled={sending}
                      aria-disabled={sending}
                      className="w-full rounded-lg border border-[var(--site-line)] bg-[var(--site-bg)] px-3 py-2 focus:border-[var(--site-accent)]"
                      placeholder="09xxxxxxxxx"
                    />
                  </label>
                  {sendError && (
                    <p className="text-sm text-red-400" role="alert">
                      {sendError}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[var(--site-accent)] text-[var(--site-bg)] font-semibold hover:bg-[var(--site-ink)] disabled:opacity-60 cursor-pointer"
                      disabled={sending || !canSubmitStep3}
                    >
                      {sending ? (
                        <span className="inline-flex items-center">
                          <span className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none mr-2" />
                          Sending...
                        </span>
                      ) : (
                        'Send confirmation'
                      )}
                    </button>
                  </div>
                </form>
              </section>
            )}

            <div className={styles.stepActions}>
              <button
                type="button"
                onClick={() => {
                  if (step > 1) {
                    goToStep((step - 1) as WizardStep);
                  }
                }}
                className={styles.previous}
                disabled={step === 1 || sending}
              >
                <ArrowLeftIcon aria-hidden /> Back
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                {step < 3 && (
                  <div className="text-sm text-[var(--site-muted)]">
                    <span className="font-medium">{scopeSummary}</span>
                    {subtotal > 0 && tierHint.message && (
                      <span className="hidden sm:inline">
                        {' '}
                        · {tierHint.message}
                      </span>
                    )}
                  </div>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={() => goToStep((step + 1) as WizardStep)}
                    className={styles.next}
                    disabled={(step === 2 && !canProceedStep2) || sending}
                  >
                    Next <ArrowRightIcon aria-hidden />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={pendingPreset !== null}
        onClose={() => setPendingPreset(null)}
        title="Replace current selection?"
        size="sm"
      >
        {pendingPreset && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--site-muted)]">
              You have {features.length} feature
              {features.length === 1 ? '' : 's'} selected. Replace them with the{' '}
              <span className="font-semibold text-[var(--site-ink)]">
                {pendingPreset.label}
              </span>{' '}
              starter set?
            </p>
            <p className="text-xs text-[var(--site-muted)] rounded-lg bg-[var(--site-bg)] px-3 py-2">
              {pendingPreset.description} ({pendingPreset.featureIds.length}{' '}
              features)
            </p>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setPendingPreset(null)}
                className="px-4 py-2 rounded-lg border border-[var(--site-line)] text-[var(--site-ink)] hover:border-[var(--site-accent)] transition-colors cursor-pointer"
              >
                Keep current
              </button>
              <button
                type="button"
                onClick={confirmPresetReplace}
                className="px-4 py-2 rounded-lg bg-[var(--site-accent)] text-[var(--site-bg)] font-semibold hover:bg-[var(--site-ink)] transition-colors cursor-pointer"
              >
                Replace selection
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        title="Project scope sent"
        size="sm"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
            <CheckCircleIcon className="h-8 w-8 text-green-400 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-[var(--site-muted)]">
              I’ll follow up using the contact details you provided.
            </p>
          </div>
          {shareState.type !== 'idle' && (
            <p
              role="status"
              className={`text-sm ${
                shareState.type === 'success'
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {shareState.message}
            </p>
          )}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                if (lastSharedEstimate) {
                  void handleShareEstimate(lastSharedEstimate);
                }
              }}
              className="px-4 py-2 rounded-lg border border-[var(--site-line)] text-[var(--site-ink)] hover:border-[var(--site-accent)] hover:text-[var(--site-accent)] cursor-pointer"
              disabled={!lastSharedEstimate}
            >
              Share this scope
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmationOpen(false)}
              className="px-4 py-2 rounded-lg bg-[var(--site-accent)] text-[var(--site-bg)] font-semibold hover:bg-[var(--site-ink)] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
}
