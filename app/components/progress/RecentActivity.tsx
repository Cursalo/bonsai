'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Define types for different activity types
type BaseActivity = {
  id: number;
  type: string;
  title: string;
  date: string;
  icon: string;
}

type VideoActivity = BaseActivity & {
  type: 'video';
  progress: number;
}

type PracticeOrQuizActivity = BaseActivity & {
  type: 'practice' | 'quiz';
  score: number;
  totalQuestions: number;
}

type HomeworkActivity = BaseActivity & {
  type: 'homework';
  completed: boolean;
}

type Activity = VideoActivity | PracticeOrQuizActivity | HomeworkActivity;

// Mock data for recent activities
const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'video',
    title: 'SAT Math: Mastering Quadratic Equations',
    date: '2023-11-15T14:30:00Z',
    progress: 100,
    icon: '📺',
  },
  {
    id: 2,
    type: 'practice',
    title: 'Reading Comprehension Practice Set',
    date: '2023-11-14T10:15:00Z',
    score: 85,
    totalQuestions: 20,
    icon: '📝',
  },
  {
    id: 3,
    type: 'homework',
    title: 'Grammar and Punctuation Assignment',
    date: '2023-11-13T16:45:00Z',
    completed: true,
    icon: '📚',
  },
  {
    id: 4,
    type: 'quiz',
    title: 'Math Concepts Quiz',
    date: '2023-11-12T09:20:00Z',
    score: 92,
    totalQuestions: 15,
    icon: '✅',
  },
  {
    id: 5,
    type: 'video',
    title: 'SAT Reading: Evidence-Based Questions',
    date: '2023-11-11T13:10:00Z',
    progress: 75,
    icon: '📺',
  },
  {
    id: 6,
    type: 'practice',
    title: 'Algebra Problem Set',
    date: '2023-11-10T11:30:00Z',
    score: 78,
    totalQuestions: 18,
    icon: '📝',
  },
]

// Format date to relative time (e.g., "2 days ago")
function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) {
    return 'just now'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
  }
  
  const diffInMonths = Math.floor(diffInDays / 30)
  return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`
}

export default function RecentActivity() {
  const [activities] = useState<Activity[]>(mockActivities)
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className="flex items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full mr-4 text-xl">
              {activity.icon}
            </div>
            
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(activity.date)}
                </span>
              </div>
              
              <div className="mt-1">
                {activity.type === 'video' && (
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Video Lesson • {activity.progress === 100 ? 'Completed' : `${activity.progress}% complete`}
                    </div>
                    {activity.progress < 100 && (
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${activity.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
                
                {(activity.type === 'practice' || activity.type === 'quiz') && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.type === 'practice' ? 'Practice Set' : 'Quiz'} • 
                    Score: <span className="font-medium text-blue-600 dark:text-blue-400">
                      {(activity as PracticeOrQuizActivity).score}% ({Math.round((activity as PracticeOrQuizActivity).score * (activity as PracticeOrQuizActivity).totalQuestions / 100)}/{(activity as PracticeOrQuizActivity).totalQuestions})
                    </span>
                  </div>
                )}
                
                {activity.type === 'homework' && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Homework Assignment • 
                    {(activity as HomeworkActivity).completed ? (
                      <span className="text-green-600 dark:text-green-400 ml-1">Completed</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 ml-1">In Progress</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <Link 
              href="#" 
              className="flex-shrink-0 ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
            >
              View
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          href="#" 
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          View All Activity
        </Link>
      </div>
    </div>
  )
} 