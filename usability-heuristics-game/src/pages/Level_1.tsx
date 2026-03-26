import React, { useEffect, useState } from 'react'
import '../styles/Level_1.css'

type Item = {
  id: string
  name: string
  price: number
}

type PayNotification = {
  id: number
  message: string
}

const Level_1: React.FC = () => {
  const initialItems: Item[] = [
    { id: 'a', name: 'Polera edición limitada', price: 15990 },
    { id: 'b', name: 'Tazón ilustrado', price: 8990 },
    { id: 'c', name: 'Libreta de apuntes', price: 6490 }
  ]

  const currencyFormatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  })

  // realQuantities: lo que el sistema procesa (afecta total)
  const [realQuantities, setRealQuantities] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {}
    initialItems.forEach((it) => (map[it.id] = 1))
    return map
  })

  const [notifications, setNotifications] = useState<PayNotification[]>([])

  const increase = (id: string) => {
    setRealQuantities((s) => ({ ...s, [id]: (s[id] || 0) + 1 }))
  }

  const decrease = (id: string) => {
    setRealQuantities((s) => ({ ...s, [id]: Math.max(0, (s[id] || 0) - 1) }))
  }

  const total = initialItems.reduce((acc, it) => acc + it.price * (realQuantities[it.id] || 0), 0)

  const handlePay = () => {
    // Generamos un ID único para esta notificación específica
    const newId = Date.now() + Math.random()

    // Simulamos el retraso de "procesamiento"
    setTimeout(() => {
      const newNotification = { id: newId, message: '¡Pago exitoso! Se ha descontado el total.' }
      
      setNotifications((prev) => [...prev, newNotification])

      // Programamos su eliminación individual después de 3 segundos
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newId))
      }, 3000)
    }, 3000)
  }

  return (
    <div className="uh-card level-1">

      <div className="level-1__notifications-stack">
        {notifications.map((n) => (
          <div key={n.id} className="level-1__notification">
            <span className="level-1__notification-icon">✓</span>
            {n.message}
          </div>
        ))}
      </div>

      <div className="level-1__header">
        <div>
          <span className="level-1__eyebrow">Checkout</span>
        </div>
        <div className="level-1__status-chip">Pedido listo para pagar</div>
      </div>

      <div className="level-1__merchant">
        <div>
          <div className="level-1__merchant-label">Tienda</div>
          <div className="level-1__merchant-name">Memoria Store Chile</div>
        </div>
        <div className="level-1__merchant-note">Despacho estimado: 2 a 4 días hábiles</div>
      </div>

      <div className="level-1__items">
        {initialItems.map((it, index) => (
          <div
            key={it.id}
            className="level-1__item"
          >
            <div data-eval={index === 0 ? "show" : undefined} question-id={index === 0 ? "level-1-price-display" : undefined}>
              <div className="level-1__item-name">{it.name}</div>
              <div className="level-1__item-price">
                Precio unitario: {currencyFormatter.format(it.price)}
              </div>
            </div>

            <div className="level-1__controls"  data-eval={index === 0 ? "show" : undefined} question-id={index === 0 ? "level-1-quantity-input" : undefined}>
              <button className="level-1__button" onClick={() => decrease(it.id)} aria-label={`disminuir-${it.id}`}>–</button>
              <div className="level-1__quantity" aria-live="polite">
                <span className="level-1__quantity-icon" aria-hidden="true">◌</span>
              </div>
              <button className="level-1__button" onClick={() => increase(it.id)} aria-label={`aumentar-${it.id}`}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="level-1__summary">
        <div data-eval="show" question-id="level-1-total-display">
          <div className="level-1__summary-label">Total (procesado por el sistema):</div>
          <div className="level-1__summary-total">{currencyFormatter.format(total)}</div>
        </div>

        <div data-eval="show" question-id="level-1-pay-button">
          <button className="level-1__pay-button" onClick={handlePay}>Pagar ahora</button>
        </div>
      </div>
    </div>
  )
}

export default Level_1
