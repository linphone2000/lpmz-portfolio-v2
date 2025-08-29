/**
 * Image optimization configuration
 */

// Image quality settings
export const IMAGE_QUALITY = {
  high: 90,
  medium: 85,
  low: 75,
} as const;

// Image sizes for different use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
  phone: { width: 300, height: 600 },
  desktop: { width: 800, height: 600 },
} as const;

// Priority settings for different image types
export const IMAGE_PRIORITY = {
  hero: true,
  aboveFold: true,
  belowFold: false,
  lazy: false,
} as const;

// Default blur data URL for placeholders
export const DEFAULT_BLUR_DATA_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

// Image optimization presets
export const IMAGE_PRESETS = {
  phone: {
    width: IMAGE_SIZES.phone.width,
    height: IMAGE_SIZES.phone.height,
    quality: IMAGE_QUALITY.medium,
    priority: false,
    placeholder: 'blur' as const,
    blurDataURL: DEFAULT_BLUR_DATA_URL,
  },
  hero: {
    width: IMAGE_SIZES.large.width,
    height: IMAGE_SIZES.large.height,
    quality: IMAGE_QUALITY.high,
    priority: true,
    placeholder: 'blur' as const,
    blurDataURL: DEFAULT_BLUR_DATA_URL,
  },
  thumbnail: {
    width: IMAGE_SIZES.thumbnail.width,
    height: IMAGE_SIZES.thumbnail.height,
    quality: IMAGE_QUALITY.low,
    priority: false,
    placeholder: 'blur' as const,
    blurDataURL: DEFAULT_BLUR_DATA_URL,
  },
} as const;

// Get optimized image props for a specific preset
export function getOptimizedImageProps(
  src: string,
  alt: string,
  preset: keyof typeof IMAGE_PRESETS = 'phone',
  className?: string
) {
  const config = IMAGE_PRESETS[preset];
  
  return {
    src,
    alt,
    width: config.width,
    height: config.height,
    quality: config.quality,
    priority: config.priority,
    placeholder: config.placeholder,
    blurDataURL: config.blurDataURL,
    className: className || '',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  };
}
