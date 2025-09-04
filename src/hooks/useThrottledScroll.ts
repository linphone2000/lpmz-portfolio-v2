import { useEffect, useRef, useCallback } from 'react';

interface UseThrottledScrollOptions {
  throttleMs?: number;
  passive?: boolean;
}

export function useThrottledScroll(
  callback: (scrollY: number) => void,
  options: UseThrottledScrollOptions = {}
) {
  const { throttleMs = 16, passive = true } = options;
  const lastCall = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const throttledCallback = useCallback(
    (scrollY: number) => {
      const now = Date.now();

      if (now - lastCall.current >= throttleMs) {
        callback(scrollY);
        lastCall.current = now;
      } else {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Schedule delayed execution
        timeoutRef.current = setTimeout(
          () => {
            callback(scrollY);
            lastCall.current = Date.now();
          },
          throttleMs - (now - lastCall.current)
        );
      }
    },
    [callback, throttleMs]
  );

  useEffect(() => {
    const handleScroll = () => {
      throttledCallback(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [throttledCallback, passive]);

  return throttledCallback;
}
