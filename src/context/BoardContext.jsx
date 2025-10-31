import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { fetchBoard, applyPatch } from '../utils/api'


const BoardContext = createContext(null)
export const useBoard = () => useContext(BoardContext)


export default function BoardProvider({ children }) {
  const [board, setBoard] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  // pending operations stack (optimistic updates)
  const pendingRef = useRef([])
  const [, tick] = useState(0)

  // fetch initial board
  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    
    fetchBoard()
      .then((data) => {
        if (!mounted) return
        setBoard(data)
        setError(null)
      })
      .catch((err) => {
        if (!mounted) return
        console.error('Failed to load board:', err)
        setError('Failed to load board. Please refresh the page.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    
    return () => (mounted = false)
  }, [])


// number of pending syncs
const pendingCount = useMemo(() => pendingRef.current.length, [pendingRef.current.length])


// helper: optimistic update
const optimistic = useCallback((applyLocal, makePatch) => {
const prev = board ? JSON.parse(JSON.stringify(board)) : null
// apply locally
setBoard((b) => {
const nxt = JSON.parse(JSON.stringify(b))
applyLocal(nxt)
return nxt
})
const op = { id: Math.random().toString(36).slice(2), revert: () => setBoard(prev) }
pendingRef.current.push(op)
tick((n) => n + 1)


const promise = applyPatch(makePatch())
.then(() => {
// success -> remove pending
pendingRef.current = pendingRef.current.filter((p) => p !== op)
tick((n) => n + 1)
})
.catch((err) => {
// failure -> revert
op.revert()
pendingRef.current = pendingRef.current.filter((p) => p !== op)
tick((n) => n + 1)
console.error('Sync failed', err)
throw err
})


op.promise = promise
return promise
}, [board])
// actions
const moveTask = useCallback((source, destination) => {
if (!board) return Promise.resolve()
if (!destination) return Promise.resolve()
return optimistic(
(draft) => {
const { droppableId: srcId, index: srcIdx } = source
const { droppableId: dstId, index: dstIdx } = destination
const srcList = draft.columns[srcId].taskIds
const [moved] = srcList.splice(srcIdx, 1)
draft.columns[dstId].taskIds.splice(dstIdx, 0, moved)
},
() => ({ type: 'move', source, destination })
)
}, [board, optimistic])


const moveTaskToColumn = useCallback((taskId, dstColumnId, dstIndex = 0) => {
// find source column & index
if (!board) return Promise.resolve()
const srcColId = Object.keys(board.columns).find((colId) => board.columns[colId].taskIds.includes(taskId))
if (!srcColId) return Promise.resolve()
const srcIdx = board.columns[srcColId].taskIds.indexOf(taskId)
return moveTask({ droppableId: srcColId, index: srcIdx }, { droppableId: dstColumnId, index: dstIndex })
}, [board, moveTask])


const editTask = useCallback((taskId, fields) => {
if (!board) return Promise.resolve()
return optimistic(
(draft) => {
draft.tasks[taskId] = { ...draft.tasks[taskId], ...fields, error: null }
},
() => ({ type: 'edit', taskId, fields })
)
}, [board, optimistic])
const createTask = useCallback((columnId, title = 'New Task') => {
if (!board) return Promise.resolve()
const id = 'task-' + Math.random().toString(36).slice(2)
return optimistic(
(draft) => {
draft.tasks[id] = { id, title, description: '', error: null }
draft.columns[columnId].taskIds.unshift(id)
},
() => ({ type: 'create', columnId, task: { id, title } })
)
}, [board, optimistic])


  return (
    <BoardContext.Provider value={{ 
      board, 
      loading, 
      error, 
      moveTask, 
      moveTaskToColumn, 
      editTask, 
      createTask, 
      pendingCount 
    }}>
      {children}
    </BoardContext.Provider>
  )
}