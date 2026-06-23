import React, { useState } from 'react';
import '../styles/game.css';

type Option = {
  text: string;
  isCorrect: boolean;
};

type QuestionBoxProps = {
  question: string;
  options: Option[];
  onAnswer: (isCorrect: boolean) => void;
  onCorrectAnswer: () => void; // New prop to notify parent of correct answer
};

const QuestionBox: React.FC<QuestionBoxProps> = ({ question, options, onAnswer, onCorrectAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackClass, setFeedbackClass] = useState<string>('');

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    const isCorrect = options[index].isCorrect;
    setIsCorrectAnswer(isCorrect);
    onAnswer(isCorrect);
    if (isCorrect) {
      onCorrectAnswer(); // Notify parent of correct answer
      setFeedbackMessage('¡Correcto!');
      setFeedbackClass('feedback-correct');
    } else {
      setFeedbackMessage('¡Incorrecto!');
      setFeedbackClass('feedback-incorrect');
    }
  };

  const selectedClass = (index: number) => {
    if (selectedOption !== index) return ''
    return isCorrectAnswer ? 'selected selected-correct' : 'selected selected-incorrect'
  }

  return (
    <div className="question-box">
      <h2 className="question-box__question">{question}</h2>
      <div className="question-box__options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`question-box__option ${selectedClass(index)}`}
            onClick={() => handleOptionClick(index)}
            disabled={selectedOption !== null}
          >
            {option.text}
          </button>
        ))}
      </div>
      {feedbackMessage && (
        <div className={`question-box__feedback ${feedbackClass}`}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default QuestionBox;