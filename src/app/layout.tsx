import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
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
