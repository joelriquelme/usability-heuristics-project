import React from 'react';
import '../styles/Level.css';

const Level1Correct: React.FC = () => {
  return (
    <div className="level-correct">
      <h1>¡Felicidades!</h1>
      <p>Has completado todos los problemas de usabilidad. Ahora estás viendo la interfaz corregida.</p>
      <div className="level-correct__content">
        <p>Esta es la nueva interfaz con todos los problemas solucionados.</p>
        {/* Aquí puedes agregar más contenido o componentes para la interfaz corregida */}
      </div>
    </div>
  );
};

export default Level1Correct;