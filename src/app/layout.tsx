"use client";

import { Geist } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
// Import all CSS files centrally to avoid preload warnings
import "@/styles/enhanced-ui.css";
import "@/styles/banner-animations.css";
import "@/styles/animation-utils.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeProvider as AnimeThemeProvider } from "@/lib/theme-context";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Metadata cannot be used in Client Components
export const metadata = {
  title: "Manga Reader",
  description: "A modern manga reader web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Force CSS to be used immediately after hydration
  useEffect(() => {
    // First render - force a layout calculation
    void document.body.offsetHeight;
    
    // Apply a class to trigger CSS usage
    const forceStyles = () => {
      // Apply classes that use the CSS for each imported stylesheet
      document.body.classList.add("force-enhance-ui", "force-banner-animations", "force-animation-utils");
      // Then immediately remove them
      requestAnimationFrame(() => {
        document.body.classList.remove("force-enhance-ui", "force-banner-animations", "force-animation-utils");
      });
    };
    
    // Run immediately and again after potential lazy-loaded resources
    forceStyles();
    window.addEventListener('load', forceStyles);
    
    return () => {
      window.removeEventListener('load', forceStyles);
    };
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans antialiased ${geist.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimeThemeProvider>
            <div className="relative flex min-h-screen flex-col">
              {/* Subtle background pattern */}
              <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] z-0">
                <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: 'url(/manga/pattern.png)', backgroundSize: '200px' }} />
              </div>
              
              <Navbar />
              <main className="flex-1 pt-16">{children}</main>
            </div>
          </AnimeThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
