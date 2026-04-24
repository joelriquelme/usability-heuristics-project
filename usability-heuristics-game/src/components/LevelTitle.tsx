import React from 'react'

type LevelTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  onClose?: () => void
  large?: boolean
}

const LevelTitle: React.FC<LevelTitleProps> = ({ eyebrow, title, description, onClose, large }) => {
  const containerStyle: React.CSSProperties = large
    ? { padding: '1.5rem', minHeight: 140, position: 'relative' }
    : { position: 'relative' }

  const closeBtnStyle: React.CSSProperties = {
    // kept for reference but we now render a bottom-right go button
    position: 'absolute',
    right: 12,
    top: 12,
    border: 'none',
    background: 'transparent',
    fontSize: 20,
    lineHeight: 1,
    cursor: 'pointer',
  }

  const goBtnStyle: React.CSSProperties = {
    position: 'absolute',
    right: 12,
    bottom: 12,
    border: 'none',
    background: '#16a34a',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: 10,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    fontWeight: 700,
  }

  return (
    <div className={`level-title uh-level-tittle ${large ? 'level-title--large' : ''}`} style={containerStyle}>
      {onClose && (
        <button onClick={onClose} aria-label="Ir al nivel" style={goBtnStyle} className="level-title__go-button">
          <span>Ir a nivel</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {eyebrow ? <span className="level-title__eyebrow">{eyebrow}</span> : null}
      <h1 className="level-title__heading">{title}</h1>
      {description ? <p className="level-title__description">{description}</p> : null}
    </div>
  )
}

export default LevelTitle