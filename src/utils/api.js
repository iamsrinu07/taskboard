const simulate = (res, failureRate = 0.05) =>
  new Promise((resolve, reject) => {
    const delay = 300 + Math.random() * 800 // Reduced delay for better UX
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error('Simulated network failure'))
      } else {
        resolve(res)
      }
    }, delay)
  })

const initialBoard = {
  columns: {
    'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-3'] },
    'col-3': { id: 'col-3', title: 'Done', taskIds: [] },
  },
  columnOrder: ['col-1', 'col-2', 'col-3'],
  tasks: {
    'task-1': { id: 'task-1', title: 'Design hero section', description: 'Create a modern, responsive hero section with animations' },
    'task-2': { id: 'task-2', title: 'Setup analytics', description: 'Implement GA4 tracking with custom events' },
    'task-3': { id: 'task-3', title: 'API endpoints', description: 'Create REST API endpoints for task management' },
  },
}

export const fetchBoard = async () => {
  // No failure rate for initial board fetch to ensure app loads
  return simulate(JSON.parse(JSON.stringify(initialBoard)), 0)
}

export const applyPatch = async (patch) => {
  // Lower failure rate for operations 5%
  return simulate({ ok: true, patch }, 0.05)
}