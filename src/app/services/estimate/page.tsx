'use client';

import React, { useState } from 'react';
import { PageShell } from '@/components/Common/PageShell';
import { Badge } from '@/components/Common/Badge';
import { ProductType, featuresCatalog } from '@/lib/features';
import { Modal } from '@/components/Common/Modal';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

type SelectedFeature = {
  id: string;
  name: string;
  baseCost: number; // MMK
};

const formatMMK = (value: number) => {
  if (value >= 1_000_000) {
    const million = value / 1_000_000;
    const decimals = million >= 10 ? 0 : 1;
    return `${million.toFixed(decimals)}M`;
  }
  return `${Math.round(value / 1_000)}K`;
};

export default function EstimatePage() {
  const [tab, setTab] = useState<ProductType>('web');
  const [features, setFeatures] = useState<SelectedFeature[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isHurayOpen, setIsHurayOpen] = useState(false);

  const resetContactForm = () => {
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setSendError(null);
    setSendSuccess(false);
  };

  const addPredefined = (id: string) => {
    const catalog = featuresCatalog[tab];
    const f = catalog.find((x) => x.id === id);
    if (!f) return;
    setFeatures((prev) => {
      if (prev.some((p) => p.id === id)) return prev;
      return [...prev, { id: id, name: f.name, baseCost: f.baseCost }];
    });
  };

  const removeFeature = (id: string) => {
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  const subtotal = features.reduce((sum, f) => sum + f.baseCost, 0);
  const estimatedLabel = `${formatMMK(subtotal)} MMK`;

  const canProceedStep1 = true;
  const canProceedStep2 = features.length > 0;
  const canSubmitStep3 = Boolean(contactName && contactEmail && contactPhone);

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

      const details = [
        `Platform: ${tab === 'web' ? 'Web' : 'Mobile'}`,
        `Features:\n${featureLines}`,
        `Estimated total: ${estimatedLabel}`,
      ].join('\n\n');

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

      setSendSuccess(true);
      resetContactForm();
      // Reset wizard and open success (Huray) modal
      setFeatures([]);
      setTab('web');
      setStep(1);
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
              <span
                className={`${step === 1 ? 'font-semibold text-primary-600 dark:text-primary-300' : ''}`}
              >
                1. Platform
              </span>
              <span
                className={`${step === 2 ? 'font-semibold text-primary-600 dark:text-primary-300' : ''}`}
              >
                2. Features
              </span>
              <span
                className={`${step === 3 ? 'font-semibold text-primary-600 dark:text-primary-300' : ''}`}
              >
                3. Confirm
              </span>
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
                      onClick={() => {
                        setTab('web');
                        setFeatures([]);
                      }}
                      className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${tab === 'web' ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-300 shadow-sm' : 'text-neutral-600 dark:text-neutral-400'}`}
                    >
                      Website / Web app
                    </button>
                    <button
                      onClick={() => {
                        setTab('mobile');
                        setFeatures([]);
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
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-0">
                        Feature catalog
                      </h3>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        Platform: {tab === 'web' ? 'Web' : 'Mobile'}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {featuresCatalog[tab].map((f) => (
                        <button
                          key={f.id}
                          onClick={() => addPredefined(f.id)}
                          className={`text-left p-3 rounded-xl border text-sm cursor-pointer ${
                            features.some((s) => s.id === f.id)
                              ? 'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                              : 'bg-white/70 dark:bg-neutral-900/60 border-neutral-200/70 dark:border-neutral-800/70 hover:border-primary-300'
                          }`}
                          disabled={features.some((s) => s.id === f.id)}
                          title={f.desc}
                        >
                          <div className="font-semibold text-neutral-900 dark:text-white text-sm leading-tight">
                            {f.name}
                          </div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                            ~{formatMMK(f.baseCost)} MMK
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3 gap-3">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">
                        Selected features
                      </h3>
                      {features.length > 0 && (
                        <button
                          onClick={() => setFeatures([])}
                          className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-300 cursor-pointer"
                        >
                          Remove all
                        </button>
                      )}
                    </div>
                    {features.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-4 text-sm text-neutral-600 dark:text-neutral-400">
                        No features selected yet. Add from the catalog.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[34rem] overflow-y-auto pr-2">
                        {features.map((f) => (
                          <div
                            key={f.id}
                            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/70 shadow-sm"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold text-neutral-900 dark:text-white leading-tight">
                                  {f.name}
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                  ~{formatMMK(f.baseCost)} MMK
                                </p>
                              </div>
                              <button
                                onClick={() => removeFeature(f.id)}
                                className="text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-lg cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
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

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400 font-semibold">
                      Total
                    </p>
                    <p className="text-2xl font-black text-neutral-900 dark:text-white">
                      {estimatedLabel}
                    </p>
                  </div>
                </div>

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
                onClick={() =>
                  setStep((prev) =>
                    prev === 1 ? 1 : ((prev - 1) as 1 | 2 | 3)
                  )
                }
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:border-primary-400 disabled:opacity-50 cursor-pointer"
                disabled={step === 1 || sending}
              >
                Back
              </button>
              <div className="flex items-center gap-3">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {step < 3 && `Estimated total: ${estimatedLabel}`}
                </div>
                {step < 3 && (
                  <button
                    onClick={() =>
                      setStep((prev) => {
                        if (prev === 1 && !canProceedStep1) return prev;
                        if (prev === 2 && !canProceedStep2) return prev;
                        return (prev + 1) as 1 | 2 | 3;
                      })
                    }
                    className="px-5 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 disabled:opacity-50 cursor-pointer"
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
      {/* Huray Success Modal */}
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
              I’ll reach out shortly via your provided contact details. Thanks!
            </p>
          </div>
          <div className="pt-2">
            <button
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
