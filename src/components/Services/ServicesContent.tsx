'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ContactForm from '@/components/Common/ContactForm';
import { Badge } from '@/components/Common/Badge';
import { Modal } from '@/components/Common/Modal';
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

type PricingTab = 'web' | 'mobile';

export const ServicesContent = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [pricingTab, setPricingTab] = useState<PricingTab>('web');

  const pricingData = {
    web: [
      {
        title: 'Landing Page',
        price: '500K-1M',
        desc: 'Perfect for marketing campaigns or personal portfolios.',
        bullets: [
          'Single page design',
          'Responsive + SEO basics',
          'Contact form integration',
          'Fast loading speed',
          'Social media links',
          '1 week delivery',
        ],
      },
      {
        title: 'Custom Website',
        price: '1.5M-2.5M',
        highlight: true,
        desc: 'A complete professional presence for your company.',
        bullets: [
          'Up to 7 custom pages',
          'CMS (Content Management)',
          'Advanced SEO setup',
          'Blog / News section',
          'Google Analytics setup',
          '2-3 weeks delivery',
        ],
      },
      {
        title: 'Web Application',
        price: '3M++',
        desc: 'Complex functionality like e-commerce, dashboards, or SaaS.',
        bullets: [
          'User Authentication',
          'Database design & setup',
          'Payment gateway integration',
          'Admin dashboard panel',
          'API development',
          '4-8 weeks delivery',
        ],
      },
    ],
    mobile: [
      {
        title: 'App MVP / Prototype',
        price: '750K-1M',
        desc: 'Validate your idea quickly with a functional prototype.',
        bullets: [
          'Core feature implementation',
          'Up to 5 main screens',
          'Basic API integration',
          'Local data storage',
          'iOS & Android builds',
          '2-3 weeks delivery',
        ],
      },
      {
        title: 'Interactive App',
        price: '2M-3M',
        highlight: true,
        desc: 'Engage customers with a dedicated mobile experience.',
        bullets: [
          'User profiles & Auth',
          'Real-time content feed',
          'Push notifications',
          'In-app search & filter',
          'App Store submission',
          '4-6 weeks delivery',
        ],
      },
      {
        title: 'Full-Scale Product',
        price: '4M++',
        desc: 'Complex applications with advanced features.',
        bullets: [
          'Complex state management',
          'Payment gateway integration',
          'Real-time chat/messaging',
          'Location/Maps services',
          'Advanced animations',
          'App Store & Play Store',
        ],
      },
    ],
  };

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
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-500 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-500/20 cursor-pointer"
            >
              Start a project
            </button>
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

      {/* Spotlights Section */}
      <section className="px-4" id="spotlights">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-8">
          {/* Web Capabilities */}
          <div className="rounded-3xl p-8 bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <GlobeAltIcon className="h-5 w-5 text-primary-500" />
                Web Capabilities
              </h3>
              <ArrowRightIcon className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Frontend',
                  desc: 'React, Next.js, TypeScript, Tailwind',
                },
                {
                  title: 'Backend',
                  desc: 'Node/Express APIs, auth, databases',
                },
                {
                  title: 'Use cases',
                  desc: 'Landing pages, CMS sites, dashboards',
                },
                {
                  title: 'Process',
                  desc: 'Discovery → Design → Build → Launch',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 p-4 bg-white/50 dark:bg-neutral-800/30"
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1.5 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Capabilities */}
          <div className="rounded-3xl p-8 bg-white/60 dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <DevicePhoneMobileIcon className="h-5 w-5 text-primary-500" />
                Mobile Capabilities
              </h3>
              <ArrowRightIcon className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Tech', desc: 'React Native, TypeScript, Expo' },
                {
                  title: 'Features',
                  desc: 'Push, camera, maps, payments, offline',
                },
                {
                  title: 'Use cases',
                  desc: 'E-commerce, booking, field tools',
                },
                {
                  title: 'Process',
                  desc: 'Requirements → Build → Test → Store',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 p-4 bg-white/50 dark:bg-neutral-800/30"
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-1.5 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                  onClick={() => setIsContactOpen(true)}
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
                onClick={() => setIsContactOpen(true)}
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
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        title="Start a Project"
        size="xl"
      >
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              I usually respond within 24 hours. The more detail you share, the
              better I can help.
            </p>
            <ContactForm />
          </div>

          <div className="space-y-6 lg:border-l lg:border-neutral-200 lg:dark:border-neutral-700 lg:pl-8">
            <div className="prose dark:prose-invert">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                Let&apos;s build something great
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Whether you have a clear vision or just an idea, I&apos;m here
                to help you turn it into reality. Reach out via the form or
                through the channels below.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Email',
                  value: 'linphonem@gmail.com',
                  href: 'mailto:linphonem@gmail.com',
                  icon: <EnvelopeIcon className="h-6 w-6" />,
                  color: 'text-blue-500',
                  bg: 'bg-blue-50 dark:bg-blue-900/20',
                },
                {
                  title: 'Phone',
                  value: '+95 9967 658 131',
                  href: 'tel:+959967658131',
                  icon: <PhoneIcon className="h-6 w-6" />,
                  color: 'text-green-500',
                  bg: 'bg-green-50 dark:bg-green-900/20',
                },
                {
                  title: 'Location',
                  value: 'Yangon, Myanmar',
                  icon: <MapPinIcon className="h-6 w-6" />,
                  color: 'text-purple-500',
                  bg: 'bg-purple-50 dark:bg-purple-900/20',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-900/60 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div
                    className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      {item.title}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg font-semibold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
