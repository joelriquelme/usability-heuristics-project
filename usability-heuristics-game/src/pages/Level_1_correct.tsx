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

const Level1Correct: React.FC = () => {
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

  const [isPaying, setIsPaying] = useState(false); // Nuevo estado para controlar el estado del botón de pagar
  const [isPaid, setIsPaid] = useState(false); // Nuevo estado para bloquear el botón permanentemente después del pago

  const increase = (id: string) => {
    setRealQuantities((s) => ({ ...s, [id]: (s[id] || 0) + 1 }))
  }

  const decrease = (id: string) => {
    setRealQuantities((s) => ({ ...s, [id]: Math.max(0, (s[id] || 0) - 1) }))
  }

  const total = initialItems.reduce((acc, it) => acc + it.price * (realQuantities[it.id] || 0), 0)

  const handlePay = () => {
    if (isPaying || isPaid) return; // Evitar múltiples clics

    setIsPaying(true); // Iniciar el estado de "procesando"

    // Generamos un ID único para esta notificación específica
    const newId = Date.now() + Math.random();

    // Simulamos el retraso de "procesamiento"
    setTimeout(() => {
      const newNotification = { id: newId, message: '¡Pago exitoso! Se ha descontado el total.' }

      setNotifications((prev) => [...prev, newNotification])
      setIsPaying(false); // Finalizar el estado de "procesando"
      setIsPaid(true); // Bloquear el botón permanentemente

      // Programamos su eliminación individual después de 3 segundos
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== newId))
      }, 3000);
    }, 3000);
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
        {initialItems.map((it) => (
          <div
            key={it.id}
            className="level-1__item"
          >
            <div>
              <div className="level-1__item-name">{it.name}</div>
              <div className="level-1__item-price">
                Precio unitario: {currencyFormatter.format(it.price)}
              </div>
            </div>

            <div className="level-1__controls">
              <button 
                className="level-1__button" 
                onClick={() => decrease(it.id)} 
                aria-label={`disminuir-${it.id}`} 
                disabled={isPaid} // Deshabilitar si el pago ya se realizó
              >
                –
              </button>
              <div className="level-1__quantity" aria-live="polite">
                <span className="level-1__quantity-icon" aria-hidden="true">{realQuantities[it.id] || 0}</span>
              </div>
              <button 
                className="level-1__button" 
                onClick={() => increase(it.id)} 
                aria-label={`aumentar-${it.id}`} 
                disabled={isPaid} // Deshabilitar si el pago ya se realizó
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="level-1__summary">
        <div>
          <div className="level-1__summary-label">Total (procesado por el sistema):</div>
          <div className="level-1__summary-total">{currencyFormatter.format(total)}</div>
        </div>

        <div>
          <button
            className={`level-1__pay-button ${isPaying ? 'loading' : ''} ${isPaid ? 'disabled' : ''}`} // Agregar clases dinámicas
            onClick={handlePay}
            disabled={isPaying || isPaid} // Deshabilitar el botón si está procesando o ya se pagó
          >
            <div className="button-content"> {/* Contenedor para texto y spinner */}
              {isPaying ? 'Procesando...' : isPaid ? 'Pago realizado' : 'Pagar ahora'}
              {isPaying && (<span className="spinner" aria-hidden="true"></span>)} {/* Spinner solo si está procesando */}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}


export default Level1Correct;