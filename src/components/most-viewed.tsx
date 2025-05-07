"use client";

import { useState } from "react";
import { MangaData } from "@/lib/api";
import { MangaCard } from "@/components/manga-card";
import { cn } from "@/lib/utils";

type TimeRange = "day" | "week" | "month";

interface MostViewedProps {
  dayData: MangaData[];
  weekData: MangaData[];
  monthData: MangaData[];
  className?: string;
}

export function MostViewed({ dayData, weekData, monthData, className }: MostViewedProps) {
  const [activeTab, setActiveTab] = useState<TimeRange>("day");

  // Determine which data to show based on active tab
  const activeData = 
    activeTab === "day" ? dayData : 
    activeTab === "week" ? weekData : 
    monthData;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold">Most Viewed</h2>
        
        <div className="flex space-x-2 bg-muted/20 rounded-full p-1">
          {(["day", "week", "month"] as TimeRange[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1 text-sm font-medium rounded-full transition-all duration-200",
                activeTab === tab 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-foreground/70 hover:text-foreground hover:bg-muted/30"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3 md:gap-4">
        {activeData.length > 0 ? (
          activeData.map((manga, index) => (
            <div 
              key={manga.id} 
              className="relative transform transition-all hover:scale-105 hover:-translate-y-1 duration-300"
            >
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10">
                {index + 1}
              </div>
              <MangaCard manga={manga} compact={true} />
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center py-8">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
