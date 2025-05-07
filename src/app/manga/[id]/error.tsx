"use client"

import { ErrorBoundary } from "@/components/error-boundary"

export default function MangaError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorBoundary 
      error={error} 
      reset={reset}
      title="Manga Not Available"
      description="We couldn't load this manga. It might be unavailable or there could be a temporary issue with our servers."
    />
  )
}
