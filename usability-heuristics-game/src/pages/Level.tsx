import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import LevelTitle from '../components/LevelTitle'
import levelsMeta from '../data/levels.json'
import '../styles/Level.css'
import { getLevelComponent } from './levels'

const Level: React.FC = () => {
  const { id } = useParams()

  return (
    <div className="uh-game-screen level-page">
      <div className="level-page__content">
        {
          (() => {
            const meta = id ? (levelsMeta as Record<string, { title?: string; description?: string }>)[id] : undefined
            return (
              <LevelTitle
                eyebrow={`Nivel ${id}`}
                title={meta?.title ?? `Nivel ${id}`}
                description={meta?.description}
              />
            )
          })()
        }

        {
          (() => {
            const LevelComponent = getLevelComponent(id)
            if (LevelComponent) {
              return (
                <Suspense fallback={<div className="uh-card level-page__placeholder">Cargando nivel...</div>}>
                  <LevelComponent />
                </Suspense>
              )
            }

            return (
              <div className="uh-card level-page__placeholder">
                <h1>Level {id}</h1>
                <p>Contenido del nivel {id} (placeholder).</p>
              </div>
            )
          })()
        }
      </div>
    </div>
  )
}

export default Level
