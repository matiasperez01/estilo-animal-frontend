import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Tomamos control manual del scroll: la restauración automática del
// navegador intenta volver a la posición ANTES de que el contenido
// (productos cargados por fetch) termine de renderizarse, así que la
// página todavía no tiene la altura necesaria y queda pegada abajo.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// Posición de scroll guardada por cada entrada del historial (location.key),
// para poder restaurarla al volver aunque el contenido cargue de forma
// asíncrona después de la navegación.
const posiciones = new Map()

export default function ScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  // Guarda la posición de scroll de la página actual todo el tiempo (no
  // recién al salir): al navegar, React ya reemplazó el contenido por el de
  // la página nueva antes de que corra cualquier limpieza de efecto, y el
  // navegador puede haber recortado el scroll para que entre en el nuevo
  // contenido (más corto) — leerlo en ese momento daría un valor equivocado.
  useEffect(() => {
    const key = location.key
    function guardar() {
      posiciones.set(key, window.scrollY)
    }
    window.addEventListener('scroll', guardar, { passive: true })
    return () => window.removeEventListener('scroll', guardar)
  }, [location.key])

  useEffect(() => {
    if (navigationType === 'POP' && posiciones.has(location.key)) {
      const destino = posiciones.get(location.key)
      let intentos = 0
      const restaurar = () => {
        intentos++
        window.scrollTo(0, destino)
        const alturaDisponible = document.documentElement.scrollHeight - window.innerHeight
        if (alturaDisponible < destino && intentos < 30) {
          requestAnimationFrame(restaurar)
        }
      }
      requestAnimationFrame(restaurar)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.key, navigationType])

  return null
}
