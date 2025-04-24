import Link from 'next/link'

// This function tells Next.js which paths to pre-render at build time
export async function generateStaticParams() {
  // We'll pre-render paths for video IDs 1 through 10 as an example
  // In a real application, you'd likely fetch this data from an API or database
  return Array.from({ length: 10 }, (_, i) => ({
    id: (i + 1).toString()
  }))
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <Link href="/video" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to videos
      </Link>
      
      <h1 className="text-2xl font-bold mb-4">Video {params.id}</h1>
      
      <div className="bg-gray-200 aspect-video flex items-center justify-center text-gray-500">
        Video Player Placeholder
      </div>
    </div>
  )
} 