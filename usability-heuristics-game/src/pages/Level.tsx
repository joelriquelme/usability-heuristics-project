import React, { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'
import LevelTitle from '../components/LevelTitle'
import ToggleMode from '../components/ToggleMode'
import levelsMeta from '../data/levels.json'
import '../styles/Level.css'
import { getLevelComponent } from './levels'

const Level: React.FC = () => {
  const { id } = useParams()
  const [evaluative, setEvaluative] = useState(false)

  return (
    <div className={evaluative ? 'evaluative-mode' : ''}>
      <div className="level-header">
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
        <div className="level-header__controls">
          <label className="level-header__label">Modo evaluativo</label>
          <ToggleMode className="uh-eval-switch" checked={evaluative} onChange={setEvaluative} />
        </div>
      </div>
      <div className="uh-game-screen level-page">
        <div className="level-page__content">

          {
            (() => {
              const LevelComponent = getLevelComponent(id)
              if (LevelComponent) {
                return (
                  <Suspense fallback={<div className="uh-card level-page__placeholder" data-eval="show">Cargando nivel...</div>}>
                    <LevelComponent />
                  </Suspense>
                )
              }

              return (
              <div className="uh-card level-page__placeholder" data-eval="show">
                <h1>Level {id}</h1>
                <p>Contenido del nivel {id} (placeholder).</p>
              </div>
              )
            })()
          }
        </div>
      </div>
    </div>
  )
}

export default Level
