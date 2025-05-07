"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading"
import { 
  Menu, MonitorUp, ScrollText, X,
  ChevronLeft, ChevronRight,
  ArrowRight,
  Maximize, Minimize
} from "lucide-react"
import { MangaDexAPI, ChapterData } from "@/lib/api"
import { cn } from "@/lib/utils"

interface ChapterReaderProps {
  pageUrls: string[]
  mangaId: string
  chapterId: string
  chapterList?: ChapterData[]
  chapterData?: ChapterData
}

type ReadingMode = "vertical" | "horizontal" | "single"
type ZoomLevel = "fit-width" | "fit-height" | "actual"

export function ChapterReader({ 
  pageUrls, 
  mangaId, 
  chapterId,
  chapterList = [],
  chapterData
}: ChapterReaderProps) {
  // Core state
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})
  const [currentPage, setCurrentPage] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const [readingMode, setReadingMode] = useState<ReadingMode>("vertical")
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("fit-width")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [chapters, setChapters] = useState<ChapterData[]>(chapterList)

  // Refs
  const readerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  // Load chapters if not provided and deduplicate them
  useEffect(() => {
    if (chapterList.length === 0) {
      const fetchChapters = async () => {
        try {
          const response = await MangaDexAPI.getAllChaptersByMangaId(mangaId)
          // Deduplicate chapters by ID and keeping the latest version
          const uniqueChapters = response.reduce((acc, current) => {
            const existingChapter = acc.find(ch => ch.id === current.id)
            if (!existingChapter || (existingChapter && new Date(current.attributes.updatedAt) > new Date(existingChapter.attributes.updatedAt))) {
              const filteredAcc = acc.filter(ch => ch.id !== current.id)
              return [...filteredAcc, current]
            }
            return acc
          }, [] as ChapterData[])
          
          // Sort by chapter number in descending order
          const sortedChapters = uniqueChapters.sort((a, b) => {
            const chapterA = parseFloat(a.attributes.chapter || "0")
            const chapterB = parseFloat(b.attributes.chapter || "0")
            return chapterB - chapterA
          })
          
          setChapters(sortedChapters)
        } catch (error) {
          console.error("Failed to fetch chapters:", error)
        }
      }
      fetchChapters()
    } else {
      // If chapterList is provided, ensure it's unique and sorted
      const uniqueChapters = chapterList.reduce((acc, current) => {
        const existingChapter = acc.find(ch => ch.id === current.id)
        if (!existingChapter || (existingChapter && new Date(current.attributes.updatedAt) > new Date(existingChapter.attributes.updatedAt))) {
          const filteredAcc = acc.filter(ch => ch.id !== current.id)
          return [...filteredAcc, current]
        }
        return acc
      }, [] as ChapterData[])

      const sortedChapters = uniqueChapters.sort((a, b) => {
        const chapterA = parseFloat(a.attributes.chapter || "0")
        const chapterB = parseFloat(b.attributes.chapter || "0")
        return chapterB - chapterA
      })

      setChapters(sortedChapters)
    }
  }, [chapterList, mangaId])

  // Fullscreen handling
  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      await document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Hide controls after a few seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout
    
    const resetTimeout = () => {
      clearTimeout(timeout)
      setShowControls(true)
      
      timeout = setTimeout(() => {
        if (!showSidebar) {
          setShowControls(false)
        }
      }, 3000)
    }
    
    // Set initial timeout
    resetTimeout()
    
    // Reset timeout on mouse movement
    const handleMouseMove = () => resetTimeout()
    document.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      clearTimeout(timeout)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [showSidebar])
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case "ArrowLeft":
        case "a":
          if (readingMode !== "vertical") {
            if (currentPage > 0) setCurrentPage(prev => prev - 1)
          }
          break
        case "ArrowRight":
        case "d":
          if (readingMode !== "vertical") {
            if (currentPage < pageUrls.length - 1) setCurrentPage(prev => prev + 1)
          }
          break
        case "ArrowUp":
        case "w":
          if (readingMode === "vertical") {
            readerRef.current?.scrollBy(0, -100)
          } else {
            if (currentPage > 0) setCurrentPage(prev => prev - 1)
          }
          break
        case "ArrowDown":
        case "s":
          if (readingMode === "vertical") {
            readerRef.current?.scrollBy(0, 100)
          } else {
            if (currentPage < pageUrls.length - 1) setCurrentPage(prev => prev + 1)
          }
          break
        case "f":
          toggleFullscreen()
          break
        case "m":
          setShowSidebar(prev => !prev)
          break
        case "1":
          setReadingMode("vertical")
          break
        case "2":
          setReadingMode("horizontal")
          break
        case "3":
          setReadingMode("single")
          break
        case "=":
        case "+":
          if (zoomLevel === "fit-width") setZoomLevel("actual")
          else if (zoomLevel === "fit-height") setZoomLevel("fit-width")
          break
        case "-":
          if (zoomLevel === "actual") setZoomLevel("fit-width")
          else if (zoomLevel === "fit-width") setZoomLevel("fit-height")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, pageUrls.length, readingMode, toggleFullscreen, zoomLevel])
    // Track which page is currently visible
  useEffect(() => {
    if (!readerRef.current || readingMode !== "vertical") return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const pageIndex = parseInt(entry.target.getAttribute("data-page") || "0")
            setCurrentPage(pageIndex)
          }
        })
      },
      {
        root: null,
        rootMargin: "-20% 0px",
        threshold: [0.25, 0.5, 0.75]
      }
    )
    
    const pages = readerRef.current.querySelectorAll(".manga-page")
    pages.forEach(page => observer.observe(page))
    
    return () => observer.disconnect()
  }, [readingMode])
  
  // Handle image load
  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }))
  }
  
  // Focus on the visible page when switching modes
  useEffect(() => {
    if (readingMode === "single") {
      const page = document.getElementById(`page-${currentPage}`)
      if (page) {
        page.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [readingMode, currentPage])
  
  // Calculate loading progress
  const loadingProgress = Object.values(loadedImages).filter(Boolean).length / pageUrls.length * 100
    return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-background border-r z-50 transform transition-transform",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Chapter Navigator</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Reading Mode */}
            <div>
              <h3 className="text-sm font-medium mb-2">Reading Mode</h3>
              <div className="flex gap-2">
                <Button
                  variant={readingMode === "vertical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReadingMode("vertical")}
                >
                  <ScrollText className="h-4 w-4 mr-1" />
                  Vertical
                </Button>
                <Button
                  variant={readingMode === "horizontal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReadingMode("horizontal")}
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Horizontal
                </Button>
                <Button
                  variant={readingMode === "single" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReadingMode("single")}
                >
                  <MonitorUp className="h-4 w-4 mr-1" />
                  Single
                </Button>
              </div>
            </div>

            {/* Zoom Control */}
            <div>
              <h3 className="text-sm font-medium mb-2">Zoom Level</h3>
              <div className="flex gap-2">
                <Button
                  variant={zoomLevel === "actual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setZoomLevel("actual")}
                >
                  Actual
                </Button>
                <Button
                  variant={zoomLevel === "fit-width" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setZoomLevel("fit-width")}
                >
                  Fit Width
                </Button>
                <Button
                  variant={zoomLevel === "fit-height" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setZoomLevel("fit-height")}
                >
                  Fit Height
                </Button>
              </div>
            </div>

            {/* Chapter List */}
            <div className="flex-1 overflow-y-auto mt-4">
              <h3 className="text-sm font-medium mb-2">Chapters</h3>
              <div className="space-y-1">
                {chapters.map((chapter) => (
                  <Button
                    key={chapter.id}
                    variant={chapter.id === chapterId ? "default" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => router.push(`/manga/${mangaId}/chapter/${chapter.id}`)}
                  >
                    Chapter {chapter.attributes.chapter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Reader Controls */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 h-16 bg-background/70 backdrop-blur-md transition-opacity z-40 border-b",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setShowSidebar(true)} className="rounded-full hover:bg-primary/10">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold">
                {chapterData
                  ? `Chapter ${chapterData.attributes.chapter}${chapterData.attributes.title ? `: ${chapterData.attributes.title}` : ""}`
                  : `Chapter ID: ${chapterId}`}
              </span>
              <span className="text-xs text-muted-foreground">
                Page {currentPage + 1} of {pageUrls.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="rounded-full hover:bg-primary/10">
              {isFullscreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-800/30 z-20">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ 
            width: `${(currentPage / (pageUrls.length - 1)) * 100}%`,
            boxShadow: '0 0 8px rgba(var(--primary)/0.3)'
          }}
        />
      </div>

      {/* Reader Content */}
      <div
        ref={readerRef}
        className={cn(
          "flex-1 overflow-auto pt-14",
          readingMode === "vertical" ? "scroll-smooth" : "scroll-auto"
        )}
      >
        <div
          className={cn(
            "mx-auto",
            readingMode === "vertical" && "space-y-4",
            readingMode === "horizontal" && "flex",
            readingMode === "single" && "flex justify-center items-start"
          )}
        >
          {readingMode === "single" ? (
            <div className="relative max-w-full p-4">
              {!loadedImages[currentPage] && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                  <LoadingSpinner variant="bankai" />
                </div>
              )}
              <Image
                id={`page-${currentPage}`}
                src={pageUrls[currentPage]}
                alt={`Page ${currentPage + 1}`}
                width={800}
                height={1200}
                className={cn(
                  "max-w-full h-auto",
                  zoomLevel === "fit-width" && "w-full",
                  zoomLevel === "fit-height" && "h-[calc(100vh-3.5rem)]",
                  !loadedImages[currentPage] && "opacity-0"
                )}
                onLoad={() => handleImageLoad(currentPage)}
                priority
              />
            </div>          ) : (
            pageUrls.map((url, index) => (
              <div
                key={`page-${index}-${url}`}
                id={`page-${index}`}
                className={cn(
                  "manga-page relative",
                  readingMode === "vertical" && "flex justify-center p-4",
                  readingMode === "horizontal" && "flex-shrink-0 p-4"
                )}
                data-page={index}
              >
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                    <LoadingSpinner variant="bankai" />
                  </div>
                )}
                <Image
                  src={url}
                  alt={`Page ${index + 1}`}
                  width={800}
                  height={1200}
                  className={cn(
                    "max-w-full h-auto",
                    zoomLevel === "fit-width" && "w-full",
                    zoomLevel === "fit-height" && "h-[calc(100vh-3.5rem)]",
                    !loadedImages[index] && "opacity-0"
                  )}
                  onLoad={() => handleImageLoad(index)}
                  priority={index === currentPage}
                />
              </div>
            ))
          )}
        </div>        {/* End of chapter notice */}
        <div className="text-center py-12 border-t border-border mt-8 glass-effect rounded-lg mx-4 mb-8">
          <h3 className="text-xl font-bold mb-4">End of Chapter</h3>
          <div className="flex flex-wrap justify-center gap-4 px-4">
            <Button 
              onClick={() => router.push(`/manga/${mangaId}`)}
              className="transition-transform duration-300 hover:scale-105"
            >
              Back to Manga
            </Button>
            {chapters.length > 0 && (() => {
              const currentIndex = chapters.findIndex(ch => ch.id === chapterId)
              const nextChapter = chapters[currentIndex - 1] // Chapters are in reverse order
              if (nextChapter) {
                return (
                  <Button 
                    onClick={() => router.push(`/manga/${mangaId}/chapter/${nextChapter.id}`)}
                    variant="outline"
                    className="transition-transform duration-300 hover:scale-105 group"
                  >
                    Next Chapter
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                )
              }
              return null
            })()}
          </div>
        </div>
      </div>      {/* Navigation Arrows (for horizontal and single mode) */}
      {(readingMode === "single" || readingMode === "horizontal") && showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageUrls.length - 1))}
            disabled={currentPage === pageUrls.length - 1}
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </Button>
        </>
      )}      {/* Loading Progress */}
      {loadingProgress < 100 && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center p-8 rounded-xl glass-effect">
            <LoadingSpinner variant="bankai" />
            <div className="mt-6 font-medium">Loading {Math.round(loadingProgress)}%</div>
            <div className="w-64 h-2 bg-muted/50 rounded-full mt-4 overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
