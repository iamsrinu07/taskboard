import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import Task from './Task'
import { useBoard } from '../context/BoardContext'

function ColumnInner({ column }) {
  const { board } = useBoard()
  const tasks = column.taskIds.map((tid) => board.tasks[tid])

  const getColumnStyle = (columnId) => {
    const styles = {
      'col-1': 'from-rose-50 to-pink-50 border-rose-200',
      'col-2': 'from-amber-50 to-orange-50 border-amber-200',
      'col-3': 'from-emerald-50 to-green-50 border-emerald-200'
    }
    return styles[columnId] || 'from-gray-50 to-slate-50 border-gray-200'
  }

  const getColumnIcon = (columnId) => {
    const icons = {
      'col-1': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      'col-2': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'col-3': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
    return icons[columnId] || icons['col-1']
  }

  const getColumnTextColor = (columnId) => {
    const colors = {
      'col-1': 'text-rose-700',
      'col-2': 'text-amber-700',
      'col-3': 'text-emerald-700'
    }
    return colors[columnId] || 'text-gray-700'
  }

  return (
    <div className={`bg-gradient-to-b ${getColumnStyle(column.id)} rounded-2xl border-2 shadow-soft hover:shadow-medium transition-all duration-300 flex flex-col h-fit min-h-[500px]`}>
      {/* Column Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-3 mb-2">
          <div className={`${getColumnTextColor(column.id)}`}>
            {getColumnIcon(column.id)}
          </div>
          <h3 className={`text-lg font-bold ${getColumnTextColor(column.id)}`}>
            {column.title}
          </h3>
          <span className="ml-auto bg-white/60 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-600">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id} type="TASK">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 px-4 pb-4 space-y-3 transition-all duration-200 ${
              snapshot.isDraggingOver 
                ? 'bg-blue-100/30 rounded-xl mx-2' 
                : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
            
            {/* Empty state */}
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-white/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium">No tasks yet</p>
                <p className="text-xs text-gray-400 mt-1">Drag tasks here or create new ones</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default React.memo(ColumnInner)