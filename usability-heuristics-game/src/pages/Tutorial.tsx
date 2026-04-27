import React, { useState } from 'react';
import '../styles/Tutorial.css';
import '../styles/Level_1.css'; // Reuse styles from Level 1
import tutorialData from '../data/tutorial.json';

type TutorialProps = {
  onFinish?: () => void
}

// Preload images via Vite glob (use eager:true for compatibility)
const imageModules = (import.meta as any).glob('/src/assets/tutorial/*.{jpg,jpeg,png,svg}', { eager: true }) as Record<string, any>;

const Tutorial: React.FC<TutorialProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, tutorialData.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderImage = () => {
    const raw = tutorialData[currentStep].image as string;
    const filename = raw.split('/').pop() || raw;
    const foundKey = Object.keys(imageModules).find((k) => k.endsWith(filename));
    const mod = foundKey ? imageModules[foundKey] : null;
    const src = mod ? (mod.default || mod) : raw;
    return <img src={src} alt={`Paso ${currentStep + 1}`} className="tutorial-image" />;
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

        <div className="tutorial-image-container">{renderImage()}</div>
        <div className="tutorial-text-container">
          <p className="tutorial-text" dangerouslySetInnerHTML={{ __html: tutorialData[currentStep].text }} />
        </div>

        <div className="tutorial__summary">
          <div>
            <button className="tutorial__button" onClick={handlePrev} disabled={currentStep === 0}>←</button>
          </div>
          <div className="dots">
            {tutorialData.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
          <div>
            <button className="tutorial__button" onClick={handleNext} disabled={currentStep === tutorialData.length - 1}>→</button>
          </div>
          {onFinish && currentStep === tutorialData.length - 1 && (
            <div style={{ marginLeft: 12 }}>
              <button className="level-title__go-button" onClick={onFinish} aria-label="Ir al nivel">
                <span>Ir a nivel</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;