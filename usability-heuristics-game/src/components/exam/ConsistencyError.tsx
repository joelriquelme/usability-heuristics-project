import React from 'react'

/**
 * ConsistencyError: Demonstrates lack of consistency and standards
 * Problem: Similar actions look and behave differently across screens
 */
const ConsistencyError: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Escenario: Mismo guardado, distintos estilos</h3>
      
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame">
          <div className="uh-exam-inconsistent-interface">
            <div className="uh-exam-section">
              <h3>Perfil</h3>
              <button className="uh-exam-button-style-a">Guardar cambios</button>
              <p className="uh-exam-behavior-text">
                Botón azul, redondeado, con confirmación.
              </p>
            </div>

            <div className="uh-exam-section">
              <h3>Preferencias</h3>
              <button className="uh-exam-button-style-b">Guardar</button>
              <p className="uh-exam-behavior-text">
                Botón rojo, cuadrado, sin confirmación.
              </p>
            </div>

            <div className="uh-exam-section">
              <h3>Cuenta</h3>
              <button className="uh-exam-button-style-c">Save</button>
              <p className="uh-exam-behavior-text">
                Botón verde, con otro texto y otro comportamiento.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="uh-exam-problem-description">
        <p>
          <strong>Problema:</strong> La misma acción aparece con estilos y resultados distintos.
          El usuario no puede anticipar qué pasará al presionar un botón parecido en otra pantalla.
        </p>
      </div>
    </div>
  )
}

export default ConsistencyError
