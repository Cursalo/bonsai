'use client'

import { useState } from 'react'

// Mock data for progress charts
const mockScoreHistory = [
  { date: 'Jan 5', score: 1050 },
  { date: 'Jan 19', score: 1080 },
  { date: 'Feb 2', score: 1120 },
  { date: 'Feb 16', score: 1150 },
  { date: 'Mar 2', score: 1190 },
  { date: 'Mar 16', score: 1230 },
  { date: 'Apr 6', score: 1280 },
]

const mockSectionScores = {
  math: [
    { date: 'Jan 5', score: 520 },
    { date: 'Jan 19', score: 530 },
    { date: 'Feb 2', score: 550 },
    { date: 'Feb 16', score: 570 },
    { date: 'Mar 2', score: 590 },
    { date: 'Mar 16', score: 620 },
    { date: 'Apr 6', score: 650 },
  ],
  reading: [
    { date: 'Jan 5', score: 530 },
    { date: 'Jan 19', score: 550 },
    { date: 'Feb 2', score: 570 },
    { date: 'Feb 16', score: 580 },
    { date: 'Mar 2', score: 600 },
    { date: 'Mar 16', score: 610 },
    { date: 'Apr 6', score: 630 },
  ],
}

export default function ProgressCharts() {
  const [activeTab, setActiveTab] = useState('overall')
  const [scoreHistory] = useState(mockScoreHistory)
  const [sectionScores] = useState(mockSectionScores)
  
  // Calculate max score for scaling the chart
  const maxOverallScore = Math.max(...scoreHistory.map(item => item.score))
  const maxSectionScore = 800 // Max section score is 800
  
  // Calculate chart dimensions
  const chartHeight = 200
  const chartWidth = '100%'
  const barWidth = 40
  const barGap = 20
  
  // Calculate scaling factors
  const overallScaleFactor = chartHeight / (maxOverallScore * 1.1) // Add 10% padding
  const sectionScaleFactor = chartHeight / (maxSectionScore * 1.1) // Add 10% padding
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Score Progress</h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'overall'
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('overall')}
          >
            Overall
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'math'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('math')}
          >
            Math
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeTab === 'reading'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('reading')}
          >
            Reading
          </button>
        </div>
      </div>
      
      <div className="relative" style={{ height: `${chartHeight}px`, width: chartWidth }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>
            {activeTab === 'overall' ? maxOverallScore : maxSectionScore}
          </div>
          <div>
            {activeTab === 'overall' ? Math.floor(maxOverallScore / 2) : Math.floor(maxSectionScore / 2)}
          </div>
          <div>0</div>
        </div>
        
        {/* Chart area */}
        <div className="ml-10 h-full relative">
          {/* Horizontal grid lines */}
          <div className="absolute left-0 right-0 top-0 border-t border-gray-200 dark:border-gray-700"></div>
          <div className="absolute left-0 right-0 top-1/2 border-t border-gray-200 dark:border-gray-700"></div>
          <div className="absolute left-0 right-0 bottom-0 border-t border-gray-200 dark:border-gray-700"></div>
          
          {/* Bars */}
          <div className="absolute inset-0 flex items-end justify-around">
            {activeTab === 'overall' && scoreHistory.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-primary-500 dark:bg-primary-400 rounded-t-sm w-8"
                  style={{ 
                    height: `${item.score * overallScaleFactor}px`,
                  }}
                ></div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 transform -rotate-45 origin-top-left">
                  {item.date}
                </div>
              </div>
            ))}
            
            {activeTab === 'math' && sectionScores.math.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-blue-500 dark:bg-blue-400 rounded-t-sm w-8"
                  style={{ 
                    height: `${item.score * sectionScaleFactor}px`,
                  }}
                ></div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 transform -rotate-45 origin-top-left">
                  {item.date}
                </div>
              </div>
            ))}
            
            {activeTab === 'reading' && sectionScores.reading.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-purple-500 dark:bg-purple-400 rounded-t-sm w-8"
                  style={{ 
                    height: `${item.score * sectionScaleFactor}px`,
                  }}
                ></div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 transform -rotate-45 origin-top-left">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          {activeTab === 'overall' ? 'Overall Score Trend' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section Trend`}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Based on your practice test results
        </div>
      </div>
    </div>
  )
} 