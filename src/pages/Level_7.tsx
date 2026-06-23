import React, { useState } from 'react'
import '../styles/Level.css'
import '../styles/Level_7.css'

type Post = {
  id: string
  author: string
  title: string
  content: string
  time: string
}

const initialPosts: Post[] = [
  { id: 'p1', author: 'Tú', title: 'Typo en título', content: 'Mi foro anterior tenía un typo en el título, es \"productividad\" en vez de \"protictudad\" 😡😡😡', time: '9:17 AM' },
  { id: 'p2', author: 'Tú', title: 'Tips de protictudad', content: 'Comparto mis tips para ser más eficiente en el uso de la IA.', time: '9:15 AM' },
  { id: 'p3', author: 'María García', title: 'Evento del viernes', content: 'Recuerden que tenemos reunión a las 3pm en Flajolet.', time: '8:45 AM' },
]

const Level7: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [notification, setNotification] = useState<string | null>(null)
  const [notifType, setNotifType] = useState<'success' | 'error'>('success')

  const showNotif = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification(msg)
    setNotifType(type)
    setTimeout(() => setNotification(null), 2500)
  }

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      showNotif('Completa todos los campos para publicar.', 'error')
      return
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      author: 'Tú',
      title: title.trim(),
      content: content.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setPosts((prev) => [newPost, ...prev])
    setTitle('')
    setContent('')
    showNotif('¡Publicado!')
  }

  return (
    <div className="level-7">
      <header className="level-7__header">
        <div className="level-7__brand">
          <span className="level-7__brand-name">Comunidad DCC</span>
        </div>
        <span className="level-7__subtitle">Tu red DCCiana</span>
      </header>

      <div className="level-7__publish-area">
        <h3 className="level-7__section-title">Crear publicación</h3>
        <input
          className="level-7__input"
          type="text"
          placeholder="Título de la publicación"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="level-7__textarea"
          placeholder="Escribe tu mensaje aquí..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="level-7__publish-row" >
          <div data-eval="show" question-id="level-7-publish">
            <button className="level-7__publish-btn" onClick={handlePublish}>
              Publicar
            </button>
          </div>
        </div>
      </div>

      <div className="level-7__feed">
        <h3 className="level-7__section-title">Publicaciones recientes</h3>
        {posts.map((post) => {
          const evalAttr = post.id === 'p1' ? 'level-7-correction-frustration' : post.id === 'p2' ? 'level-7-error' : undefined
          return (
            <article
              key={post.id}
              className="level-7__post"
              {...(evalAttr ? { 'data-eval': 'show', 'question-id': evalAttr } : {})}
            >
              <div className="level-7__post-header">
                <div className="level-7__post-avatar">{post.author.charAt(0)}</div>
                <div className="level-7__post-meta">
                  <span className="level-7__post-author">{post.author}</span>
                  <span className="level-7__post-time">{post.time}</span>
                </div>
              </div>
              <h4 className="level-7__post-title">{post.title}</h4>
              <p className="level-7__post-content">{post.content}</p>
            </article>
          )
        })}
      </div>

      {notification && (
        <div className={`level-7__notification level-7__notification--${notifType}`} role="status">
          {notification}
        </div>
      )}
    </div>
  )
}

export default Level7
