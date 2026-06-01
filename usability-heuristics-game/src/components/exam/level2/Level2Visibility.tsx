import React from 'react'

const Level2Visibility: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Visibilidad: Tablero de tren congelado</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame uh-exam-train-board">
          <div className="uh-exam-train-board-top">
            <span className="uh-exam-train-badge">Andén 3</span>
            <strong>Salida en curso</strong>
          </div>
          <div className="uh-exam-train-board-main">
            <div className="uh-exam-train-icon">🚆</div>
            <div className="uh-exam-train-status-card">
              <span className="uh-exam-train-status-label">Próximo tren</span>
              <strong>--</strong>
            </div>
            <div className="uh-exam-train-track">
              <span className="uh-exam-train-dot uh-exam-train-dot-active"></span>
              <span className="uh-exam-train-dot"></span>
              <span className="uh-exam-train-dot"></span>
              <span className="uh-exam-train-dot"></span>
            </div>
            <div className="uh-exam-train-wave">
              <span className="uh-exam-train-wave-bar"></span>
              <span className="uh-exam-train-wave-bar"></span>
              <span className="uh-exam-train-wave-bar"></span>
              <span className="uh-exam-train-wave-bar"></span>
            </div>
          </div>
          <div className="uh-exam-train-board-footer">
            <span className="uh-exam-train-chip">Pantalla congelada</span>
            <span className="uh-exam-train-chip uh-exam-train-chip-muted">No cambia desde hace rato</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level2Visibility
