import React, { useState } from 'react'
import ExamLayout from '../../components/exam/ExamLayout'
import ExamHeader from '../../components/exam/ExamHeader'
import Level2Visibility from '../../components/exam/level2/Level2Visibility'
import Level2MatchReal from '../../components/exam/level2/Level2MatchReal'
import Level2UserControl from '../../components/exam/level2/Level2UserControl'
import Level2Consistency from '../../components/exam/level2/Level2Consistency'
import Level2ErrorPrevention from '../../components/exam/level2/Level2ErrorPrevention'
import level2Data from '../../data/exam-questions-level2.json'
import '../../styles/exam.css'

const ExamLevel2: React.FC = () => {
  const [index, setIndex] = useState(0)
  const components = [
    { comp: Level2Visibility, heuristic: 'Visibilidad del estado del sistema' },
    { comp: Level2MatchReal, heuristic: 'Coincidencia entre el Sistema y el Mundo Real' },
    { comp: Level2UserControl, heuristic: 'Control y libertad del usuario' },
    { comp: Level2Consistency, heuristic: 'Consistencia y Estándares' },
    { comp: Level2ErrorPrevention, heuristic: 'Prevención de errores' }
  ]

  const Total = components.length
  const Current = components[index].comp

  return (
    <ExamLayout title="Nivel 2: Aplicación y Diagnóstico">
      <div className="uh-exam-level-1">
        <ExamHeader questionNumber={index + 1} totalQuestions={Total} heuristicName={components[index].heuristic} />

        <div className="uh-exam-question-content">
          <div className="uh-exam-question-statement">
            <span className="uh-exam-question-tag">Caso {index + 1}</span>
            <p className="uh-exam-question-text">{level2Data.questions[index].question}</p>
          </div>

          <Current />
        </div>

        <div className="uh-exam-navigation">
          <button className="uh-exam-nav-button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>← Anterior</button>
          <span className="uh-exam-nav-counter">{index + 1} / {Total}</span>
          <button className="uh-exam-nav-button" onClick={() => setIndex(Math.min(Total - 1, index + 1))} disabled={index === Total - 1}>Siguiente →</button>
        </div>
      </div>
    </ExamLayout>
  )
}

export default ExamLevel2
