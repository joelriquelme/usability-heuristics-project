import React, { useEffect, useState } from 'react'
import '../styles/Level_8.css'

type Task = {
  id: string
  title: string
  selected?: boolean
  saved?: boolean
  favorite?: boolean
  sent?: boolean
  completed?: boolean
}

const initialTasks: Task[] = [
  { id: 't1', title: 'Preparar informe semanal' },
  { id: 't2', title: 'Revisar PR #34' },
  { id: 't3', title: 'Enviar actualización al cliente' }
]

const Icon: React.FC<{label: string; children: React.ReactNode}> = ({ label, children }) => (
  <span className="level-8__icon-inner" aria-hidden>{children}</span>
)

const Level_8: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [notification, setNotification] = useState<string | null>(null)
  const [buttonCorrect, setButtonCorrect] = useState<Record<string, boolean>>({})
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [loginUser, setLoginUser] = useState<string>('usuario@example.com')
  const [loginPass, setLoginPass] = useState<string>('contraseña123')

  useEffect(() => {
    if (!notification) return
    const t = setTimeout(() => setNotification(null), 2500)
    return () => clearTimeout(t)
  }, [notification])

  function toggleSelect(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, selected: !t.selected } : t))
  }

  function showNotification(msg: string) {
    setNotification(msg)
  }

  function markButtonTemp(action: string) {
    setButtonCorrect(prev => ({ ...prev, [action]: true }))
    setTimeout(() => setButtonCorrect(prev => ({ ...prev, [action]: false })), 1400)
  }

  function handleAction(action: 'save' | 'star' | 'send' | 'check') {
    if (isLoggedOut) {
      showNotification('No se puede ejecutar la acción: sesión cerrada')
      return
    }

    // For 'check' (logout) we do not require selection.
    if (action === 'check') {
      setIsLoggedOut(true)
      setTasks(prev => prev.map(t => ({ ...t, selected: false })))
      showNotification('Sesión cerrada (emulada)')
      markButtonTemp(action)
      return
    }

    const selected = tasks.filter(t => t.selected)
    if (selected.length === 0) {
      showNotification('Selecciona al menos una tarea')
      return
    }

    // NOTE: Intentionally wrong mappings to emulate bad icon semantics
    if (action === 'save') {
      // disquete -> en realidad envía al responsable por correo
      setTasks(prev => prev.map(t => t.selected ? { ...t, sent: true, selected: false } : t))
      showNotification(`${selected.length} tarea(s) enviada(s) al responsable por correo`)
    }

    if (action === 'star') {
      // estrella -> en vez de favorito, elimina el contenido
      const ids = new Set(selected.map(s => s.id))
      setTasks(prev => prev.filter(t => !ids.has(t.id)))
      showNotification(`${selected.length} tarea(s) eliminada(s)`)
    }

      if (action === 'send') {
        // avión de papel -> marca la(s) tarea(s) como completadas (emulado)
        setTasks(prev => prev.map(t => t.selected ? { ...t, completed: true, selected: false } : t))
        showNotification(`${selected.length} tarea(s) marcada(s) como completada(s)`)
    }

    markButtonTemp(action)
  }

  function openLoginModal() {
    setShowLoginModal(true)
  }

  function closeLoginModal() {
    setShowLoginModal(false)
  }

  function submitLogin(e?: React.FormEvent) {
    e && e.preventDefault()
    // accept any credentials
    setIsLoggedOut(false)
    setShowLoginModal(false)
    showNotification('Sesión iniciada (emulada)')
  }

  return (
    <div className="level-8">
      <header className="level-8__header">
        <div>
          <span className="level-8__eyebrow">Dashboard</span>
          <h2 className="level-8__title">Panel de control</h2>
          <p className="level-8__intro">Barra de herramientas con íconos sin etiquetas. Selecciona tareas y usa las herramientas para emular acciones.</p>
        </div>

        <div className="level-8__toolbar" role="toolbar" aria-label="Herramientas">
          <button
            className={`level-8__tool ${buttonCorrect['save'] ? 'correct-answer' : ''} ${isLoggedOut ? 'disabled' : ''}`}
            data-eval="show"
            question-id="level-8-icon-save"
            aria-label="save"
            onClick={() => handleAction('save')}
            disabled={isLoggedOut}
          >
            <Icon label="save">💾</Icon>
            <span className="level-8__tooltip">Guardar (esperado)</span>
          </button>

          <button
            className={`level-8__tool ${buttonCorrect['star'] ? 'correct-answer' : ''} ${isLoggedOut ? 'disabled' : ''}`}
            data-eval="show"
            question-id="level-8-icon-star"
            aria-label="star"
            onClick={() => handleAction('star')}
            disabled={isLoggedOut}
          >
            <Icon label="star">⭐</Icon>
            <span className="level-8__tooltip">Eliminar</span>
          </button>

          <button
            className={`level-8__tool ${buttonCorrect['send'] ? 'correct-answer' : ''} ${isLoggedOut ? 'disabled' : ''}`}
            data-eval="show"
            question-id="level-8-icon-send"
            aria-label="send"
            onClick={() => handleAction('send')}
            disabled={isLoggedOut}
          >
            <Icon label="send">✈️</Icon>
            <span className="level-8__tooltip">Tarea Completada</span>
          </button>

          <button
            className={`level-8__tool ${buttonCorrect['check'] ? 'correct-answer' : ''} ${isLoggedOut ? 'disabled' : ''}`}
            data-eval="show"
            question-id="level-8-icon-check"
            aria-label="check"
            onClick={() => handleAction('check')}
            disabled={isLoggedOut}
          >
            <Icon label="check">✔️</Icon>
            <span className="level-8__tooltip">Confirmar (esperado)</span>
          </button>

          {isLoggedOut && (
            <button className="level-8__login" onClick={openLoginModal} aria-label="Iniciar sesión">Iniciar sesión</button>
          )}
        </div>
      </header>

      <main className="level-8__main">
        <ul className="level-8__tasks">
          {tasks.map((t) => (
            <li
              key={t.id}
              className={`level-8__task ${t.selected ? 'level-8__task--selected' : ''}`}
              onClick={() => toggleSelect(t.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSelect(t.id) } }}
            >
              <div className="level-8__task-left">
                <div>
                  <div className="level-8__task-title">{t.title}</div>
                  <div className="level-8__badges">
                    {t.saved && <span className="level-8__badge">Guardado</span>}
                    {t.favorite && <span className="level-8__badge">Favorito</span>}
                    {t.sent && <span className="level-8__badge">Enviado</span>}
                    {t.completed && <span className="level-8__badge level-8__badge--success">Completada</span>}
                  </div>
                </div>
              </div>

              <div className="level-8__task-actions">
                <button className="level-8__action" onClick={(e) => { e.stopPropagation(); /* edit emulation can go here */ }}>Editar</button>
                <button className="level-8__action level-8__action--danger" onClick={(e) => { e.stopPropagation(); setTasks(prev => prev.filter(x => x.id !== t.id)) }}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      {notification && (
        <div className="level-8__notification" role="status">{notification}</div>
      )}

      {showLoginModal && (
        <div className="level-8__modal-overlay" onClick={closeLoginModal} role="dialog" aria-modal="true">
          <div className="level-8__modal" onClick={(e) => e.stopPropagation()}>
            <h3>Iniciar sesión</h3>
            <form onSubmit={submitLogin}>
              <label className="level-8__modal-label">Usuario</label>
              <input className="level-8__modal-input" value={loginUser} onChange={e => setLoginUser(e.target.value)} />
              <label className="level-8__modal-label">Contraseña</label>
              <input className="level-8__modal-input" type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)} />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button type="submit" className="level-8__action">Iniciar sesión</button>
                <button type="button" className="level-8__action level-8__action--danger" onClick={closeLoginModal}>Cancelar</button>
              </div>
            </form>
            <p style={{ marginTop: 12, color: '#6b7280' }}>Acepta cualquier credencial (emulado).</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Level_8
