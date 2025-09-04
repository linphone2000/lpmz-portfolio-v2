import { useCallback } from 'react';

export const useHaptics = () => {
  const hapticFeedback = useCallback(
    (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') => {
      // Check if vibration is supported
      if (!('vibrate' in navigator)) {
        return;
      }

      // Check if we're on HTTPS (required for Vibration API)
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        return;
      }

      // Different vibration patterns for different feedback types - adjusted for pleasant feel
      const patterns = {
        light: 30, // Very subtle tap
        medium: 50, // Gentle tap
        heavy: 80, // Noticeable but not jarring
        success: [60, 30, 60], // Pleasant success pattern
        error: [80, 40, 80], // Gentle error pattern
      };

      const pattern = patterns[type];

      try {
        const result = navigator.vibrate(pattern);

        // Fallback: if vibration returns false, try a simple pattern
        if (result === false) {
          navigator.vibrate(50);
        }
      } catch (error) {
        // Silent fallback - no console errors
      }
    },
    []
  );

  return { hapticFeedback };
};
