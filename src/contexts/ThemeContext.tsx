'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useLayoutEffect } from 'react';
import { themeConfig, siteConfig } from '@/config/site';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { readonly children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(siteConfig.defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Apply theme immediately on mount to prevent flash
  useLayoutEffect(() => {
    const saved = localStorage.getItem('theme');
    const defaultTheme = siteConfig.defaultTheme as Theme;

    // Use saved theme if exists and valid, otherwise use default
    const themeToUse = saved && (saved === 'light' || saved === 'dark') ? saved : defaultTheme;

    // Apply theme immediately to prevent flash (class should already be set by head script)
    if (themeToUse === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setThemeState(themeToUse);

    // Only set localStorage if it wasn't already set
    if (!saved) {
      localStorage.setItem('theme', themeToUse);
    }

    setMounted(true);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
    }

    // Apply theme class to document element for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply theme colors to CSS variables
    const root = document.documentElement;
    const colors = themeConfig[theme];

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme
  }), [theme, toggleTheme, setTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
