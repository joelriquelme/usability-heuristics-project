import React from 'react'
import '../styles/game.css'

/** GameShell: container for the game area. Receives children (levels, screens, etc.) */
export const GameShell: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className="uh-main">
      <div className="uh-game-container">
        <div className="uh-game-screen">{children}</div>
      </div>
    </main>
  )
}

export default GameShell
