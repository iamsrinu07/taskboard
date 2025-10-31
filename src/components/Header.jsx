import React, { useState } from 'react'
import { useBoard } from '../context/BoardContext'
import CreateTask from './CreateTask'

const Header = () => {
  const { pendingCount } = useBoard()
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Task Board
            </h1>
          </div>

          {/* Actions and Status */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setOpenCreate(!openCreate)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </button>

            {/* Sync Status Indicator */}
            <div className="flex items-center">
              {pendingCount > 0 ? (
                <div className="flex items-center px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-medium text-blue-700">
                    Syncing ({pendingCount})
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {openCreate && <CreateTask onClose={() => setOpenCreate(false)} />}
    </header>
  )
}

export default React.memo(Header)