import React, { useState } from 'react'
import { useBoard } from '../context/BoardContext'

export default function CreateTask({ onClose }) {
  const { board, createTask } = useBoard()
  const [title, setTitle] = useState('')
  const [column, setColumn] = useState(board ? board.columnOrder[0] : 'col-1')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    try {
      await createTask(column, title.trim())
      setTitle('')
      onClose()
    } catch (err) {
      console.error('Create failed', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm animate-slide-up">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Create New Task</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="p-6 space-y-4">
            {/* Task Title */}
            <div>
              <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                id="task-title"
                type="text"
                autoFocus
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                disabled={loading}
              />
            </div>

            {/* Column Selection */}
            <div>
              <label htmlFor="task-column" className="block text-sm font-medium text-gray-700 mb-2">
                Column
              </label>
              <select 
                id="task-column"
                value={column} 
                onChange={(e) => setColumn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 cursor-pointer"
                disabled={loading}
              >
                {board && board.columnOrder.map((cid) => (
                  <option key={cid} value={cid}>
                    {board.columns[cid].title}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 disabled:active:scale-100"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Task
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 active:scale-95"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}