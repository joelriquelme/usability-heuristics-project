import React from 'react'
import '../../styles/exam.css'

interface ExamLayoutProps {
  children: React.ReactNode;
  title?: string;
}

/**
 * ExamLayout: Base layout component for exam pages
 * Provides consistent structure with header, content area, and footer
 */
const ExamLayout: React.FC<ExamLayoutProps> = ({ children, title }) => {
  return (
    <div className="uh-exam-layout">
      {title && (
        <div className="uh-exam-header-section">
          <h1 className="uh-exam-title">{title}</h1>
        </div>
      )}
      <div className="uh-exam-content">
        {children}
      </div>
      <div className="uh-exam-footer">
        <p className="uh-exam-footer-text">Prueba de evaluación pedagógica - CC6919</p>
      </div>
    </div>
  )
}

export default ExamLayout
