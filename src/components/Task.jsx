import React, { useEffect, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { useBoard } from '../context/BoardContext'

function TaskInner({ task, index }) {
  const { editTask, board, moveTaskToColumn } = useBoard()
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [statusChanging, setStatusChanging] = useState(false)

  useEffect(() => setTitle(task.title), [task.title])

  const save = () => {
    const trimmed = title.trim()
    if (!trimmed) {
      setTitle(task.title)
      setEditing(false)
      return
    }
    if (trimmed !== task.title) {
      editTask(task.id, { title: trimmed }).catch(() => {})
    }
    setEditing(false)
  }

  const onStatusChange = async (e) => {
    const dstColumnId = e.target.value
    setStatusChanging(true)
    try {
      await moveTaskToColumn(task.id, dstColumnId)
    } catch (err) {
      console.error('Move failed', err)
    } finally {
      setStatusChanging(false)
    }
  }

  const getPriorityColor = () => {
    // You can extend this based on task priority if you add that field
    const colors = ['bg-blue-50 border-blue-200', 'bg-purple-50 border-purple-200', 'bg-green-50 border-green-200']
    return colors[index % colors.length]
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group bg-white rounded-xl border-2 border-gray-100 p-4 shadow-sm hover:shadow-md 
            transition-all duration-200 cursor-grab active:cursor-grabbing
            ${snapshot.isDragging ? 'shadow-2xl rotate-2 scale-105' : 'hover:-translate-y-1'}
            ${editing ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
          `}
        >
          {/* Task Content */}
          <div className="flex flex-col space-y-3">
            {/* Title Section */}
            <div className="flex-1">
              {editing ? (
                <input
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={save}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') save()
                    if (e.key === 'Escape') {
                      setTitle(task.title)
                      setEditing(false)
                    }
                  }}
                  className="w-full p-2 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <h4 
                  onDoubleClick={() => setEditing(true)}
                  className="text-sm font-semibold text-gray-900 leading-snug cursor-text hover:text-blue-600 transition-colors"
                >
                  {task.title}
                </h4>
              )}
              
              {task.description && (
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>

            {/* Task Meta and Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              {/* Status Selector */}
              <div className="flex-1 mr-3">
                <select 
                  value={Object.keys(board.columns).find(cid => board.columns[cid].taskIds.includes(task.id))} 
                  onChange={onStatusChange} 
                  disabled={statusChanging}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 cursor-pointer"
                >
                  {board.columnOrder.map(cid => (
                    <option key={cid} value={cid}>
                      {board.columns[cid].title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Task ID Badge */}
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                  #{task.id.split('-')[1]?.slice(0, 4) || 'task'}
                </span>
                
                {/* Drag Handle Indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Loading indicator for status change */}
            {statusChanging && (
              <div className="absolute inset-0 bg-white/70 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(TaskInner)