import React, { useState, useRef, useEffect } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
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
  { id: 'p1', author: 'Tú', title: 'Typo en título', content: 'Mi foro anterior tenía un typo en el título, es "productividad" en vez de "protictudad" 😡😡😡', time: '9:17 AM' },
  { id: 'p2', author: 'Tú', title: 'Tips de protictudad', content: 'Comparto mis tips para ser más eficiente en el uso de la IA.', time: '9:15 AM' },
  { id: 'p3', author: 'María García', title: 'Evento del viernes', content: 'Recuerden que tenemos reunión a las 3pm en Flajolet.', time: '8:45 AM' },
]

const Level7Correct: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [notification, setNotification] = useState<string | null>(null)
  const [notifType, setNotifType] = useState<'success' | 'error'>('success')
  const [lastPublishedId, setLastPublishedId] = useState<string | null>(null)
  const [undonePost, setUndonePost] = useState<Post | null>(null)
  const undoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const editRef = useRef<HTMLDivElement | null>(null)

  const showNotif = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification(msg)
    setNotifType(type)
  }

  const clearUndoTimeout = () => {
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current)
      undoTimeoutRef.current = null
    }
  }

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      showNotif('Completa todos los campos para publicar.', 'error')
      setTimeout(() => setNotification(null), 2500)
      return
    }

    clearUndoTimeout()

    const newPost: Post = {
      id: `p${Date.now()}`,
      author: 'Tú',
      title: title.trim(),
      content: content.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setPosts((prev) => [newPost, ...prev])
    setLastPublishedId(newPost.id)
    setTitle('')
    setContent('')
    setNotification(null)
    setUndonePost(null)
    showNotif('Publicado')
    setNotifType('success')

    undoTimeoutRef.current = setTimeout(() => {
      setLastPublishedId(null)
      setNotification(null)
    }, 5000)
  }

  const undoPublish = () => {
    if (!lastPublishedId) return
    setPosts((prev) => prev.filter((p) => p.id !== lastPublishedId))
    setLastPublishedId(null)
    clearUndoTimeout()
    setNotification(null)
    showNotif('Publicación eliminada.')
    setTimeout(() => setNotification(null), 2500)
  }

  const startEdit = (post: Post) => {
    setEditingId(post.id)
    setEditTitle(post.title)
    setEditContent(post.content)
  }

  const saveEdit = () => {
    if (!editingId) return
    if (!editTitle.trim() || !editContent.trim()) {
      showNotif('Completa todos los campos.', 'error')
      setTimeout(() => setNotification(null), 2500)
      return
    }
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editingId
          ? { ...p, title: editTitle.trim(), content: editContent.trim() }
          : p
      )
    )
    setEditingId(null)
    showNotif('Publicación editada correctamente.')
    setTimeout(() => setNotification(null), 2500)
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const deletePost = (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    setPosts((prev) => prev.filter((p) => p.id !== id))
    setUndonePost(post)
    showNotif('Publicación eliminada.')
  }

  const undoDelete = () => {
    if (!undonePost) return
    setPosts((prev) => {
      const idx = initialPosts.findIndex((p) => p.id === undonePost.id)
      const copy = [...prev]
      copy.splice(idx >= 0 ? idx : 0, 0, undonePost)
      return copy
    })
    setUndonePost(null)
    setNotification(null)
    showNotif('Publicación restaurada.')
    setTimeout(() => setNotification(null), 2500)
  }

  useEffect(() => {
    return () => clearUndoTimeout()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        cancelEdit()
      }
    }
    if (editingId) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [editingId])

  return (
    <div className="level-7 level-7-correct">
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
        <div className="level-7__publish-row">
          <button className="level-7__publish-btn" onClick={handlePublish}>
            Publicar
          </button>
          {title.trim() && content.trim() && (
            <button className="level-7__cancel-btn" onClick={() => { setTitle(''); setContent('') }}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="level-7__feed">
        <h3 className="level-7__section-title">Publicaciones recientes</h3>
        {posts.map((post) => (
          <article key={post.id} className="level-7__post">
            <div className="level-7__post-header">
              <div className="level-7__post-avatar">{post.author.charAt(0)}</div>
              <div className="level-7__post-meta">
                <span className="level-7__post-author">{post.author}</span>
                <span className="level-7__post-time">{post.time}</span>
              </div>
            </div>

            {editingId === post.id ? (
              <div className="level-7__edit-area" ref={editRef}>
                <input
                  className="level-7__input"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  autoFocus
                />
                <textarea
                  className="level-7__textarea"
                  rows={3}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="level-7__edit-actions">
                  <button className="level-7__save-btn" onClick={saveEdit}>Guardar</button>
                  <button className="level-7__cancel-btn" onClick={cancelEdit}>Cancelar</button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="level-7__post-title">{post.title}</h4>
                <p className="level-7__post-content">{post.content}</p>
                {post.author === 'Tú' && (
                  <div className="level-7__post-actions level-7__post-actions--available">
                    <button className="level-7__action-btn level-7__action-btn--edit" onClick={() => startEdit(post)}>
                      <FiEdit2 className="level-7__action-icon" />
                      <span>Editar</span>
                    </button>
                    <button className="level-7__action-btn level-7__action-btn--delete" onClick={() => deletePost(post.id)}>
                      <FiTrash2 className="level-7__action-icon" />
                      <span>Eliminar</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </article>
        ))}
      </div>

      {notification && (
        <div className={`level-7__notification level-7__notification--${notifType}`} role="status">
          {notification}
          {lastPublishedId && notifType === 'success' && notification === 'Publicado' && (
            <button className="level-7__undo-btn" onClick={undoPublish}>
              Deshacer
            </button>
          )}
          {undonePost && notifType === 'success' && notification === 'Publicación eliminada.' && (
            <button className="level-7__undo-btn" onClick={undoDelete}>
              Deshacer
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Level7Correct
