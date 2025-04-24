'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomeworkReminder() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  return (
    <div className="bg-primary-50 dark:bg-primary-900/30 border-l-4 border-primary-400 dark:border-primary-500 p-4 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-primary-400 dark:text-primary-300 text-lg">📝</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-primary-800 dark:text-primary-200">
            Daily Homework Reminder
          </h3>
          <div className="mt-2 text-sm text-primary-700 dark:text-primary-300">
            <p>
              Don't forget to submit your homework today to receive personalized video lessons tomorrow.
              Regular practice is key to improving your test scores!
            </p>
          </div>
          <div className="mt-4 flex space-x-4">
            <Link
              href="/homework/new"
              className="btn-primary text-sm py-1 px-3"
            >
              Submit Homework
            </Link>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 