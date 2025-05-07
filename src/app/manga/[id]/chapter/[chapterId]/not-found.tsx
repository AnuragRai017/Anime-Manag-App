"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { useParams } from "next/navigation";

export default function ChapterNotFound() {
  // Create a standard error object for the not found case
  const notFoundError = new Error("Chapter not found");
  const params = useParams();
  const mangaId = params?.id;
  
  return (
    <ErrorBoundary 
      error={notFoundError} 
      reset={() => window.location.href = "/"}
      title="Chapter Not Found"
      description="Sorry, we couldn't find the chapter you're looking for. It might have been removed or doesn't exist."
      backLink={mangaId ? `/manga/${mangaId}` : undefined}
      backLinkText="Back to manga"
    />
  );
}
