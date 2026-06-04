export type PricingCard = {
  id: string;
  title: string;
  price: string;
  priceMin: number;
  priceMax: number | null;
  desc: string;
  bullets: string[];
  highlight?: boolean;
};

export type PricingTab = 'web' | 'mobile';

export type PricingTierPosition = 'below' | 'within' | 'above' | 'enterprise';

export type ComparablePricingTier = {
  id: string;
  title: string;
  priceLabel: string;
  priceMin: number;
  priceMax: number | null;
  position: PricingTierPosition;
};

const MMK = 1_000_000;
const K = 1_000;

/** Parse display strings like `800K-1.5M`, `3M++`, `1M-1.5M` into MMK bounds. */
export function parsePricingCardRange(price: string): {
  priceMin: number;
  priceMax: number | null;
} {
  const normalized = price.trim().toUpperCase();

  if (normalized.includes('++')) {
    const minPart = normalized.replace('++', '').trim();
    const priceMin = parsePricingAmount(minPart);
    return { priceMin, priceMax: null };
  }

  if (normalized.includes('-')) {
    const [start, end] = normalized.split('-');
    return {
      priceMin: parsePricingAmount(start.trim()),
      priceMax: parsePricingAmount(end.trim()),
    };
  }

  const single = parsePricingAmount(normalized);
  return { priceMin: single, priceMax: single };
}

function parsePricingAmount(token: string): number {
  const value = parseFloat(token.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(value)) {
    throw new Error(`Unable to parse pricing amount: ${token}`);
  }
  if (token.includes('M')) {
    return Math.round(value * MMK);
  }
  if (token.includes('K')) {
    return Math.round(value * K);
  }
  return Math.round(value);
}

function withRange(
  card: Omit<PricingCard, 'priceMin' | 'priceMax'>
): PricingCard {
  const { priceMin, priceMax } = parsePricingCardRange(card.price);
  return { ...card, priceMin, priceMax };
}

export const pricingData: Record<PricingTab, PricingCard[]> = {
  web: [
    withRange({
      id: 'web-landing',
      title: 'Landing Page',
      price: '800K-1.5M',
      desc: 'Perfect for marketing campaigns, product launches, or personal portfolios.',
      bullets: [
        'Single-page scrollable design with distinct sections',
        'Fully responsive layouts (Mobile, Tablet, Desktop) + base SEO structure',
        'Secure contact / lead capture form integration',
        'High-performance speed optimization',
        'Social media link connections',
        '1 week delivery',
      ],
    }),
    withRange({
      id: 'web-custom',
      title: 'Custom Website',
      price: '1.5M-2.5M',
      highlight: true,
      desc: 'A complete, professional multi-page digital presence for established companies.',
      bullets: [
        'Up to 7 fully customized pages (e.g. About, Services, Contact, FAQ)',
        'Integrated CMS for easy content editing',
        'Advanced SEO setup (Meta tags, sitemaps, indexing)',
        'Dynamic Blog / News section',
        'Google Analytics 4 & Search Console integration',
        '2-3 weeks delivery',
      ],
    }),
    withRange({
      id: 'web-app',
      title: 'Web Application',
      price: '3M++',
      desc: 'Complex systems such as local e-commerce, custom dashboards, or SaaS platforms.',
      bullets: [
        'Secure user authentication & role management',
        'Relational / non-relational database design and setup',
        'Third-party API integrations (SMS gateways, local payment channels)',
        'Full admin dashboard for system and user management',
        'Robust RESTful or GraphQL API development',
        '4-8 weeks delivery',
      ],
    }),
  ],
  mobile: [
    withRange({
      id: 'mobile-mvp',
      title: 'App MVP / Prototype',
      price: '1M-1.5M',
      desc: 'Validate a business idea quickly with a functional mobile prototype.',
      bullets: [
        'Core feature implementation focused on main value proposition',
        'Up to 5 main functional UI screens',
        'Basic API integration with existing backend',
        'Local secure data storage (Shared Preferences / SQLite / Hive)',
        'Dual-platform capability for iOS & Android builds',
        '2-3 weeks delivery',
      ],
    }),
    withRange({
      id: 'mobile-interactive',
      title: 'Interactive App',
      price: '2M-3M',
      highlight: true,
      desc: 'Engage customers with a dedicated, feature-rich mobile experience.',
      bullets: [
        'Personal user profiles, OAuth, and custom authentication',
        'Real-time content feed and data syncing',
        'Push notifications for marketing and alerts',
        'Advanced in-app search with custom filtering',
        'App Store & Google Play submission support',
        '4-6 weeks delivery',
      ],
    }),
    withRange({
      id: 'mobile-full',
      title: 'Full-Scale Product',
      price: '4M++',
      desc: 'Enterprise-level mobile apps featuring advanced UI/UX and deep backend logic.',
      bullets: [
        'Complex global state management architecture',
        'Heavy third-party API and secure local payment integrations (KBZPay, WaveMoney, CBPay)',
        'Real-time chat or customer support messaging',
        'Location, background tracking, and Google Maps services',
        'High-fidelity advanced micro-interactions and animations',
        'App Store & Apple App Store production publication',
      ],
    }),
  ],
};

export function parsePriceDisplay(price: string) {
  if (price.includes('++')) {
    return price.replace('++', '+');
  }
  return price;
}

export function formatEstimateRange(priceMin: number, priceMax: number | null) {
  const format = (value: number) => {
    if (value >= MMK) {
      const million = value / MMK;
      const decimals = million >= 10 ? 0 : 1;
      return `${million.toFixed(decimals)}M`;
    }
    return `${Math.round(value / K)}K`;
  };

  if (priceMax === null) {
    return `${format(priceMin)}+`;
  }
  if (priceMin === priceMax) {
    return format(priceMin);
  }
  return `${format(priceMin)}–${format(priceMax)}`;
}

export function getComparablePricingTier(
  tab: PricingTab,
  subtotalMmK: number
): ComparablePricingTier | null {
  const tiers = pricingData[tab];
  if (tiers.length === 0 || subtotalMmK <= 0) {
    return null;
  }

  const openEnded = tiers.find((tier) => tier.priceMax === null);
  if (openEnded && subtotalMmK >= openEnded.priceMin) {
    return {
      id: openEnded.id,
      title: openEnded.title,
      priceLabel: openEnded.price,
      priceMin: openEnded.priceMin,
      priceMax: null,
      position: 'enterprise',
    };
  }

  for (let index = 0; index < tiers.length; index += 1) {
    const tier = tiers[index];
    const max = tier.priceMax ?? tier.priceMin;

    if (subtotalMmK < tier.priceMin) {
      const previous = tiers[index - 1];
      if (previous) {
        return {
          id: previous.id,
          title: previous.title,
          priceLabel: previous.price,
          priceMin: previous.priceMin,
          priceMax: previous.priceMax,
          position: 'above',
        };
      }
      return {
        id: tier.id,
        title: tier.title,
        priceLabel: tier.price,
        priceMin: tier.priceMin,
        priceMax: tier.priceMax,
        position: 'below',
      };
    }

    if (subtotalMmK <= max) {
      return {
        id: tier.id,
        title: tier.title,
        priceLabel: tier.price,
        priceMin: tier.priceMin,
        priceMax: tier.priceMax,
        position: 'within',
      };
    }
  }

  const last = tiers[tiers.length - 1];
  return {
    id: last.id,
    title: last.title,
    priceLabel: last.price,
    priceMin: last.priceMin,
    priceMax: last.priceMax,
    position: last.priceMax === null ? 'enterprise' : 'above',
  };
}
