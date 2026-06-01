import React, { useState } from 'react'
import ExamLayout from '../../components/exam/ExamLayout'
import ExamHeader from '../../components/exam/ExamHeader'
import Level3Visibility from '../../components/exam/level3/Level3Visibility'
import Level3MatchReal from '../../components/exam/level3/Level3MatchReal'
import Level3UserControl from '../../components/exam/level3/Level3UserControl'
import Level3Consistency from '../../components/exam/level3/Level3Consistency'
import Level3ErrorPrevention from '../../components/exam/level3/Level3ErrorPrevention'
import '../../styles/exam.css'

const components = [
  { comp: Level3Visibility, heuristic: 'Visibilidad del estado del sistema', context: 'Contexto: Indicadores de progreso y estado — barras/porcentajes de descarga, texto de botón que cambia (Enviar → Procesando… → Enviado), carga de video y estado de adjuntos.' },
  { comp: Level3MatchReal, heuristic: 'Coincidencia entre el sistema y el mundo real', context: 'Contexto: Metáforas y mapeo natural — uso de carpeta para archivos, basurero para eliminar, calendario visual, clip para adjuntar.' },
  { comp: Level3UserControl, heuristic: 'Control y libertad del usuario', context: 'Contexto: Mecanismos de deshacer y navegación — Breadcrumbs, botón Home, Ctrl+Z/Deshacer, Gmail "Mensaje enviado – Deshacer", botones Cancel/Detener en procesos.' },
  { comp: Level3Consistency, heuristic: 'Consistencia y estándares', context: 'Contexto: Consistencia de acciones y apariencia — mismo icono/etiqueta para la misma acción, ubicación constante de botones, atajos uniformes y formatos coherentes.' },
  { comp: Level3ErrorPrevention, heuristic: 'Prevención de errores', context: 'Contexto: Prevención proactiva — validación en tiempo real (IBAN, contraseñas), deshabilitar "Enviar" hasta completar, recordatorios de adjuntos y confirmaciones antes de sobrescribir.' }
]

const ExamLevel3: React.FC = () => {
  const [index, setIndex] = useState(0)
  const Total = components.length
  const Current = components[index].comp

  return (
    <ExamLayout title="Nivel 3: Selección de la Mejor Solución — Interfaces">
      <div className="uh-exam-level-1">
        <ExamHeader questionNumber={index + 1} totalQuestions={Total} heuristicName={components[index].heuristic} />

        <div className="uh-exam-question-content">
          <div className="uh-exam-question-statement">
            <span className="uh-exam-question-tag">Caso {index + 1}</span>
            <p className="uh-exam-question-text">{components[index].context}</p>
          </div>

          <div className="uh-exam-level3-visual">
            <Current />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="uh-exam-nav-button" onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0}>← Anterior</button>
            <span className="uh-exam-nav-counter">{index + 1} / {Total}</span>
            <button className="uh-exam-nav-button" onClick={() => setIndex(Math.min(Total - 1, index + 1))} disabled={index === Total - 1}>Siguiente →</button>
          </div>
        </div>
      </div>
    </ExamLayout>
  )
}

export default ExamLevel3
