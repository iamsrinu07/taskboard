import React from 'react'
import BoardProvider from './context/BoardContext'
import Header from './components/Header'
import MainBoard from './components/MainBoard'
import SyncOverlay from './components/SyncOverlay'
import './App.css'

export default function App() {
  return (
    <BoardProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <MainBoard />
        <SyncOverlay />
      </div>
    </BoardProvider>
  )
}