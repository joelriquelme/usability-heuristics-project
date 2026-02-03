import React from 'react'
import '../styles/game.css'

type Props = {
  checked?: boolean
  onChange?: (v: boolean) => void
}

/** ToggleMode: simple presentational toggle used in the global layout */
export const ToggleMode: React.FC<Props> = ({ checked = false, onChange }) => {
  return (
    <label className="uh-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="uh-slider" />
    </label>
  )
}

export default ToggleMode
