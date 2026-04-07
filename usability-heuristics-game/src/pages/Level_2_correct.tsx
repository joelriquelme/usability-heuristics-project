import React from 'react';
import '../styles/Level_2.css';

const Level2Correct: React.FC = () => {
  return (
    <div className="level-2-correct">
      <h1>Nivel 2: ¿Ya se descargó? (Versión Corregida)</h1>
      <p>En esta versión, se han incorporado elementos de retroalimentación para mejorar la experiencia del usuario.</p>
      <div className="downloads">
        <div className="download-item">
          <button className="download-button">Descargar archivo</button>
          <div className="progress-bar">0%</div>
        </div>
        <div className="download-item">
          <button className="download-button">Descargar archivo</button>
          <div className="progress-bar">0%</div>
        </div>
        <div className="download-item">
          <button className="download-button">Descargar archivo</button>
          <div className="progress-bar">0%</div>
        </div>
      </div>
    </div>
  );
};

export default Level2Correct;