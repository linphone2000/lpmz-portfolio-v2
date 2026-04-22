import { type FeatureDefinition, type ProductType } from '@/lib/features';

const ESTIMATE_PATH = '/services/estimate';

export type EstimateShareEvent =
  | 'estimate_share_clicked'
  | 'shared_estimate_opened';

type EstimateSharePayload = {
  tab: ProductType;
  featureCount: number;
  estimatedTotal: number;
  featureIds: string[];
};

export type SharedEstimateSelection = {
  tab: ProductType;
  featureIds: string[];
  isShared: boolean;
};

const isProductType = (value: string | null): value is ProductType =>
  value === 'web' || value === 'mobile';

export const getEstimateSharePath = (
  tab: ProductType,
  featureIds: string[]
) => {
  const params = new URLSearchParams();
  params.set('tab', tab);

  if (featureIds.length > 0) {
    params.set('features', featureIds.join(','));
  }

  return `${ESTIMATE_PATH}?${params.toString()}`;
};

export const getEstimateShareUrl = (
  origin: string,
  tab: ProductType,
  featureIds: string[]
) => `${origin}${getEstimateSharePath(tab, featureIds)}`;

export const getSharedEstimateSelection = (
  searchParams: URLSearchParams,
  catalog: Record<ProductType, FeatureDefinition[]>
): SharedEstimateSelection => {
  const rawTab = searchParams.get('tab');
  const tab = isProductType(rawTab) ? rawTab : 'web';
  const availableIds = new Set(catalog[tab].map((feature) => feature.id));
  const featureIds = (searchParams.get('features') || '')
    .split(',')
    .map((id) => id.trim())
    .filter((id) => id.length > 0 && availableIds.has(id));

  return {
    tab,
    featureIds,
    isShared: searchParams.has('tab') || searchParams.has('features'),
  };
};

export const trackEstimateShareEvent = async (
  event: EstimateShareEvent,
  payload: EstimateSharePayload
) => {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload }),
    });
  } catch (error) {
    console.error('Failed to track estimate share event', error);
  }
};
