"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
  homeLink?: string;
  backLink?: string;
  homeLinkText?: string;
  backLinkText?: string;
  title?: string;
  description?: string;
}

export function ErrorBoundary({
  error,
  reset,
  homeLink = "/",
  backLink,
  homeLinkText = "Go home",
  backLinkText = "Go back",
  title,
  description,
}: ErrorBoundaryProps) {
  const { getThemeConfig } = useTheme();
  const theme = getThemeConfig();
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
    
    // Extract a clean error message for display
    let message = "An unexpected error occurred";
    if (error.message) {
      // Remove any implementation details that shouldn't be shown to users
      message = error.message
        .replace(/Error: /g, "")
        .replace(/\d{3} - /g, "")
        .replace(/file:\/\/.*\//, "")
        .replace(/at .* \(.*\)/, "");
        
      // Limit length
      if (message.length > 150) {
        message = message.substring(0, 150) + "...";
      }
    }
    
    setErrorMessage(message);
  }, [error]);

  // Determine best title and description based on error type
  const errorTitle = title || 
    (error.message?.includes("not found") || error.message?.includes("404")) 
      ? "Not Found" 
      : "Something Went Wrong";
      
  const errorDescription = description || 
    (error.message?.includes("not found") || error.message?.includes("404"))
      ? "The resource you're looking for couldn't be found. It may have been removed or doesn't exist."
      : `We encountered a problem while processing your request. ${errorMessage}`;

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
      <div 
        className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center p-8 rounded-lg border"
        style={{ borderColor: theme.accent.primary }}
      >
        <div 
          className="w-16 h-16 mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${theme.accent.primary}20` }}
        >
          <span className="text-3xl" style={{ color: theme.accent.primary }}>!</span>
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight mb-4" style={{ color: theme.accent.primary }}>
          {errorTitle}
        </h2>
        
        <p className="mb-8 text-muted-foreground">
          {errorDescription}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button 
            onClick={() => reset()} 
            className="w-full"
            style={{ backgroundColor: theme.accent.primary }}
          >
            Try again
          </Button>
          
          {backLink && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = backLink} 
              className="w-full"
              style={{ borderColor: theme.accent.primary, color: theme.accent.primary }}
            >
              {backLinkText}
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = homeLink} 
            className="w-full"
          >
            {homeLinkText}
          </Button>
        </div>
      </div>
    </div>
  );
}
