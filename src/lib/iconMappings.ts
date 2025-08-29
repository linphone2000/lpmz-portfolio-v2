import { 
  StarIcon, 
  RocketLaunchIcon, 
  BriefcaseIcon,
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

/**
 * Icon mapping for achievement categories
 * Eliminates repetitive conditional rendering logic
 */
export const CATEGORY_ICONS = {
  Academic: StarIcon,
  Professional: RocketLaunchIcon,
  default: BriefcaseIcon,
} as const;

/**
 * Icon mapping for service types
 * Provides consistent icon usage across components
 */
export const SERVICE_ICONS = {
  mobile: BriefcaseIcon,
  fullstack: AcademicCapIcon,
  architecture: StarIcon,
} as const;

/**
 * Type definitions for icon mappings
 */
export type CategoryType = keyof typeof CATEGORY_ICONS;
export type ServiceType = keyof typeof SERVICE_ICONS;

/**
 * Helper function to get category icon
 * @param category - The achievement category
 * @returns The appropriate icon component
 */
export function getCategoryIcon(category: string) {
  return CATEGORY_ICONS[category as CategoryType] || CATEGORY_ICONS.default;
}

/**
 * Helper function to get service icon
 * @param serviceType - The service type
 * @returns The appropriate icon component
 */
export function getServiceIcon(serviceType: string) {
  return SERVICE_ICONS[serviceType as ServiceType] || SERVICE_ICONS.mobile;
}
