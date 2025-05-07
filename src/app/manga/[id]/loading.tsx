import { LoadingSpinner } from "@/components/ui/loading";

export default function Loading() {
  return (
    <div className="container py-8 px-4">
      {/* Add a LoadingSpinner at the top for better user feedback */}
      <div className="flex justify-center mb-8">
        <LoadingSpinner />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="aspect-[2/3] rounded-lg bg-muted animate-pulse" />
        </div>
        
        <div className="md:col-span-2">
          <div className="h-10 w-64 rounded bg-muted animate-pulse mb-4" />
          
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <div className="h-7 w-20 rounded-md bg-muted animate-pulse" />
            <div className="h-7 w-24 rounded-md bg-muted animate-pulse" />
          </div>
          
          <div className="mb-4 space-y-2">
            <div className="h-4 w-48 rounded bg-muted animate-pulse" />
            <div className="h-4 w-40 rounded bg-muted animate-pulse" />
            <div className="h-4 w-56 rounded bg-muted animate-pulse" />
          </div>
          
          <div className="mb-6">
            <div className="h-5 w-32 rounded bg-muted animate-pulse mb-2" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="h-10 w-32 rounded-md bg-muted animate-pulse" />
            <div className="h-10 w-36 rounded-md bg-muted animate-pulse" />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-8">
        <div className="h-8 w-36 rounded bg-muted animate-pulse mb-6" />
        
        <div className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-md bg-muted/30 animate-pulse">
              <div className="space-y-2">
                <div className="h-5 w-48 rounded bg-muted animate-pulse" />
                <div className="h-3 w-24 rounded bg-muted animate-pulse" />
              </div>
              <div className="h-8 w-16 rounded-md bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
