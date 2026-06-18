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

const Level_8_Correct: React.FC = () => {
  const [para, setPara] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [notifExiting, setNotifExiting] = useState(false)
  const [notifType, setNotifType] = useState<'success' | 'warning'>('success')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
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

  const isValidEmail = EMAIL_REGEX.test(para)
  const canSend = isValidEmail && mensaje.trim().length > 0 && !isSending

  const executeSend = () => {
    setIsSending(true)
    showNotif('Enviando correo...')

    setTimeout(() => {
      const errors = asunto.trim().length === 0
        ? ['Sin asunto']
        : []

      const entry: SentEmail = {
        para,
        asunto: asunto || '(sin asunto)',
        mensaje,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        errors,
      }

      setHistory(prev => [entry, ...prev])
      setIsSending(false)
      setShowConfirmModal(false)
      if (errors.length > 0) {
        setNotifType('warning')
        showNotif(`Correo enviado a "${para}" (sin asunto)`)
      } else {
        setNotifType('success')
        showNotif(`Correo enviado a "${para}" correctamente.`)
      }
    }, 1500)
  }

  const handleSend = () => {
    if (isSending) return

    if (asunto.trim().length === 0) {
      setShowConfirmModal(true)
      return
    }

    executeSend()
  }

  const confirmSend = () => {
    setShowConfirmModal(false)
    executeSend()
  }

  const cancelSend = () => {
    setShowConfirmModal(false)
  }

  const historyCount = history.length

  return (
    <div className="level-8 level-8--correct">
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
            <label className="level-8__label" htmlFor="level8c-para">Para *</label>
            <div className="level-8__field-wrapper level-8__field-wrapper--validated">
              <input
                id="level8c-para"
                className={`level-8__input ${para.length > 0 && !isValidEmail ? 'level-8__input--invalid' : ''} ${isValidEmail ? 'level-8__input--valid' : ''}`}
                type="text"
                placeholder="correo@ejemplo.com"
                value={para}
                onChange={e => setPara(e.target.value)}
              />
              {para.length > 0 && !isValidEmail && (
                <span className="level-8__validation-icon" title="Formato de correo inválido">⚠</span>
              )}
              {isValidEmail && (
                <span className="level-8__validation-icon level-8__validation-icon--ok" title="Formato válido">✓</span>
              )}
            </div>
            {para.length > 0 && !isValidEmail && (
              <span className="level-8__field-hint level-8__field-hint--error">
                Ingresa un correo válido (ej. usuario@dominio.com)
              </span>
            )}
          </div>

          <div className="level-8__field-group">
            <label className="level-8__label" htmlFor="level8c-asunto">Asunto</label>
            <input
              id="level8c-asunto"
              className="level-8__input"
              type="text"
              placeholder="Opcional"
              value={asunto}
              onChange={e => setAsunto(e.target.value)}
            />
            {asunto.trim().length === 0 && (
              <span className="level-8__field-hint">Recomendado: incluir un asunto ayuda al destinatario</span>
            )}
          </div>

          <div className="level-8__field-group">
            <label className="level-8__label" htmlFor="level8c-mensaje">Mensaje *</label>
            <textarea
              id="level8c-mensaje"
              className={`level-8__input level-8__textarea ${mensaje.trim().length === 0 && para.length > 0 ? 'level-8__input--invalid' : ''}`}
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
            />
            {mensaje.trim().length === 0 && para.length > 0 && (
              <span className="level-8__field-hint level-8__field-hint--error">El mensaje no puede estar vacío</span>
            )}
          </div>

          <div className="level-8__send-area">
            <button
              className={`level-8__send-btn ${!canSend ? 'level-8__send-btn--disabled' : ''}`}
              onClick={handleSend}
              disabled={!canSend}
            >
              {isSending ? 'Enviando...' : 'Enviar Correo'}
            </button>
            <span className="level-8__send-hint">
              {!isValidEmail && para.length > 0
                ? 'Corrige el formato del destinatario'
                : !canSend
                  ? 'Completa los campos obligatorios (*)'
                  : 'Listo para enviar'}
            </span>
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

      {showConfirmModal && (
        <div className="level-8__modal-overlay" onClick={cancelSend} role="dialog" aria-modal="true">
          <div className="level-8__modal" onClick={e => e.stopPropagation()}>
            <h3>¿Enviar sin asunto?</h3>
            <p>El campo "Asunto" está vacío. ¿Deseas enviar el correo de todas formas?</p>
            <div className="level-8__modal-actions">
              <button className="level-8__send-btn" onClick={confirmSend}>Enviar de todas formas</button>
              <button className="level-8__modal-cancel" onClick={cancelSend}>Regresar</button>
            </div>
          </div>
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

export default Level_8_Correct
