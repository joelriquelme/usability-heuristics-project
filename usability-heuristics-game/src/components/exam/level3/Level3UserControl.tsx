import React from 'react'

const Level3UserControl: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Control y libertad — Navegación atrapada</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame" style={{ padding: 16 }}>
          
          {/* Encabezado con la barra de navegación exagerada en profundidad */}
          <div style={{ marginBottom: 16, borderBottom: '1px solid #e5e7eb', paddingBottom: 12 }}>
            <div style={{ display: 'flex', gap: 6, fontSize: 12, color: '#6b7280', flexWrap: 'wrap' }}>
              <span>Inicio</span>
              <span>&gt;</span>
              <span>Panel de Control</span>
              <span>&gt;</span>
              <span>Ajustes de Cuenta</span>
              <span>&gt;</span>
              <span>Configuración Avanzada</span>
              <span>&gt;</span>
              <span>Seguridad y Privacidad</span>
              <span>&gt;</span>
              <span>Gestión de Credenciales</span>
              <span>&gt;</span>
              <span style={{ fontWeight: '600', color: '#111827' }}>Cifrado de Llaves API</span>
            </div>
          </div>
          
          {/* Panel de contenido principal con campos de configuración simulados */}
          <div style={{ borderRadius: 12, padding: 16, background: '#fcfaf7', border: '1px solid #e5e7eb' }}>
            <div style={{ fontWeight: '600', marginBottom: 4, color: '#111827', fontSize: 15 }}>
              Parámetros de Cifrado Asimétrico
            </div>
            <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 16px 0', lineHeight: '1.4' }}>
              Configure las propiedades globales para la rotación automática de llaves criptográficas del entorno de producción.
            </p>
            
            {/* Campos del formulario para realismo */}
            <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'grid', gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Algoritmo de Hash</label>
                <select defaultValue="sha256" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', fontSize: 13, color: '#111827' }}>
                  <option value="sha256">SHA-256 (Recomendado)</option>
                  <option value="sha512">SHA-512</option>
                  <option value="md5">MD5 (Inseguro)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gap: 4 }}>
                <label style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Frecuencia de Rotación</label>
                <select defaultValue="30" style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', fontSize: 13, color: '#111827' }}>
                  <option value="15">Cada 15 días</option>
                  <option value="30">Cada 30 días</option>
                  <option value="90">Cada 90 días</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <input type="checkbox" id="force-tls" defaultChecked style={{ width: 14, height: 14 }} />
                <label htmlFor="force-tls" style={{ fontSize: 12, color: '#374151', cursor: 'pointer' }}>
                  Forzar negociación TLS 1.3 estricta
                </label>
              </div>
            </div>
            
            {/* Barra de acciones inferior */}
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', gap: 8, borderTop: '1px solid #f3f4f6', paddingTop: 14 }}>
              <button 
                style={{ 
                  padding: '8px 14px', 
                  borderRadius: 6, 
                  border: '1px solid #d1d5db', 
                  background: '#ffffff', 
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: '500',
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <span>←</span> Volver un paso atrás
              </button>
              
              <button 
                disabled
                style={{ 
                  padding: '8px 14px', 
                  borderRadius: 6, 
                  border: 'none', 
                  background: '#e5e7eb', 
                  color: '#9ca3af',
                  cursor: 'not-allowed',
                  fontSize: 13,
                  fontWeight: '500'
                }}
              >
                Guardar cambios
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Level3UserControl