import type { FeatureCategory, ProductType } from '@/lib/features';
import {
  formatEstimateRange,
  getComparablePricingTier,
  type ComparablePricingTier,
  type PricingTab,
} from '@/lib/pricing';

/**
 * Reference bundles (tune feature baseCost so preset sums land in these bands):
 *
 * Web marketing  ~0.9M–1.2M  → Landing Page (800K–1.5M)
 * Web business   ~1.6M–2.2M  → Custom Website (1.5M–2.5M)
 * Web product    ~3M–4M      → Web Application (3M+)
 *
 * Mobile MVP     ~1M–1.4M    → App MVP (1M–1.5M)
 * Mobile growth  ~2M–2.8M    → Interactive App (2M–3M)
 * Mobile full    ~4M+        → Full-Scale Product (4M+)
 */

export type EstimatePreset = {
  id: string;
  label: string;
  description: string;
  featureIds: string[];
};

export const ESTIMATE_PRESETS: Record<ProductType, EstimatePreset[]> = {
  web: [
    {
      id: 'web-marketing',
      label: 'Marketing site',
      description: 'SEO, uploads, languages, social login',
      featureIds: [
        'seo-advanced',
        'file-upload-s3',
        'i18n',
        'auth-social',
        'web-pwa',
      ],
    },
    {
      id: 'web-business',
      label: 'Business website',
      description: 'Marketing base plus search, reports, audit trail',
      featureIds: [
        'seo-advanced',
        'file-upload-s3',
        'i18n',
        'auth-social',
        'web-pwa',
        'search-filter-advanced',
        'dashboard-analytics-charts',
        'data-export',
        'audit-logs',
      ],
    },
    {
      id: 'web-product',
      label: 'Web app / store',
      description: 'Roles, admin, inventory, checkout, payments',
      featureIds: [
        'auth-rbac',
        'admin-panel-dynamic',
        'inventory-stock-tracking',
        'checkout-cart-promotions',
        'payments-manual',
        'pos-billing-invoice',
        'supplier-purchase-orders',
        'dashboard-analytics-charts',
        'audit-logs',
        'search-filter-advanced',
      ],
    },
  ],
  mobile: [
    {
      id: 'mobile-mvp',
      label: 'App MVP',
      description: 'Auth, push, uploads, store publishing',
      featureIds: [
        'auth-social',
        'auth-rbac',
        'push-fcm',
        'file-upload-s3',
        'mobile-store-submission',
        'i18n',
      ],
    },
    {
      id: 'mobile-growth',
      label: 'Interactive app',
      description: 'MVP plus search, maps, analytics',
      featureIds: [
        'auth-social',
        'auth-rbac',
        'push-fcm',
        'file-upload-s3',
        'mobile-store-submission',
        'i18n',
        'search-filter-advanced',
        'mobile-maps-routing',
        'dashboard-analytics-charts',
        'checkout-cart-promotions',
      ],
    },
    {
      id: 'mobile-full',
      label: 'Full-scale app',
      description: 'Growth plus offline sync, payments API, warehouses',
      featureIds: [
        'auth-social',
        'auth-rbac',
        'push-fcm',
        'file-upload-s3',
        'mobile-store-submission',
        'i18n',
        'search-filter-advanced',
        'mobile-maps-routing',
        'dashboard-analytics-charts',
        'checkout-cart-promotions',
        'mobile-offline-sync',
        'payment-gateway-api',
        'inventory-multi-warehouse',
        'inventory-stock-tracking',
        'pos-billing-invoice',
      ],
    },
  ],
};

export const FEATURE_CATEGORY_LABELS: Record<FeatureCategory, string> = {
  essential: 'Essential',
  commerce: 'Commerce & operations',
  education: 'Education & LMS',
  platform: 'Platform-specific',
};

export const FEATURE_CATEGORY_ORDER: FeatureCategory[] = [
  'essential',
  'commerce',
  'education',
  'platform',
];

export function getTierHintMessage(
  tier: ComparablePricingTier | null
): string | null {
  if (!tier) return null;

  const range = formatEstimateRange(tier.priceMin, tier.priceMax);

  switch (tier.position) {
    case 'within':
      return `Comparable to ${tier.title} (${range} MMK)`;
    case 'below':
      return `Below ${tier.title} (${range} MMK) — add features or expect a smaller scope`;
    case 'above':
      return `Above ${tier.title} (${range} MMK) — likely a larger custom scope`;
    case 'enterprise':
      return `Comparable to ${tier.title} (${tier.priceLabel} MMK)`;
    default:
      return null;
  }
}

export function getEstimateTierHint(
  tab: ProductType,
  subtotalMmK: number
): { tier: ComparablePricingTier | null; message: string | null } {
  const tier = getComparablePricingTier(tab as PricingTab, subtotalMmK);
  return {
    tier,
    message: getTierHintMessage(tier),
  };
}
