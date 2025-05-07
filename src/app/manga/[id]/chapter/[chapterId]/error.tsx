"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { useParams } from "next/navigation"

export default function ChapterError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams();
  const mangaId = params?.id;
  
  return (
    <ErrorBoundary 
      error={error} 
      reset={reset}
      title="Chapter Not Available"
      description="We couldn't load this chapter. It might be unavailable or there could be a temporary issue with our servers."
      backLink={mangaId ? `/manga/${mangaId}` : undefined}
      backLinkText="Back to manga"
    />
  )
}
