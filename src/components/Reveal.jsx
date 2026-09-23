import { useReveal } from '../hooks/useReveal'
import styles from './Reveal.module.css'

// Envuelve una sección para que aparezca con un fade + slide suave cuando
// entra en pantalla, en vez de estar visible de entrada.
export default function Reveal({ children, className = '', as: Tag = 'div' }) {
  const [ref, visible] = useReveal()
  return (
    <Tag ref={ref} className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}>
      {children}
    </Tag>
  )
}
