interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease' | 'neutral'
  period: string
  icon: string
}

export default function StatsCard({ title, value, change, changeType, period, icon }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
              <span className="text-2xl">{icon}</span>
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div className="text-sm">
          <span
            className={`font-medium ${
              changeType === 'increase'
                ? 'text-green-600 dark:text-green-400'
                : changeType === 'decrease'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {change}
          </span>{' '}
          <span className="text-gray-500 dark:text-gray-400">{period}</span>
        </div>
      </div>
    </div>
  )
} 