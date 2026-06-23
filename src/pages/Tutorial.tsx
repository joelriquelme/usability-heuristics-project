import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const isLastStep = currentStep === tutorialData.length - 1;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, tutorialData.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // On the final step: continue to Level 1. When embedded in the Level 1
  // intro overlay we close it via onFinish; standalone we navigate there.
  const handleContinue = () => {
    if (onFinish) onFinish();
    else navigate('/level/1');
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
    <div className={`tutorial-shell ${onFinish ? 'tutorial-shell--embedded' : 'tutorial-shell--standalone'}`}>
      <div className="tutorial-card">
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
            <button
              className="tutorial__button tutorial__button--prev"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Atrás
            </button>
            <div className="dots">
              {tutorialData.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentStep ? 'active' : ''}`}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>
            {isLastStep ? (
              <button
                className="tutorial__button tutorial__button--continue"
                onClick={handleContinue}
              >
                Continuar
              </button>
            ) : (
              <button
                className="tutorial__button tutorial__button--next"
                onClick={handleNext}
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;