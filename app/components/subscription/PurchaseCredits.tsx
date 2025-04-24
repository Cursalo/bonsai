'use client'

import { createClient } from '../../../src/lib/supabase/client'
import { useState } from 'react'

type CreditPackage = {
  id: number
  name: string
  credits: number
  price: number
  popular?: boolean
}

export default function PurchaseCredits() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()

  // Credit packages available for purchase
  const creditPackages: CreditPackage[] = [
    { id: 1, name: 'Basic', credits: 10, price: 15 },
    { id: 2, name: 'Standard', credits: 25, price: 30, popular: true },
    { id: 3, name: 'Premium', credits: 50, price: 50 },
  ]

  const handleSelectPackage = (packageId: number) => {
    setSelectedPackage(packageId)
    // Reset messages when selecting a new package
    setError(null)
    setSuccess(null)
  }

  const handlePurchase = async () => {
    if (!selectedPackage) {
      setError('Please select a credit package')
      return
    }

    setIsProcessing(true)
    setError(null)
    setSuccess(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      // In a real application, this would integrate with a payment processor
      // For now, we'll simulate a successful purchase
      
      // First, get the selected package
      const selectedPkg = creditPackages.find(pkg => pkg.id === selectedPackage)
      if (!selectedPkg) {
        throw new Error('Invalid package selected')
      }

      // Then, update the user's subscription with the new credits
      // This is a simplified version - in a real app, you'd first process payment
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ 
          video_credits_remaining: supabase.rpc('increment_credits', { 
            credit_amount: selectedPkg.credits 
          })
        })
        .eq('user_id', user.id)
        .select()

      if (error) throw error

      setSuccess(`Successfully purchased ${selectedPkg.credits} video credits!`)
    } catch (error: any) {
      setError(error.message || 'Failed to process purchase')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {creditPackages.map((pkg) => (
          <div 
            key={pkg.id}
            className={`relative border rounded-lg p-4 transition-all ${
              selectedPackage === pkg.id 
                ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => handleSelectPackage(pkg.id)}
          >
            {pkg.popular && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                Popular
              </span>
            )}
            <h3 className="font-medium text-gray-900 dark:text-white">{pkg.name} Package</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">${pkg.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {pkg.credits} video credits
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              ${(pkg.price / pkg.credits).toFixed(2)} per credit
            </p>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-3 rounded-md text-sm">
          {success}
        </div>
      )}

      <button 
        className={`w-full btn-primary ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
        onClick={handlePurchase}
        disabled={isProcessing || !selectedPackage}
      >
        {isProcessing ? 'Processing...' : 'Purchase Credits'}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Secure payment processing. Credits are added immediately to your account.
      </p>
    </div>
  )
} 