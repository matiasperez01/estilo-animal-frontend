import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconWhatsApp } from './icons/Icon'
import styles from '../pages/Home.module.css'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER
const INTERVALO_MS = 6000

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0)
  const pausadoRef = useRef(false)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      if (!pausadoRef.current) {
        setIndex(i => (i + 1) % slides.length)
      }
    }, INTERVALO_MS)
    return () => clearInterval(id)
  }, [slides.length])

  // Si el slide activo queda fuera de rango (ej: cambió la cantidad de
  // slides al terminar de cargar destacados), lo llevamos al primero.
  const actual = slides[index] ?? slides[0]
  if (!actual) return null

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => { pausadoRef.current = true }}
      onMouseLeave={() => { pausadoRef.current = false }}
    >
      <div className={styles.heroVisual}>
        {slides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt={s.alt ?? ''}
            className={`${styles.heroImg} ${styles.heroSlideImg} ${i === index ? styles.heroSlideActive : ''}`}
          />
        ))}
        {slides.length > 1 && (
          <div className={styles.heroDots}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${styles.heroDot} ${i === index ? styles.heroDotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ver slide ${i + 1} de ${slides.length}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.heroContent}>
        {actual.eyebrow && <p className={styles.heroEyebrow}>{actual.eyebrow}</p>}
        <h1 className={styles.heroTitle}>{actual.title}</h1>
        <p className={styles.heroSub}>{actual.sub}</p>
        <div className={styles.heroCtas}>
          <Link to={actual.ctaLink} className={styles.heroCta}>{actual.ctaText}</Link>
          <a
            href={`https://wa.me/${WA}?text=Hola! Quiero consultar sobre sus productos 🐾`}
            target="_blank"
            rel="noreferrer"
            className={styles.heroCtaSecondary}
          >
            <IconWhatsApp style={{ flexShrink: 0 }} />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
