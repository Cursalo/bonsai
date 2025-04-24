'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type VideoLesson = {
  id: string
  title: string
  description: string
  url: string
  thumbnail: string
  duration: number
  created_at: string
  watched: boolean
  watched_at: string | null
  submission_id: string
}

export default function VideoList() {
  const searchParams = useSearchParams()
  const homeworkId = searchParams.get('homework')
  
  const [videos, setVideos] = useState<VideoLesson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          throw new Error('User not authenticated')
        }

        let query = supabase
          .from('video_lessons')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        // If homework ID is provided, filter by it
        if (homeworkId) {
          query = query.eq('submission_id', homeworkId)
        }

        const { data, error: fetchError } = await query

        if (fetchError) throw fetchError

        setVideos(data || [])
      } catch (err: any) {
        setError(err.message || "Failed to load videos")
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [homeworkId, supabase])

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  // Format duration in seconds to MM:SS format
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const markAsWatched = async (videoId: string, watched: boolean) => {
    try {
      const { error } = await supabase
        .from('video_lessons')
        .update({
          watched,
          watched_at: watched ? new Date().toISOString() : null,
        })
        .eq('id', videoId)

      if (error) {
        throw error
      }

      // Update local state
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === videoId
            ? { ...video, watched, watched_at: watched ? new Date().toISOString() : null }
            : video
        )
      )
    } catch (error: any) {
      console.error('Error updating video status:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-md">
        {error}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          {homeworkId
            ? "No video lessons are available for this homework submission yet."
            : "You don't have any video lessons yet. Submit homework to receive personalized video lessons."}
        </p>
        <div className="mt-4">
          <Link href="/homework/new" className="btn-primary">
            Submit Homework
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={video.thumbnail || 'https://picsum.photos/seed/video/400/300'}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary-500 bg-opacity-80 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {formatDuration(video.duration)}
              </div>
              {video.watched && (
                <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
                  Watched
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                {video.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {video.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(video.created_at)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => markAsWatched(video.id, !video.watched)}
                    className="text-xs text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    {video.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={`/video/${video.id}`}
                  className="btn-primary w-full text-center py-2"
                >
                  Watch Video
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 