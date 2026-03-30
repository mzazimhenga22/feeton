"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export const THEMES = {
  default: "0 85% 50%", // Feeton Red
  performance: "210 100% 50%", // Electric Blue
  limited: "142 70% 50%", // Emerald Green
  lifestyle: "280 80% 60%", // Neon Purple
  carbon: "0 0% 50%", // Graphite Gray
};

type ThemeName = keyof typeof THEMES;

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeName>("default");

  useEffect(() => {
    const root = document.documentElement;
    const colorToApply = THEMES[theme];
    
    root.style.setProperty('--primary', colorToApply);
    root.style.setProperty('--ring', colorToApply);
    root.style.setProperty('--accent', colorToApply);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};