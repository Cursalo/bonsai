'use client'

import { useState } from 'react'

// Mock data for skill breakdown
const mockSkills = [
  {
    id: 1,
    name: 'Algebra',
    category: 'Math',
    mastery: 85,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Geometry',
    category: 'Math',
    mastery: 72,
    color: 'bg-blue-500',
  },
  {
    id: 3,
    name: 'Data Analysis',
    category: 'Math',
    mastery: 68,
    color: 'bg-blue-500',
  },
  {
    id: 4,
    name: 'Reading Comprehension',
    category: 'Reading',
    mastery: 78,
    color: 'bg-purple-500',
  },
  {
    id: 5,
    name: 'Vocabulary in Context',
    category: 'Reading',
    mastery: 65,
    color: 'bg-purple-500',
  },
  {
    id: 6,
    name: 'Grammar',
    category: 'Writing',
    mastery: 82,
    color: 'bg-green-500',
  },
  {
    id: 7,
    name: 'Sentence Structure',
    category: 'Writing',
    mastery: 75,
    color: 'bg-green-500',
  },
]

export default function SkillBreakdown() {
  const [skills] = useState(mockSkills)
  const [filter, setFilter] = useState('all')
  
  // Filter skills based on selected category
  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category.toLowerCase() === filter.toLowerCase())
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Skill Breakdown</h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-xs rounded-md ${
              filter === 'all'
                ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-md ${
              filter === 'math'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setFilter('math')}
          >
            Math
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-md ${
              filter === 'reading'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setFilter('reading')}
          >
            Reading
          </button>
          <button
            className={`px-3 py-1 text-xs rounded-md ${
              filter === 'writing'
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
            onClick={() => setFilter('writing')}
          >
            Writing
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredSkills.map(skill => (
          <div key={skill.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between mb-1">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</div>
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {skill.mastery}%
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div 
                className={`${skill.color} h-2.5 rounded-full`} 
                style={{ width: `${skill.mastery}%` }}
              ></div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {skill.mastery >= 80 ? (
                <span className="text-green-600 dark:text-green-400">Mastered</span>
              ) : skill.mastery >= 60 ? (
                <span className="text-yellow-600 dark:text-yellow-400">Proficient</span>
              ) : (
                <span className="text-red-600 dark:text-red-400">Needs Practice</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredSkills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No skills found for this category.
        </div>
      )}
    </div>
  )
} 