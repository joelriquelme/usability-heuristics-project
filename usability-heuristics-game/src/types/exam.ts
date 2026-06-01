/**
 * exam.ts
 * Type definitions for the exam module
 */

export interface ExamOption {
  text: string;
  isCorrect: boolean;
}

export interface ExamQuestion {
  id: string;
  heuristic: string;
  heuristicDescription: string;
  question: string;
  options: ExamOption[];
  difficulty: 'identification' | 'application' | 'selection';
}

export interface Heuristic {
  id: string;
  name: string;
  description: string;
}

export interface ExamLevel {
  level: number;
  difficulty: string;
  questions: ExamQuestion[];
}

export interface ExamPageProps {
  heuristicId: string;
  heuristicName: string;
  heuristicDescription: string;
  questionNumber: number;
  totalQuestions: number;
}
