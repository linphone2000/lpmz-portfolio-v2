export type ProductType = 'web' | 'mobile';

export type FeatureDefinition = {
  id: string;
  name: string;
  desc?: string;
  baseCost: number; // MMK
  tags?: string[];
};

const common: FeatureDefinition[] = [
  {
    id: 'auth-basic',
    name: 'User Authentication (Email/Password)',
    baseCost: 350_000,
    tags: ['core', 'auth'],
  },
  {
    id: 'auth-social',
    name: 'Social Login (Google/Apple)',
    baseCost: 550_000,
    tags: ['auth'],
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    baseCost: 850_000,
    tags: ['operations'],
  },
  {
    id: 'payments-manual',
    name: 'Manual Payment Flow (upload receipt + admin verify)',
    baseCost: 450_000,
    tags: ['commerce'],
  },
  {
    id: 'product-catalog',
    name: 'Product Catalog',
    baseCost: 750_000,
    tags: ['commerce'],
  },
  {
    id: 'checkout',
    name: 'Checkout Flow',
    baseCost: 900_000,
    tags: ['commerce'],
  },
  { id: 'blog-cms', name: 'Blog / CMS', baseCost: 450_000, tags: ['content'] },
  {
    id: 'search-filter',
    name: 'Search & Filters',
    baseCost: 350_000,
    tags: ['ux'],
  },
  {
    id: 'file-upload',
    name: 'File Uploads',
    baseCost: 280_000,
    tags: ['core'],
  },
  {
    id: 'image-optim',
    name: 'Image Optimization',
    baseCost: 220_000,
    tags: ['performance'],
  },
  {
    id: 'dashboard-analytics',
    name: 'Analytics Dashboard',
    baseCost: 650_000,
    tags: ['operations'],
  },
  {
    id: 'email-notify',
    name: 'Email Notifications',
    baseCost: 240_000,
    tags: ['engagement'],
  },
  {
    id: 'third-party',
    name: 'Third-party API Integration',
    baseCost: 350_000,
    tags: ['integration'],
  },
  {
    id: 'i18n',
    name: 'Multi-language (i18n)',
    baseCost: 320_000,
    tags: ['ux'],
  },
  {
    id: 'realtime',
    name: 'Real-time Updates',
    baseCost: 700_000,
    tags: ['realtime'],
  },
];

const webOnly: FeatureDefinition[] = [
  {
    id: 'seo-advanced',
    name: 'Advanced SEO',
    baseCost: 320_000,
    tags: ['seo'],
  },
];

const mobileOnly: FeatureDefinition[] = [
  {
    id: 'push',
    name: 'Push Notifications',
    baseCost: 520_000,
    tags: ['engagement'],
  },
  {
    id: 'maps',
    name: 'Maps & Location',
    baseCost: 520_000,
    tags: ['geolocation'],
  },
  {
    id: 'offline',
    name: 'Offline Support',
    baseCost: 600_000,
    tags: ['performance'],
  },
  {
    id: 'store-submission',
    name: 'App Store / Play Store Submission',
    baseCost: 380_000,
    tags: ['release'],
  },
];

export const featuresCatalog: Record<ProductType, FeatureDefinition[]> = {
  web: [...common, ...webOnly],
  mobile: [...common, ...mobileOnly],
};
