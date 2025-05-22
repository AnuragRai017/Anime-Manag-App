"use client"

import { MangaData } from "@/lib/api"
import { getCoverImage, getMangaTitle } from "@/lib/api"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useMemo, useEffect } from "react"
import { useTheme } from "@/lib/theme-context"

interface MangaBannerProps {
  manga: MangaData
  variant?: "large" | "medium" | "small"
  priority?: boolean
  showButton?: boolean
  className?: string
  /** When true, the Read button will be a link. When false, it's just visual. Default: true */
  buttonIsLink?: boolean
}

export function MangaBanner({ 
  manga, 
  variant = "medium",
  priority = true,
  showButton = true,
  className = "",
  buttonIsLink = true
}: MangaBannerProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isVisible, setIsVisible] = useState(false);
  const { getThemeConfig } = useTheme();
  const theme = getThemeConfig();
  
  // Animation effect - set visible after component mounts for animations
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Get manga data
  const coverUrl = useMemo(() => imageState === 'error' ? '/manga/placeholder.png' : getCoverImage(manga), [manga, imageState]);
  const title = useMemo(() => getMangaTitle(manga), [manga]);
  
  // Get description with some length limitation
  const description = useMemo(() => {
    let desc = manga.attributes.description?.en || "";
    // Truncate description based on variant
    const maxLength = variant === "large" ? 200 : variant === "medium" ? 150 : 100;
    if (desc.length > maxLength) {
      desc = desc.substring(0, maxLength) + "...";
    }
    return desc;
  }, [manga, variant]);
  
  // Get first genre
  const genre = useMemo(() => {
    const genreTag = manga.attributes.tags.find(tag => tag.attributes.group === "genre");
    if (!genreTag) return "Manga";
    return genreTag.attributes.name.en || Object.values(genreTag.attributes.name)[0] || "Manga";
  }, [manga]);
  
  // Get dimension styles based on variant
  const dimensions = useMemo(() => {
    switch(variant) {
      case "large":
        return "h-[400px] md:h-[500px]";
      case "medium":
        return "h-[250px] md:h-[350px]";
      case "small":
        return "h-[180px] md:h-[220px]";
      default:
        return "h-[250px] md:h-[350px]";
    }
  }, [variant]);
  return (
    <div className={`relative overflow-hidden rounded-2xl ${dimensions} ${className} transition-transform duration-500 hover:transform hover:scale-[1.02] group`}>
      {/* Background cover image with gradient overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={coverUrl}
          alt={title}
          fill
          sizes="100vw"
          className={`object-cover banner-image-animation ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          priority={priority}
          onError={() => setImageState('error')}
          onLoad={() => setImageState('loaded')}
        />
        
        {/* Gradient overlay with animation */}
        <div 
          className="absolute inset-0 banner-gradient-animation"
          style={{ 
            backgroundImage: `linear-gradient(90deg, ${theme.accent.primary}DD, ${theme.accent.primary}22, transparent)`,
          }}
        />
        
        {/* Top subtle border glow */}
        <div className="absolute top-0 left-0 w-full h-[2px] animate-pulse" 
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.accent.primary}, transparent)`,
            boxShadow: `0 0 20px 2px ${theme.accent.primary}`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end md:justify-center z-10 p-6 md:p-8 max-w-[80%] lg:max-w-[65%]">
        <div className="space-y-4 transform transition-all duration-500 group-hover:-translate-y-2">
          {/* Genre badge */}
          <span 
            className={`inline-block px-3 py-1 text-sm rounded-full font-medium text-white backdrop-blur-sm banner-badge-animation ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundColor: `${theme.accent.primary}BB`,
              boxShadow: `0 0 15px ${theme.accent.primary}80`
            }}
          >
            {genre}
          </span>

          {/* Title with animation */}
          <h2 
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white line-clamp-2 banner-title-animation ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              textShadow: "0 2px 10px rgba(0,0,0,0.7)",
              background: `linear-gradient(90deg, white, #f0f0f0)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            {title}
          </h2>
          
          {/* Description with animation - only shown for medium and large variants */}
          {variant !== "small" && description && (
            <p className={`text-white/95 text-sm md:text-base line-clamp-3 max-w-lg backdrop-blur-[1px] bg-black/5 p-3 rounded-md banner-description-animation ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {description}
            </p>
          )}

          {/* Button with animation - optional */}
          {showButton && (
            <div className={`pt-2 banner-button-animation ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Only use Link when buttonIsLink is true AND this component is not used inside another Link */}
              {buttonIsLink ? (
                <div>
                  <Button 
                    className="mt-2 hover:scale-110 transition-transform relative group overflow-hidden shadow-lg"
                    style={{
                      backgroundColor: "white",
                      color: theme.accent.primary,
                      borderColor: "white",
                    }}
                    onClick={() => window.location.href = `/manga/${manga.id}`}
                  >
                    <span className="relative z-10 font-semibold">Read Now</span>
                    <span 
                      className="absolute inset-0 w-0 bg-opacity-20 transition-all duration-300 group-hover:w-full" 
                      style={{ background: theme.accent.primary }}
                    />
                  </Button>
                </div>
              ) : (
                <Button 
                  className="mt-2 hover:scale-110 transition-transform relative group overflow-hidden shadow-lg"
                  style={{
                    backgroundColor: "white",
                    color: theme.accent.primary,
                    borderColor: "white",
                  }}
                  // No onClick handler when buttonIsLink is false, as it's already wrapped in a Link
                >
                  <span className="relative z-10 font-semibold">Read Now</span>
                  <span 
                    className="absolute inset-0 w-0 bg-opacity-20 transition-all duration-300 group-hover:w-full" 
                    style={{ background: theme.accent.primary }}
                  />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Enhanced decorative elements with animations */}
      <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 opacity-50 banner-decorative-element">
        <div className="w-full h-full border-t-2 border-r-2 border-white/40 rounded-tr-2xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 opacity-50 banner-decorative-element">
        <div className="w-full h-full border-b-2 border-l-2 border-white/40 rounded-bl-2xl" />
      </div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-white/5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-white/5 blur-2xl animate-pulse-slow"></div>
    </div>
  )
}
