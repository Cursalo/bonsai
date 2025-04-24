import Image from 'next/image'
import Link from 'next/link'
import DashboardLayout from '../components/layouts/DashboardLayout'
import { createClient } from '../../src/lib/supabase/server'

// Mock function to get all videos
async function getAllVideos() {
  const supabase = await createClient()

  const { data: videos, error } = await supabase.from('video_lessons').select('*')

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }

  if (!Array.isArray(videos)) return [];
  
  return videos;
}

// Group videos by subject
function groupVideosBySubject(videos: any[]) {
  const groups: Record<string, any[]> = {};
  
  videos.forEach(video => {
    const subjectMatch = video.title.match(/(SAT|PSAT)\s+(\w+)?/);
    const subject = subjectMatch ? subjectMatch[0] : 'Other';
    
    if (!groups[subject]) {
      groups[subject] = [];
    }
    
    groups[subject].push(video);
  });
  
  return groups;
}

export default async function VideoListPage() {
  const videos = await getAllVideos();
  const videosBySubject = groupVideosBySubject(videos);
  
  // Sort subjects to ensure consistent order
  const subjects = Object.keys(videosBySubject).sort();
  
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            SAT/PSAT Video Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Browse our collection of SAT and PSAT preparation videos taught by expert instructors.
          </p>
          
          {subjects.map(subject => (
            <div key={subject} className="mb-12">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                {subject} Videos
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videosBySubject[subject].map(video => (
                  <Link 
                    key={video.id} 
                    href={`/video/${video.id}`}
                    className="block group"
                  >
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:opacity-90 transition-opacity"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                        {video.watched && (
                          <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-1 rounded">
                            Watched
                          </div>
                        )}
                        {video.progress > 0 && video.progress < 100 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                            <div 
                              className="h-full bg-primary-500" 
                              style={{ width: `${video.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {video.instructor}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 