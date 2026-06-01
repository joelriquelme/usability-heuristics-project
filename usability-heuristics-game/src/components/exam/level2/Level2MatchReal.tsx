import React from 'react'

const Level2MatchReal: React.FC = () => {
  return (
    <div className="uh-exam-error-container">
      <h3>Coincidencia: Reserva de mesa con lenguaje técnico</h3>
      <div className="uh-exam-error-scene">
        <div className="uh-exam-mockup-frame uh-exam-booking-card">
          <div className="uh-exam-booking-topbar">
            <span className="uh-exam-booking-chip">Restaurante</span>
            <h2>Reservar mesa</h2>
          </div>
          <div className="uh-exam-booking-list">
            <div className="uh-exam-booking-row"><span>GuestCount</span><strong>2 pax</strong></div>
            <div className="uh-exam-booking-row"><span>SlotReserve</span><strong>19:30 UTC</strong></div>
            <div className="uh-exam-booking-row"><span>CommitSeat</span><strong>Enabled</strong></div>
          </div>
          <div className="uh-exam-booking-footer">El usuario esperaba palabras como “personas”, “hora” y “confirmar”.</div>
        </div>
      </div>
    </div>
  )
}

export default Level2MatchReal
