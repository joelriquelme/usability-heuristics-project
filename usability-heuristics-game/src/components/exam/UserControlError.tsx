import React from 'react'

/**
 * UserControlError: Demonstrates lack of user control and freedom
 * Problem: User cannot easily undo or escape the dialog
 */
const UserControlError: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Escenario: Diálogo atrapado sin salida</h3>
      
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame">
          <div className="uh-exam-no-exit-dialog">
            <div className="uh-exam-dialog-header">
              <h2>Eliminar todos los datos</h2>
            </div>

            <div className="uh-exam-dialog-content">
              <p>
                ¿Estás seguro de que deseas eliminar TODOS los datos del sistema? 
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="uh-exam-dialog-buttons">
              <button className="uh-exam-button-dangerous">
                Sí, Eliminar TODO
              </button>
              <button className="uh-exam-button-disabled">
                Cancelar
              </button>
            </div>

            <p className="uh-exam-no-close-hint">
              ❌ El botón cancelar no funciona, no existe X para cerrar y no hay opción de regresar.
            </p>
          </div>
        </div>
      </div>

      <div className="uh-exam-problem-description">
        <p>
          <strong>Problema:</strong> El usuario entra al cuadro de diálogo, pero no tiene una salida clara.
          No puede cancelar, cerrar ni deshacer la acción iniciada.
        </p>
      </div>
    </div>
  )
}

export default UserControlError
