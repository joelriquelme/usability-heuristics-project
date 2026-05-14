import React, { useRef, useState } from 'react'
import { SlVolume2, SlVolume1 } from 'react-icons/sl'
import { BsFillSkipForwardFill, BsFillSkipBackwardFill, BsAppleMusic } from 'react-icons/bs'
import '../styles/Level_3.css'

// Dynamically load all files from src/assets/songs using Vite's glob (returns URLs)
const songModules = import.meta.glob('../assets/songs/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const songs = Object.keys(songModules).map((p, idx) => {
  const name = p.split('/').pop() || `track-${idx}`
  const title = decodeURIComponent(name.replace(/\.[^/.]+$/, ''))
  return { id: `${idx}-${name}`, title, url: songModules[p] }
})

const Level3Correct: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0-100
  const [volume, setVolume] = useState(5) // 0-10
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const audioElRef = useRef<HTMLAudioElement | null>(null)
  const progRafRef = useRef<number | null>(null)
  const TRACK_DURATION = 90 // seconds simulated track length

  // visualizer removed: static icon will be shown in UI instead of canvas

  function togglePlay() {
    setPlaying((prev) => {
      const next = !prev
      if (next) startAudio()
      else stopAudio()
      return next
    })
    // when starting, if progress is complete reset
    setProgress(p => (p >= 100 ? 0 : p))
  }

  function next() {
    setIndex(i => (i + 1) % songs.length)
    const ni = (index + 1) % songs.length
    setProgress(0)
    setPlaying(false)
    stopAudio()
    // do not auto-play next; if you want auto-play, call startAudio(ni)
  }

  function prev() {
    setIndex(i => (i - 1 + songs.length) % songs.length)
    const ni = (index - 1 + songs.length) % songs.length
    setProgress(0)
    setPlaying(false)
    stopAudio()
    // do not auto-play prev; if you want auto-play, call startAudio(ni)
  }

  function volUp() {
    setVolume(v => {
      const nv = Math.min(10, v + 1)
      if (gainRef.current) gainRef.current.gain.value = nv / 10
      return nv
    })
  }

  function volDown() {
    setVolume(v => {
      const nv = Math.max(0, v - 1)
      if (gainRef.current) gainRef.current.gain.value = nv / 10
      return nv
    })
  }

  function startAudio(optIndex?: number) {
    if (!audioElRef.current) audioElRef.current = new Audio()
    const audioEl = audioElRef.current
    const useIndex = typeof optIndex === 'number' ? optIndex : index
    audioEl.src = songs[useIndex]?.url || ''
    audioEl.crossOrigin = 'anonymous'
    audioEl.loop = false

    if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    const ctx = audioCtxRef.current

    // create gain and connect media source once
    if (!gainRef.current) {
      const gain = ctx.createGain()
      gain.gain.value = volume / 10
      gainRef.current = gain
    }

    // create media source only once for the audio element and reuse it
    if (!mediaSourceRef.current) {
      try {
        const source = ctx.createMediaElementSource(audioEl)
        mediaSourceRef.current = source
        // connect chain: source -> gain -> destination
        mediaSourceRef.current.connect(gainRef.current!)
        gainRef.current!.connect(ctx.destination)
      } catch (e) {
        // creating media source can throw if called multiple times for same element
        // ignore and continue if already connected
      }
    }

    // ensure audio context is running (autoplay policy)
    if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
      ctx.resume().catch(() => {})
    }

    audioEl.play().catch(() => {})

    // progress timing using audio duration when available
    function tick() {
      const cur = audioEl.currentTime || 0
      const dur = audioEl.duration && !isNaN(audioEl.duration) ? audioEl.duration : TRACK_DURATION
      const pct = Math.min(100, (cur / dur) * 100)
      setProgress(pct)
      if (!audioEl.paused) progRafRef.current = requestAnimationFrame(tick)
    }
    progRafRef.current = requestAnimationFrame(tick)
  }

  function stopAudio() {
    // stop and cleanup media element
    if (audioElRef.current) {
      try { audioElRef.current.pause() } catch (e) {}
      try { audioElRef.current.currentTime = 0 } catch (e) {}
    }
    if (progRafRef.current) {
      cancelAnimationFrame(progRafRef.current)
      progRafRef.current = null
    }
  }

  return (
    <div className="level-3">
      <header className="level-3__header">
        <div>
          <span className="level-3__eyebrow">Reproductor</span>
        </div>
      </header>

      <main className="level-3__main level-3__layout">
        <section className="level-3__left">
          <div className="level-3__visualizer-box">
            <div className="level-3__visualizer level-3__visual-icon">
              <div className={`level-3__wave ${playing ? 'is-playing' : ''}`} aria-hidden>
                {Array.from({ length: 30 }).map((_, i) => (
                  <span key={i} className="level-3__wave-bar" style={{ animationDelay: `${i * 0.06}s` }} />
                ))}
              </div>
            </div>
          </div>

          <div className="level-3__song-row">
            <div className="level-3__song">{songs[index].title}</div>
          </div>

          <div className="level-3__main-progress">
            <div className="level-3__progress-track">
              <div className="level-3__progress-fill" style={{ width: `${progress}%` }} />
              <div className="level-3__progress-knob" style={{ left: `${progress}%` }} />
            </div>
          </div>

          <div className="level-3__controls-row">
            <div className="level-3__small-controls">
              <button className="level-3__icon-btn" onClick={prev} aria-label="Anterior"><BsFillSkipBackwardFill /></button>
            </div>

            <button
              className={`level-3__play-circle ${playing ? 'playing' : ''}`}
              onClick={togglePlay}
              aria-label="Play/Pause"
            >
              <span className="level-3__play-center">{playing ? '⏸' : '▶'}</span>
            </button>

            <div className="level-3__small-controls">
              <button className="level-3__icon-btn" onClick={next} aria-label="Siguiente"><BsFillSkipForwardFill /></button>
            </div>
          </div>

          <div className="level-3__mini-progress">
            <div className="level-3__volume-inline">
              <button className="level-3__vol-btn" onClick={volDown} aria-label="Volumen bajar"><SlVolume1 /></button>
              <div className="level-3__vol-bar-inline"><div className="level-3__vol-fill-inline" style={{ width: `${(volume / 10) * 100}%` }} /></div>
              <button className="level-3__vol-btn" onClick={volUp} aria-label="Volumen subir"><SlVolume2 /></button>
            </div>
          </div>
        </section>

        <aside className="level-3__list">
          <h4>Lista de canciones</h4>
          <ul>
            {songs.map((s, i) => (
              <li key={s.id} className={`level-3__song-item ${i === index ? 'level-3__song-item--active' : ''}`}>{s.title}</li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  )
}

export default Level3Correct
