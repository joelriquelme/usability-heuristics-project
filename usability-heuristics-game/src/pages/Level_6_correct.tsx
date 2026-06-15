import React, { useState } from 'react'
import '../styles/Level.css'
import '../styles/Level_6.css'

type FormState = {
  nombre: string
  plan: 'Básico' | 'Premium' | ''
}

const Level6Correct: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formValues, setFormValues] = useState<FormState>({ nombre: '', plan: '' })
  const [accountCreated, setAccountCreated] = useState(false)

  const canAccessStep = (step: number): boolean => {
    if (step === 1) return true
    if (step === 2) return formValues.nombre.trim().length > 0
    return formValues.nombre.trim().length > 0 && formValues.plan !== ''
  }

  const goToStep = (step: number) => {
    if (canAccessStep(step)) {
      setCurrentStep(step)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }

  const handleCreateAccount = () => {
    setAccountCreated(true)
  }

  const updateNombre = (val: string) => {
    setFormValues((prev) => ({ ...prev, nombre: val }))
  }

  const selectPlan = (plan: 'Básico' | 'Premium') => {
    setFormValues((prev) => ({ ...prev, plan }))
  }

  const canGoNext = (): boolean => {
    if (currentStep === 1) return formValues.nombre.trim().length > 0
    if (currentStep === 2) return formValues.plan !== ''
    return true
  }

  return (
    <div className="uh-card level-6 level-6-correct">
      <div className="level-6__header">
        <h2>Creación de Cuenta</h2>
        <p className="level-6__subtitle">Asistente de configuración</p>
      </div>

      <div className="level-6__steps level-6__steps--clickable">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            {step > 1 && <span className="level-6__step-divider">—</span>}
            <button
              className={`level-6__step-badge level-6__step-badge--btn ${currentStep === step && !accountCreated ? 'active' : ''} ${accountCreated || currentStep > step ? 'completed' : ''}`}
              onClick={() => goToStep(step)}
              disabled={step === currentStep || !canAccessStep(step)}
            >
              {step}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="level-6__body">
        {accountCreated && currentStep === 3 ? (
          <div className="level-6__success">
            <div className="level-6__success-icon">✓</div>
            <h2>¡Cuenta creada exitosamente!</h2>
            <p>Bienvenido, <strong>{formValues.nombre}</strong>. Tu plan <strong>{formValues.plan}</strong> está activo.</p>
            <div className="level-6__edit-hint">
              <span className="level-6__hint-icon">!</span>
              <span>Puedes seguir editando tus datos usando los indicadores de paso o el botón Atrás.</span>
            </div>
          </div>
        ) : currentStep === 1 ? (
          <div className="level-6__step-content">
            <h3>Paso 1: Datos de Usuario</h3>
            <div className="level-6__field">
              <label htmlFor="nombre-correct">Nombre de usuario</label>
              <input
                id="nombre-correct"
                type="text"
                value={formValues.nombre}
                onChange={(e) => updateNombre(e.target.value)}
                placeholder="Ingresa tu nombre"
              />
            </div>
          </div>
        ) : currentStep === 2 ? (
          <div className="level-6__step-content">
            <h3>Paso 2: Selección de Plan</h3>
            <div className="level-6__plans">
              <button
                className={`level-6__plan-card ${formValues.plan === 'Básico' ? 'selected' : ''}`}
                onClick={() => selectPlan('Básico')}
              >
                <div className="level-6__plan-name">Básico</div>
                <div className="level-6__plan-price">Gratis</div>
                <ul className="level-6__plan-features">
                  <li>1 usuario</li>
                  <li>5 GB de almacenamiento</li>
                  <li>Soporte estándar</li>
                </ul>
              </button>
              <button
                className={`level-6__plan-card ${formValues.plan === 'Premium' ? 'selected' : ''}`}
                onClick={() => selectPlan('Premium')}
              >
                <div className="level-6__plan-name">Premium</div>
                <div className="level-6__plan-price">$9.99/mes</div>
                <ul className="level-6__plan-features">
                  <li>Usuarios ilimitados</li>
                  <li>100 GB de almacenamiento</li>
                  <li>Soporte prioritario</li>
                </ul>
              </button>
            </div>
          </div>
        ) : (
          <div className="level-6__step-content">
            <h3>Paso 3: Confirmación Final</h3>
            <div className="level-6__summary">
              <div className="level-6__summary-row">
                <span className="level-6__summary-label">Nombre:</span>
                <span className="level-6__summary-value">{formValues.nombre}</span>
              </div>
              <div className="level-6__summary-row">
                <span className="level-6__summary-label">Plan:</span>
                <span className="level-6__summary-value">{formValues.plan}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="level-6__footer">
        <div className="level-6__actions level-6__actions--corrected">
          {currentStep > 1 && (
            <button className="level-6__btn level-6__btn--secondary" onClick={handleBack}>
              Atrás
            </button>
          )}
          {accountCreated && currentStep === 3 ? (
            <button className="level-6__btn level-6__btn--primary" disabled>Siguiente</button>
          ) : currentStep < 3 ? (
            <button
              className="level-6__btn level-6__btn--primary"
              onClick={handleNext}
              disabled={!canGoNext()}
            >
              Siguiente
            </button>
          ) : (
            <button
              className="level-6__btn level-6__btn--primary"
              onClick={handleCreateAccount}
              disabled={!canGoNext()}
            >
              Crear Cuenta
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Level6Correct
