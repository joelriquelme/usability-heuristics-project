import React, { useState } from 'react'
import { LuSun, LuMoon } from "react-icons/lu";
import { FaPlus, FaMinus } from "react-icons/fa";
import '../styles/Level.css'
import '../styles/Level_5.css'

const Level5Correct: React.FC = () => {
  const [leftLights, setLeftLights] = useState([false, false])
  const [rightLights, setRightLights] = useState([false, false])
  const [temperature, setTemperature] = useState(22)
  const [uiValue, setUiValue] = useState(50)
  const [intensity, setIntensity] = useState(5)

  // Natural mapping: controls affect their corresponding side
  const toggleLeftControl = (idx: number) => {
    setLeftLights((prev) => {
      const copy = [...prev]
      copy[idx] = !copy[idx]
      return copy
    })
  }

  const toggleRightControl = (idx: number) => {
    setRightLights((prev) => {
      const copy = [...prev]
      copy[idx] = !copy[idx]
      return copy
    })
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setUiValue(v)
    // Natural mapping: higher UI -> higher temp
    const mapped = Math.round(20 + (v / 100) * 15)
    setTemperature(mapped)
  }

  const handlePlus = () => setIntensity((v) => Math.min(10, v + 1))
  const handleMinus = () => setIntensity((v) => Math.max(0, v - 1))

  return (
    <div className="uh-card level-5-correct">
      <div className="dcc-header">DCC Home Control</div>

      <div className="level-5__body">
        <aside className="controls">
          <h3>Controles</h3>

          <div className="control-grid" role="group" aria-label="Controles de luces">
            <button
              role="switch"
              className={`control-switch ${leftLights[0] ? 'on' : ''}`}
              onClick={() => toggleLeftControl(0)}
              aria-checked={leftLights[0]}
              aria-label="Control izquierdo Zona A"
              title="Control izquierdo — Zona A"
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>

            <button
              role="switch"
              className={`control-switch ${rightLights[0] ? 'on' : ''}`}
              onClick={() => toggleRightControl(0)}
              aria-checked={rightLights[0]}
              aria-label="Control derecho Zona A"
              title="Control derecho — Zona A"
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>

            <button
              role="switch"
              className={`control-switch ${leftLights[1] ? 'on' : ''}`}
              onClick={() => toggleLeftControl(1)}
              aria-checked={leftLights[1]}
              aria-label="Control izquierdo Zona B"
              title="Control izquierdo — Zona B"
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>

            <button
              role="switch"
              className={`control-switch ${rightLights[1] ? 'on' : ''}`}
              onClick={() => toggleRightControl(1)}
              aria-checked={rightLights[1]}
              aria-label="Control derecho Zona B"
              title="Control derecho — Zona B"
            >
              <span className="switch-track"><span className="switch-thumb" /></span>
            </button>
          </div>

          <div className="control-row">
            <label>Temperatura</label>
            <div className="temp-control temp-horizontal" role="region" aria-label="Control de temperatura">
              <div className="temp-visual" aria-hidden="true">
                <div className="temp-gradient">
                  <div className="temp-thumb" style={{ left: `${uiValue}%` }} />
                </div>
              </div>
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

          <div className="control-row">
            <label>Intensidad Lumínica</label>
            <div className="pm">
              <button className="btn" onClick={handleMinus} aria-label="Disminuir intensidad" title="Disminuir intensidad"><FaMinus size={14} /><LuMoon size={18} /></button>
              <div className="int-value">{intensity}</div>
              <button className="btn" onClick={handlePlus} aria-label="Aumentar intensidad" title="Aumentar intensidad"><LuSun size={18} /><FaPlus size={14} /></button>
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

            <div className="status">
              <div className="status-line">Temperatura actual: <strong>{temperature}°C</strong></div>
              <div className="status-line">Intensidad Lumínica: <strong>{intensity}</strong></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Level5Correct
