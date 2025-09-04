import { useCallback } from 'react';

export const useHaptics = () => {
  const hapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') => {
    // Check if vibration is supported
    if (!('vibrate' in navigator)) {
      return;
    }

    // Check if we're on HTTPS (required for Vibration API)
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      return;
    }

    // Different vibration patterns for different feedback types
    const patterns = {
      light: 50,           // Very light tap
      medium: 100,         // Standard tap
      heavy: 200,          // Strong tap
      success: [100, 50, 100], // Success pattern
      error: [200, 100, 200],  // Error pattern
    };

    const pattern = patterns[type];
    
    try {
      const result = navigator.vibrate(pattern);
      
      // Fallback: if vibration returns false, try a simple pattern
      if (result === false) {
        navigator.vibrate(100);
      }
    } catch (error) {
      // Silent fallback - no console errors
    }
  }, []);

  return { hapticFeedback };
};
