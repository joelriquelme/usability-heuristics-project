import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/game.css';

type AlertModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

const AlertModal: React.FC<AlertModalProps> = ({ title, message, onClose }) => {
  return createPortal(
    <div className="alert-modal-overlay">
      <div className="alert-modal-container">
        <h2 className="alert-modal-title">{title}</h2>
        <p className="alert-modal-message">{message}</p>
        <button className="alert-modal-close-icon" onClick={onClose} aria-label="Cerrar">&times;</button>
        <div className="alert-modal-confetti-container">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="confetti"
              style={{
                left: `${Math.random() * 95}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;