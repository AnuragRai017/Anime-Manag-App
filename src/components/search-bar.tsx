"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MangaData, getCoverImage, getMangaTitle } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading"

// Define useDebounce hook directly inside the component
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  
  return debouncedValue
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<MangaData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  
  const debouncedQuery = useDebounce(query, 500)
  
  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  // Search for manga when query changes
  useEffect(() => {
    async function searchManga() {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([])
        setIsLoading(false)
        return
      }
      
      setIsLoading(true)
      
      try {
        // We're using the same endpoint as getMangaList but with title filter
        const response = await fetch(
          `https://api.mangadex.org/manga?limit=5&title=${encodeURIComponent(debouncedQuery)}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const data = await response.json()
        setResults(data.data || [])
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }
    
    searchManga()
  }, [debouncedQuery])
  
  const handleResultClick = (mangaId: string) => {
    router.push(`/manga/${mangaId}`)
    setIsOpen(false)
    setQuery("")
  }
  
  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search manga..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-0"
            onClick={() => {
              setQuery("")
              setResults([])
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>
      
      {/* Search results dropdown */}
      {isOpen && (query || isLoading) && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-popover shadow-md z-50">
          {isLoading ? (
            <div className="p-4 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((manga) => (
                <button
                  key={manga.id}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-muted"
                  onClick={() => handleResultClick(manga.id)}
                >
                  <div className="relative h-12 w-8 flex-shrink-0">
                    <Image
                      src={getCoverImage(manga)}
                      alt={getMangaTitle(manga)}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{getMangaTitle(manga)}</p>
                    <p className="text-xs text-muted-foreground">
                      {manga.attributes.year ? manga.attributes.year : "Unknown year"}
                    </p>
                  </div>
                </button>
              ))}
              <div className="px-4 py-2 border-t">
                <Button 
                  variant="link" 
                  className="w-full justify-center text-xs"
                  onClick={() => {
                    router.push(`/explore?query=${encodeURIComponent(query)}`)
                    setIsOpen(false)
                  }}                >
                  See all results for &ldquo;{query}&rdquo;
                </Button>
              </div>
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No manga found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search
            </div>
          )}
        </div>
      )}
    </div>
  )
}
