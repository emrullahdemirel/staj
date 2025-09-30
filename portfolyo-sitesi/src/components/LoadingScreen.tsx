'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gradient mb-2">
            Sanat Tarihi Portfolyo
          </h1>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">{progress}%</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-300 rounded-full animate-float opacity-60" />
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-secondary-300 rounded-full animate-float animation-delay-200 opacity-60" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary-400 rounded-full animate-float animation-delay-400 opacity-60" />
          <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-secondary-400 rounded-full animate-float animation-delay-600 opacity-60" />
        </div>
      </div>
    </div>
  )
}