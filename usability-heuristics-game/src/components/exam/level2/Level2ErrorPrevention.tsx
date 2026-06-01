import React from 'react'

const Level2ErrorPrevention: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Prevención de errores: Transferencia bancaria peligrosa</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame uh-exam-bank-transfer">
          <div className="uh-exam-bank-header">
            <span>Banco Central</span>
            <strong>Transferir dinero</strong>
          </div>
          <div className="uh-exam-bank-body">
            <div className="uh-exam-bank-row"><span>Destino</span><strong>Cuenta externa</strong></div>
            <div className="uh-exam-bank-row"><span>Monto</span><strong>$1,250</strong></div>
            <div className="uh-exam-bank-row"><span>Confirmación</span><strong>No solicitada</strong></div>
          </div>
          <div className="uh-exam-bank-warning">El botón "Transferir" está activo sin chequeos previos ni revisión final.</div>
          <div className="uh-exam-bank-actions">
            <button className="uh-exam-button-dangerous">Transferir ahora</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level2ErrorPrevention
