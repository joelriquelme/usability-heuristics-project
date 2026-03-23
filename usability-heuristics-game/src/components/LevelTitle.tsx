import React from 'react'

type LevelTitleProps = {
  eyebrow?: string
  title: string
  description?: string
}

const LevelTitle: React.FC<LevelTitleProps> = ({ eyebrow, title, description }) => {
  return (
    <div className="level-title uh-level-tittle">
      {eyebrow ? <span className="level-title__eyebrow">{eyebrow}</span> : null}
      <h1 className="level-title__heading">{title}</h1>
      {description ? <p className="level-title__description">{description}</p> : null}
    </div>
  )
}

export default LevelTitle