import React from 'react'
import { useBoard } from '../context/BoardContext'

export default function SyncOverlay() {
  const { pendingCount } = useBoard()

  if (pendingCount === 0) return null

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center animate-fade-in">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 max-w-sm mx-4 transform animate-slide-up">
        <div className="text-center">
          {/* Animated sync icon with multiple rings */}
          <div className="relative mb-6 flex justify-center">
            {/* Outer ring */}
            <div className="w-20 h-20 border-4 border-blue-100 rounded-full animate-spin"></div>
            {/* Middle ring */}
            <div className="w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full animate-spin absolute top-2 left-2" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            {/* Inner ring */}
            <div className="w-12 h-12 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-4 left-4" style={{ animationDuration: '0.8s' }}></div>
            
            {/* Sync icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sync message */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Syncing Changes
          </h3>
          
          <p className="text-gray-600 mb-6">
            {pendingCount === 1 
              ? 'Saving 1 change to the cloud...' 
              : `Saving ${pendingCount} changes to the cloud...`
            }
          </p>

          {/* Animated progress dots */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          <p className="text-xs text-gray-500">
            Your changes are being synchronized
          </p>
        </div>
      </div>
    </div>
  )
}