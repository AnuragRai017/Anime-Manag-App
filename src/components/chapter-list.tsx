"use client"

import Link from "next/link"
import { ChapterData } from "@/lib/api"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface ChapterListProps {
  chapters: ChapterData[]
  mangaId: string
  className?: string
}

export function ChapterList({ chapters, mangaId, className }: ChapterListProps) {
  const { theme, getThemeConfig } = useTheme()
  const themeConfig = getThemeConfig()
  const [currentPage, setCurrentPage] = useState(1)
  const chaptersPerPage = 20
  
  // Get the theme-specific styles
  const chapterListStyle = themeConfig.chapterListStyle
  const accentColor = themeConfig.accent.primary
  
  // Memorized sorted chapters
  const sortedChapters = useMemo(() => {
    return [...chapters].sort((a, b) => {
      // Convert chapter numbers to numeric values for proper sorting
      const aChapter = parseFloat(a.attributes.chapter || "0")
      const bChapter = parseFloat(b.attributes.chapter || "0")
      
      if (aChapter === bChapter) {
        // If chapter numbers are the same, sort by volume
        const aVolume = a.attributes.volume ? parseFloat(a.attributes.volume) : 0
        const bVolume = b.attributes.volume ? parseFloat(b.attributes.volume) : 0
        return bVolume - aVolume
      }
      
      return bChapter - aChapter // Descending order (newest first)
    })
  }, [chapters])
  
  // Paginated chapters based on current page
  const paginatedChapters = useMemo(() => {
    const startIndex = (currentPage - 1) * chaptersPerPage
    return sortedChapters.slice(startIndex, startIndex + chaptersPerPage)
  }, [sortedChapters, currentPage, chaptersPerPage])
  
  const totalPages = Math.ceil(sortedChapters.length / chaptersPerPage)
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  // Theme-specific animations for chapter items
  const getThemeAnimation = (index: number) => {
    const baseDelay = `${index * 50}ms`
    
    switch (theme) {
      case "naruto":
        return `animate-fadeIn animate-delay-${baseDelay} hover:shadow-[0_0_15px_rgba(255,107,0,0.3)]`
      case "bleach":
        return `animate-slideInRight animate-delay-${baseDelay} hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`
      case "onePiece":
        return `animate-bounceIn animate-delay-${baseDelay} hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]`
      case "jjk":
        return `animate-fadeInUp animate-delay-${baseDelay} hover:shadow-[0_0_15px_rgba(75,0,130,0.3)]`
      case "soloLeveling":
        return `animate-fadeIn animate-delay-${baseDelay} hover:shadow-[0_0_15px_rgba(128,0,128,0.3)]`
      case "demonSlayer":
        return `animate-slideInLeft animate-delay-${baseDelay} hover:shadow-[0_0_15px_rgba(255,20,147,0.3)]`
      case "dragonBall":
        return `animate-zoomIn animate-delay-${baseDelay} hover:shadow-[0_0_15px_rgba(255,165,0,0.3)]`
      default:
        return `animate-fadeIn animate-delay-${baseDelay} hover:shadow-sm`
    }
  }

  return (
    <div className={cn("w-full", className, chapterListStyle)}>
      {paginatedChapters.length > 0 ? (
        <div className="space-y-1">
          {paginatedChapters.map((chapter, index) => (
            <Link 
              key={chapter.id}
              href={`/manga/${mangaId}/chapter/${chapter.id}`}
              className={cn(
                "flex items-center justify-between p-3 rounded-md transition-all duration-300",
                "hover:bg-muted backdrop-blur-sm",
                "border border-transparent hover:border-primary/20",
                "relative overflow-hidden group",
                getThemeAnimation(index)
              )}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className="z-10">
                <div className="font-medium flex items-center gap-2">
                  {/* Theme-specific chapter indicator */}
                  <span 
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                    style={{ 
                      backgroundColor: `${accentColor}30`,
                      color: accentColor
                    }}
                  >
                    {parseFloat(chapter.attributes.chapter || "0")}
                  </span>

                  {chapter.attributes.volume && `Vol. ${chapter.attributes.volume} `}
                  Chapter {chapter.attributes.chapter}
                  {chapter.attributes.title && `: ${chapter.attributes.title}`}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(chapter.attributes.publishAt)}
                </div>
              </div>
              
              {/* Theme-specific button styles */}
              <Button 
                variant="ghost" 
                size="sm"
                className="relative overflow-hidden group-hover:scale-105 transition-transform z-10"
                style={{
                  color: accentColor,
                }}
              >
                Read
                <span 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: accentColor }}
                />
              </Button>
              
              {/* Theme-specific hover effect */}
              <span 
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{ 
                  background: `linear-gradient(45deg, transparent, ${accentColor}, transparent)`,
                }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No chapters available.</p>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="group relative overflow-hidden"
            style={{
              borderColor: `${accentColor}50`,
            }}
          >
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="relative z-10">Previous</span>
            
            {/* Button background animation */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ background: accentColor }}
            />
          </Button>
          
          <div className="flex items-center gap-1">
            {/* First page */}
            {currentPage > 3 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  className="w-8 h-8 p-0 relative overflow-hidden group"
                  style={{
                    borderColor: currentPage === 1 ? accentColor : `${accentColor}50`,
                    color: currentPage === 1 ? accentColor : undefined,
                  }}
                >
                  <span className="relative z-10">1</span>
                  <span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: accentColor }}
                  />
                </Button>
                {currentPage > 4 && (
                  <span className="mx-1">...</span>
                )}
              </>
            )}
            
            {/* Pages around current page */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum;
              
              if (totalPages <= 5) {
                // If 5 or fewer pages, show all
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                // Near start
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                // Near end
                pageNum = totalPages - 4 + i;
              } else {
                // In middle
                pageNum = currentPage - 2 + i;
              }
              
              // Skip first and last page as they are handled separately
              if ((pageNum === 1 && currentPage > 3) || 
                  (pageNum === totalPages && currentPage < totalPages - 2)) {
                return null;
              }
              
              const isActive = currentPage === pageNum;
              
              return (
                <Button
                  key={`page-btn-${pageNum}`}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-8 h-8 p-0 relative overflow-hidden group",
                    isActive && "transform scale-110"
                  )}
                  style={{
                    borderColor: isActive ? accentColor : `${accentColor}50`,
                    backgroundColor: isActive ? `${accentColor}20` : undefined,
                    color: isActive ? accentColor : undefined,
                  }}
                >
                  <span className="relative z-10">{pageNum}</span>
                  <span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: accentColor }}
                  />
                </Button>
              );
            })}
            
            {/* Last page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="mx-1">...</span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-8 h-8 p-0 relative overflow-hidden group"
                  style={{
                    borderColor: currentPage === totalPages ? accentColor : `${accentColor}50`,
                    color: currentPage === totalPages ? accentColor : undefined,
                  }}
                >
                  <span className="relative z-10">{totalPages}</span>
                  <span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: accentColor }}
                  />
                </Button>
              </>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="group relative overflow-hidden"
            style={{
              borderColor: `${accentColor}50`,
            }}
          >
            <span className="relative z-10">Next</span>
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            
            {/* Button background animation */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ background: accentColor }}
            />
          </Button>
        </div>
      )}
    </div>
  )
}
