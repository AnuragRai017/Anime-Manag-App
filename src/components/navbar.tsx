"use client"

import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"
import { useTheme } from "@/lib/theme-context"

export function Navbar() {
  const { getThemeConfig } = useTheme();
  const theme = getThemeConfig();
  return (
    <nav 
      className="fixed top-0 w-full border-b bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-40"
      style={{
        borderBottomColor: `${theme.accent.primary}60`,
        borderBottomWidth: '2px',
        boxShadow: `0 2px 10px ${theme.accent.primary}10`
      }}
    >
      <div 
        className="container flex h-16 items-center"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent.primary}05, transparent)`,
        }}
      >        <div className="mr-4 flex flex-1 items-center">
          <Link 
            href="/" 
            className="mr-6 flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
            style={{
              textShadow: `0 0 5px ${theme.accent.primary}80`,
            }}
          >
            <span 
              className="font-extrabold text-xl transition-colors duration-300 tracking-wide"
              style={{ color: theme.accent.primary }}
            >
              <span className="text-foreground">MANGA</span>
              <span>VERSE</span>
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">            <NavigationMenuList>              <NavigationMenuItem>
                <Link 
                  href="/" 
                  className="px-4 py-2 transition-all duration-300 relative group"
                >
                  <span>Home</span>
                  <span 
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 -translate-x-1/2 transition-all duration-300 group-hover:w-3/4"
                    style={{ backgroundColor: theme.accent.primary }}
                  />
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  href="/explore" 
                  className="px-4 py-2 transition-all duration-300 relative group"
                >
                  <span>Explore</span>
                  <span 
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 -translate-x-1/2 transition-all duration-300 group-hover:w-3/4"
                    style={{ backgroundColor: theme.accent.primary }}
                  />
                </Link>
              </NavigationMenuItem><NavigationMenuItem>
                <NavigationMenuTrigger
                  className="transition-colors duration-300 hover:text-primary"
                  style={{
                    borderBottom: `2px solid transparent`
                  }}
                >
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {["Action", "Romance", "Fantasy", "Sci-Fi", "Comedy", "Drama"].map((genre) => (
                      <li key={genre}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/genres/${genre.toLowerCase()}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent/50 hover:text-primary hover:translate-x-1"
                          >
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-2 w-2 rounded-full transition-all duration-300"
                                style={{ backgroundColor: theme.accent.primary, opacity: 0.7 }}
                              />
                              <span className="font-medium">{genre}</span>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center justify-between space-x-2 md:justify-end w-full md:w-auto">
          <div className="w-full flex-1 md:w-auto">
            <SearchBar />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
