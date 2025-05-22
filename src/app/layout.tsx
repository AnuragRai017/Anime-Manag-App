import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Manga Reader",
  description: "A modern manga reader web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* These help ensure CSS is used immediately */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
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
        
        {/* Script to fix CSS preload issue */}
        <Script id="fix-preload-css" strategy="afterInteractive">
          {`
            // Force a reflow to ensure CSS is used immediately
            document.body.getBoundingClientRect();
            
            // Create a style element to force CSS usage
            function forceStylesUsage() {
              var styleEl = document.createElement('style');
              styleEl.textContent = 
                '.force-css-usage::before { content: ""; }' +
                '.force-css-usage::after { animation: none; }';
              document.head.appendChild(styleEl);
              document.body.classList.add('force-css-usage');
              setTimeout(() => {
                document.body.classList.remove('force-css-usage');
                styleEl.remove();
              }, 100);
            }
            
            // Run on load and after interactive
            window.addEventListener('load', forceStylesUsage);
            forceStylesUsage();
          `}
        </Script>
      </body>
    </html>
  );
}
