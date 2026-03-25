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
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackClass, setFeedbackClass] = useState<string>('');

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    const isCorrect = options[index].isCorrect;
    onAnswer(isCorrect);
    if (isCorrect) {
      onCorrectAnswer(); // Notify parent of correct answer
      setFeedbackMessage('Correct!');
      setFeedbackClass('feedback-correct');
    } else {
      setFeedbackMessage('Incorrect!');
      setFeedbackClass('feedback-incorrect');
    }
  };

  return (
    <div className="question-box">
      <h2 className="question-box__question">{question}</h2>
      <div className="question-box__options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`question-box__option ${selectedOption === index ? 'selected' : ''}`}
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