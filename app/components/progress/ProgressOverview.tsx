'use client'

import { useState } from 'react'
import mockSupabase from '@/app/lib/mock-supabase'

// Mock progress data
const mockProgressData = {
  overall: {
    currentScore: 1280,
    targetScore: 1500,
    improvement: 120,
    percentComplete: 68,
  },
  sections: [
    {
      name: 'Math',
      score: 650,
      maxScore: 800,
      percentComplete: 81,
      color: 'bg-blue-500',
    },
    {
      name: 'Reading',
      score: 630,
      maxScore: 800,
      percentComplete: 79,
      color: 'bg-purple-500',
    },
    {
      name: 'Writing',
      score: 580,
      maxScore: 800,
      percentComplete: 73,
      color: 'bg-green-500',
    },
  ],
}

export default function ProgressOverview() {
  const [progressData] = useState(mockProgressData)
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Progress Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">Current Score</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {progressData.overall.currentScore}
          </div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            +{progressData.overall.improvement} points improvement
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">Target Score</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {progressData.overall.targetScore}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progressData.overall.targetScore - progressData.overall.currentScore} points to go
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">Overall Progress</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {progressData.overall.percentComplete}%
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-2">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${progressData.overall.percentComplete}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">Section Breakdown</h3>
      
      <div className="space-y-4">
        {progressData.sections.map((section) => (
          <div key={section.name} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between mb-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{section.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {section.score} / {section.maxScore}
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div 
                className={`${section.color} h-2.5 rounded-full`} 
                style={{ width: `${section.percentComplete}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {section.percentComplete}% complete
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 