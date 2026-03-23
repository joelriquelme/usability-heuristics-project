import React from 'react'
import '../styles/game.css'

type Props = {
  checked?: boolean
  onChange?: (v: boolean) => void
  className?: string
}

/** ToggleMode: simple presentational toggle used in the global layout */
export const ToggleMode: React.FC<Props> = ({ checked = false, onChange, className }) => {
  const classes = ['uh-switch', className].filter(Boolean).join(' ')
  return (
    <label className={classes}>
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
