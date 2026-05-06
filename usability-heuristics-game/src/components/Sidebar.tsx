import React, { useState } from 'react'
import '../styles/game.css'
import LevelItem from './LevelItem'
import { clearAllProgress, isLevelCompleted } from '../utils/levelProgress'
import ConfirmModal from './ConfirmModal'

/**
 * Sidebar: navigation and level list.
 * Keep purely presentational — accepts children if needed.
 */
export const Sidebar: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleReset = () => setConfirmOpen(true);

  const doReset = () => {
    try {
      clearAllProgress();
      localStorage.removeItem('uh_tutorial_seen');
    } catch (e) {
      console.error('Failed to clear progress', e);
    }
    setConfirmOpen(false);
    window.location.reload();
  };

  return (
    <aside className="uh-sidebar">
      <div className="uh-sidebar-header">Niveles</div>
      <ul className="uh-level-list">
        {Array.from({ length: 9 }).map((_, i) => {
          const levelId = String(i + 1)
          const completed = isLevelCompleted(levelId)
          return (
            <LevelItem key={levelId} title={`Nivel ${levelId}`} completed={completed} to={`/level/${levelId}`} />
          )
        })}
      </ul>
      <div className="uh-sidebar-footer">
        <button className="uh-reset-btn" onClick={handleReset} aria-haspopup="dialog">Reiniciar progreso</button>
      </div>
      {confirmOpen && (
        <ConfirmModal
          title="Reiniciar progreso"
          message="¿Deseas reiniciar todo el progreso? Esto eliminará los niveles completados y el tutorial visto."
          confirmText="Reiniciar"
          cancelText="Cancelar"
          onConfirm={doReset}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </aside>
  )
}

export default Sidebar
