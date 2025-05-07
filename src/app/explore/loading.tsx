import { LoadingGrid, LoadingSpinner } from "@/components/ui/loading";

export default function Loading() {
  return (
    <div className="container px-4 py-8">
      {/* Top loading spinner - using Gear (One Piece) theme */}
      <div className="flex justify-center mb-8">
        <LoadingSpinner variant="gear" />
      </div>

      <div className="mb-8">
        <div className="h-10 w-48 rounded bg-muted animate-pulse mb-4" />
        <div className="h-4 w-96 rounded bg-muted animate-pulse" />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-9 w-20 rounded-md bg-muted animate-pulse" />
        ))}
      </div>

      <LoadingGrid count={24} />
    </div>
  );
}
