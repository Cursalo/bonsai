'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'

type Subscription = {
  id: string
  plan_id: string
  status: string
  video_credits_remaining: number
  started_at: string
  expires_at: string
}

export default function SubscriptionInfo() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          throw new Error('User not authenticated')
        }

        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') { // PGRST116 is the error code for no rows returned
          throw error
        }

        setSubscription(data)
      } catch (error: any) {
        setError(error.message || 'Failed to load subscription information')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'canceled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'past_due':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-md">
        {error}
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          You don't have an active subscription.
        </p>
        <button className="btn-primary">
          Subscribe Now
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Monthly Plan
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            $50/month for up to 50 video lessons
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(subscription.status)}`}>
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </span>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Video credits remaining</dt>
            <dd className="text-sm font-medium text-gray-900 dark:text-white">
              {subscription.video_credits_remaining}
            </dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Started on</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {formatDate(subscription.started_at)}
            </dd>
          </div>
          <div className="py-3 flex justify-between">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Renews on</dt>
            <dd className="text-sm text-gray-900 dark:text-white">
              {formatDate(subscription.expires_at)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="pt-4 flex space-x-3">
        <button className="btn-secondary text-sm">
          Manage Billing
        </button>
        {subscription.status === 'active' && (
          <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
            Cancel Subscription
          </button>
        )}
      </div>
    </div>
  )
} 