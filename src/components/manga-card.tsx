"use client"

import Link from "next/link"
import { useMemo, useState, useEffect } from "react"
import Image from "next/image"
import { MangaData, getCoverImage, getMangaTitle } from "@/lib/api"

// Import enhanced UI styles
import "@/styles/enhanced-ui.css"

interface MangaCardProps {
  manga: MangaData
  priority?: boolean
  compact?: boolean
}

export function MangaCard({ manga, priority = false, compact = false }: MangaCardProps) {  
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [isVisible, setIsVisible] = useState(false);
  const coverUrl = useMemo(() => imageState === 'error' ? '/manga/placeholder.png' : getCoverImage(manga), [manga, imageState]);
  const title = useMemo(() => getMangaTitle(manga), [manga]);
  
  // Animation effect - set visible after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
    // Get first tag of manga (genre) with better language fallback
  const genre = useMemo(() => {
    const genreTag = manga.attributes.tags.find(tag => tag.attributes.group === "genre")
    
    if (!genreTag) return "Unknown";
    
    // Try English name first
    if (genreTag.attributes.name.en) {
      return genreTag.attributes.name.en;
    }
    
    // If English not available, try other languages
    const languagePriority = ['ja-ro', 'ja', 'ko-ro', 'ko', 'zh-hk', 'zh'];
    for (const lang of languagePriority) {
      if (genreTag.attributes.name[lang]) {
        return genreTag.attributes.name[lang];
      }
    }
    
    // Fallback to first available language
    const names = Object.values(genreTag.attributes.name);
    return names.length > 0 ? names[0] : "Unknown";
  }, [manga])
  // Get original language for display
  const originalLanguage = useMemo(() => {
    return manga.attributes.originalLanguage?.toUpperCase() || "";
  }, [manga]);
  
  // Check if manga has alt titles
  const hasAltTitles = useMemo(() => {
    return manga.attributes.altTitles && manga.attributes.altTitles.length > 0;
  }, [manga]);
    // Get content rating
  const contentRating = useMemo(() => {
    return manga.attributes.contentRating?.toUpperCase() || "";
  }, [manga]);
  
  // Get publication status
  const publicationStatus = useMemo(() => {
    if (!manga.attributes.status) return "";
    return manga.attributes.status.charAt(0).toUpperCase() + manga.attributes.status.slice(1);
  }, [manga]);
  
  // Get publication year
  const year = useMemo(() => {
    return manga.attributes.year || null;
  }, [manga]);  return (
    <Link href={`/manga/${manga.id}`} className="group block h-full">
      <div 
        className={`flex flex-col h-full rounded-lg overflow-hidden manga-card-enhanced glass-card ${compact ? 'scale-95' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 ease-out`}
      >
        <div className={`relative overflow-hidden aspect-[2/3] rounded-t-lg ${imageState === 'loading' ? 'animate-pulse' : ''}`}>
          {/* Show placeholder content when image fails to load */}
          {imageState === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9.9 9.9 14.1 14.1M14.1 9.9 9.9 14.1" />
              </svg>
              <span className="text-xs mt-2">Image unavailable</span>
            </div>
          )}
          
          {/* Content rating badge */}
          {contentRating && (
            <span 
              className={`absolute top-2 right-2 z-10 text-xs px-2 py-0.5 rounded-full text-white font-medium shadow-md backdrop-blur-md badge-transition delay-200 ${
                contentRating === "SAFE" 
                  ? "bg-green-500/90 group-hover:bg-green-500" 
                  : contentRating === "SUGGESTIVE" 
                  ? "bg-yellow-500/90 group-hover:bg-yellow-500" 
                  : "bg-red-500/90 group-hover:bg-red-500"
              } hover-glow ${isVisible ? 'badge-visible' : 'badge-hidden'}`}
            >
              {contentRating}
            </span>
          )}
          
          {/* Language indicator */}
          {originalLanguage && (
            <span 
              className={`absolute top-2 left-2 z-10 text-xs bg-black/70 backdrop-blur-md text-white px-2 py-0.5 rounded-full font-medium shadow-md group-hover:bg-black/90 badge-transition delay-100 ${isVisible ? 'language-badge-visible' : 'language-badge-hidden'}`}
            >
              {originalLanguage}
            </span>
          )}
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1 group-hover:filter group-hover:brightness-110"
            priority={priority}            
            onError={() => {
              console.warn(`Failed to load cover image for manga: ${title}`);
              setImageState('error');
            }}
            onLoad={() => setImageState('loaded')}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3 backdrop-blur-[2px] group-hover:backdrop-blur-0">
            <div 
              className="flex flex-col gap-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"
            >
              <span className="text-white text-sm font-medium line-clamp-1">{genre}</span>
              {publicationStatus && (
                <span className="text-white/90 text-xs">{publicationStatus} {year && `• ${year}`}</span>
              )}
            </div>
          </div>
          
          {/* Enhanced top decorative border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left animated-border"></div>
          
          {/* Enhanced ripple effect */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="absolute inset-0 bg-primary/15 rounded-full scale-0 group-hover:animate-ripple"></span>
          </div>
          
          {/* Subtle texture overlay with improved blend */}
          <div className="absolute inset-0 bg-manga-texture opacity-20 mix-blend-soft-light pointer-events-none"></div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold line-clamp-2 text-sm md:text-base min-h-[2.5rem] group-hover:text-primary transition-all duration-300 group-hover:translate-x-0.5">{title}</h3>
          
          {/* Show first alt title if available with enhanced styling */}
          {hasAltTitles && (
            <p className="text-xs text-muted-foreground line-clamp-1 italic mt-1 min-h-[1.2rem] transition-all duration-300 group-hover:text-primary/80">
              {(() => {
                const firstAltTitle = manga.attributes.altTitles[0];
                const firstLang = Object.keys(firstAltTitle)[0];
                return firstLang ? firstAltTitle[firstLang] : "";
              })()}
            </p>
          )}
          
          {/* Show author if available with enhanced styling */}
          {manga.relationships && (
            <p className="text-xs text-muted-foreground mt-1.5 transition-all duration-300 group-hover:text-primary/70 font-medium">
              {manga.relationships.find(rel => rel.type === "author")?.attributes?.name || ""}
            </p>
          )}
          
          {/* Genre with pill styling */}
          <div className="mt-auto pt-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/90 transition-all duration-300 group-hover:bg-primary/20 group-hover:font-medium inline-block">
              {genre}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
