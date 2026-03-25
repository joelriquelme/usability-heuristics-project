import React, { Suspense, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LevelTitle from '../components/LevelTitle'
import ToggleMode from '../components/ToggleMode'
import levelsMeta from '../data/levels.json'
import '../styles/Level.css'
import { getLevelComponent } from './levels'
import QuestionBox from '../components/QuestionBox'
import { createPortal } from 'react-dom'
import questionsData from '../data/questions.json'

const Level: React.FC = () => {
  const { id } = useParams()
  const [evaluative, setEvaluative] = useState(false)
  const [questionBoxData, setQuestionBoxData] = useState<{ question: string; options: { text: string; isCorrect: boolean }[]; visible: boolean }>({
    question: '',
    options: [],
    visible: false,
  })

  useEffect(() => {
    const elements = document.querySelectorAll('[data-eval="show"]')

    if (evaluative) {
      elements.forEach((element) => {
        (element as HTMLElement).classList.add('evaluative-highlight')
      })
    } else {
      elements.forEach((element) => {
        (element as HTMLElement).classList.remove('evaluative-highlight')
      })
    }

    const handleHighlightClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.classList.contains('evaluative-highlight')) {
        const questionId = target.getAttribute('question-id')
        if (questionId) {
          const questionData = questionsData.questions.find((q) => q.id === questionId)
          if (questionData) {
            setQuestionBoxData({
              question: questionData.question,
              options: questionData.options,
              visible: true,
            })
          } else {
            console.error(`No question found for question-id: ${questionId}`)
          }
        }
      }
    }

    document.addEventListener('click', handleHighlightClick)

    return () => {
      // Clean up by removing the class and event listener when the component unmounts
      elements.forEach((element) => {
        (element as HTMLElement).classList.remove('evaluative-highlight')
      })
      document.removeEventListener('click', handleHighlightClick)
    }
  }, [evaluative])

  useEffect(() => {
    if (questionBoxData.visible) {
      document.documentElement.classList.add('modal-open'); // Add to <html> for full-page blur
      document.body.classList.add('modal-open')
    } else {
      document.documentElement.classList.remove('modal-open')
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.documentElement.classList.remove('modal-open')
      document.body.classList.remove('modal-open')
    };
  }, [questionBoxData.visible])

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
      {questionBoxData.visible && createPortal(
        <div className="question-box-overlay">
          <div className="question-box-container">
            <button
              className="question-box-close"
              onClick={() => setQuestionBoxData({ question: '', options: [], visible: false })}
            >
              Close
            </button>
            <QuestionBox
              question={questionBoxData.question}
              options={questionBoxData.options}
              onAnswer={(isCorrect) => {
                console.log(`Answer is ${isCorrect ? 'correct' : 'incorrect'}`)
                setQuestionBoxData({ question: '', options: [], visible: false }) // Hide the QuestionBox after answering
              }}
            />
          </div>
        </div>,
        document.body // <-- Esto lo envía al final del body
      )}
    </div>
  )
}

export default Level
