'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { MangaDexAPI, MangaData } from "@/lib/api";
import { MangaCard } from "@/components/manga-card";
import { LoadingSpinner } from "@/components/ui/loading";
import { SortDropdown } from "@/components/ui/sort-dropdown";
import { MangaBanner } from "@/components/manga-banner";
import { X } from 'lucide-react';

// Import animation utilities
import "@/styles/animation-utils.css";

// MangaDex tag IDs for genres - these correspond to the genre names displayed in the UI
// These are based on MangaDex API documentation
const GENRE_TAG_IDS: Record<string, string> = {
  "Action": "391b0423-d847-456f-aff0-8b0cfc03066b",
  "Adventure": "87cc87cd-a395-47af-b27a-93258283ef6c",
  "Comedy": "4d32cc48-9f00-4cca-9b5a-a839f0764984",
  "Drama": "b9af3a63-f058-46de-a9a0-e0c13906197a",
  "Fantasy": "cdc58593-87dd-415e-bbc0-2ec27bf404cc",
  "Horror": "cdad7e68-1419-41dd-bdce-27753074a640",
  "Mystery": "07251805-a27e-4d59-b488-f0bfbec15168",
  "Romance": "423e2eae-a7a2-4a8b-ac03-a8351462d71d",
  "Sci-Fi": "256c8bd9-4904-4360-bf4f-508a76d67183",
  "Slice of Life": "e5301a23-ebd9-49dd-a0cb-2add944c7fe9"
};

export default function ExplorePage() {
  const [mangaList, setMangaList] = useState<MangaData[]>([]);
  const [featuredManga, setFeaturedManga] = useState<MangaData | null>(null);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("latestUploadedChapter"); // Sort by latest updates by default
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // Ref for the trigger element

  const MANGA_LIMIT = 20; // Number of manga to fetch per request
  
  // Available sort options
  const sortOptions = [
    { value: "latestUploadedChapter", label: "Latest Updates" },
    { value: "followedCount", label: "Popular" },
    { value: "createdAt", label: "Recently Added" },
    { value: "relevance", label: "Relevance" },
    { value: "title", label: "Title (A-Z)" }
  ];

  const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Fantasy",
    "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life"
  ];

  // Function to toggle a genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => {
      // If already selected, remove it
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } 
      // Otherwise add it
      return [...prev, genre];
    });
  };

  // Function to load featured manga for banner
  const loadFeaturedManga = useCallback(async () => {
    try {
      // Get top followed manga for featured banner
      const response = await MangaDexAPI.getAllManga(0, 1, { 
        'order[followedCount]': 'desc',
        'contentRating[]': 'safe'
      });
      
      if (response.data.length > 0) {
        setFeaturedManga(response.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch featured manga:", error);
    }
  }, []);

  // Reset the manga list and fetch with new filters when genres or sort order changes
  useEffect(() => {
    // Reset pagination and manga list
    setMangaList([]);
    setOffset(0);
    setHasMore(true);
  }, [selectedGenres, sortOrder]);

  // Function to load more manga with genre filters
  const loadMoreManga = useCallback(async () => {
    if (loading || !hasMore) return; // Prevent multiple simultaneous loads or loading when no more data

    setLoading(true);
    try {
      // Create params object with sorting
      const params: Record<string, string | string[]> = { 
        [`order[${sortOrder}]`]: sortOrder === 'title' ? 'asc' : 'desc'
      };
      
      // Add includes params as an array to handle multiple values
      params['includes[]'] = ['cover_art', 'author'];
      
      // Add content rating filters as an array
      params['contentRating[]'] = ['safe', 'suggestive', 'erotica'];
      
      // Add genre filters if any are selected
      if (selectedGenres.length > 0) {
        // Create an array for includedTags
        const includedTags: string[] = [];
        selectedGenres.forEach(genre => {
          if (GENRE_TAG_IDS[genre]) {
            includedTags.push(GENRE_TAG_IDS[genre]);
          }
        });
        params['includedTags[]'] = includedTags;
      }

      // Convert params to a format compatible with getAllManga
      const apiParams: Record<string, string> = {};
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Join array values with commas for the API to handle
          apiParams[key] = value.join(',');
        } else {
          apiParams[key] = value;
        }
      });

      const response = await MangaDexAPI.getAllManga(offset, MANGA_LIMIT, apiParams);
      const newManga = response.data;
      
      // Deduplicate manga by ID before adding to the list
      setMangaList((prevManga) => {
        // Create a Set of existing manga IDs for quick lookup
        const existingIds = new Set(prevManga.map(manga => manga.id));
        
        // Filter out any manga that already exists in the list
        const uniqueNewManga = newManga.filter(manga => !existingIds.has(manga.id));
        
        return [...prevManga, ...uniqueNewManga];
      });
      
      setOffset((prevOffset) => prevOffset + newManga.length);
      setHasMore(newManga.length === MANGA_LIMIT); // Check if there might be more data

    } catch (error) {
      console.error("Failed to fetch more manga:", error);
      // Optionally set an error state here
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, selectedGenres, sortOrder, MANGA_LIMIT]);  // Effect for initial load
  useEffect(() => {
    // Load featured manga once
    loadFeaturedManga();
    
    // Fetch initial manga data only if mangaList is empty
    if (mangaList.length === 0) {
      loadMoreManga();
    }
  }, [loadMoreManga, mangaList.length, loadFeaturedManga]); // Depend on loadMoreManga and list length


  // Effect for setting up the Intersection Observer
  useEffect(() => {
    if (loading) return; // Don't observe while loading

    // Disconnect previous observer if it exists
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreManga();
      }
    });

    // Observe the ref element if it exists
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    // Cleanup function to disconnect observer
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, hasMore, loadMoreManga]); // Re-run when loading state, hasMore, or loadMoreManga changes

  return (
    <div className="container px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fadeIn text-shadow-md dark:text-shadow-glow">Explore Manga</h1>
        <p className="text-muted-foreground max-w-xl animate-fadeInUp relative inline-block">
          <span className="relative z-10">Discover titles from around the world and expand your manga collection</span>
          <span className="absolute inset-0 bg-gradient-shine bg-size-200% animate-shine opacity-30 z-0"></span>
        </p>
      </div>

      {/* Featured manga banner */}
      {featuredManga && (
        <div className="mb-8 animate-fadeInDown relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-noise-pattern opacity-20 mix-blend-overlay pointer-events-none z-10"></div>
          <MangaBanner manga={featuredManga} />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent animate-shimmerEffect"></div>
        </div>
      )}

      {/* Section to display filtered manga */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 animate-fadeIn delay-200">
          <h2 className="text-2xl font-bold flex items-center gap-2 animate-slideIn delay-300 text-shadow-sm">
            Explore Manga
            <span className="text-sm font-normal text-muted-foreground transition-all duration-300">
              {selectedGenres.length > 0 && (
                <span className="animate-fadeInUp bg-primary/10 px-2 py-0.5 rounded-md text-primary">
                  ({selectedGenres.join(', ')})
                </span>
              )}
            </span>
          </h2>
          
          <div className="flex items-center gap-3 bg-muted/10 py-1.5 px-3 rounded-lg border border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-md animate-slideInRight delay-400 hover:bg-gradient-shine hover:bg-size-200% hover:animate-shine relative overflow-hidden">
            <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">Sort by:</span>
            <SortDropdown
              options={sortOptions}
              value={sortOrder}
              onChange={(value) => {
                console.log(`Changing sort order to: ${value}`);
                setSortOrder(value);
              }}
              className="w-48"
            />
            <div className="hidden md:block text-sm font-medium">
              {mangaList.length > 0 && (
                <span className="bg-primary/10 text-primary py-0.5 px-2 rounded-md animate-scaleIn">
                  {mangaList.length} titles
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Genre selection */}
        <div className="mb-6 overflow-x-auto pb-2 animate-fadeInUp bg-dot-pattern bg-size-16 p-3 rounded-lg">
          <div className="flex gap-2 min-w-max">
            {genres.map((genre, index) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 animate-fadeIn delay-${Math.min(index * 100, 1000)} ${selectedGenres.includes(genre) 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground hover:shadow-sm'}`}
              >
                {genre}
                {selectedGenres.includes(genre) && (
                  <span className="ml-1 inline-flex items-center justify-center">
                    <X className="h-3 w-3 animate-scaleIn" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        
        {loading && mangaList.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-12 animate-fadeIn">
            <LoadingSpinner variant="chakra" />
            <span className="mt-4 animate-fadeInUp delay-300">Loading manga...</span>
          </div>
        ) : mangaList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 transition-all animate-pageLoad">
            {mangaList.map((manga, index) => {
              // Ensure we have a valid key by combining id and index as fallback
              const key = manga.id ? `manga-${manga.id}-${index}` : `manga-index-${index}`;
              return (
                <div 
                  key={key}
                  className={`animate-fadeIn transform transition-all hover:scale-105 hover:-translate-y-1 duration-300 delay-${Math.min(index * 100, 500)} [animation-fill-mode:backwards]`}
                >
                  <MangaCard 
                    manga={manga} 
                    priority={index < 10} 
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/10 rounded-lg border border-dashed animate-fadeIn relative overflow-hidden">
            <div className="absolute inset-0 bg-manga-texture opacity-20 mix-blend-overlay"></div>
            <div className="max-w-md mx-auto relative z-10">
              <h3 className="text-xl font-semibold mb-2 animate-fadeInDown delay-100 text-shadow-sm">No Results Found</h3>
              <p className="text-muted-foreground mb-4 animate-fadeInDown delay-200">
                {selectedGenres.length > 0 
                  ? `No manga found with selected genres: ${selectedGenres.join(', ')}`
                  : 'No manga found or failed to load. Please try again.'}
              </p>
              {selectedGenres.length > 0 && (
                <Button 
                  onClick={() => setSelectedGenres([])}
                  variant="outline"
                  className="mt-2 animate-scaleIn delay-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Clear Filters</span>
                  <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md"></span>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Element to trigger loading more */}
        <div ref={loadMoreRef} style={{ height: "20px", margin: "1rem 0" }} />

        {/* Loading indicator for pagination */}
        {loading && mangaList.length > 0 && (
          <div className="flex flex-col justify-center items-center py-6 animate-fadeIn">
            <LoadingSpinner variant="gear" />
            <span className="mt-3 text-sm text-muted-foreground animate-fadeInUp delay-200">Discovering more titles...</span>
          </div>
        )}

        {/* End of list message */}
        {!hasMore && mangaList.length > 0 && (
          <div className="text-center text-muted-foreground py-8 border-t mt-8 animate-fadeIn bg-gradient-radial from-primary/5 to-transparent rounded-lg p-4">
            <p className="font-medium animate-fadeInUp delay-100 text-shadow-sm">You&apos;ve reached the end!</p>
            <p className="text-sm mt-1 animate-fadeInUp delay-200">Found <span className="text-primary font-medium animate-textGlow">{mangaList.length}</span> manga titles matching your criteria</p>
          </div>
        )}
      </section>
    </div>
  );
}
