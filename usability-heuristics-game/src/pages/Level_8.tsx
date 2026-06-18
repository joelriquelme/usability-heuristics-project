import React, { useState, useEffect, useRef } from 'react'
import '../styles/Level_8.css'

interface SentEmail {
  para: string
  asunto: string
  mensaje: string
  timestamp: string
  errors: string[]
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Level_8: React.FC = () => {
  const [para, setPara] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [notification, setNotification] = useState<string | null>(null)
  const [notifExiting, setNotifExiting] = useState(false)
  const [notifType, setNotifType] = useState<'success' | 'warning' | 'error'>('success')
  const [history, setHistory] = useState<SentEmail[]>([])
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose')
  const notifTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    return () => clearTimeout(notifTimer.current)
  }, [])

  const showNotif = (msg: string) => {
    setNotifExiting(false)
    setNotification(msg)
    clearTimeout(notifTimer.current)
    notifTimer.current = setTimeout(() => {
      setNotifExiting(true)
      setTimeout(() => {
        setNotification(null)
        setNotifExiting(false)
      }, 200)
    }, 3000)
  }

  const detectErrors = (): string[] => {
    const errs: string[] = []
    if (!EMAIL_REGEX.test(para) && para.length > 0) errs.push('Destinatario inválido')
    if (para.length === 0) errs.push('Destinatario vacío')
    if (asunto.trim().length === 0) errs.push('Sin asunto')
    if (mensaje.trim().length === 0) errs.push('Mensaje vacío')
    return errs
  }

  const handleSend = () => {
    const errors = detectErrors()

    const entry: SentEmail = {
      para: para || '(vacío)',
      asunto: asunto || '(sin asunto)',
      mensaje: mensaje || '(vacío)',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      errors,
    }

    setHistory(prev => [entry, ...prev])

    if (errors.length > 0) {
      const onlySubjectIssue = errors.length === 1 && errors[0] === 'Sin asunto'
      if (onlySubjectIssue) {
        setNotifType('warning')
        showNotif('Correo enviado sin asunto')
      } else {
        setNotifType('error')
        showNotif(`No pudo llegar al destinatario: ${errors.join(', ')}`)
      }
    } else {
      setNotifType('success')
      showNotif('Correo enviado correctamente')
    }
  }

  const historyCount = history.length

  return (
    <div className="level-8">
      <header className="level-8__header">
        <div className="level-8__brand">
          <span className="level-8__brand-icon">✉</span>
          <span className="level-8__brand-name">Correo Institucional</span>
        </div>
      </header>

      <div className="level-8__tabs">
        <button
          className={`level-8__tab ${activeTab === 'compose' ? 'level-8__tab--active' : ''}`}
          onClick={() => setActiveTab('compose')}
        >
          Nuevo Correo
        </button>
        <button
          className={`level-8__tab ${activeTab === 'history' ? 'level-8__tab--active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Enviados
           {historyCount > 0 && <span className="level-8__tab-badge">{historyCount}</span>}
        </button>
      </div>

      {activeTab === 'compose' ? (
        <div className="level-8__form">
          <div className="level-8__field-group">
            <label className="level-8__label" htmlFor="level8-para">Para</label>
            <div
              className="level-8__field-wrapper"
              data-eval="show"
              question-id="level-8-email-field"
            >
              <input
                id="level8-para"
                className="level-8__input"
                type="text"
                placeholder="correo@ejemplo.com"
                value={para}
                onChange={e => setPara(e.target.value)}
              />
            </div>
          </div>

          <div className="level-8__field-group">
            <label className="level-8__label" htmlFor="level8-asunto">Asunto</label>
            <div
              className="level-8__field-wrapper"
              data-eval="show"
              question-id="level-8-subject-field"
            >
              <input
                id="level8-asunto"
                className="level-8__input"
                type="text"
                placeholder="Opcional"
                value={asunto}
                onChange={e => setAsunto(e.target.value)}
              />
            </div>
          </div>

          <div className="level-8__field-group">
            <label className="level-8__label" htmlFor="level8-mensaje">Mensaje</label>
            <textarea
              id="level8-mensaje"
              className="level-8__input level-8__textarea"
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
            />
          </div>

          <div
            className="level-8__send-area">
            <div data-eval="show" question-id="level-8-send-button">
            <button className="level-8__send-btn" onClick={handleSend}>
              Enviar Correo
            </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="level-8__history">
          {history.length === 0 ? (
            <div className="level-8__history-empty">
              No hay correos enviados todavía.
            </div>
          ) : (
            history.map((item, i) => {
              const onlySubject = item.errors.length === 1 && item.errors[0] === 'Sin asunto'
              const itemClass = item.errors.length === 0 ? '' : onlySubject ? 'level-8__history-item--warning' : 'level-8__history-item--error'

              return (
                <div key={i} className={`level-8__history-item ${itemClass}`}>
                  <div className="level-8__history-item-header">
                    <span className="level-8__history-item-to">Para: {item.para}</span>
                    <span className="level-8__history-item-time">{item.timestamp}</span>
                  </div>
                  <div className="level-8__history-item-subject">
                    Asunto: {item.asunto}
                  </div>
                  {item.errors.length > 0 && (
                    <div className="level-8__history-item-errors">
                      {item.errors.map((err, j) => (
                        <span key={j} className={`level-8__history-error-badge ${onlySubject ? 'level-8__history-error-badge--warning' : ''}`}>{err}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}

      {(notification || notifExiting) && (
        <div className={`level-8__notification level-8__notification--${notifType} ${notifExiting ? 'level-8__notification--exit' : ''}`} role="status">
          {notification}
        </div>
      )}
    </div>
  )
}

export default Level_8
