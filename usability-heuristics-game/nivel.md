# Documento de Diseño de Nivel: El laberinto del Asistente (Wizard)

## Heurística: 3. Control y libertad del usuario

### Nivel 6 “El laberinto del Asistente”

### Objetivo de aprendizaje
Comprender la importancia de ofrecer "salidas de emergencia" claras y la capacidad de retroceder o abandonar un flujo de múltiples pasos sin perder el control o verse obligado a reiniciar todo el proceso desde cero.

---

## 1. Estructura de Datos y Estados (Para Desarrollo en TSX)

Para la implementación en React con TypeScript, el componente debe manejar los siguientes estados principales:

```typescript
type WizardStep = 1 | 2 | 3;

interface FormState {
  nombre: string;
  plan: 'Básico' | 'Premium' | '';
}

// Estados del componente principal:
// - currentStep: step actual (1, 2 o 3)
// - mode: 'exploratorio' | 'evaluativo' | 'corregido'
// - formValues: data del formulario (FormState)
// - selectedErrorAreas: string[] (para registrar los clics del modo evaluativo)
// - levelCompleted: boolean
2. Contexto del Nivel y Flujo del Formulario
El usuario interactúa con un asistente de configuración de cuenta simulado que consta de 3 pasos:

Paso 1: Datos de Usuario

Campo de texto: Nombre de usuario.

Botón: Siguiente.

Paso 2: Selección de Plan

Opciones de selección: Plan Básico o Plan Premium.

Botón: Siguiente.

Paso 3: Confirmación Final

Resumen visual con el Nombre y el Plan seleccionado.

Botón: Crear Cuenta.

3. Ruptura con la Heurística (Modo Defectuoso)
En las versiones Exploratoria y Evaluativa, la interfaz rompe el control y la libertad del usuario mediante dos fallos críticos de diseño:

Ausencia de botón "Atrás": En los Pasos 2 y 3, solo existe el botón para avanzar (Siguiente o Crear Cuenta). No hay ninguna forma de regresar al paso anterior para corregir un dato.

Pasos de cabecera estáticos (Indicadores bloqueados): La barra superior muestra los números de los pasos [1] — [2] — [3], pero estos no son cliqueables. El usuario no puede saltar libremente entre secciones.

Encierro absoluto: Si el usuario nota un error en el Paso 2 (por ejemplo, escribió mal su nombre en el Paso 1), se encuentra en un callejón sin salida. La interfaz lo obliga a avanzar con el error o a recargar la página web por completo.

4. Modos de Juego
A. Modo Exploratorio
Comportamiento: El jugador llena el formulario de manera fluida. Al llegar al Paso 2, el juego le lanza una instrucción en pantalla (ej. "¡Oh no! Te diste cuenta de que escribiste mal tu nombre en el paso anterior. Intenta regresar para corregirlo").

Experiencia: El jugador intentará buscar un botón "Atrás" o cliquear el indicador del Paso 1 en la cabecera. Al notar que nada reacciona y que está atrapado en un flujo unidireccional, experimenta la frustración real de la falta de libertad en el sistema.

Acción de salida: Un botón externo al juego que dice "Pasar al modo evaluativo".

B. Modo Evaluativo
Objetivo: El jugador debe hacer clic exactamente en las zonas donde la interfaz está privando al usuario de su control.

Zonas interactivas correctas (Hitboxes de error):

La barra de indicadores superior: Al hacer clic sobre los pasos inactivos [Paso 1] o [Paso 2], se registra como acierto (aquí debería haber navegación libre).

El contenedor inferior (junto al botón Siguiente): Al hacer clic en el espacio vacío a la izquierda del botón "Siguiente" (donde por estándar debería ubicarse el botón "Atrás"), se registra como acierto.

Feedback de selección: Al cliquear estas zonas, se iluminan con un borde rojo indicando que se identificó el error de usabilidad. Una vez seleccionadas ambas zonas, se habilita el botón "Aplicar corrección heurística".

C. Modo Corregido (Resolución)
Transformación visual y funcional: El componente muta a su estado óptimo de usabilidad:

Aparece un botón "Atrás" estilizado al lado del botón "Siguiente".

Los indicadores de la cabecera se vuelven botones cliqueables con un estilo visual cursor: pointer y estados :hover.

Los datos ingresados por el usuario se mantienen intactos al navegar hacia atrás o adelante.

Condición de victoria: El jugador usa las nuevas salidas de emergencia para volver al Paso 1, cambia exitosamente el nombre y completa el flujo del asistente.

5. Aprendizaje Esperado
El jugador comprende que los usuarios interactúan con los sistemas de forma dinámica y cometen errores constantemente de manera accidental. Un buen diseño arquitectónico de flujos debe proveer siempre "salidas de emergencia" explícitas (como botones de atrás, cancelar o navegación no lineal) para evitar que el usuario se sienta atrapado o frustrado por el sistema.