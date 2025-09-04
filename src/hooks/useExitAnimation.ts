import { useState, useEffect, useCallback } from 'react';

interface UseExitAnimationOptions {
  duration?: number;
  onExit?: () => void;
}

export function useExitAnimation(options: UseExitAnimationOptions = {}) {
  const { duration = 300, onExit } = options;
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
    setIsExiting(false);
  }, []);

  const hide = useCallback(() => {
    setIsExiting(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      onExit?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onExit]);

  const toggle = useCallback(() => {
    if (isVisible) {
      hide();
    } else {
      show();
    }
  }, [isVisible, show, hide]);

  // Auto-hide when component unmounts
  useEffect(() => {
    return () => {
      if (isVisible) {
        hide();
      }
    };
  }, [isVisible, hide]);

  return {
    isVisible,
    isExiting,
    show,
    hide,
    toggle,
  };
}
