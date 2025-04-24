import Link from 'next/link'
import DashboardLayout from '../components/layouts/DashboardLayout'
import HomeworkList from '../components/homework/HomeworkList'

export default function HomeworkPage() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Homework Submissions</h1>
            <Link href="/homework/new" className="btn-primary">
              Submit New Homework
            </Link>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            View and manage your homework submissions.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          <HomeworkList />
        </div>
      </div>
    </DashboardLayout>
  )
} 