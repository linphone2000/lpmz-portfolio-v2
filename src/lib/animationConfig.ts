/**
 * Animation configuration for consistent timing and delays
 * Replaces inline styles with pre-defined configurations
 */
export const ANIMATION_CONFIG = {
  // Pre-defined animation delays to avoid inline style creation
  delays: {
    achievements: ['0ms', '100ms', '200ms'] as const,
    services: ['0ms', '100ms', '200ms'] as const,
    hero: '0ms' as const,
  },
  
  // Animation durations for consistency
  durations: {
    hero: '700ms',
    achievements: '600ms',
    services: '600ms',
    featuredProject: '800ms',
  },
  
  // Easing functions for smooth animations
  easing: {
    default: 'ease-out',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Threshold values for intersection observer
  thresholds: {
    default: 0.1,
    subtle: 0.05,
    aggressive: 0.2,
  },
} as const;

/**
 * Helper function to get animation delay by index
 * @param index - The item index
 * @param type - The animation type ('achievements' | 'services')
 * @returns The appropriate delay string
 */
export function getAnimationDelay(index: number, type: 'achievements' | 'services'): string {
  const delays = ANIMATION_CONFIG.delays[type];
  return delays[Math.min(index, delays.length - 1)];
}

/**
 * Helper function to get animation class name
 * @param isInView - Whether the element is in view
 * @param type - The animation type
 * @param index - The item index (optional)
 * @returns The complete animation class name
 */
export function getAnimationClassName(
  isInView: boolean, 
  type: keyof typeof ANIMATION_CONFIG.durations,
  index?: number
): string {
  const baseClasses = `transition-all duration-${ANIMATION_CONFIG.durations[type]} ${ANIMATION_CONFIG.easing.default}`;
  
  if (isInView) {
    const inViewClasses = type === 'services' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-100 translate-y-0';
    const delayClass = index !== undefined ? `animation-delay-${index * 100}` : '';
    return `${baseClasses} ${inViewClasses} ${delayClass}`.trim();
  } else {
    const outOfViewClasses = type === 'services' ? 'opacity-0 translate-y-6 scale-95' : 'opacity-0 translate-y-6';
    return `${baseClasses} ${outOfViewClasses}`;
  }
}

/**
 * Type definitions for animation configuration
 */
export type AnimationType = keyof typeof ANIMATION_CONFIG.durations;
export type DelayType = keyof typeof ANIMATION_CONFIG.delays;
