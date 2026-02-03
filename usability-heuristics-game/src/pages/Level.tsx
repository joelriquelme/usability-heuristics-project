import React from 'react'
import { useParams } from 'react-router-dom'

const Level: React.FC = () => {
  const { id } = useParams()

  return (
    <div className="uh-game-screen" style={{ padding: 24 }}>
      <div className="uh-card">
        <h1>Level {id}</h1>
        <p>Contenido del nivel {id} (placeholder).</p>
      </div>
    </div>
  )
}

export default Level
