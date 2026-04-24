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
// Level corrected components will be loaded dynamically per-level
import AlertModal from '../components/AlertModal';

const Level: React.FC = () => {
  const { id } = useParams();
  const [evaluative, setEvaluative] = useState(false);
  const [questionBoxData, setQuestionBoxData] = useState({
    question: '',
    options: [] as { text: string; isCorrect: boolean }[], // Definir el tipo correcto para las opciones
    visible: false,
    triggeringElement: null as HTMLElement | null, // Track the element that triggered the QuestionBox
  });
  const [allCorrect, setAllCorrect] = useState(false); // Track if all usability issues are resolved
  const [showCorrectLevel, setShowCorrectLevel] = useState(false); // Nuevo estado para mostrar el nivel corregido
  const [alertModalVisible, setAlertModalVisible] = useState(true); // Estado para controlar la visibilidad del AlertModal
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [modeTabOpen, setModeTabOpen] = useState<boolean>(false);
  const [interfaceTabOpen, setInterfaceTabOpen] = useState<boolean>(false);
  const [showFloatingControls, setShowFloatingControls] = useState<boolean>(false);

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

  // Intro is shown by default on entering the level. Do not persist closure.
  const handleCloseIntro = () => {
    setShowIntro(false);
    setShowFloatingControls(true); // Show floating controls after closing intro
  };

  const checkAllCorrect = () => {
    const elements = document.querySelectorAll('[data-eval="show"]');
    const allHaveCorrectClass = Array.from(elements).every((element) =>
      element.classList.contains('correct-answer')
    );
    setAllCorrect(allHaveCorrectClass && elements.length > 0);
    console.log('All correct:', allHaveCorrectClass && elements.length > 0); // Ensure there are elements and all are correct
  };


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
      checkAllCorrect(); // Check if all issues are resolved after marking this one as correct
    }
  };

  // Resolve the dynamic components ahead of rendering so we can reuse them
  const correctedId = id ? `${id}_correct` : undefined;
  const CorrectedComponent = getLevelComponent(correctedId);
  const LevelComponent = getLevelComponent(id);

  return (
    <div className={evaluative ? 'evaluative-mode' : ''}>
      <div className="level-header">
        <div className="level-header__controls">
          {/* Controls moved to floating Mode tab to avoid always-on UI */}
        </div>
      </div>
      <div className="uh-game-screen level-page">
        <div className={`level-page__content ${showIntro ? 'intro-active' : ''}`}>
          {/* Render the level (original or corrected) always; intro overlays it when visible */}
          {showCorrectLevel && CorrectedComponent ? (
            <Suspense fallback={<div className="uh-card level-page__placeholder">Cargando nivel corregido...</div>}>
              <CorrectedComponent />
            </Suspense>
          ) : LevelComponent ? (
            <Suspense fallback={<div className="uh-card level-page__placeholder">Cargando nivel...</div>}>
              <LevelComponent />
            </Suspense>
          ) : (
            <div className="uh-card level-page__placeholder">
              <h1>Level {id}</h1>
              <p>Contenido del nivel {id} (placeholder).</p>
            </div>
          )}

          {showIntro && (
            <div className="level-intro-overlay">
              <div className="level-intro uh-card">
                <div className="level-intro__header">
                  <LevelTitle
                    eyebrow={`Nivel ${id}`}
                    title={(levelsMeta as Record<string, { title?: string; description?: string }>)[id]?.title ?? `Nivel ${id}`}
                    description={(levelsMeta as Record<string, { title?: string; description?: string }>)[id]?.description}
                    onClose={handleCloseIntro}
                    large
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Floating compact tabs (bottom-left): Modo + Interfaz */}
        {showFloatingControls && (
          <div className="floating-tabs">
            <div className={`mode-tab ${modeTabOpen ? 'open' : ''}`}>
              <button
                className="mode-tab__label"
                onClick={() => setModeTabOpen((s) => !s)}
                aria-expanded={modeTabOpen}
                aria-controls="mode-tab-panel"
              >
                Modo
              </button>
              <div id="mode-tab-panel" className="mode-tab__panel" aria-hidden={!modeTabOpen}>
                <ToggleMode checked={evaluative} onChange={setEvaluative} />
              </div>
            </div>

            {allCorrect && (
              <div className={`interface-tab ${interfaceTabOpen ? 'open' : ''}`}>
                <button
                  className="mode-tab__label"
                  onClick={() => setInterfaceTabOpen((s) => !s)}
                  aria-expanded={interfaceTabOpen}
                  aria-controls="interface-tab-panel"
                >
                  Interfaz
                </button>
                <div id="interface-tab-panel" className="mode-tab__panel" aria-hidden={!interfaceTabOpen}>
                  <ToggleMode
                    checked={showCorrectLevel}
                    onChange={setShowCorrectLevel}
                    text={{ left: 'Original', right: 'Corregida' }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {allCorrect && alertModalVisible && (
        <AlertModal
          title="¡Felicidades!"
          message="Has respondido correctamente todas las preguntas. Ahora puedes explorar el interfaz corregida con los problemas de usabilidad resueltos."
          onClose={() => setAlertModalVisible(false)}
        />
      )}
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
