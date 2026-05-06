import React, { useState } from 'react'
import { BsBarChart, BsBarChartFill } from 'react-icons/bs'
import '../styles/Level.css'
import '../styles/Level_5.css'

const Level5: React.FC = () => {
  // Lights state: left and right zones
  const [leftLights, setLeftLights] = useState([false, false])
  const [rightLights, setRightLights] = useState([false, false])

  // Temperature shown in the room (C). Note: slider mapping is inverted in this faulty level
  const [temperature, setTemperature] = useState(20)
  const [uiValue, setUiValue] = useState(50)

  // Intensity value 0-10 (the +/- buttons are inverted in this faulty level)
  const [intensity, setIntensity] = useState(5)

  // In this broken version, left-side controls affect the opposite (right) side.
  const toggleLeftControl = (idx: number) => {
    setRightLights((prev) => {
      const copy = [...prev]
      copy[idx] = !copy[idx]
      return copy
    })
  }

  // Right-side controls affect the left side (inverted mapping)
  const toggleRightControl = (idx: number) => {
    setLeftLights((prev) => {
      const copy = [...prev]
      copy[idx] = !copy[idx]
      return copy
    })
  }

  // Slider: moving up decreases temperature (inverted mapping)
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setUiValue(v)
    // Inverted mapping: higher UI -> lower temp
    const mapped = Math.round(30 - (v / 100) * 10) // maps 0->30, 100->20
    setTemperature(mapped)
  }

  // Buttons: + decreases intensity, - increases intensity (inverted)
  const handlePlus = () => setIntensity((v) => Math.max(0, v - 1))
  const handleMinus = () => setIntensity((v) => Math.min(10, v + 1))

  return (
    <div className="uh-card level-5">
      <div className="dcc-header">DCC Home Control</div>

      <div className="level-5__body">
        <aside className="controls">
          <h3>Controles</h3>
          <div className="control-grid" role="group" data-eval="show" question-id="level-5-control-mapping">
            <button
              role="switch"
              className={`control-switch ${rightLights[0] ? 'on' : ''}`}
              onClick={() => toggleLeftControl(0)}
              aria-checked={rightLights[0]}
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>

            <button
              role="switch"
              className={`control-switch ${leftLights[0] ? 'on' : ''}`}
              onClick={() => toggleRightControl(0)}
              aria-checked={leftLights[0]}
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>

            {/* row 2: Zone B */}
            <button
              role="switch"
              className={`control-switch ${rightLights[1] ? 'on' : ''}`}
              onClick={() => toggleLeftControl(1)}
              aria-checked={rightLights[1]}
              aria-label="Control izquierdo Zona B"
              title="Control izquierdo — Zona B (afecta derecha)"
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>

            <button
              role="switch"
              className={`control-switch ${leftLights[1] ? 'on' : ''}`}
              onClick={() => toggleRightControl(1)}
              aria-checked={leftLights[1]}
              aria-label="Control derecho Zona B"
              title="Control derecho — Zona B (afecta izquierda)"
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>
          </div>

          <div className="control-row">
            <label>Temperatura</label>
            <div className="temp-control temp-horizontal" role="region" aria-label="Control de temperatura">
              {/* Visual gradient slider horizontal */}
              <div className="temp-visual" aria-hidden="true" data-eval="show" question-id="level-5-slider-mapping">
                <div className="temp-gradient">
                  <div
                    className="temp-thumb"
                    style={{ left: `${uiValue}%` }}
                  />
                </div>
              </div>

              {/* Invisible native range over the visual to keep interactions */}
              <input
                className="temp-range"
                type="range"
                min={7}
                max={93}
                value={uiValue}
                onChange={handleSliderChange}
                aria-label="Temperatura"
              />
            </div>
          </div>

              <div className="control-row" data-eval="show" question-id="level-5-intensity-mapping">
                <label>Intensidad Lumínica</label>
                <div className="pm">
                  <button className="btn" onClick={handleMinus}><BsBarChart size={18} /></button>
                  <div className="int-value">{intensity}</div>
                  <button className="btn" onClick={handlePlus}><BsBarChartFill size={18} /></button>
                </div>
              </div>
        </aside>

        <main className="room">
          <h3 className="sr-only">Habitación</h3>
          <div className="room-card">
            <div className="room-zones">
              <div className="zone left">
                <div className="zone-label">Luces Izquierdas</div>
                <div className={`bulb ${leftLights[0] ? 'on' : ''}`}></div>
                <div className={`bulb ${leftLights[1] ? 'on' : ''}`}></div>
              </div>
              <div className="zone right">
                <div className="zone-label">Luces Derechas</div>
                <div className={`bulb ${rightLights[0] ? 'on' : ''}`}></div>
                <div className={`bulb ${rightLights[1] ? 'on' : ''}`}></div>
              </div>
            </div>

            <div className="status" data-eval="show" question-id="level-5-status-mapping">
              <div className="status-line">Temperatura actual: <strong>{temperature}°C</strong></div>
              <div className="status-line">Intensidad Lumínica: <strong>{intensity}</strong></div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default Level5
