"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { ThemeType, themes } from "./themes";

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  getThemeConfig: () => typeof themes.default;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or default
  const [theme, setThemeState] = useState<ThemeType>("default");
  const { theme: nextTheme } = useNextTheme();
  
  // Effect to load theme from localStorage when component mounts (client-side only)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("manga-reader-theme") as ThemeType | null;
      if (savedTheme && themes[savedTheme]) {
        setThemeState(savedTheme);
        // Apply initial theme class to html element
      const htmlClasses = document.documentElement.classList;
      // Remove any existing theme- classes
      htmlClasses.forEach(cls => {
        if (cls.startsWith('theme-')) htmlClasses.remove(cls);
      });
      htmlClasses.add(themes[savedTheme].className);
      }
    } catch (e) {
      // Handle localStorage not being available
      console.warn("Could not access localStorage", e);
    }
  }, []);

  // Listen for next-themes changes to update our class names accordingly
  useEffect(() => {
    if (nextTheme) {
      // We're not changing the anime theme, just ensuring proper dark/light mode
      const currentThemeConfig = themes[theme];
      if (currentThemeConfig) {
      // Apply the theme class without removing dark/light classes
      const htmlClasses2 = document.documentElement.classList;
      htmlClasses2.forEach(cls => {
        if (cls.startsWith('theme-') && cls !== currentThemeConfig.className) {
          htmlClasses2.remove(cls);
        }
      });
      htmlClasses2.add(currentThemeConfig.className);
      }
    }
  }, [nextTheme, theme]);

  // Set theme and persist to localStorage
  const setTheme = (newTheme: ThemeType) => {
    if (themes[newTheme]) {
      setThemeState(newTheme);
      
      try {
        localStorage.setItem("manga-reader-theme", newTheme);
      } catch (e) {
        console.warn("Could not access localStorage", e);
      }
      
      // Apply new theme class to html element while preserving dark/light classes
      const htmlClasses3 = document.documentElement.classList;
      htmlClasses3.forEach(cls => {
        if (cls.startsWith('theme-')) htmlClasses3.remove(cls);
      });
      htmlClasses3.add(themes[newTheme].className);
    }
  };

  // Helper to get the current theme configuration
  const getThemeConfig = () => {
    return themes[theme];
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
