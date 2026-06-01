import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Tutorial from './pages/Tutorial'
import Level from './pages/Level'
import ExamLevel1 from './pages/exam/ExamLevel1'
import ExamLevel2 from './pages/exam/ExamLevel2'
import ExamLevel3 from './pages/exam/ExamLevel3'
import './styles/game.css'

/**
 * App: top-level application shell.
 * This file only composes high-level layout and imports shared styles.
 * Level-specific interfaces and game logic will live under `src/features/*` later.
 */
const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className={`uh-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar />
        <div className="uh-main">
          <TopBar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
          <div className="uh-game-container">
            <Routes>
              <Route path="/" element={<Navigate to="/level/1" replace />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/level/:id" element={<Level />} />
              <Route path="/exam/level-1" element={<ExamLevel1 />} />
              <Route path="/exam/level-2" element={<ExamLevel2 />} />
              <Route path="/exam/level-3" element={<ExamLevel3 />} />
            </Routes>
          </div>
        </div>

        {/* overlay only active on narrow screens; clicking closes sidebar */}
        <div className="uh-overlay" onClick={() => setSidebarOpen(false)} aria-hidden />
      </div>
    </BrowserRouter>
  )
}

export default App
