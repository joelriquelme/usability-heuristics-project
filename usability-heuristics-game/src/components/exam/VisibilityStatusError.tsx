import React from 'react'

/**
 * VisibilityStatusError: Demonstrates lack of system state visibility
 * Problem: Button provides no feedback when clicked, causing user confusion
 */
const VisibilityStatusError: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Interfaz con problema: Visibilidad del estado del sistema</h3>
      
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame">
          <div className="uh-exam-shopping-cart">
            <div className="uh-exam-cart-header">
              <h2>Carrito de Compras</h2>
            </div>
            
            <div className="uh-exam-cart-items">
              <div className="uh-exam-cart-item">
                <div className="uh-exam-item-name">Laptop</div>
                <div className="uh-exam-item-price">$1,000</div>
              </div>
              <div className="uh-exam-cart-item">
                <div className="uh-exam-item-name">Mouse</div>
                <div className="uh-exam-item-price">$25</div>
              </div>
            </div>

            <div className="uh-exam-cart-total">
              <strong>Total: $1,025</strong>
            </div>

            <div className="uh-exam-cart-actions">
              <button className="uh-exam-button-no-feedback">
                Confirmar Pago
              </button>
              <p className="uh-exam-hint-text">
                ⚠️ El botón no muestra estado de carga ni confirmación después de ser presionado
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="uh-exam-problem-description">
        <p>
          <strong>Problema:</strong> Cuando el usuario presiona "Confirmar Pago", 
          no recibe ninguna retroalimentación visual. ¿Se está procesando? ¿Se completó? 
          ¿Falló? El usuario no sabe y puede presionar el botón múltiples veces, 
          causando pagos duplicados.
        </p>
      </div>
    </div>
  )
}

export default VisibilityStatusError
