"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/lib/theme-context";
import { ThemeType, themes } from "@/lib/themes";
import { Button } from "./ui/button";
import { AnimeIcon } from "./ui/anime-icons";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = Object.entries(themes).map(([key, config]) => ({ id: key as ThemeType, ...config }));

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen((o) => !o)}
        className="relative w-10 h-10 rounded-full overflow-hidden border-2 flex items-center justify-center"
        style={{
          borderColor: themes[theme].accent.primary,
          background: `linear-gradient(135deg, ${themes[theme].accent.primary}, ${themes[theme].accent.secondary})`,
        }}
        aria-label="Select anime theme"
      >
        {/* Palette icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
          <path d="M12 22c-5.524 0-10-4.477-10-10S6.476 2 12 2a4 4 0 0 1 4 4c0 .737-.203 1.425-.555 2.016A1.5 1.5 0 0 0 16 10.5a1.5 1.5 0 0 0 1.5 1.5c.414 0 .8-.168 1.071-.439A4 4 0 0 1 20 14c0 5.523-4.476 8-8 8z" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-background border border-border overflow-hidden z-50">
          <div className="py-2 max-h-[70vh] overflow-auto custom-scrollbar">
            {options.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setTheme(o.id);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-3 py-2 text-sm transition-colors duration-200 ${
                  theme === o.id ? "bg-accent/20" : "hover:bg-accent/10"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full mr-3"
                  style={{
                    background: `linear-gradient(135deg, ${o.accent.primary}, ${o.accent.secondary})`,
                  }}
                />
                <span className={theme === o.id ? "font-bold" : ""}>{o.name}</span>
                <div className="ml-auto">
                  <AnimeIcon theme={o.id} size={28} className="animate-pulse-slow" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
