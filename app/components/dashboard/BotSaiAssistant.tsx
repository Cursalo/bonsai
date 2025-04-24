'use client'

import { useState, useRef, useEffect } from 'react'
import { generateBotSaiResponse } from '@/app/lib/botsai'
import { motion, AnimatePresence } from 'framer-motion'

export default function BotSaiAssistant() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const responseRef = useRef<HTMLDivElement>(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [prompt])

  // Scroll to response when it's generated
  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [response])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim()) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      // Add SAT/PSAT context to the prompt
      const enhancedPrompt = `As an SAT/PSAT tutor, please help with the following question: ${prompt}`;
      const result = await generateBotSaiResponse(enhancedPrompt)
      setResponse(result)
    } catch (err: any) {
      setError(err.message || 'Failed to generate response')
      console.error('BotSai API error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Example SAT/PSAT questions for quick selection
  const exampleQuestions = [
    "Explain how to solve quadratic equations for the SAT Math section",
    "What are the best strategies for the SAT Reading section?",
    "How do I identify and fix dangling modifiers for the Writing section?",
    "Explain the difference between PSAT and SAT scoring"
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
      {/* Background glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-300 mr-3 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            BonsAI Assistant
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ask anything about SAT or PSAT prep
            </label>
            <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.01]' : ''}`}>
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg blur opacity-75 transition-opacity duration-300 ${isFocused ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  id="prompt"
                  rows={3}
                  className={`botsai-input botsai-scrollbar ${isFocused ? 'animate-pulse-border' : ''}`}
                  placeholder="e.g., How do I solve systems of equations? What's the best way to approach the reading section?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {prompt && (
                  <button 
                    type="button" 
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    onClick={() => setPrompt('')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Example questions */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 self-center mr-1">Try:</span>
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                type="button"
                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1.5 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                onClick={() => {
                  setPrompt(question)
                  if (textareaRef.current) {
                    textareaRef.current.focus()
                  }
                }}
              >
                {question.length > 30 ? question.substring(0, 30) + '...' : question}
              </button>
            ))}
          </div>
          
          <div>
            <motion.button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`w-full ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'botsai-button'}`}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                'Get SAT/PSAT Help'
              )}
            </motion.button>
          </div>
        </form>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-5 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg text-sm flex items-start"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {response && (
            <motion.div 
              ref={responseRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                SAT/PSAT Tutor Response:
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap border border-gray-200 dark:border-gray-700 shadow-inner botsai-scrollbar" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {response}
              </div>
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                    // You could add a toast notification here
                  }}
                  className="text-xs flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy to clipboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="mt-6 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Powered by BonsAI
          </div>
          <div>Specialized for SAT/PSAT preparation</div>
        </div>
      </div>
    </div>
  )
} 