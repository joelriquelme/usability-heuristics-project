import React, { useState } from 'react'
import '../styles/Level.css'
import '../styles/Level_4.css'
import { FaSave } from 'react-icons/fa'
import { FaRegPlayCircle } from "react-icons/fa";

type Task = { id: string; title: string; done: boolean; desc?: string }

const Level4: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'Comprar pan', done: false, desc: 'Ir a la panadería y comprar una bolsa de marraquetas.' },
    { id: 't2', title: 'Enviar correo', done: false, desc: 'Enviar resumen de la reunión al equipo antes de las 18:00.' },
    { id: 't3', title: 'Llamar a Juan', done: false, desc: 'Confirmar disponibilidad para el fin de semana.' }
  ])

  const [lastDeleted, setLastDeleted] = useState<null | { task: Task; index: number }>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')

  const toggleDone = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const addTask = () => {
    // use values from the form inputs; fall back to a generic title if empty
    const newTask: Task = { id: `t${Date.now()}`, title: title || 'Nueva tarea', done: false, desc: desc || undefined }
    setTasks((prev) => [newTask, ...prev])
    setTitle('')
    setDesc('')
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id)
      if (index === -1) return prev
      const task = prev[index]
      setLastDeleted({ task, index })
      return prev.filter((t) => t.id !== id)
    })
  }

  const handleUndo = () => {
    if (!lastDeleted) return
    setTasks((prev) => {
      const restored = [...prev]
      const insertAt = Math.min(Math.max(0, lastDeleted.index), restored.length)
      restored.splice(insertAt, 0, lastDeleted.task)
      return restored
    })
    setLastDeleted(null)
  }

  const toggleDetails = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="uh-card level-4">
      <header className="level-4__header">
        <h2>TaskControl Panel</h2>
        <p>Agrega tus tareas aquí:</p>
      </header>

      <section className="task-creator">
        <div data-eval="show" question-id="level-4-field-names" className="technical-fields">
          <label>task.title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>task.desc</label>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="task-actions"
             data-eval="show" question-id="level-4-form-buttons">
          <button className="btn" onClick={addTask}>Commit</button>
          <button className="btn" onClick={handleUndo} disabled={!lastDeleted}>Rollback</button>
        </div>
      </section>

      <ul className="task-list">
        {tasks.map((task, idx) => (
          <li key={task.id} className="task-item">
            <div className="task-row">
              <div className="task-main">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
                  aria-label={`Marcar-${task.id}`}
                />
                <span className="task-title">{task.title}</span>
              </div>

              <div className="task-controls" data-eval={idx === 0 ? 'show' : undefined}
                    question-id={idx === 0 ? 'level-4-icons' : undefined}>
                <button
                  className={`btn secondary detail-button`}
                  onClick={() => toggleDetails(task.id)}
                  aria-expanded={!!expanded[task.id]}
                >
                  <FaRegPlayCircle aria-hidden="true" />
                </button>
                <div>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(task.id)}
                  disabled={tasks.length <= 1}
                  aria-disabled={tasks.length <= 1}
                >
                  <FaSave style={{ color: 'green' }} aria-hidden="true" />
                </button>
                </div>
              </div>
            </div>

            {expanded[task.id] && task.desc && (
              <div className="task-desc">{task.desc}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Level4
