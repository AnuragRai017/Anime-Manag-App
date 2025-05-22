'use client';

import { useState, useEffect } from 'react';
import { MangaDexAPI, MangaData } from "@/lib/api";
import { MangaCard } from "@/components/manga-card";
import { LoadingSpinner } from "@/components/ui/loading";

// MangaDex tag IDs for genres
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

export default function GenresPage() {
  const [genres, setGenres] = useState<string[]>(Object.keys(GENRE_TAG_IDS));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manga Genres</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {genres.map((genre) => (
          <a 
            key={genre}
            href={`/genres/${genre.toLowerCase()}`}
            className="bg-card hover:bg-accent p-4 rounded-lg text-center transition-all hover:scale-105 shadow-md"
          >
            <h2 className="text-xl font-semibold">{genre}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Explore {genre} manga
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
