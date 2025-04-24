import DashboardLayout from '../../components/layouts/DashboardLayout'
import HomeworkForm from '../../components/homework/HomeworkForm'

export default function NewHomeworkPage() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Submit Homework</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Submit your homework to receive personalized video lessons based on AI analysis.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <HomeworkForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 