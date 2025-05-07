"use client"

import { useTheme } from "@/lib/theme-context"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MangaLogoOverlayProps {
  variant?: "large" | "medium" | "small"
  className?: string
}

export function MangaLogoOverlay({ 
  variant = "large", 
  className = "" 
}: MangaLogoOverlayProps) {
  const { getThemeConfig } = useTheme();
  const theme = getThemeConfig();
  
  // Get dimension styles based on variant
  const dimensions = {
    large: {
      container: "h-20 md:h-28",
      logo: "w-auto h-10 md:h-16"
    },
    medium: {
      container: "h-14 md:h-20",
      logo: "w-auto h-7 md:h-10"
    },
    small: {
      container: "h-10 md:h-14",
      logo: "w-auto h-5 md:h-7"
    }
  };
  
  const size = dimensions[variant];
    return (
    <div className={cn(
      "relative w-full overflow-hidden", 
      size.container,
      className
    )}>      {/* Background pattern with gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/60">
        <Image
          src="/manga/pattern.png"
          alt="Manga pattern"
          fill
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-overlay"
        />
        
        {/* Gradient overlay with animation */}
        <div 
          className="absolute inset-0 animate-gradient-x"
          style={{ 
            backgroundImage: `linear-gradient(90deg, ${theme.accent.primary}CC, ${theme.accent.secondary}AA)`,
            backgroundSize: "200% 100%",
            backgroundPosition: "0% 0%"
          }}
        />
        
        {/* Add subtle light ray effect */}
        <div 
          className="absolute inset-y-0 left-1/4 w-1/2 animate-pulse opacity-30"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${theme.accent.primary}50, transparent)`,
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%",
            filter: 'blur(10px)'
          }}
        />
      </div>
        {/* Logo content */}
      <div className="relative h-full flex items-center justify-center z-10 px-6">
        <div className="flex flex-col items-center animate-fadeIn">
          <div className="font-extrabold tracking-wider flex items-center relative">
            <span className={cn(
              "text-white drop-shadow-glow filter",
              size.logo
            )}>
              <span className="opacity-95 relative">MANGA</span>
              <span 
                className="relative"
                style={{ 
                  color: theme.accent.primary, 
                  textShadow: `0 0 15px ${theme.accent.primary}`,
                  display: 'inline-block'
                }}
              >
                VERSE
                {/* Add subtle animated underline */}
                <span 
                  className="absolute bottom-0 left-0 w-full h-[2px] transform animate-pulse-glow"
                  style={{ 
                    backgroundColor: theme.accent.primary,
                    opacity: 0.7
                  }}
                />
              </span>
            </span>
          </div>
          <div className="text-xs md:text-sm text-white/90 mt-1 tracking-wider font-medium animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            Discover • Read • Enjoy
          </div>
        </div>
      </div>
    </div>
  );
}
