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
};

const QuestionBox: React.FC<QuestionBoxProps> = ({ question, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    onAnswer(options[index].isCorrect);
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
    </div>
  );
};

export default QuestionBox;