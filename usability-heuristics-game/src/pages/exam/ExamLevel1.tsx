import React, { useState } from 'react'
import ExamLayout from '../../components/exam/ExamLayout'
import ExamHeader from '../../components/exam/ExamHeader'
import VisibilityStatusError from '../../components/exam/VisibilityStatusError'
import MatchRealWorldError from '../../components/exam/MatchRealWorldError'
import UserControlError from '../../components/exam/UserControlError'
import ConsistencyError from '../../components/exam/ConsistencyError'
import ErrorPreventionError from '../../components/exam/ErrorPreventionError'
import examData from '../../data/exam-questions.json'
import '../../styles/exam.css'

/**
 * ExamLevel1: Main page for Level 1 exam (Identification Difficulty)
 * Displays 5 visual interfaces with usability errors (1 per heuristic)
 * No interactivity - pure screenshot interface
 */
const ExamLevel1: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentQuestion = examData.questions[currentIndex]

  // Map of error visual components
  const errorComponents = [
    { component: VisibilityStatusError, heuristic: 'Visibilidad del estado del sistema' },
    { component: MatchRealWorldError, heuristic: 'Coincidencia entre el Sistema y el Mundo Real' },
    { component: UserControlError, heuristic: 'Control y libertad del usuario' },
    { component: ConsistencyError, heuristic: 'Consistencia y Estándares' },
    { component: ErrorPreventionError, heuristic: 'Prevención de errores' }
  ]

  const totalQuestions = errorComponents.length
  const CurrentErrorComponent = errorComponents[currentIndex].component
  const currentHeuristic = errorComponents[currentIndex].heuristic

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <ExamLayout title="Nivel 1: Identificación Directa">
      <div className="uh-exam-level-1">
        <ExamHeader
          questionNumber={currentIndex + 1}
          totalQuestions={totalQuestions}
          heuristicName={currentHeuristic}
        />

        <div className="uh-exam-question-content">
          <div className="uh-exam-question-statement">
            <span className="uh-exam-question-tag">Pregunta {currentIndex + 1}</span>
            <p className="uh-exam-question-text">{currentQuestion.question}</p>
          </div>

          <CurrentErrorComponent />
        </div>

        <div className="uh-exam-navigation">
          <button
            className="uh-exam-nav-button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← Anterior
          </button>

          <span className="uh-exam-nav-counter">
            {currentIndex + 1} / {totalQuestions}
          </span>

          <button
            className="uh-exam-nav-button"
            onClick={handleNext}
            disabled={currentIndex === totalQuestions - 1}
          >
            Siguiente →
          </button>
        </div>

        <div className="uh-exam-instructions">
          <h4>Instrucciones:</h4>
          <p>
            Observa la interfaz y detecta qué heurística de Nielsen está siendo violada.
            No respondas aquí: las respuestas se registrarán en Google Forms.
          </p>
        </div>
      </div>
    </ExamLayout>
  )
}

export default ExamLevel1
