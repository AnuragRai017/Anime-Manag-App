// Anime-themed loading spinners
export function LoadingSpinner({ 
  variant = "default" 
}: { 
  variant?: "default" | "chakra" | "bankai" | "gear" | "domain" | "hunter" | "dragon" | "slice"
}) {
  if (variant === "chakra") {
    return (
      <div className="flex justify-center items-center">
        <div className="relative w-12 h-12 animate-float">
          {/* Outer ring - represents chakra flow */}
          <div className="absolute inset-0 border-4 border-primary rounded-full animate-[spin_3s_linear_infinite] bg-gradient-radial from-primary/10 to-transparent" />
          {/* Inner spiral - represents Naruto's Rasengan */}
          <div className="absolute inset-2 border-4 border-primary/60 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
          {/* Center dot - represents chakra core */}
          <div className="absolute inset-4 bg-primary rounded-full animate-pulse shadow-lg animate-borderGlow" />
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-primary/10 rounded-full animate-pulse opacity-50 blur-md"></div>
        </div>
      </div>
    );
  }

  if (variant === "bankai") {
    return (
      <div className="flex justify-center items-center">
        <div className="relative w-12 h-12 animate-zoomPulse">
          {/* Represents Bleach's spiritual pressure */}
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
          {/* Zanpakuto pattern */}
          <div className="absolute inset-0 border-t-4 border-r-4 border-primary rounded-full animate-[spin_1s_linear_infinite]" />
          <div className="absolute inset-2 border-l-4 border-b-4 border-primary/60 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
          {/* Energy effect */}
          <div className="absolute -inset-4 bg-gradient-radial from-primary/20 to-transparent rounded-full animate-pulse opacity-70 blur-lg"></div>
          {/* Spiritual pressure particles */}
          <div className="absolute inset-0 bg-dot-pattern bg-size-16 mix-blend-overlay opacity-50"></div>
        </div>
      </div>
    );
  }

  if (variant === "gear") {
    return (
      <div className="flex justify-center items-center">
        <div className="relative w-12 h-12 animate-float">
          {/* One Piece Gear pattern */}
          <div className="absolute inset-0 border-4 border-dashed border-primary rounded-full animate-[spin_2s_linear_infinite] shadow-lg" />
          {/* Luffy's straw hat silhouette */}
          <div className="absolute inset-2 bg-gradient-radial from-primary/30 to-primary/10 rounded-full animate-bounce" />
          <div className="absolute inset-3 border-4 border-primary rounded-full shadow-inner" />
          {/* Gear steam effect */}
          <div className="absolute -inset-3 bg-gradient-conic from-white/10 via-transparent to-white/10 animate-[spin_3s_linear_infinite] opacity-70 blur-sm"></div>
        </div>
      </div>
    );
  }

  // Default spinner
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-10 h-10 animate-float">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full bg-gradient-radial from-primary/5 to-transparent" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-md" />
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-primary/10 rounded-full animate-pulse opacity-50 blur-sm"></div>
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 12, variant = "manga" }: { count?: number; variant?: "manga" | "chapter" }) {
  if (variant === "chapter") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden rounded-lg bg-muted/30 p-4 animate-fadeIn stagger-delay-${Math.min(i * 100, 500)}`}
          >
            {/* Manga page effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[shimmer_2s_infinite]" />
            <div className="absolute inset-0 bg-manga-texture opacity-10 mix-blend-overlay pointer-events-none"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-16 rounded bg-muted animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-shine bg-size-200% animate-shine opacity-30"></div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/4 rounded bg-muted animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`group relative space-y-2 overflow-hidden animate-fadeIn stagger-delay-${Math.min(i * 50, 500)}`}>
          {/* Manga cover effect */}
          <div className="aspect-[2/3] rounded-md bg-muted relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-[shimmer_2s_infinite]" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-0 bg-manga-texture opacity-10 mix-blend-overlay pointer-events-none"></div>
          </div>
          {/* Manga title effect */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-shine bg-size-200% animate-shine opacity-30"></div>
            </div>
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorDisplay({ message, retryFn }: { message: string; retryFn?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="text-xl font-semibold mb-2 text-shadow-sm animate-fadeIn">Oops, something went wrong</div>
      <p className="text-muted-foreground mb-6 animate-fadeInUp delay-100">{message}</p>
      {retryFn && (
        <button 
          onClick={retryFn}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 relative overflow-hidden group animate-scaleIn delay-200"
        >
          <span className="relative z-10">Try Again</span>
          <span className="absolute inset-0 bg-primary-foreground/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-md"></span>
        </button>
      )}
      <div className="mt-6 w-16 h-16 relative animate-float">
        <div className="absolute inset-0 border-4 border-dashed border-primary/40 rounded-full animate-spin opacity-70"></div>
        <div className="absolute inset-2 border-4 border-primary/20 rounded-full animate-[spin_3s_linear_infinite_reverse] opacity-70"></div>
      </div>
    </div>
  );
}
