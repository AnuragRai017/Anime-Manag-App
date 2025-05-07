export default function Loading() {
  return (
    <div className="relative bg-black text-white min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-14">
          <div className="h-8 w-28 rounded-md bg-muted animate-pulse" />
          <div className="h-5 w-32 rounded bg-muted animate-pulse" />
        </div>
      </div>
      
      <div className="pt-14">
        <div className="container px-0 md:px-4 py-4 max-w-4xl mx-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="relative flex justify-center mb-2">
              <div className="relative w-full max-w-3xl mx-auto aspect-[2/3] bg-gray-800 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
