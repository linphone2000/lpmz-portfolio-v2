import { useState, useEffect, useCallback, useRef } from 'react';

interface UseScrollProgressOptions {
  throttleMs?: number;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { throttleMs = 32 } = options; // Increased throttle for better performance
  const [progress, setProgress] = useState(0);
  const lastCallRef = useRef(0);

  const updateProgress = useCallback(() => {
    const now = Date.now();
    
    if (now - lastCallRef.current >= throttleMs) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      
      setProgress(scrollPercent);
      lastCallRef.current = now;
    }
  }, [throttleMs]);

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
