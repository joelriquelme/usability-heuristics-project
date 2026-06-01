import React from 'react'

const Level3MatchReal: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Coincidencia con el mundo real — Mensaje técnico confuso</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame uh-exam-tech-interface">
          <div className="uh-exam-tech-header">
            <h2>Fallo en módulo X</h2>
          </div>
          <div style={{ display: 'grid', gap: 10, padding: 12 }}>
            <div className="uh-exam-tech-option">
              <div className="uh-exam-unicode-symbol">⚠️</div>
              <div>
                <div className="uh-exam-tech-label">Error 0x00023: NullPointerException</div>
                <div style={{ color: '#64748b', fontSize: '0.85rem' }}>Código interno no traducido al lenguaje del usuario.</div>
              </div>
            </div>
            <div style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Consulte el manual técnico para más detalles.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level3MatchReal
