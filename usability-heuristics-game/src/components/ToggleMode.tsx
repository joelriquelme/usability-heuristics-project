import React from 'react'
import '../styles/game.css'

// Definimos los tipos de modos posibles para mayor seguridad
export type GameMode = 'exploratory' | 'evaluative' | 'corrected'

type Props = {
  currentMode: GameMode
  onChangeMode: (mode: GameMode) => void
  allCorrect: boolean
  className?: string
}

/** ToggleMode: Selector de modo (Exploratorio, Evaluativo, Corregido) */
export const ToggleMode: React.FC<Props> = ({ 
  currentMode, 
  onChangeMode, 
  allCorrect, 
  className 
}) => {
  const classes = ['toggle-mode-container', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <div className="triple-toggle">
        {/* Botón Exploratorio */}
        <button
          type="button"
          className={`toggle-btn ${currentMode === 'exploratory' ? 'active' : ''}`}
          onClick={() => onChangeMode('exploratory')}
        >
          Exploratorio
        </button>

        {/* Botón Evaluativo */}
        <button
          type="button"
          className={`toggle-btn ${currentMode === 'evaluative' ? 'active' : ''}`}
          onClick={() => onChangeMode('evaluative')}
        >
          Evaluativo
        </button>

        {/* Botón Corregido (Condicionado a allCorrect) */}
        {allCorrect && (
          <button
            type="button"
            className={`toggle-btn ${currentMode === 'corrected' ? 'active' : ''}`}
            onClick={() => onChangeMode('corrected')}
          >
            Corregido
          </button>
        )}
      </div>
    </div>
  )
}

export default ToggleMode
