'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ICON_BUTTON } from '@/components/ui/styles';

// The light and dark switch. Dark is the default; a choice is kept in localStorage under "theme" and applied before
// the first paint by THEME_SCRIPT in src/app/layout.tsx, so a light page never flashes dark. Both icons are in the
// HTML and CSS shows the right one, so the server render matches whatever the script chose.
export const THEME_KEY = 'theme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the theme is only readable in the browser
    setLight(document.documentElement.dataset.theme === 'light');
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_KEY, next ? 'light' : 'dark');
    } catch {
      // Storage blocked (a private window, say): the switch still works for this page view.
    }
  };

  return (
    <button type="button" onClick={toggle} aria-pressed={light} aria-label="Light theme" title="Light theme" className={`${ICON_BUTTON} ${className}`}>
      <Sun className="h-4 w-4 light:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 light:block" aria-hidden="true" />
    </button>
  );
}
