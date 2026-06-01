import React from 'react'

const Level2Consistency: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Consistencia: App de viajes con controles incompatibles</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame uh-exam-travel-app">
          <div className="uh-exam-travel-header">
            <div>
              <span className="uh-exam-travel-chip">Viaje</span>
              <h2>Reserva tu trayecto</h2>
            </div>
            <div className="uh-exam-travel-avatar">T</div>
          </div>
          <div className="uh-exam-travel-tabs">
            <button className="uh-exam-travel-tab uh-exam-travel-tab-active">Rutas</button>
            <button className="uh-exam-travel-tab">Tickets</button>
            <button className="uh-exam-travel-tab">Perfil</button>
          </div>
          <div className="uh-exam-travel-card uh-exam-travel-card-left">
            <strong>Ir al centro</strong>
            <button className="uh-exam-travel-btn-a">Reservar</button>
          </div>
          <div className="uh-exam-travel-card uh-exam-travel-card-mid">
            <strong>Ir al aeropuerto</strong>
            <button className="uh-exam-travel-btn-b">Book now</button>
          </div>
          <div className="uh-exam-travel-card uh-exam-travel-card-right">
            <strong>Ir a la estación</strong>
            <button className="uh-exam-travel-btn-c">Compra</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Level2Consistency
