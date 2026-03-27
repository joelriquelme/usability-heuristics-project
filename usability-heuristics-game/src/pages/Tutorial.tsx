import React, { useState } from 'react';
import '../styles/Tutorial.css';
import '../styles/Level_1.css'; // Reuse styles from Level 1
import tutorialData from '../data/tutorial.json';

const Tutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % tutorialData.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + tutorialData.length) % tutorialData.length);
  };

  return (
    <div className="uh-game-screen level-page">
        <div className="tutorial-page-content">
            <div className="level-1__header">
                <div>
                <span className="level-1__eyebrow">Tutorial</span>
                </div>
                <div className="level-1__status-chip">Paso {currentStep + 1} de {tutorialData.length}</div>
            </div>

            <div className="tutorial-image-container">
                <img
                    src={tutorialData[currentStep].image}
                    alt={`Paso ${currentStep + 1}`}
                    className="tutorial-image"
                />
            </div>
            <div className="tutorial-text-container">
                <p className="tutorial-text" dangerouslySetInnerHTML={{ __html: tutorialData[currentStep].text }} />
            </div>

            <div className="level-1__summary">
                <div>
                <button className="level-1__button" onClick={handlePrev}>←</button>
                </div>
                <div className="dots">
                {tutorialData.map((_, index) => (
                    <span
                    key={index}
                    className={`dot ${index === currentStep ? 'active' : ''}`}
                    onClick={() => setCurrentStep(index)}
                    ></span>
                ))}
                </div>
                <div>
                <button className="level-1__button" onClick={handleNext}>→</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Tutorial;