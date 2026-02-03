import React from 'react'
import '../styles/game.css'

type LivesProps = {
  count?: number
}

/** Lives: small presentational component to show hearts and numeric counter */
export const Lives: React.FC<LivesProps> = ({ count = 3 }) => {
  return (
    <div className="uh-lives">
      <div className="uh-hearts">
        {Array.from({ length: 3 }).map((_, i) => (
          <svg key={i} className={`uh-heart ${i < count ? '' : 'lost'}`} viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 21s-6.716-4.35-9.192-6.73C.978 11.953 3.06 7 7 7c2.21 0 3.5 1.5 5 3 1.5-1.5 2.79-3 5-3 3.94 0 6.02 4.95 4.192 7.27C18.716 16.65 12 21 12 21z" />
          </svg>
        ))}
      </div>
      <div className="uh-lives-count">{count}</div>
    </div>
  )
}

export default Lives
