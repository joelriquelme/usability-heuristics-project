import React from 'react'

const Level3Consistency: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Consistencia y estándares — Patrón de ubicación inconsistente</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame" style={{ padding: 12 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, background: '#f0f9ff', borderRadius: 8 }}>
              <div><strong>Sección A</strong></div>
              <div><button style={{ padding: '6px 10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 4 }}>Aceptar</button></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 10, background: '#fef3c7', borderRadius: 8 }}>
              <div><button style={{ padding: '6px 10px', background: '#ea580c', color: 'white', border: 'none', borderRadius: 4 }}>Aceptar</button></div>
              <div><strong>Sección B</strong></div>
            </div>

            <div style={{ display: 'grid', gap: 8, padding: 10, background: '#f3e8ff', borderRadius: 8 }}>
              <div><strong>Sección C</strong></div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button style={{ padding: '6px 10px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: 4 }}>Aceptar</button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 10, color: '#7c2d12' }}>Ubicación y color del botón "Aceptar" cambia en cada sección.</div>
        </div>
      </div>
    </div>
  )
}

export default Level3Consistency
