'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { MangaDexAPI, MangaData } from "@/lib/api";
import { MangaCard } from "@/components/manga-card";
import { LoadingSpinner } from "@/components/ui/loading";

// MangaDex tag IDs for genres
const GENRE_TAG_IDS: Record<string, string> = {
  "action": "391b0423-d847-456f-aff0-8b0cfc03066b",
  "adventure": "87cc87cd-a395-47af-b27a-93258283ef6c",
  "comedy": "4d32cc48-9f00-4cca-9b5a-a839f0764984",
  "drama": "b9af3a63-f058-46de-a9a0-e0c13906197a",
  "fantasy": "cdc58593-87dd-415e-bbc0-2ec27bf404cc",
  "horror": "cdad7e68-1419-41dd-bdce-27753074a640",
  "mystery": "07251805-a27e-4d59-b488-f0bfbec15168",
  "romance": "423e2eae-a7a2-4a8b-ac03-a8351462d71d",
  "sci-fi": "256c8bd9-4904-4360-bf4f-508a76d67183",
  "slice-of-life": "e5301a23-ebd9-49dd-a0cb-2add944c7fe9"
};

// Helper function to format genre name for display
const formatGenreName = (genre: string): string => {
  return genre
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function GenrePage() {
  const params = useParams();
  const genre = params.genre as string;
  const [mangaList, setMangaList] = useState<MangaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  const MANGA_LIMIT = 20;
  const genreId = GENRE_TAG_IDS[genre];
  const formattedGenreName = formatGenreName(genre);

  // Load manga for this genre
  const loadManga = async (currentOffset: number) => {
    if (!genreId) return;
    
    try {
      setLoading(true);
      
      // Create params for the API call
      const params: Record<string, string | string[]> = {
        'order[followedCount]': 'desc',
        'contentRating[]': ['safe', 'suggestive'],
        'includedTags[]': [genreId]
      };
      
      const response = await MangaDexAPI.getAllManga(currentOffset, MANGA_LIMIT, params);
      
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setMangaList(prev => [...prev, ...response.data]);
        setOffset(currentOffset + MANGA_LIMIT);
      }
    } catch (error) {
      console.error(`Failed to fetch ${genre} manga:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadManga(0);
  }, [genre]);

  // Infinite scroll setup
  useEffect(() => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadManga(offset);
      }
    });
    
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, offset]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{formattedGenreName} Manga</h1>
      
      {loading && mangaList.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-12">
          <LoadingSpinner variant="chakra" />
          <span className="mt-4">Loading {formattedGenreName} manga...</span>
        </div>
      ) : mangaList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {mangaList.map((manga, index) => (
            <div 
              key={`${manga.id}-${index}`}
              className="animate-fadeIn transition-all hover:scale-105 duration-300"
            >
              <MangaCard manga={manga} priority={index < 10} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/10 rounded-lg border border-dashed">
          <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
          <p className="text-muted-foreground mb-4">
            No manga found for the {formattedGenreName} genre.
          </p>
        </div>
      )}
      
      {/* Element to trigger loading more */}
      <div ref={loadMoreRef} style={{ height: "20px", margin: "1rem 0" }} />
      
      {/* Loading indicator for pagination */}
      {loading && mangaList.length > 0 && (
        <div className="flex flex-col justify-center items-center py-6">
          <LoadingSpinner variant="gear" />
          <span className="mt-3 text-sm text-muted-foreground">Loading more {formattedGenreName} manga...</span>
        </div>
      )}
      
      {/* End of list message */}
      {!hasMore && mangaList.length > 0 && (
        <div className="text-center text-muted-foreground py-8 border-t mt-8">
          <p className="font-medium">You've reached the end!</p>
          <p className="text-sm mt-1">Found <span className="text-primary font-medium">{mangaList.length}</span> {formattedGenreName} manga titles</p>
        </div>
      )}
    </div>
  );
}
