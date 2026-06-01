import React from 'react'

const Level3Visibility: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Visibilidad — Progreso y estado</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame">
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}><strong>Descarga de actualización</strong></div>
            <div style={{ background: '#eef2f7', borderRadius: 8, padding: 6 }}>
              <div style={{ width: '75%', height: 12, background: '#2563eb', borderRadius: 6 }} />
            </div>
            <div style={{ marginTop: 8, color: '#475569' }}>75% — 00:01:23 restantes</div>

            <hr style={{ margin: '16px 0' }} />

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button style={{ padding: '8px 12px', borderRadius: 8, background: '#10b981', color: 'white', border: 'none' }}>Enviar</button>
              <div style={{ color: '#6b7280' }}>Estado del botón: Procesando…</div>
            </div>

            <div style={{ marginTop: 14 }} className="uh-exam-hint-text">Indicadores claros (barra, % y texto) ayudan al usuario a saber cuánto falta y si puede cancelar.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level3Visibility
