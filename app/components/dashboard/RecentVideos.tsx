'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

// Mock data for recent videos - all SAT-related with human avatars
const mockVideos = [
  {
    id: '1',
    title: 'SAT Math: Mastering Quadratic Equations',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '12:34',
    createdAt: '2023-06-15T10:30:00Z',
    watched: true,
    instructor: 'Dr. Sarah Chen',
    description: 'Learn how to solve any quadratic equation on the SAT Math section with confidence.'
  },
  {
    id: '2',
    title: 'SAT Reading: Evidence-Based Questions',
    thumbnail: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '15:21',
    createdAt: '2023-06-14T14:45:00Z',
    watched: false,
    instructor: 'Prof. Michael Johnson',
    description: 'Master the technique for answering evidence-based questions in the SAT Reading section.'
  },
  {
    id: '3',
    title: 'SAT Writing: Grammar Rules You Must Know',
    thumbnail: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '08:45',
    createdAt: '2023-06-13T09:15:00Z',
    watched: false,
    instructor: 'Ms. Emily Rodriguez',
    description: 'Essential grammar rules that appear frequently on the SAT Writing section.'
  },
  {
    id: '4',
    title: 'PSAT Prep: Math Problem Solving Strategies',
    thumbnail: 'https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '14:22',
    createdAt: '2023-06-12T11:30:00Z',
    watched: false,
    instructor: 'Dr. James Wilson',
    description: 'Effective strategies for tackling math problems on the PSAT.'
  },
  {
    id: '5',
    title: 'SAT Math: Geometry and Trigonometry',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '17:45',
    createdAt: '2023-06-10T15:20:00Z',
    watched: false,
    instructor: 'Prof. David Kim',
    description: 'Comprehensive review of geometry and trigonometry concepts tested on the SAT.'
  },
  {
    id: '6',
    title: 'SAT Reading: Analyzing Complex Passages',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '19:18',
    createdAt: '2023-06-08T13:45:00Z',
    watched: false,
    instructor: 'Dr. Lisa Thompson',
    description: 'Techniques for understanding and analyzing complex reading passages on the SAT.'
  },
  {
    id: '7',
    title: 'PSAT Writing: Sentence Structure',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '11:52',
    createdAt: '2023-06-06T09:30:00Z',
    watched: false,
    instructor: 'Prof. Robert Garcia',
    description: 'Learn how to identify and correct sentence structure issues on the PSAT Writing section.'
  },
  {
    id: '8',
    title: 'SAT Math: Data Analysis and Statistics',
    thumbnail: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '13:27',
    createdAt: '2023-06-04T16:15:00Z',
    watched: false,
    instructor: 'Dr. Olivia Martinez',
    description: 'Master data analysis and statistics problems that appear on the SAT Math section.'
  },
  {
    id: '9',
    title: 'SAT Reading: Vocabulary in Context',
    thumbnail: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '10:39',
    createdAt: '2023-06-02T11:20:00Z',
    watched: false,
    instructor: 'Prof. Thomas Lee',
    description: 'Strategies for determining the meaning of vocabulary words in context on the SAT.'
  },
  {
    id: '10',
    title: 'PSAT Overview: Test Structure and Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '16:05',
    createdAt: '2023-05-30T14:10:00Z',
    watched: false,
    instructor: 'Ms. Jennifer Adams',
    description: 'A comprehensive overview of the PSAT structure and general test-taking strategies.'
  },
  {
    id: '11',
    title: 'PSAT Prep: Reading Comprehension Techniques',
    thumbnail: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '14:38',
    createdAt: '2023-05-28T10:15:00Z',
    watched: false,
    instructor: 'Dr. Amanda Parker',
    description: 'Essential techniques to improve your reading comprehension skills for the PSAT.'
  },
  {
    id: '12',
    title: 'PSAT Overview: Scoring and National Merit Scholarship',
    thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    duration: '18:22',
    createdAt: '2023-05-25T13:45:00Z',
    watched: false,
    instructor: 'Prof. Daniel Wright',
    description: 'Learn how PSAT scoring works and what it takes to qualify for the National Merit Scholarship.'
  },
];

export default function RecentVideos() {
  // Format date for display
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  // Display only the first 5 videos on the dashboard
  const displayedVideos = mockVideos.slice(0, 5)

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Videos</h2>
        <Link 
          href="/video" 
          className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {displayedVideos.map((video) => (
          <Link 
            key={video.id} 
            href={`/video/${video.id}`} 
            className="flex items-start space-x-4 group"
          >
            <div className="relative flex-shrink-0 w-24 h-16 rounded overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
              {video.watched && (
                <div className="absolute top-1 left-1 bg-primary-500 text-white text-xs px-1 rounded">
                  ✓
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {video.instructor}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {formatDate(video.createdAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 