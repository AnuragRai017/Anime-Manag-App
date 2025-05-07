"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import { ThemeToggle } from "./theme-toggle";
import { AnimeIcon } from "./ui/anime-icons";
import { ThemeType } from "@/lib/themes";

export function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="border-t mt-16 bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <AnimeIcon theme={theme as ThemeType} size={32} />
              <h2 className="text-xl font-bold">MangaVerse</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for manga and anime content. Discover, read, and enjoy your favorite series.
            </p>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
          
          {/* Quick links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/latest" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Latest Updates
                </Link>
              </li>
              <li>
                <Link href="/popular" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Popular
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Genres */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Genres</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/genres/action" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/genres/romance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Romance
                </Link>
              </li>
              <li>
                <Link href="/genres/fantasy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Fantasy
                </Link>
              </li>
              <li>
                <Link href="/genres/horror" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Horror
                </Link>
              </li>
              <li>
                <Link href="/genres" className="text-sm text-primary hover:underline transition-colors">
                  View All Genres
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Copyright
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MangaVerse. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Message banner */}
        <div className="mt-8 p-4 bg-primary/10 rounded-lg text-center">
          <p className="text-sm">
            If you enjoy the website, please consider sharing it with your friends. Thank you!
          </p>
        </div>
      </div>
    </footer>
  );
}
