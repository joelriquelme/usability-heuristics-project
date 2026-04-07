import React from 'react'

// Registry of level components. Add new levels here using lazy imports.
// Example: '2': React.lazy(() => import('../Level_2'))
export const levels: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  '1': React.lazy(() => import('../Level_1')),
  '1_correct': React.lazy(() => import('../Level_1_correct')),
  '2': React.lazy(() => import('../Level_2')),
  '2_correct': React.lazy(() => import('../Level_2_correct'))
}

export function getLevelComponent(id?: string) {
  if (!id) return undefined
  return levels[id]
}

export default levels