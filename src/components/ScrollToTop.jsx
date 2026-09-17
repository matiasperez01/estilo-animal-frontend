import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    // Al volver atrás (botón "Volver" o el del navegador) es una navegación
    // POP: dejamos que el navegador restaure el scroll donde estaba, en vez
    // de forzarlo a 0 como sí corresponde al entrar a una página nueva.
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0)
    }
  }, [pathname, navigationType])

  return null
}
