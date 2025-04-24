import DashboardLayout from '../components/layouts/DashboardLayout'
import StatsCard from '../components/dashboard/StatsCard'
import RecentVideos from '../components/dashboard/RecentVideos'
import BonsaiTreeVisualization from '../components/dashboard/BonsaiTreeVisualization'
import HomeworkReminder from '../components/dashboard/HomeworkReminder'
import BotSaiAssistant from '../components/dashboard/BotSaiAssistant'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">SAT/PSAT Prep Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Track your progress and prepare for your upcoming SAT or PSAT exam.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard 
              title="Practice Tests Completed" 
              value="3" 
              change="+1" 
              changeType="increase" 
              period="this month" 
              icon="📝"
            />
            <StatsCard 
              title="Current SAT Score" 
              value="1280" 
              change="+120" 
              changeType="increase" 
              period="from baseline" 
              icon="📊"
            />
            <StatsCard 
              title="Math Concepts Mastered" 
              value="18" 
              change="+5" 
              changeType="increase" 
              period="this month" 
              icon="🧮"
            />
            <StatsCard 
              title="Reading/Writing Mastered" 
              value="14" 
              change="+3" 
              changeType="increase" 
              period="this month" 
              icon="📚"
            />
          </div>

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Bonsai Tree Visualization - renamed to SAT Progress Tree */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Your SAT Progress Tree
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Watch your knowledge grow as you master SAT/PSAT concepts.
                </p>
                <div className="mt-4 h-[450px]">
                  <BonsaiTreeVisualization />
                </div>
              </div>
            </div>

            {/* Recent Videos - updated for SAT/PSAT content */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Recent SAT/PSAT Video Lessons
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Continue learning with these personalized video lessons.
                </p>
                <div className="mt-4">
                  <RecentVideos />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming SAT/PSAT Practice */}
          <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Upcoming SAT/PSAT Practice
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your scheduled practice tests and assignments.
                </p>
                <div className="mt-4">
                  <HomeworkReminder />
                </div>
              </div>
            </div>
          </div>

          {/* SAT/PSAT AI Tutor */}
          <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  SAT/PSAT AI Tutor
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Get instant help with any SAT or PSAT concept with BonsAI.
                </p>
                <div className="mt-4">
                  <BotSaiAssistant />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 