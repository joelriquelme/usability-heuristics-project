import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/game.css'

type Props = {
  onToggleSidebar?: () => void
}

/** TopBar: shows page actions and small info */
export const TopBar: React.FC<Props> = ({ onToggleSidebar }) => {
  return (
    <nav className="uh-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button aria-label="Abrir menú" className="uh-hamburger" onClick={onToggleSidebar}>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect width="18" height="2" rx="1" fill="currentColor" />
            <rect y="5" width="18" height="2" rx="1" fill="currentColor" />
            <rect y="10" width="18" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <div className="uh-topbar-left">
          <Link to="/" className="uh-brand-link">Usability Heuristics</Link>
        </div>
      </div>
      <div className="uh-topbar-right">lorem · ipsum</div>
    </nav>
  )
}

export default TopBar
