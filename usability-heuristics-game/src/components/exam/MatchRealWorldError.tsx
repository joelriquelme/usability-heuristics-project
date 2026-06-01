import React from 'react'

/**
 * MatchRealWorldError: Demonstrates mismatch between system language and real world
 * Problem: Uses technical jargon instead of everyday language
 */
const MatchRealWorldError: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Escenario: Lenguaje técnico confuso</h3>
      
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame">
          <div className="uh-exam-tech-interface">
            <div className="uh-exam-tech-header">
              <h2>Configuración avanzada</h2>
            </div>

            <div className="uh-exam-tech-options">
              <div className="uh-exam-tech-option">
                <span className="uh-exam-unicode-symbol">⚙</span>
                <span className="uh-exam-tech-label">Execute authorization handshake</span>
              </div>
              <div className="uh-exam-tech-option">
                <span className="uh-exam-unicode-symbol">🔌</span>
                <span className="uh-exam-tech-label">Synchronize credential payload</span>
              </div>
              <div className="uh-exam-tech-option">
                <span className="uh-exam-unicode-symbol">📡</span>
                <span className="uh-exam-tech-label">Initialize remote transmission vector</span>
              </div>
              <div className="uh-exam-tech-option">
                <span className="uh-exam-unicode-symbol">🔐</span>
                <span className="uh-exam-tech-label">Commit secure transport protocol</span>
              </div>
            </div>

            <button className="uh-exam-button-technical">
              Run process
            </button>
          </div>
        </div>
      </div>

      <div className="uh-exam-problem-description">
        <p>
          <strong>Problema:</strong> La interfaz no habla con palabras cotidianas.
          Usa lenguaje técnico que obliga al usuario a traducir mentalmente qué significa cada acción.
        </p>
      </div>
    </div>
  )
}

export default MatchRealWorldError
