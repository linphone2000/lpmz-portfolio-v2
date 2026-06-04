'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PageShell } from '@/components/Common/PageShell';
import { Badge } from '@/components/Common/Badge';
import {
  type FeatureCategory,
  type FeatureDefinition,
  type ProductType,
} from '@/lib/features';
import { Modal } from '@/components/Common/Modal';
import { ChevronDownIcon, LinkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { usePortfolioData } from '@/providers/PortfolioDataProvider';
import {
  ESTIMATE_PRESETS,
  FEATURE_CATEGORY_LABELS,
  FEATURE_CATEGORY_ORDER,
  getEstimateTierHint,
} from '@/lib/estimate';
import {
  getEstimateSharePath,
  getEstimateShareUrl,
  getSharedEstimateSelection,
  trackEstimateShareEvent,
} from '@/lib/estimateShare';

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

const WIZARD_STEPS: { step: WizardStep; label: string }[] = [
  { step: 1, label: 'Platform' },
  { step: 2, label: 'Features' },
  { step: 3, label: 'Confirm' },
];

const formatMMK = (value: number) => {
  if (value >= 1_000_000) {
    const million = value / 1_000_000;
    const decimals = million >= 10 ? 0 : 1;
    return `${million.toFixed(decimals)}M`;
  }
  return `${Math.round(value / 1_000)}K`;
};

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
    <p
      className={`text-sm text-neutral-600 dark:text-neutral-400 ${className}`}
    >
      {message}. Final quote depends on scope and design.
    </p>
  );
}

export default function EstimatePage() {
  const {
    data: { estimateFeatures: featuresCatalog },
  } = usePortfolioData();
  const hasHydratedFromUrl = useRef(false);
  const hasTrackedSharedOpen = useRef(false);
  const [tab, setTab] = useState<ProductType>('web');
  const [features, setFeatures] = useState<SelectedFeature[]>([]);
  const [step, setStep] = useState<WizardStep>(1);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isHurayOpen, setIsHurayOpen] = useState(false);
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
    setSendSuccess(false);
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

  const toggleFeature = (id: string) => {
    const f = catalogById.get(id);
    if (!f) return;
    setFeatures((prev) => {
      if (prev.some((p) => p.id === id)) {
        return prev.filter((item) => item.id !== id);
      }
      return [...prev, { id, name: f.name, baseCost: f.baseCost }];
    });
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

  const removeFeature = (id: string) => {
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  const subtotal = features.reduce((sum, f) => sum + f.baseCost, 0);
  const estimatedLabel = `${formatMMK(subtotal)} MMK`;
  const shareFeatureIds = features.map((feature) => feature.id);
  const tierHintForEmail = getEstimateTierHint(tab, subtotal).message;

  const canProceedStep1 = true;
  const canProceedStep2 = features.length > 0;
  const canSubmitStep3 = Boolean(contactName && contactEmail && contactPhone);

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
    if (sending || target > step) return;
    setStep(target);
  };

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
    const shareText = `Here’s a project estimate for a ${snapshot.tab === 'web' ? 'web' : 'mobile'} build with ${snapshot.featureCount} selected feature${snapshot.featureCount === 1 ? '' : 's'}.`;

    void trackEstimateShareEvent('estimate_share_clicked', {
      tab: snapshot.tab,
      featureCount: snapshot.featureCount,
      estimatedTotal: snapshot.estimatedTotal,
      featureIds: snapshot.featureIds,
    });

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Shared project estimate',
          text: shareText,
          url: shareUrl,
        });
        setShareState({
          type: 'success',
          message: 'Estimate link shared successfully.',
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareState({
        type: 'success',
        message: 'Estimate link copied to your clipboard.',
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
    setSendSuccess(false);

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
            .map(
              (f, idx) =>
                `${idx + 1}. ${f.name} (~${formatMMK(f.baseCost)} MMK)`
            )
            .join('\n')
        : 'No features selected';

      const comparableLine = tierHintForEmail
        ? `Comparable package: ${tierHintForEmail}`
        : null;

      const details = [
        `Platform: ${tab === 'web' ? 'Web' : 'Mobile'}`,
        comparableLine,
        `Features:\n${featureLines}`,
        `Estimated total: ${estimatedLabel}`,
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
      setSendSuccess(true);
      resetContactForm();
      setFeatures([]);
      setTab('web');
      setStep(1);
      setFeatureSearch('');
      setIsHurayOpen(true);
    } catch (error) {
      console.error('Estimator confirmation failed', error);
      setSendError('Unable to send confirmation. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <PageShell>
      <div className="min-h-screen pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Badge className="bg-primary-100/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800">
                Project Estimator
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900 dark:text-white">
              Customize your project and estimate
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Guided wizard: choose platform, add features, then confirm details
              to send.
            </p>
          </div>

          <div className="mb-8 grid gap-3">
            <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
              {WIZARD_STEPS.map(({ step: stepNumber, label }) => {
                const isActive = step === stepNumber;
                const isPast = step > stepNumber;
                const isClickable = isPast && !sending;

                if (isActive) {
                  return (
                    <span
                      key={stepNumber}
                      className="font-semibold text-primary-600 dark:text-primary-300 cursor-default"
                      aria-current="step"
                    >
                      {stepNumber}. {label}
                    </span>
                  );
                }

                if (isClickable) {
                  return (
                    <button
                      key={stepNumber}
                      type="button"
                      onClick={() => goToStep(stepNumber)}
                      className="font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      {stepNumber}. {label}
                    </button>
                  );
                }

                return (
                  <span
                    key={stepNumber}
                    className="text-neutral-400 dark:text-neutral-500 cursor-default"
                  >
                    {stepNumber}. {label}
                  </span>
                );
              })}
            </div>
            <div className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-600 to-secondary-500 transition-all duration-300"
                style={{
                  width: step === 1 ? '33%' : step === 2 ? '66%' : '100%',
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {step === 1 && (
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 font-semibold">
                      Product type
                    </p>
                    <p className="text-base text-neutral-700 dark:text-neutral-300">
                      Website / Web app or Mobile app
                    </p>
                  </div>
                  <div className="inline-flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                    <button
                      type="button"
                      onClick={() => {
                        setTab('web');
                        setFeatures([]);
                        setFeatureSearch('');
                        setShowSelectedOnly(false);
                      }}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${tab === 'web' ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-300 shadow-sm' : 'text-neutral-600 dark:text-neutral-400'}`}
                    >
                      Website / Web app
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTab('mobile');
                        setFeatures([]);
                        setFeatureSearch('');
                        setShowSelectedOnly(false);
                      }}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${tab === 'mobile' ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-300 shadow-sm' : 'text-neutral-600 dark:text-neutral-400'}`}
                    >
                      Mobile app
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-6 shadow-sm">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,13fr)_minmax(0,7fr)]">
                  <div className="space-y-4 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        Feature catalog
                      </h3>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
                        {tab === 'web' ? 'Web' : 'Mobile'}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
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
                            className="text-left px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/70 hover:border-primary-300 hover:bg-primary-50/30 dark:hover:bg-primary-900/20 transition-colors cursor-pointer"
                            title={preset.description}
                          >
                            <span className="block text-sm font-semibold text-neutral-900 dark:text-white">
                              {preset.label}
                            </span>
                            <span className="block text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
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
                          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 outline-none"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowSelectedOnly((value) => !value)}
                        disabled={features.length === 0}
                        className={`shrink-0 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          showSelectedOnly
                            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 dark:border-primary-600'
                            : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-primary-400'
                        }`}
                      >
                        Selected only ({features.length})
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Click a feature to add; click again to remove.
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
                            className="rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden"
                          >
                            <button
                              type="button"
                              onClick={() => toggleCategory(category)}
                              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-neutral-50 dark:bg-neutral-900/80 text-left cursor-pointer"
                            >
                              <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                                {FEATURE_CATEGORY_LABELS[category]}
                                <span className="ml-2 text-xs font-normal text-neutral-500 dark:text-neutral-400">
                                  {items.length} features
                                  {selectedInCategory > 0 && (
                                    <span className="ml-1 text-primary-600 dark:text-primary-400 font-medium">
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
                                      className={`relative text-left p-3 rounded-lg border-2 text-sm transition-all cursor-pointer ${
                                        isSelected
                                          ? 'border-primary-500 bg-primary-50/90 dark:bg-primary-950/50 shadow-sm ring-1 ring-primary-500/25'
                                          : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900/80 hover:border-primary-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
                                      }`}
                                      title={f.desc ?? f.name}
                                    >
                                      {isSelected && (
                                        <CheckCircleIcon
                                          className="absolute top-2 right-2 h-5 w-5 text-primary-600 dark:text-primary-400"
                                          aria-hidden
                                        />
                                      )}
                                      <div
                                        className={`font-semibold leading-tight pr-6 ${
                                          isSelected
                                            ? 'text-primary-900 dark:text-primary-100'
                                            : 'text-neutral-900 dark:text-white'
                                        }`}
                                      >
                                        {f.name}
                                      </div>
                                      <div
                                        className={`text-xs mt-1 tabular-nums ${
                                          isSelected
                                            ? 'text-primary-700/80 dark:text-primary-300/90'
                                            : 'text-neutral-500 dark:text-neutral-400'
                                        }`}
                                      >
                                        ~{formatMMK(f.baseCost)} MMK
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
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 py-4 text-center">
                          No features match your search.
                        </p>
                      )}
                    </div>

                    <TierHintBanner tab={tab} subtotal={subtotal} />
                  </div>

                  <div className="min-w-0 flex flex-col">
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                        Selected
                      </h3>
                      {features.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setFeatures([]);
                            setShowSelectedOnly(false);
                          }}
                          className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-300 cursor-pointer"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                    {features.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700 px-3 py-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                        Add features from the catalog or a quick starter.
                      </div>
                    ) : (
                      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/50 divide-y divide-neutral-200 dark:divide-neutral-800 max-h-[28rem] overflow-y-auto">
                        {features.map((f) => (
                          <div
                            key={f.id}
                            className="flex items-start gap-1.5 px-2 py-1.5"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-neutral-900 dark:text-white leading-snug line-clamp-2">
                                {f.name}
                              </p>
                              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 tabular-nums">
                                ~{formatMMK(f.baseCost)} MMK
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
                      <p className="mt-2 text-xs font-semibold text-neutral-800 dark:text-neutral-100 tabular-nums">
                        Subtotal: {estimatedLabel}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-6 shadow-sm space-y-6">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-4 space-y-2 max-h-64 overflow-auto">
                  {features.length === 0 ? (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      No features selected yet.
                    </p>
                  ) : (
                    features.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="text-neutral-800 dark:text-neutral-100">
                          {f.name}
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400">
                          {formatMMK(f.baseCost)} MMK
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400 font-semibold">
                      Total
                    </p>
                    <p className="text-2xl font-black text-neutral-900 dark:text-white">
                      {estimatedLabel}
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors cursor-pointer"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Share this estimate
                  </button>
                </div>

                {shareState.type !== 'idle' && (
                  <p
                    className={`text-sm ${
                      shareState.type === 'success'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}
                  >
                    {shareState.message}
                  </p>
                )}

                <div className="grid gap-3">
                  <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Full name
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={sending}
                      aria-disabled={sending}
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Email
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={sending}
                      aria-disabled={sending}
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                    Phone
                    <input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      disabled={sending}
                      aria-disabled={sending}
                      className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                      placeholder="09xxxxxxxxx"
                    />
                  </label>
                </div>

                {sending && (
                  <div className="flex items-center text-sm text-primary-600 dark:text-primary-400">
                    <span className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                    Sending confirmation...
                  </div>
                )}
                {sendError && (
                  <p className="text-sm text-red-500">{sendError}</p>
                )}
                {sendSuccess && (
                  <p className="text-sm text-green-600">
                    Confirmation sent. I&apos;ll follow up shortly.
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSendConfirmation}
                    className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 disabled:opacity-60 cursor-pointer"
                    disabled={sending || !canSubmitStep3}
                  >
                    {sending ? (
                      <span className="inline-flex items-center">
                        <span className="inline-block h-4 w-4 rounded-full border-2 border-white/80 border-t-transparent animate-spin mr-2" />
                        Sending...
                      </span>
                    ) : (
                      'Send confirmation'
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (step > 1) {
                    goToStep((step - 1) as WizardStep);
                  }
                }}
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:border-primary-400 disabled:opacity-50 cursor-pointer"
                disabled={step === 1 || sending}
              >
                Back
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
                {step < 3 && (
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="font-medium">
                      Estimated total: {estimatedLabel}
                    </span>
                    {subtotal > 0 && (
                      <span className="hidden sm:inline">
                        {' '}
                        ·{' '}
                        {getEstimateTierHint(tab, subtotal).message ??
                          'Add features to compare with packages'}
                      </span>
                    )}
                  </div>
                )}
                {step < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 1 && !canProceedStep1) return;
                      if (step === 2 && !canProceedStep2) return;
                      setStep((step + 1) as WizardStep);
                    }}
                    className="px-5 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 disabled:opacity-50 cursor-pointer shrink-0"
                    disabled={(step === 2 && !canProceedStep2) || sending}
                  >
                    Next
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
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              You have {features.length} feature
              {features.length === 1 ? '' : 's'} selected. Replace them with the{' '}
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {pendingPreset.label}
              </span>{' '}
              starter set?
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 rounded-lg bg-neutral-50 dark:bg-neutral-800/80 px-3 py-2">
              {pendingPreset.description} ({pendingPreset.featureIds.length}{' '}
              features)
            </p>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setPendingPreset(null)}
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:border-primary-400 transition-colors cursor-pointer"
              >
                Keep current
              </button>
              <button
                type="button"
                onClick={confirmPresetReplace}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 transition-colors cursor-pointer"
              >
                Replace selection
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isHurayOpen}
        onClose={() => setIsHurayOpen(false)}
        title="Huray!"
        size="sm"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
            <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Your request was sent successfully
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              I&apos;ll reach out shortly via your provided contact details.
              Thanks!
            </p>
          </div>
          {shareState.type !== 'idle' && (
            <p
              className={`text-sm ${
                shareState.type === 'success'
                  ? 'text-green-600'
                  : 'text-red-500'
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
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-300 cursor-pointer"
              disabled={!lastSharedEstimate}
            >
              Share this estimate
            </button>
            <button
              type="button"
              onClick={() => setIsHurayOpen(false)}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 cursor-pointer"
            >
              Great!
            </button>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
}
