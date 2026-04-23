import React, { useState } from 'react'
import '../styles/Level.css'
import '../styles/Level_4.css'
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown } from 'react-icons/io'


type Task = { id: string; title: string; done: boolean, desc?: string }

const Level4Correct: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 't1', title: 'Comprar pan', done: false, desc: 'Comprar 1 bolsa de marraquetas en la panadería cercana.' },
    { id: 't2', title: 'Enviar correo', done: false, desc: 'Enviar el acta de la reunión y los próximos pasos al equipo.' },
    { id: 't3', title: 'Llamar a Juan', done: false, desc: 'Confirmar la reunión del sábado y coordinar lugar.' }
  ])

  const [lastDeleted, setLastDeleted] = useState<null | { task: Task; index: number }>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')

  const toggleDone = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const addTask = () => {
    const newTask: Task = { id: `t${Date.now()}`, title: title || 'Nueva tarea', done: false, desc: desc || '' }
    setTasks((prev) => [newTask, ...prev])
    setTitle('')
    setDesc('')
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => {
      const index = prev.findIndex((t) => t.id === id)
      if (index === -1) return prev
      const task = prev[index]
      // store last deleted with its original index
      setLastDeleted({ task, index })
      return prev.filter((t) => t.id !== id)
    })
  }

  const handleUndo = () => {
    if (!lastDeleted) return
    setTasks((prev) => {
      const restored = [...prev]
      // insert at original index if possible, otherwise at start
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
    <div className="uh-card level-4-correct">
      <header className="level-4__header">
        <h2>MiLista — Tareas</h2>
        <p>Interfaz corregida: etiquetas claras y símbolos familiares.</p>
      </header>

      <section className="task-creator">
        <div className="friendly-fields">
          <label>Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="P. ej. Comprar pan" />
          <label>Descripción</label>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Opcional" />
        </div>
        <div className="task-actions">
          <button className="btn primary" onClick={addTask}>Guardar</button>
          <button className="btn" onClick={handleUndo} disabled={!lastDeleted} aria-disabled={!lastDeleted}>Deshacer</button>
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

              <div className="task-controls">
                <button
                  className={`btn secondary detail-button`}
                  title="Ver detalles"
                  onClick={() => toggleDetails(task.id)}
                  aria-expanded={!!expanded[task.id]}
                >
                  <IoIosArrowDown aria-hidden="true" />
                </button>
                <button
                  title="Eliminar tarea"
                  className="delete-button friendly"
                  onClick={() => handleDelete(task.id)}
                >
                  <MdDelete />
                </button>
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

export default Level4Correct
