import Link from 'next/link';
import ContactForm from '@/components/Common/ContactForm';
import {
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

export const ServicesContent = () => {
  return (
    <div className="min-h-screen space-y-16 pb-16">
      <section className="pt-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-200/60 dark:border-primary-800/60 bg-white/60 dark:bg-neutral-900/60 backdrop-blur text-sm font-semibold text-primary-700 dark:text-primary-300">
            <CheckCircleIcon className="h-4 w-4" />
            Services
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
            Build your web or mobile product with confidence
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            One partner for strategy, design, and development. I craft scalable
            web platforms and cross-platform mobile apps tailored to your
            business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="#contact"
              className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors"
            >
              Start a project
            </Link>
            <Link
              href="#pricing"
              className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-lg hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4" id="services">
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-lg">
            <div className="flex items-center gap-3 mb-4 text-primary-600 dark:text-primary-400">
              <GlobeAltIcon className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
                Web
              </span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
              Web Development
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              React and Next.js for fast, SEO-friendly experiences. From
              marketing sites to complex dashboards.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Business websites & landing pages</li>
              <li>• E-commerce platforms</li>
              <li>• Admin dashboards & internal tools</li>
              <li>• Custom web applications</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-lg">
            <div className="flex items-center gap-3 mb-4 text-primary-600 dark:text-primary-400">
              <DevicePhoneMobileIcon className="h-6 w-6" />
              <span className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
                Mobile
              </span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
              Mobile App Development
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              React Native apps for iOS and Android with one codebase.
              Production-ready performance and UX.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• E-commerce and booking flows</li>
              <li>• Business/productivity apps</li>
              <li>• Push notifications, maps, payments</li>
              <li>• MVPs to validate quickly</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4" id="spotlights">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Web capabilities
              </h3>
              <ArrowRightIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Frontend
                </h4>
                <p>
                  React, Next.js, TypeScript, Tailwind for speed and
                  accessibility.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Backend
                </h4>
                <p>Node/Express APIs, auth, integrations, and data modeling.</p>
              </div>
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Use cases
                </h4>
                <p>
                  Landing pages, CMS sites, dashboards, booking and commerce
                  flows.
                </p>
              </div>
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Process
                </h4>
                <p>
                  Discovery → design/architecture → iterative delivery → launch.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                Mobile capabilities
              </h3>
              <ArrowRightIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Tech
                </h4>
                <p>React Native, TypeScript, Expo when it speeds delivery.</p>
              </div>
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Features
                </h4>
                <p>Push, camera, maps, payments, offline support, analytics.</p>
              </div>
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Use cases
                </h4>
                <p>E-commerce, booking, field tools, community apps, MVPs.</p>
              </div>
              <div className="rounded-xl border border-neutral-200/50 dark:border-neutral-800/70 p-4 bg-white/50 dark:bg-neutral-900/50">
                <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  Process
                </h4>
                <p>Requirements → backend setup → app build → test & deploy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4" id="pricing">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-4 text-primary-600 dark:text-primary-400">
            <CurrencyDollarIcon className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-300">
              Pricing snapshots
            </span>
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-10">
            Transparent starting points
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Landing Page',
                price: '500K',
                bullets: [
                  'Single page design',
                  'Responsive + SEO basics',
                  'Contact form',
                  '1 week delivery',
                ],
              },
              {
                title: 'Business Website',
                price: '1.5M',
                highlight: true,
                bullets: [
                  'Up to 5 pages',
                  'Custom design + CMS',
                  'Contact & inquiry flows',
                  'SEO optimization',
                ],
              },
              {
                title: 'E-commerce Starter',
                price: '3M',
                bullets: [
                  'Product catalog + cart',
                  'Payment integration',
                  'Admin dashboard',
                  '4-6 weeks delivery',
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`relative p-8 rounded-2xl border ${
                  card.highlight
                    ? 'border-primary-400 shadow-xl bg-white/80 dark:bg-neutral-900/80'
                    : 'border-neutral-200/70 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-900/60'
                } backdrop-blur`}
              >
                {card.highlight && (
                  <div className="absolute -top-3 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-primary-600 text-white">
                    Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {card.price}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {' '}
                    MMK
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary-500 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  className={`block w-full text-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                    card.highlight
                      ? 'bg-primary-600 text-white hover:bg-primary-500'
                      : 'border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-300'
                  }`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
            Need something custom? Share your scope and I&apos;ll tailor a
            quote.
          </p>
        </div>
      </section>

      <section className="px-4" id="contact">
        <div className="container mx-auto max-w-5xl grid lg:grid-cols-2 gap-8 items-start">
          <div className="p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Tell me about your project
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              I usually respond within 24 hours. The more detail you share, the
              better I can help.
            </p>
            <ContactForm />
          </div>
          <div className="space-y-4">
            {[
              {
                title: 'Email',
                value: 'linphonem@gmail.com',
                href: 'mailto:linphonem@gmail.com',
                icon: <EnvelopeIcon className="h-5 w-5" />,
              },
              {
                title: 'Phone',
                value: '+95 9123 456 789',
                href: 'tel:+959123456789',
                icon: <PhoneIcon className="h-5 w-5" />,
              },
              {
                title: 'Location',
                value: 'Yangon, Myanmar',
                icon: <MapPinIcon className="h-5 w-5" />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-900/60 backdrop-blur shadow"
              >
                <div className="text-primary-600 dark:text-primary-400">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {item.title}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-neutral-700 dark:text-neutral-300">
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
