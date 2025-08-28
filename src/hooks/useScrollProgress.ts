import { useState, useEffect, useCallback } from 'react';

interface UseScrollProgressOptions {
  throttleMs?: number;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { throttleMs = 16 } = options;
  const [progress, setProgress] = useState(0);
  const [lastCall, setLastCall] = useState(0);

  const updateProgress = useCallback(() => {
    const now = Date.now();
    
    if (now - lastCall >= throttleMs) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      
      setProgress(scrollPercent);
      setLastCall(now);
    }
  }, [throttleMs, lastCall]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateProgress]);

  return progress;
}
