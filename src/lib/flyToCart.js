// Anima una miniatura del producto "volando" desde el botón que se tocó
// hasta el ícono del carrito en la barra de navegación, y hace rebotar el
// ícono cuando llega. Puramente decorativo: si algo falta (el ícono no está
// montado, el usuario prefiere menos movimiento) no hace nada.
export function flyToCart(originEl, imageUrl) {
  if (!originEl) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const target = document.getElementById('cart-icon-anchor')
  if (!target) return

  const originRect = originEl.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const size = 56

  const startLeft = originRect.left + originRect.width / 2 - size / 2
  const startTop = originRect.top + originRect.height / 2 - size / 2

  const flying = document.createElement('img')
  flying.src = imageUrl || '/logo.png'
  flying.style.cssText = `
    position: fixed;
    top: ${startTop}px;
    left: ${startLeft}px;
    width: ${size}px;
    height: ${size}px;
    border-radius: 10px;
    object-fit: cover;
    z-index: 9999;
    pointer-events: none;
    box-shadow: 0 6px 18px rgba(0,0,0,0.25);
    transition: transform 0.65s cubic-bezier(0.3, 0, 0.4, 1), opacity 0.65s ease;
    will-change: transform, opacity;
  `
  document.body.appendChild(flying)

  const endX = targetRect.left + targetRect.width / 2 - (startLeft + size / 2)
  const endY = targetRect.top + targetRect.height / 2 - (startTop + size / 2)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      flying.style.transform = `translate(${endX}px, ${endY}px) scale(0.2)`
      flying.style.opacity = '0.3'
    })
  })

  const cleanup = () => flying.remove()
  flying.addEventListener('transitionend', cleanup, { once: true })
  setTimeout(cleanup, 900)

  setTimeout(() => {
    target.classList.add('cart-bounce')
    setTimeout(() => target.classList.remove('cart-bounce'), 400)
  }, 600)
}
