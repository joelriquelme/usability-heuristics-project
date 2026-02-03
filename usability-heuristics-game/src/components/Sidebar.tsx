import React from 'react'
import '../styles/game.css'
import LevelItem from './LevelItem'

/**
 * Sidebar: navigation and level list.
 * Keep purely presentational — accepts children if needed.
 */
export const Sidebar: React.FC = () => {
  return (
    <aside className="uh-sidebar">
      <div className="uh-sidebar-header">Levels</div>
      <ul className="uh-level-list">
        <LevelItem title="Level 1" completed to="/level/1" />
        <LevelItem title="Level 2" to="/level/2" />
        <LevelItem title="Level 3" to="/level/3" />
        <LevelItem title="Level 4" to="/level/4" />
        <LevelItem title="Level 5" to="/level/5" />
        <LevelItem title="Level 6" to="/level/6" />
        <LevelItem title="Level 7" to="/level/7" />
        <LevelItem title="Level 8" to="/level/8" />
        <LevelItem title="Level 9" to="/level/9" />
      </ul>
    </aside>
  )
}

export default Sidebar
