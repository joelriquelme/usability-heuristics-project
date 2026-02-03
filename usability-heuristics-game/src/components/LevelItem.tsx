import React from 'react'
import { Link, useMatch } from 'react-router-dom'

type Props = {
  title: string
  active?: boolean
  completed?: boolean
  to?: string
  onClick?: () => void
}

/**
 * Reusable LevelItem used in the sidebar level list.
 * - renders a `Link` when `to` is provided
 * - shows `active` visual state
 * - shows a completion star when `completed` is true
 */
const LevelItem: React.FC<Props> = ({ title, completed, to, onClick }) => {
  const match = to ? useMatch({ path: to, end: true }) : null
  const isActive = !!match

  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {completed ? (
        <svg className="uh-level-star" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#ffb400" />
        </svg>
      ) : <svg className="uh-level-star" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#a3a3a3" />
        </svg>}
      <span>{title}</span>
    </span>
  )

  return (
    <li className={`uh-level-item ${isActive ? 'active' : ''}`} aria-current={isActive ? 'true' : undefined}>
      {to ? (
        <Link to={to} onClick={onClick} style={{ color: 'inherit', textDecoration: 'none', display: 'block', padding: '6px 4px' }}>
          {content}
        </Link>
      ) : (
        <button onClick={onClick} style={{ all: 'unset', cursor: 'pointer' }}>
          {content}
        </button>
      )}
    </li>
  )
}

export default LevelItem
