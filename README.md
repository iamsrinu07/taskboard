# Collaborative Task Board

A modern, responsive Kanban-style task management application built with React and optimistic updates for real-time collaboration. This application demonstrates advanced React patterns including drag-and-drop functionality, context management, and optimistic UI updates.

##  Features

- **Drag & Drop Interface**: Intuitive drag-and-drop task management using @hello-pangea/dnd
- **Optimistic Updates**: Instant UI feedback with automatic synchronization
- **Real-time Sync Status**: Visual indicators for pending operations and sync status
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Column-based Organization**: Traditional Kanban board with To Do, In Progress, and Done columns
- **Inline Task Editing**: Double-click tasks to edit titles directly
- **Task Creation**: Quick task creation with column selection
- **Status Management**: Change task status via dropdown or drag-and-drop
- **Error Handling**: Graceful handling of network failures with automatic rollback

##  Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.16
- **Drag & Drop**: @hello-pangea/dnd 18.0.1
- **Routing**: React Router DOM 7.9.5
- **Linting**: ESLint 9.36.0




##  Architecture

### State Management
The application uses React Context API with optimistic updates for state management:

- **BoardContext**: Manages global board state, task operations, and sync status
- **Optimistic Updates**: Local changes are applied immediately while syncing with backend
- **Error Handling**: Failed operations automatically revert to previous state

### Key Components

1. **BoardProvider**: Central state management with optimistic update system
2. **MainBoard**: Drag-and-drop context and column rendering
3. **Column**: Individual column with droppable area
4. **Task**: Draggable task cards with inline editing
5. **Header**: Application controls and sync status indicator

### API Simulation
The `api.js` file simulates backend operations with:
- Network delay simulation (600-1800ms)
- Random failure simulation (20% failure rate)
- Optimistic update patch system

##  Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/iamsrinu07/ReactTodo>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

##  Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

##  Usage

### Creating Tasks
1. Click the "+ New Task" button in the header
2. Enter a task title and select the target column
3. Click "Create" to add the task

### Managing Tasks
- **Move Tasks**: Drag and drop tasks between columns
- **Edit Titles**: Double-click any task title to edit inline
- **Change Status**: Use the dropdown in each task to change columns
- **Monitor Sync**: Watch the sync indicator in the header for operation status

### Understanding Sync Status
- **"All synced"** (green): All operations completed successfully
- **"Syncing… (N)"** (yellow): Number of pending operations in progress

##  Configuration

### Tailwind CSS
The project uses Tailwind CSS 4.x with the new Vite plugin. Configuration can be found in:
- `vite.config.js` - Vite and plugin configuration
- `src/index.css` - Tailwind imports and custom CSS

### ESLint
ESLint is configured with React-specific rules in `eslint.config.js`


### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Considerations
- The current API simulation should be replaced with real backend endpoints
- Consider implementing authentication for multi-user scenarios
- Add persistence layer for task data

##  Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

##  Known Issues

- API simulation includes intentional failures for testing
- No data persistence (tasks reset on page reload)
- Limited to three predefined columns

##  Future Enhancements

- [ ] Real backend integration
- [ ] User authentication and authorization
- [ ] Custom column creation and management
- [ ] Task due dates and priorities
- [ ] File attachments and comments
- [ ] Team collaboration features
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Task search and filtering
# taskboard
# taskboard
