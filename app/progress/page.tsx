import DashboardLayout from '../components/layouts/DashboardLayout'
import ProgressOverview from '../components/progress/ProgressOverview'
import ProgressCharts from '../components/progress/ProgressCharts'
import SkillBreakdown from '../components/progress/SkillBreakdown'
import RecentActivity from '../components/progress/RecentActivity'

export default function ProgressPage() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Progress Tracking</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track your SAT/PSAT preparation progress and identify areas for improvement.
          </p>
        </div>
        
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Progress Overview */}
              <ProgressOverview />
              
              {/* Progress Charts */}
              <ProgressCharts />
              
              {/* Skill Breakdown */}
              <SkillBreakdown />
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 