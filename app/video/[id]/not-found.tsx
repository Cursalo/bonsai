import Link from 'next/link'
import DashboardLayout from '@/app/components/layouts/DashboardLayout'

export default function VideoNotFound() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Video Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the video you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/video" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse All Videos
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 