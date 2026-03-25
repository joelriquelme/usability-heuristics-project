import React from 'react'
import '../styles/game.css'

type ToggleText = {
  left: string
  right: string
}

type Props = {
  checked?: boolean
  onChange?: (v: boolean) => void
  className?: string
  text?: ToggleText
}

/** ToggleMode: simple presentational toggle used in the global layout */
export const ToggleMode: React.FC<Props> = ({ checked = false, onChange, className, text = { left: 'Modo exploratorio', right: 'Modo evaluativo' } }) => {
  const classes = ['uh-switch', className].filter(Boolean).join(' ')
  return (
    <div className="toggle-mode-container">
      <div className="toggle-mode">
        <span className="toggle-mode__label">{text.left}</span>
        <label className={classes}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
          />
          <span className="uh-slider" />
        </label>
        <span className="toggle-mode__label">{text.right}</span>
      </div>
    </div>
  )
}

export default ToggleMode
