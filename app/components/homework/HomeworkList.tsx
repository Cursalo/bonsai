'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Define the type first so we can use it for mock data
type HomeworkSubmission = {
  id: string
  title: string
  exam_type: string
  subject: string
  submitted_at: string
  status: 'submitted' | 'analyzed' | 'video_generated'
  score: number | null
  feedback: string | null
}

// Mock data for homework submissions
const mockSubmissions: HomeworkSubmission[] = [
  {
    id: '1',
    title: 'SAT Practice Test #5 - Math Section',
    exam_type: 'SAT',
    subject: 'Mathematics',
    submitted_at: '2023-11-15T14:30:00Z',
    status: 'video_generated',
    score: 85,
    feedback: 'Great work on algebraic expressions. Focus more on geometry concepts.'
  },
  {
    id: '2',
    title: 'PSAT Reading Comprehension',
    exam_type: 'PSAT',
    subject: 'Reading',
    submitted_at: '2023-11-10T09:15:00Z',
    status: 'analyzed',
    score: 78,
    feedback: 'Good analysis of main ideas. Work on identifying supporting details.'
  },
  {
    id: '3',
    title: 'SAT Writing & Language',
    exam_type: 'SAT',
    subject: 'Writing',
    submitted_at: '2023-11-05T16:45:00Z',
    status: 'video_generated',
    score: 92,
    feedback: 'Excellent grammar usage. Minor improvements needed in sentence structure.'
  },
  {
    id: '4',
    title: 'SAT Math - Quadratic Equations',
    exam_type: 'SAT',
    subject: 'Mathematics',
    submitted_at: '2023-10-28T11:20:00Z',
    status: 'submitted',
    score: null,
    feedback: null
  },
  {
    id: '5',
    title: 'PSAT Evidence-Based Reading',
    exam_type: 'PSAT',
    subject: 'Reading',
    submitted_at: '2023-10-20T13:10:00Z',
    status: 'video_generated',
    score: 88,
    feedback: 'Strong critical analysis. Continue practicing inference questions.'
  }
];

export default function HomeworkList() {
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setSubmissions(mockSubmissions)
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  // Filter submissions based on active tab and search term
  const filteredSubmissions = submissions.filter(submission => {
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'completed' && submission.status === 'video_generated') ||
      (activeTab === 'pending' && submission.status !== 'video_generated')
    
    const matchesSearch = 
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.exam_type.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'analyzed':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'video_generated':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  // Get status display text
  const getStatusDisplayText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Submitted'
      case 'analyzed':
        return 'Analyzed'
      case 'video_generated':
        return 'Video Ready'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and filter controls */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm"
              placeholder="Search homework submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'all'
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'completed'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                activeTab === 'pending'
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Pending
            </button>
          </div>
        </div>
      </div>

      {/* Homework cards */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? 'No homework submissions match your search.' : 'You haven\'t submitted any homework yet.'}
          </p>
          <div className="mt-4">
            <Link href="/homework/new" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Submit New Homework
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubmissions.map((submission, index) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {submission.title}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {submission.exam_type} • {submission.subject}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(submission.status)}`}>
                    {getStatusDisplayText(submission.status)}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Submitted on {formatDate(submission.submitted_at)}
                  </div>
                  
                  {submission.score !== null && (
                    <div className="mt-2">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Score:</span>
                        <span className="ml-2 text-sm font-bold text-primary-600 dark:text-primary-400">{submission.score}/100</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${submission.score}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {submission.feedback && (
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Feedback:</span> {submission.feedback}
                    </div>
                  )}
                </div>
                
                <div className="mt-5 flex justify-end space-x-3">
                  <Link
                    href={`/homework/${submission.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    View Details
                  </Link>
                  
                  {submission.status === 'video_generated' && (
                    <Link
                      href={`/video?homework=${submission.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <svg className="mr-1.5 -ml-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Watch Video
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Upload new homework CTA */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Need feedback on your work?</h3>
            <p className="mt-1 text-primary-100">Upload your homework and get personalized video feedback from our AI tutors.</p>
          </div>
          <Link
            href="/homework/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-primary-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Upload New Homework
          </Link>
        </div>
      </div>
    </div>
  )
} 