import { ReactElement } from 'react'
import './Card.css'

interface CardProps {
    children: ReactElement
}

export default function Card({ children }: CardProps) {
  return (
    <div className="card">
        {children}
    </div>
  )
}
