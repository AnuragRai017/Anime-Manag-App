import { LoadingGrid, LoadingSpinner } from "@/components/ui/loading";

export default function Loading() {
  return (
    <div className="container px-4 py-8">
      {/* Top loading spinner - using Chakra (Naruto) theme */}
      <div className="flex justify-center mb-8">
        <LoadingSpinner variant="chakra" />
      </div>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 rounded bg-muted animate-pulse" />
          <div className="h-9 w-24 rounded-md bg-muted animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg border shadow p-4">
              <div className="space-y-2">
                <div className="aspect-[2/3] rounded-md bg-muted animate-pulse" />
                <div className="h-5 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="h-7 w-40 rounded bg-muted animate-pulse" />
          <div className="h-8 w-20 rounded-md bg-muted animate-pulse" />
        </div>
        
        <LoadingGrid count={12} />
      </section>
    </div>
  );
}
