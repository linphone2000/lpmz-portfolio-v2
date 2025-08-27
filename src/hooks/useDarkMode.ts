import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Initialize dark state from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const shouldBeDark =
      savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    setDark(shouldBeDark);

    // Apply the theme to the document
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);

    if (newDark) {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = 'light';
      document.documentElement.classList.remove('dark');
    }

    console.log('Toggle clicked! New theme:', newDark ? 'dark' : 'light');
  };

  return {
    dark,
    toggle,
    mounted,
  };
}
