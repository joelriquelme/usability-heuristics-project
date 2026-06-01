import React from 'react'

const Level2UserControl: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Control: Carrito sin deshacer ni volver atrás</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame uh-exam-cart-undo-flow">
          <div className="uh-exam-cart-undo-top">
            <span className="uh-exam-cart-undo-chip">Carrito</span>
            <strong>Pedido activo</strong>
          </div>
          <div className="uh-exam-cart-undo-card">
            <div className="uh-exam-cart-undo-item">
              <span>Audífonos inalámbricos</span>
              <strong>$120</strong>
            </div>
            <div className="uh-exam-cart-undo-item">
              <span>Smartwatch</span>
              <strong>$220</strong>
            </div>
            <div className="uh-exam-cart-undo-item uh-exam-cart-undo-item-highlight">
              <span>Producto recién eliminado</span>
              <strong>Recuperación no disponible</strong>
            </div>
          </div>
          <div className="uh-exam-cart-undo-toolbar">
            <button className="uh-exam-cart-undo-btn-muted">← Volver</button>
            <button className="uh-exam-cart-undo-btn-primary">Pagar</button>
          </div>
          <div className="uh-exam-cart-undo-toast">Se eliminó un producto. No aparece opción de deshacer.</div>
        </div>
      </div>
    </div>
  )
}

export default Level2UserControl
