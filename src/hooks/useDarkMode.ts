import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('lpmz.theme');
    if (saved === 'dark') {
      setDark(true);
    } else if (saved === 'light') {
      setDark(false);
    } else {
      try {
        const systemDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setDark(systemDark);
        localStorage.setItem('lpmz.theme', systemDark ? 'dark' : 'light');
      } catch {
        setDark(false);
        localStorage.setItem('lpmz.theme', 'light');
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('lpmz.theme', dark ? 'dark' : 'light');
    } catch {}
  }, [dark, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('lpmz.theme');
      if (!saved) {
        setDark(e.matches);
        localStorage.setItem('lpmz.theme', e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const toggle = () => setDark((d) => !d);
  return { dark, toggle, mounted } as const;
}
