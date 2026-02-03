import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Home from './pages/Home'
import Level from './pages/Level'
import './styles/game.css'

/**
 * App: top-level application shell.
 * This file only composes high-level layout and imports shared styles.
 * Level-specific interfaces and game logic will live under `src/features/*` later.
 */
const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <BrowserRouter>
      <div className={`uh-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Sidebar />
        <div className="uh-main">
          <TopBar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
          <div className="uh-game-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/level/:id" element={<Level />} />
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
