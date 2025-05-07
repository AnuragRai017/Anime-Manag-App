"use client"

import { ReactNode } from "react"
import { useTheme } from "@/lib/theme-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface MangaSectionProps {
  title: string
  description?: string
  viewAllLink?: string
  viewAllText?: string
  accentColor?: string
  children: ReactNode
  className?: string
}

export function MangaSection({
  title,
  description,
  viewAllLink,
  viewAllText = "View All",
  accentColor,
  children,
  className = ""
}: MangaSectionProps) {
  const { getThemeConfig } = useTheme();
  const theme = getThemeConfig();
  
  // Use provided accent color or default theme accent
  const sectionAccent = accentColor || theme.accent.primary;
    return (
    <section className={`w-full ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold relative inline-block group">
            <span className="relative">
              {title}
              <span 
                className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full transform origin-left transition-all duration-300 scale-x-75 group-hover:scale-x-100"
                style={{ 
                  background: `linear-gradient(90deg, ${sectionAccent}, ${sectionAccent}20)`,
                  boxShadow: `0 2px 10px ${sectionAccent}40`
                }}
              />
              {/* Add subtle highlight effect */}
              <span 
                className="absolute -inset-x-1 inset-y-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(90deg, transparent, ${sectionAccent}, transparent)`
                }}
              />
            </span>
          </h2>
          
          {description && (
            <p className="text-muted-foreground text-sm md:text-base mt-1 max-w-lg animate-fadeInUp">{description}</p>
          )}
        </div>        {viewAllLink && (
          <Link href={viewAllLink}>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full group transition-all duration-300 border-opacity-50 hover:border-opacity-100 relative overflow-hidden"
              style={{
                color: sectionAccent,
                borderColor: sectionAccent
              }}
            >
              <span className="relative z-10">{viewAllText}</span>
              <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              
              {/* Button background animation */}
              <span 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ 
                  background: sectionAccent
                }}
              />
            </Button>
          </Link>
        )}
      </div>
      
      {children}
    </section>
  )
}
