import React from 'react'

interface ExamHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  heuristicName: string;
}

/**
 * ExamHeader: Displays progress and current heuristic
 */
const ExamHeader: React.FC<ExamHeaderProps> = ({ questionNumber, totalQuestions, heuristicName }) => {
  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="uh-exam-question-header">
      <div className="uh-exam-progress-info">
        <span className="uh-exam-question-counter">
          Pregunta {questionNumber} de {totalQuestions}
        </span>
        <h2 className="uh-exam-heuristic-name">{heuristicName}</h2>
      </div>
      <div className="uh-exam-progress-bar">
        <div
          className="uh-exam-progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}

export default ExamHeader
