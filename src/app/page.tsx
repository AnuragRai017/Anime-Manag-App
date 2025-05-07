import { MangaDexAPI } from "@/lib/api";
import { MangaCard } from "@/components/manga-card";
import { Button } from "@/components/ui/button";
import { BannerCarousel } from "@/components/banner-carousel";
import { MangaSection } from "@/components/manga-section";
import { MangaLogoOverlay } from "@/components/manga-logo-overlay";
import { MostViewed } from "@/components/most-viewed";
import { Footer } from "@/components/footer";
import { NotificationBanner } from "@/components/notification-banner";

export const revalidate = 3600; // Revalidate once per hour

async function getMangaData() {
  try {
    const popularManga = await MangaDexAPI.getMangaList(0, 8);
    const latestManga = await MangaDexAPI.getMangaList(0, 12);
    const trendingManga = await MangaDexAPI.getAllManga(0, 6, { 'order[followedCount]': 'desc' });
    
    // Get most viewed manga for different time periods
    const mostViewedDay = await MangaDexAPI.getAllManga(0, 10, { 'order[followedCount]': 'desc' });
    const mostViewedWeek = await MangaDexAPI.getAllManga(0, 10, { 'order[rating]': 'desc' });
    const mostViewedMonth = await MangaDexAPI.getAllManga(0, 10, { 'order[relevance]': 'desc' });
    
    return {
      popular: popularManga.data.slice(0, 8),
      latest: latestManga.data.slice(0, 12),
      trending: trendingManga.data.slice(0, 5),
      mostViewedDay: mostViewedDay.data.slice(0, 10),
      mostViewedWeek: mostViewedWeek.data.slice(0, 10),
      mostViewedMonth: mostViewedMonth.data.slice(0, 10),
    };
  } catch (error) {
    console.error("Failed to fetch manga data:", error);
    return { 
      popular: [], 
      latest: [], 
      trending: [],
      mostViewedDay: [],
      mostViewedWeek: [],
      mostViewedMonth: []
    };
  }
}

export default async function Home() {
  const { popular, latest, trending, mostViewedDay, mostViewedWeek, mostViewedMonth } = await getMangaData();

  return (
    <>
      {/* Notification Banner */}
      <NotificationBanner 
        message="Welcome to MangaVerse! Discover your next favorite manga series." 
        type="info"
        dismissible={true}
      />
      
      <div className="container px-4 py-6 space-y-12 max-w-7xl mx-auto">
      {/* Main Banner with Logo Overlay */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
        {/* Visual edge connector - creates a seamless transition between the overlay and banner */}
        <div className="absolute top-[calc(4rem-1px)] md:top-[calc(6rem-1px)] inset-x-0 h-8 z-30 bg-gradient-to-b from-black/90 to-transparent"></div>
        
        <div className="absolute top-0 inset-x-0 z-20 w-full">
          <MangaLogoOverlay variant="large" />
        </div>
        <BannerCarousel 
          items={trending} 
          variant="large"
          className="pt-16 md:pt-20" 
        />
      </div>
      
      {/* Most Viewed Section - Moved to appear right after the banner */}
      <MostViewed 
        dayData={mostViewedDay}
        weekData={mostViewedWeek}
        monthData={mostViewedMonth}
        className="mt-6"
      />

      {/* Popular Manga Section */}
      <MangaSection 
        title="Popular Manga" 
        description="Trending titles our readers love"
        viewAllLink="/explore"
        accentColor="#8b5cf6" // Purple
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {popular.length > 0 ? (
            popular.map((manga, index) => (
              <div 
                key={manga.id} 
                className="transform transition-all hover:scale-105 hover:-translate-y-1 duration-300" 
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'backwards'
                }}
              >
                <MangaCard manga={manga} priority={index < 6} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center glass-effect rounded-lg col-span-full">
              <p className="text-muted-foreground">Failed to load popular manga.</p>
              <Button variant="outline" className="mt-4 animate-pulse-glow">Retry</Button>
            </div>
          )}
        </div>
      </MangaSection>

      {/* Latest Updates Section */}
      <MangaSection 
        title="Latest Updates" 
        description="Fresh content just added"
        viewAllLink="/explore"
        accentColor="#10b981" // Green
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {latest.length > 0 ? (
            latest.map((manga, index) => (
              <div 
                key={manga.id} 
                className="h-full transform transition-all hover:scale-105 hover:-translate-y-1 duration-300 animate-fadeIn"
                style={{ 
                  animationDelay: `${(index * 0.08) + 0.3}s`,
                  animationFillMode: 'backwards'
                }}
              >
                <MangaCard manga={manga} />
              </div>
            ))
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 col-span-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg bg-muted/5 p-2 border border-muted/10">
                  <div className="aspect-[2/3] rounded-lg bg-gradient-to-br from-muted/40 to-muted/10 animate-pulse shadow-sm" />
                  <div className="h-4 w-3/4 rounded bg-muted/30 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-muted/20 animate-pulse" />
                  <div className="flex justify-between items-center mt-2">
                    <div className="h-2 w-1/4 rounded-full bg-primary/20 animate-pulse"></div>
                    <div className="h-2 w-1/3 rounded-full bg-muted/20 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </MangaSection>
      
      {/* Most Viewed Section removed from here - moved to after banner */}
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
