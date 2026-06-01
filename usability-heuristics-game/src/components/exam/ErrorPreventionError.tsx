import React from 'react'

/**
 * ErrorPreventionError: Demonstrates lack of error prevention
 * Problem: System allows destructive actions without confirmation or warning
 */
const ErrorPreventionError: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Escenario: Borrado irreversible sin confirmación</h3>
      
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame">
          <div className="uh-exam-no-protection">
            <div className="uh-exam-file-manager">
              <h2>Mis archivos</h2>
              
              <div className="uh-exam-file-list">
                <div className="uh-exam-file-item">
                  <input type="checkbox" />
                  <span>vacaciones_2024.jpg</span>
                </div>
                <div className="uh-exam-file-item">
                  <input type="checkbox" />
                  <span>boda_familia.jpg</span>
                </div>
                <div className="uh-exam-file-item">
                  <input type="checkbox" />
                  <span>recuerdos_infancia.jpg</span>
                </div>
                <div className="uh-exam-file-item">
                  <input type="checkbox" />
                  <span>fotos_hijos.jpg</span>
                </div>
              </div>

              <div className="uh-exam-actions">
                <button className="uh-exam-button-dangerous-no-warning">
                  🗑️ Eliminar seleccionados
                </button>
                <p className="uh-exam-no-confirmation-text">
                  Se elimina al hacer clic. No aparece aviso previo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="uh-exam-problem-description">
        <p>
          <strong>Problema:</strong> La interfaz permite una acción destructiva sin barreras de seguridad.
          Un clic accidental puede borrar información importante de forma permanente.
        </p>
      </div>
    </div>
  )
}

export default ErrorPreventionError
