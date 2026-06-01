import React from 'react'

const Level3ErrorPrevention: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Prevención de errores — Formulario sin validación preventiva</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame" style={{ padding: 20 }}>
          
          {/* Encabezado del Formulario */}
          <div style={{ marginBottom: 16, borderBottom: '1px solid #e5e7eb', paddingBottom: 10 }}>
            <strong style={{ fontSize: 16, color: '#111827' }}>Registro de Cuenta Corporativa</strong>
            <p style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 0 0' }}>
              Complete los datos de la organización para habilitar el entorno de desarrollo.
            </p>
          </div>

          {/* Cuerpo del Formulario */}
          <div style={{ display: 'grid', gap: 14 }}>
            
            {/* Campo 1: Razón Social */}
            <div style={{ display: 'grid', gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Razón Social de la Empresa</label>
              <input 
                type="text" 
                defaultValue="Alianzas Globales S.A."
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: 13 }} 
              />
            </div>

            {/* Campo 2: Identificador Fiscal / RUT con ERROR SUPER ESPECÍFICO */}
            <div style={{ display: 'grid', gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Identificador Fiscal (RUT)</label>
              <input 
                type="text" 
                defaultValue="12.345.678-K" 
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ef4444', background: '#fef2f2', boxSizing: 'border-box', fontSize: 13, color: '#b91c1c' }} 
              />
              {/* Alerta roja de error con regla exageradamente quisquillosa */}
              <span style={{ fontSize: 11, color: '#dc2626', fontWeight: '500', marginTop: 2 }}>
                ❌ Formato incorrecto. El sistema solo acepta números correlativos sin puntos, con guion largo (—) en vez de guion corto (-).
              </span>
            </div>

            {/* Campo 3: Teléfono de Contacto */}
            <div style={{ display: 'grid', gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Teléfono de Respaldo</label>
              <input 
                type="tel" 
                defaultValue="+56 9 1234 5678" 
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: 13 }} 
              />
            </div>

            {/* Campo 4: Contraseña del Administrador */}
            <div style={{ display: 'grid', gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Contraseña del Administrador</label>
              <input 
                type="password" 
                defaultValue="Mypassword123" 
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: 13 }} 
              />
            </div>

            {/* Campo 5: Confirmación de Contraseña */}
            <div style={{ display: 'grid', gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: '500', color: '#374151' }}>Confirmar Contraseña</label>
              <input 
                type="password" 
                defaultValue="Mypassword123" 
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: 13 }} 
              />
            </div>

            {/* Botón de Envío */}
            <button 
              style={{ 
                marginTop: 8,
                padding: '10px 14px', 
                borderRadius: 6, 
                background: '#2563eb', 
                color: 'white', 
                border: 'none',
                fontWeight: '500',
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              Registrar Empresa
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Level3ErrorPrevention