'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/Common/Badge';
import { Modal } from '@/components/Common/Modal';
import {
  CheckCircleIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import { pricingData } from '@/lib/pricing';

type PricingTab = 'web' | 'mobile';

export const ServicesContent = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [pricingTab, setPricingTab] = useState<PricingTab>('web');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [isHurayOpen, setIsHurayOpen] = useState(false);

  const formatPrice = (price: string) => {
    if (price.includes('++')) {
      const val = price.replace('++', '');
      return (
        <>
          {val}
          <span className="text-primary-600 dark:text-primary-400 ml-0.5 text-2xl align-top relative top-1">
            ++
          </span>
        </>
      );
    }
    if (price.includes('-')) {
      const [start, end] = price.split('-');
      return (
        <>
          {start}
          <span className="text-neutral-400 dark:text-neutral-600 mx-1 font-light">
            –
          </span>
          {end}
        </>
      );
    }
    return price;
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setSendError(null);
    setSendSuccess(false);
  };

  const openCheckout = (planLabel: string) => {
    resetForm();
    setSelectedPlan(`${pricingTab.toUpperCase()} - ${planLabel}`);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = async () => {
    if (!customerName || !customerEmail || !customerPhone) {
      setSendError('Please fill in all fields.');
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

      const details = selectedPlan
        ? `Selected plan: ${selectedPlan}`
        : `Selected category: ${pricingTab}`;

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
              user_name: customerName.trim(),
              user_email: customerEmail.trim(),
              user_phone: customerPhone.trim(),
              details,
              from_name: 'Portfolio Inquiry',
            },
          }),
        });
        if (!res.ok) {
          const t = await res.text();
          throw new Error(`EmailJS ${res.status}: ${t}`);
        }
      };

      // Send to user
      await sendEmail(
        TEMPLATE_ID_USER,
        customerEmail.trim(),
        customerName.trim()
      );
      // Send to admin
      await sendEmail(TEMPLATE_ID_ADMIN, ADMIN_EMAIL, 'Lin');

      // Close checkout and show success (Huray) modal
      setIsCheckoutOpen(false);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setSendSuccess(false);
      setIsHurayOpen(true);
    } catch (error) {
      console.error('Service checkout confirmation failed', error);
      setSendError('Unable to send confirmation. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen space-y-24 pb-24">
      {/* Header Section */}
      <section className="pt-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex justify-center mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <Badge className="bg-primary-100/50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800">
              <SparklesIcon className="w-3.5 h-3.5 mr-1.5" />
              Services & Solutions
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.1s_forwards]">
            Build your web or mobile product{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
              with confidence
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-10 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
            One partner for strategy, design, and development. I craft scalable
            web platforms and cross-platform mobile apps tailored to your
            business needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.3s_forwards]">
            <Link
              href="/services/estimate"
              className="px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-500/20 cursor-pointer"
            >
              Customize your project
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-3.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-full hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <section className="px-4" id="services">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-8">
          {/* Web Development Card */}
          <div className="group relative rounded-3xl p-8 bg-gradient-to-br from-white/80 to-white/40 dark:from-neutral-900/80 dark:to-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-3xl transition-all duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <GlobeAltIcon className="h-8 w-8" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Web Development
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                React and Next.js for fast, SEO-friendly experiences. From
                high-conversion marketing sites to complex data-rich dashboards.
              </p>

              <ul className="space-y-3 text-neutral-600 dark:text-neutral-300">
                {[
                  'Business websites & landing pages',
                  'E-commerce platforms',
                  'Admin dashboards & internal tools',
                  'Custom web applications',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Development Card */}
          <div className="group relative rounded-3xl p-8 bg-gradient-to-br from-white/80 to-white/40 dark:from-neutral-900/80 dark:to-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.5s_forwards]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-3xl transition-all duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <DevicePhoneMobileIcon className="h-8 w-8" />
              </div>

              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Mobile App Development
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                React Native apps for iOS and Android with one codebase.
                Production-ready performance, native gestures, and premium UX.
              </p>

              <ul className="space-y-3 text-neutral-600 dark:text-neutral-300">
                {[
                  'E-commerce and booking flows',
                  'Business & productivity apps',
                  'Push notifications, maps, payments',
                  'MVPs to validate quickly',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlights removed — technical capability sections are omitted for client focus */}

      {/* Pricing Section */}
      <section className="px-4 py-8" id="pricing">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 mb-4">
              <CurrencyDollarIcon className="w-3.5 h-3.5 mr-1.5" />
              Investment
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Transparent starting points
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Clear pricing for common project types. No hidden fees.
            </p>

            {/* Pricing Tabs */}
            <div className="inline-flex p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setPricingTab('web')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  pricingTab === 'web'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-300 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                Web Development
              </button>
              <button
                onClick={() => setPricingTab('mobile')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  pricingTab === 'mobile'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-300 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                Mobile Development
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingData[pricingTab].map((card) => (
              <div
                key={card.title}
                className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                  card.highlight
                    ? 'bg-gradient-to-b from-white to-primary-50/30 dark:from-neutral-800 dark:to-neutral-900/50 border-primary-200 dark:border-primary-800 shadow-xl scale-105 z-10'
                    : 'bg-white/60 dark:bg-neutral-900/60 border-neutral-200/60 dark:border-neutral-800/60 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-lg'
                } backdrop-blur`}
              >
                {card.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/30">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 h-10">
                  {card.desc}
                </p>

                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight flex items-baseline">
                    {formatPrice(card.price)}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">
                    MMK
                  </span>
                </div>

                <div className="space-y-4 mb-8">
                  {card.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      <CheckCircleIcon
                        className={`h-5 w-5 shrink-0 ${card.highlight ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-400'}`}
                      />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() =>
                    openCheckout(`${card.title} (${card.price} MMK)`)
                  }
                  className={`block w-full text-center px-6 py-3.5 font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                    card.highlight
                      ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-500/25'
                      : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300'
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-400">
              Need a custom solution?{' '}
              <button
                onClick={() => openCheckout('Custom solution')}
                className="text-primary-600 dark:text-primary-400 font-semibold hover:underline cursor-pointer"
              >
                Contact me
              </button>{' '}
              for a tailored quote based on your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          resetForm();
        }}
        title="Confirm your details"
        size="md"
      >
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-4">
            <p className="text-sm text-neutral-700 dark:text-neutral-200 font-semibold">
              {selectedPlan || 'No plan selected yet'}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              I&apos;ll send a confirmation to you and CC linphonem@gmail.com.
            </p>
          </div>

          <div className="grid gap-4">
            <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Full name
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                placeholder="Your name"
              />
            </label>

            <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Email
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                placeholder="you@example.com"
              />
            </label>

            <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
              Phone
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800"
                placeholder="09xxxxxxxxx"
              />
            </label>
          </div>

          {sendError && <p className="text-sm text-red-500">{sendError}</p>}
          {sendSuccess && (
            <p className="text-sm text-green-600">
              Confirmation sent. I&apos;ll follow up shortly.
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                resetForm();
              }}
              className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:border-primary-400 cursor-pointer"
              disabled={sending}
            >
              Cancel
            </button>
            <button
              onClick={handleCheckoutSubmit}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-500 disabled:opacity-60 cursor-pointer"
              disabled={sending}
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
      </Modal>

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
    </div>
  );
};
