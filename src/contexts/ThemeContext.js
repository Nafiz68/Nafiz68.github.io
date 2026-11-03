import React, { createContext, useCallback, useContext, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// public/index.html applies the saved theme class before first paint.
const currentTheme = () =>
  document.documentElement.classList.contains('light') ? 'light' : 'dark';

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('light', theme === 'light');
  document.documentElement.classList.toggle('dark', theme !== 'light');
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // storage unavailable; the theme just won't persist
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(currentTheme);

  // Switches theme with a circle expanding from the click point.
  const toggleTheme = useCallback((event) => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    const commit = () => {
      flushSync(() => setTheme(next));
      applyTheme(next);
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduced) {
      const root = document.documentElement;
      root.classList.add('theme-fade');
      commit();
      setTimeout(() => root.classList.remove('theme-fade'), 550);
      return;
    }

    const x = event?.clientX ?? window.innerWidth - 60;
    const y = event?.clientY ?? 40;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(commit);
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode: theme !== 'light', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
