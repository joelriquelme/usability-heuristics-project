import React from 'react';
import { createPortal } from 'react-dom';
import '../styles/game.css';

type ConfirmModalProps = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, confirmText = 'Confirmar', cancelText = 'Cancelar', onConfirm, onCancel }) => {
  return createPortal(
    <div className="alert-modal-overlay" role="dialog" aria-modal="true">
      <div className="alert-modal-container">
        <h2 className="alert-modal-title">{title}</h2>
        <p className="alert-modal-message">{message}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-modal-btn confirm-modal-btn--secondary" onClick={onCancel}>{cancelText}</button>
          <button className="confirm-modal-btn confirm-modal-btn--primary" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
