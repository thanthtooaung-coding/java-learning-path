export default function Loading() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading quiz...</p>
      </div>
    )
}