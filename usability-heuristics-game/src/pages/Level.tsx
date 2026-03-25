import React, { Suspense, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LevelTitle from '../components/LevelTitle';
import ToggleMode from '../components/ToggleMode';
import levelsMeta from '../data/levels.json';
import '../styles/Level.css';
import { getLevelComponent } from './levels';
import QuestionBox from '../components/QuestionBox';
import { createPortal } from 'react-dom';
import questionsData from '../data/questions.json';

const Level: React.FC = () => {
  const { id } = useParams();
  const [evaluative, setEvaluative] = useState(false);
  const [questionBoxData, setQuestionBoxData] = useState({
    question: '',
    options: [],
    visible: false,
    triggeringElement: null as HTMLElement | null, // Track the element that triggered the QuestionBox
  });
  const [allCorrect, setAllCorrect] = useState(false); // Track if all usability issues are resolved

  useEffect(() => {
    const elements = document.querySelectorAll('[data-eval="show"]');

    if (evaluative) {
      elements.forEach((element) => {
        (element as HTMLElement).classList.add('evaluative-highlight');
      });
    } else {
      elements.forEach((element) => {
        (element as HTMLElement).classList.remove('evaluative-highlight');
      });
    }

    const handleHighlightClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('evaluative-highlight')) {
        const questionId = target.getAttribute('question-id');
        if (questionId) {
          const questionData = questionsData.questions.find((q) => q.id === questionId);
          if (questionData) {
            setQuestionBoxData({
              question: questionData.question,
              options: questionData.options,
              visible: true,
              triggeringElement: target, // Store the triggering element
            });
          } else {
            console.error(`No question found for question-id: ${questionId}`);
          }
        }
      }
    };

    document.addEventListener('click', handleHighlightClick);

    return () => {
      elements.forEach((element) => {
        (element as HTMLElement).classList.remove('evaluative-highlight');
      });
      document.removeEventListener('click', handleHighlightClick);
    };
  }, [evaluative]);

  useEffect(() => {
    const checkAllCorrect = () => {
      const elements = document.querySelectorAll('[data-eval="show"]');
      const allHaveCorrectClass = Array.from(elements).every((element) =>
        element.classList.contains('correct-answer')
      );
      setAllCorrect(allHaveCorrectClass && elements.length > 0); // Ensure there are elements and all are correct
    };

    const observer = new MutationObserver(checkAllCorrect);
    const elements = document.querySelectorAll('[data-eval="show"]');
    elements.forEach((element) => observer.observe(element, { attributes: true, attributeFilter: ['class'] }));

    checkAllCorrect(); // Initial check

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (questionBoxData.visible) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
    };
  }, [questionBoxData.visible]);

  const handleCorrectAnswer = () => {
    if (questionBoxData.triggeringElement) {
      questionBoxData.triggeringElement.classList.add('correct-answer');
    }
  };

  return (
    <div className={evaluative ? 'evaluative-mode' : ''}>
      <div className="level-header">
        {
          (() => {
            const meta = id ? (levelsMeta as Record<string, { title?: string; description?: string }>)[id] : undefined;
            return (
              <LevelTitle
                eyebrow={`Nivel ${id}`}
                title={meta?.title ?? `Nivel ${id}`}
                description={meta?.description}
              />
            );
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
              const LevelComponent = getLevelComponent(allCorrect ? `${id}_correct` : id); // Switch to corrected level if all issues are resolved
              if (LevelComponent) {
                return (
                  <Suspense fallback={<div className="uh-card level-page__placeholder">Cargando nivel...</div>}>
                    <LevelComponent />
                  </Suspense>
                );
              }

              return (
              <div className="uh-card level-page__placeholder">
                <h1>Level {id}</h1>
                <p>Contenido del nivel {id} (placeholder).</p>
              </div>
              );
            })()
          }
        </div>
      </div>
      {questionBoxData.visible && createPortal(
        <div className="question-box-overlay">
          <div className="question-box-container">
            <button
              className="question-box-close"
              onClick={() => setQuestionBoxData((prev) => ({ ...prev, visible: false }))} // Only hide modal when explicitly closed
            >
              Close
            </button>
            <QuestionBox
              question={questionBoxData.question}
              options={questionBoxData.options}
              onAnswer={(isCorrect) => {
                console.log(`Answer is ${isCorrect ? 'correct' : 'incorrect'}`);
                // Keep modal open after answering
              }}
              onCorrectAnswer={handleCorrectAnswer} // Pass the handler for correct answers
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Level;
