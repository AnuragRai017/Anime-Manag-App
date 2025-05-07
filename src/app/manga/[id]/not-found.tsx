"use client";

import { ErrorBoundary } from "@/components/error-boundary";

export default function MangaNotFound() {
  // Create a standard error object for the not found case
  const notFoundError = new Error("Manga not found");
  
  return (
    <ErrorBoundary 
      error={notFoundError} 
      reset={() => window.location.href = "/"}
      title="Manga Not Found"
      description="Sorry, we couldn't find the manga you're looking for. It might have been removed or doesn't exist."
    />
  );
}
