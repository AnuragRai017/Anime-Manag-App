import { MangaDexAPI, getChapterPageUrls } from "@/lib/api";
import { ChapterReader } from "@/components/chapter-reader";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const revalidate = 0; // Don't cache chapter pages

async function getChapterData(chapterId: string) {
  // Skip fetching if the ID looks like a file path
  if (chapterId.includes('.')) {
    throw new Error("Invalid chapter ID");
  }
  
  let retries = 3;
  while (retries > 0) {
    try {
      const chapterPages = await MangaDexAPI.getChapterPages(chapterId);
      return chapterPages;
    } catch (error) {
      retries--;
      if (retries === 0) {
        console.error(`Failed to fetch chapter with ID ${chapterId} after 3 attempts:`, error);
        throw new Error("Failed to load chapter - please try again later");
      }
      console.warn(`Retry ${3 - retries}/3 for chapter ${chapterId}`);
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, 3 - retries)));
    }
  }
  throw new Error("Failed to load chapter");
}

export default async function ChapterPage({ params }: { params: Promise<{ id: string; chapterId: string }> }) {
  const { id, chapterId } = await params;
  
  // Check if either ID is a file path
  if (id.includes('.') || chapterId.includes('.')) {
    return (
      <div className="container px-4 py-10 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid Resource Request</h1>
        <p className="mb-6">The requested manga or chapter ID is not valid.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  try {
    // Get both chapter details and pages data
    const [chapterDetails, chapterPagesData] = await Promise.all([
      MangaDexAPI.getChapter(chapterId),
      getChapterData(chapterId)
    ]);
    
    // Generate the URLs for the chapter pages
    const pageUrls = getChapterPageUrls(
      chapterPagesData.baseUrl,
      chapterPagesData.chapter.hash,
      chapterPagesData.chapter.data,
      false // use high quality images
    );

    return (
      <div className="relative">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
          <div className="container flex items-center justify-between h-14">
            <Link href={`/manga/${id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Manga
              </Button>
            </Link>
            <div className="text-sm font-medium">
              {chapterDetails.attributes.volume && `Vol. ${chapterDetails.attributes.volume} `}
              Chapter {chapterDetails.attributes.chapter || 'N/A'}
              {chapterDetails.attributes.title && `: ${chapterDetails.attributes.title}`}
            </div>
        </div>
      </div>
      
      <div className="pt-14">
        <ChapterReader 
          pageUrls={pageUrls} 
          mangaId={id} 
          chapterId={chapterId}
          chapterData={chapterDetails}
        />
      </div>
    </div>
    );
  } catch (error) {
    return (
      <div className="container px-4 py-10 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Failed to Load Chapter</h1>
        <p className="mb-6">{(error as Error).message}</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
}
