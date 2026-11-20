'use client';

import { useSyncExternalStore } from 'react';

const mediaQuery = '(prefers-reduced-motion: reduce)';
const eventName = 'portfolio-motion-change';
const preferenceKey = 'portfolio-motion';
let pausedForTab = false;

function subscribe(callback: () => void) {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener('change', callback);
  window.addEventListener(eventName, callback);

  return () => {
    media.removeEventListener('change', callback);
    window.removeEventListener(eventName, callback);
  };
}

function getSnapshot() {
  if (window.matchMedia(mediaQuery).matches) return false;
  try {
    return window.sessionStorage.getItem(preferenceKey) !== 'paused';
  } catch {
    return !pausedForTab;
  }
}

export function useSiteMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function setSiteMotion(enabled: boolean) {
  pausedForTab = !enabled;
  try {
    window.sessionStorage.setItem(preferenceKey, enabled ? 'on' : 'paused');
  } catch {
    // The in-memory preference is enough when storage is unavailable.
  }
  window.dispatchEvent(new Event(eventName));
}
