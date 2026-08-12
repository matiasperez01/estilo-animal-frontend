import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import styles from './Navbar.module.css'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER

export default function Navbar() {
  const { dispatch, totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [tiendaOpen, setTiendaOpen] = useState(false)

  function closeAll() {
    setMenuOpen(false)
    setTiendaOpen(false)
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.png" alt="Estilo Animal" className={styles.logoImg} />
      </Link>

      {/* Desktop links */}
      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} end>Inicio</NavLink>

        <div className={styles.dropdown}>
          <Link to="/tienda" className={styles.dropdownTrigger}>Tienda ▾</Link>
          <div className={styles.dropdownMenu}>
            <Link to="/tienda">Todos los productos</Link>
            <Link to="/tienda?categoria=abrigos">Abrigos</Link>
            <Link to="/tienda?categoria=remeras">Remeras</Link>
            <Link to="/tienda?categoria=accesorios">Accesorios</Link>
            <Link to="/tienda?categoria=juguetes">Juguetes</Link>
            <Link to="/tienda?categoria=mundial 2026">Mundial 2026</Link>
          </div>
        </div>

        <NavLink to="/guia-de-talles" className={({ isActive }) => isActive ? styles.active : ''}>Guía de talles</NavLink>
        <NavLink to="/como-comprar" className={({ isActive }) => isActive ? styles.active : ''}>
  Cómo comprar
</NavLink>
        <NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.active : ''}>Sobre nosotros</NavLink>
      </div>

      <div className={styles.navRight}>
        <button
          className={styles.cartBtn}
          onClick={() => dispatch({ type: 'OPEN_CART' })}
          aria-label="Abrir carrito"
        >
          <span className={styles.cartIcon}>🛍️</span>
          <span className={styles.cartLabel}>Carrito</span>
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <NavLink to="/" onClick={closeAll} end>Inicio</NavLink>

          <div className={styles.mobileDropdown}>
            <button
              className={styles.mobileDropdownBtn}
              onClick={() => setTiendaOpen(!tiendaOpen)}
            >
              <span>Tienda</span>
              <span className={`${styles.arrow} ${tiendaOpen ? styles.arrowOpen : ''}`}>▾</span>
            </button>
            {tiendaOpen && (
              <div className={styles.mobileDropdownItems}>
                <Link to="/tienda" onClick={closeAll}>Todos los productos</Link>
                <Link to="/tienda?categoria=abrigos" onClick={closeAll}>Abrigos</Link>
                <Link to="/tienda?categoria=remeras" onClick={closeAll}>Remeras</Link>
                <Link to="/tienda?categoria=accesorios" onClick={closeAll}>Accesorios</Link>
                <Link to="/tienda?categoria=juguetes" onClick={closeAll}>Juguetes</Link>
                <Link to="/tienda?categoria=mundial 2026" onClick={closeAll}>Mundial 2026</Link>
              </div>
            )}
          </div>
<NavLink to="/como-comprar" onClick={closeAll}>Cómo comprar</NavLink>
          <NavLink to="/guia-de-talles" onClick={closeAll}>Guía de talles</NavLink>
          <NavLink to="/nosotros" onClick={closeAll}>Sobre nosotros</NavLink>
        </div>
      )}
    </nav>
  )
}