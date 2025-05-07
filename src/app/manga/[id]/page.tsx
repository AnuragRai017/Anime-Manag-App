import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChapterList } from "@/components/chapter-list";
import { MangaDexAPI, getCoverImage, getMangaTitle } from "@/lib/api";
import { Metadata } from "next";

export const revalidate = 3600; // Revalidate once per hour

// Helper function to get manga description with proper language fallback
const getLocalizedDescription = (manga: { attributes: { description: Record<string, string> } }): string => {
  const languagePriority = ['en', 'ja-ro', 'ja', 'ko-ro', 'ko', 'zh-hk', 'zh'];
  
  // Check for descriptions in order of language priority
  for (const lang of languagePriority) {
    if (manga.attributes.description[lang]) {
      return manga.attributes.description[lang];
    }
  }
  
  // If no priority language description found, get first available
  const descriptions = Object.entries(manga.attributes.description);
  if (descriptions.length > 0) {
    return descriptions[0][1]; // Return the description value
  }
  
  return 'No description available.';
};

// Helper function to get formatted genres with proper language handling
const getFormattedGenres = (manga: { 
  attributes: { 
    tags: Array<{ 
      attributes: { 
        group: string; 
        name: Record<string, string>; 
      } 
    }> 
  } 
}): string => {
  const genreTags = manga.attributes.tags
    .filter(tag => tag.attributes.group === "genre")
    .map(tag => {
      // Try to get English tag name first
      if (tag.attributes.name.en) {
        return tag.attributes.name.en;
      }
      
      // If English not available, try other languages in priority order
      const languagePriority = ['ja-ro', 'ja', 'ko-ro', 'ko', 'zh-hk', 'zh'];
      for (const lang of languagePriority) {
        if (tag.attributes.name[lang]) {
          return tag.attributes.name[lang];
        }
      }
      
      // Last resort: take the first available language
      const names = Object.values(tag.attributes.name);
      return names.length > 0 ? names[0] : "Unknown";
    })
    .join(", ");
    
  return genreTags || "N/A";
};

// Generate metadata for the page
// Update the function signature to accept params as a Promise
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  // Await the params promise to get the actual id
  const { id } = await params;
  
  // Skip fetching if the ID looks like a file path (contains a file extension)
  if (id.includes('.')) {
    return {
      title: "Manga Details | Manga Reader",
      description: "Read manga online for free",
    };
  }
    try {
    const { data: manga } = await MangaDexAPI.getMangaById(id);
    const description = getLocalizedDescription(manga);
    return {
      title: `${getMangaTitle(manga)} | Manga Reader`,
      description: description || "Read manga online for free",
      // Add OpenGraph metadata for better social sharing
      openGraph: {
        title: getMangaTitle(manga),
        description: description.substring(0, 160) || "Read manga online for free",
        images: [getCoverImage(manga)]
      }
    };
  } catch {
    return {
      title: "Manga Details | Manga Reader",
      description: "Read manga online for free",
    };
  }
}

async function getMangaDetails(id: string) {
  // Skip fetching if the ID looks like a file path (contains a file extension)
  if (id.includes('.')) {
    throw new Error("Invalid manga ID");
  }
  
  try {
    const manga = await MangaDexAPI.getMangaById(id);
    const chapters = await MangaDexAPI.getAllChaptersByMangaId(id);
    return { manga: manga.data, chapters: chapters };
  } catch (error) {
    console.error(`Failed to fetch manga with ID ${id}:`, error);
    throw new Error("Failed to load manga details");
  }
}

// Update the function signature to accept params as a Promise
export default async function MangaPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params promise to get the actual id
  const { id } = await params;
  
  // If the ID looks like a file path, show an error page
  if (id.includes('.')) {
    return (
      <div className="container px-4 py-10 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Manga ID</h1>
        <p className="mb-6">The requested manga ID is not valid.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
    try {
    const { manga, chapters } = await getMangaDetails(id);
    const coverUrl = getCoverImage(manga);
    const title = getMangaTitle(manga);
      // Get author and artist names with proper handling of special characters
    const authorRel = manga.relationships.find(rel => rel.type === "author");
    const authorName = authorRel?.attributes?.name || "Unknown Author";
    
    const artistRel = manga.relationships.find(rel => rel.type === "artist");
    const artistName = artistRel?.attributes?.name || "Unknown Artist";
    
    // Format genres with better language handling
    const genres = getFormattedGenres(manga);
    
    // Get status with capitalization
    const status = manga.attributes.status.charAt(0).toUpperCase() + manga.attributes.status.slice(1);
      // Get localized description using our helper function
    const description = getLocalizedDescription(manga);

  return (
    <div className="container py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg border shadow-md">
            <Image 
              src={coverUrl} 
              alt={title} 
              fill 
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover" 
              priority
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          
          {/* Display alternative titles if available */}
          {manga.attributes.altTitles && manga.attributes.altTitles.length > 0 && (
            <div className="mb-3">
              {manga.attributes.altTitles.slice(0, 2).map((altTitle: Record<string, string>, index: number) => {
                const langKey = Object.keys(altTitle)[0];
                return langKey ? (
                  <p key={index} className="text-sm text-muted-foreground italic">
                    {altTitle[langKey]}
                  </p>
                ) : null;
              })}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
              {status}
            </span>
            {manga.attributes.contentRating && (
              <span className="px-2 py-1 bg-muted rounded-md text-sm">
                {manga.attributes.contentRating.toUpperCase()}
              </span>
            )}
          </div>
            <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Author: {authorName}</p>
            <p className="text-sm text-muted-foreground mb-1">Artist: {artistName}</p>
            <p className="text-sm text-muted-foreground mb-1">Genres: {genres}</p>
            {manga.attributes.originalLanguage && (
              <p className="text-sm text-muted-foreground mb-1">
                Original Language: {manga.attributes.originalLanguage.toUpperCase()}
              </p>
            )}
            {manga.attributes.year && (
              <p className="text-sm text-muted-foreground mb-1">Year: {manga.attributes.year}</p>
            )}
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Synopsis</h3>
            <div className="text-sm text-muted-foreground">{description}</div>
          </div>
          
          <div className="flex gap-2">
            {chapters.length > 0 && (
              <Button asChild>
                <a href={`/manga/${manga.id}/chapter/${chapters[0].id}`}>
                  Read First Chapter
                </a>
              </Button>
            )}
            {chapters.length > 1 && (
              <Button asChild variant="outline">
                <a href={`/manga/${manga.id}/chapter/${chapters[chapters.length - 1].id}`}>
                  Read Latest Chapter
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Chapters</h2>
        <ChapterList chapters={chapters} mangaId={manga.id} />
      </div>
    </div>
  );
  } // <-- Add this closing brace for the try block
  catch (error) {
    return (
      <div className="container px-4 py-10 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Failed to Load Manga</h1>
        <p className="mb-6">{(error as Error).message}</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
}
