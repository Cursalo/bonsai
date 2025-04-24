import DashboardLayout from '../components/layouts/DashboardLayout'
import SubscriptionInfo from '../components/subscription/SubscriptionInfo'
import PurchaseCredits from '../components/subscription/PurchaseCredits'

export default function SubscriptionPage() {
  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Subscription</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your subscription and purchase additional video credits.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Current Subscription
              </h2>
              <SubscriptionInfo />
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Purchase Additional Credits
              </h2>
              <PurchaseCredits />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 