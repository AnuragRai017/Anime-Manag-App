"use client"

import { MangaData } from "@/lib/api"
import { useState, useEffect, useCallback } from "react"
import { MangaBanner } from "@/components/manga-banner"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Import our banner animations
import "@/styles/banner-animations.css"

interface BannerCarouselProps {
  items: MangaData[]
  variant?: "large" | "medium" | "small"
  autoPlay?: boolean
  interval?: number
  showArrows?: boolean
  showIndicators?: boolean
  className?: string
}

export function BannerCarousel({
  items,
  variant = "medium",
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showIndicators = true,
  className = ""
}: BannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  // Navigate to next slide with animation
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setDirection('next');
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [items.length, isTransitioning]);
  
  // Navigate to previous slide with animation
  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setDirection('prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [items.length, isTransitioning]);
  
  // Navigate to specific slide
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setDirection(index > activeIndex ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  }, [activeIndex, isTransitioning]);
  
  // Auto play functionality with smoother transitions
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1 || isTransitioning) return;
    
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, items.length, goToNext, isTransitioning]);
  
  if (items.length === 0) return null;
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner display with enhanced transitions */}
      <div className="relative">
        {items.map((manga, index) => (
          <div
            key={manga.id}
            className={`banner-slide-transition ${activeIndex === index 
              ? 'opacity-100 z-10 scale-100' 
              : 'opacity-0 absolute inset-0 scale-105'} ${
                isTransitioning && activeIndex === index && direction === 'next' ? 'banner-slide-enter' : ''
              } ${
                isTransitioning && activeIndex === index && direction === 'prev' ? 'banner-slide-enter' : ''
              }`}
          >
            <Link 
              href={`/manga/${manga.id}`} 
              className="block cursor-pointer" 
              prefetch={false}
            >
              <MangaBanner 
                manga={manga} 
                variant={variant} 
                priority={index === 0}
                buttonIsLink={false} // Important to prevent nested <a> tags
                className={activeIndex === index ? '' : 'pointer-events-none'}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Enhanced navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 backdrop-blur-md p-3 text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 z-20 shadow-lg"
            onClick={goToPrev}
            aria-label="Previous banner"
            disabled={isTransitioning}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 backdrop-blur-md p-3 text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 z-20 shadow-lg"
            onClick={goToNext}
            aria-label="Next banner"
            disabled={isTransitioning}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Enhanced indicator dots */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                activeIndex === index 
                  ? 'bg-white scale-125 banner-indicator-active' 
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to banner ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      )}

      {/* Additional visual elements */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}
