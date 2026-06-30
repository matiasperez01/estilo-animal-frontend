import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { dispatch, totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.png" alt="Estilo Animal" className={styles.logoImg} />
      </Link>

      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} end>Inicio</NavLink>
        <NavLink to="/tienda" className={({ isActive }) => isActive ? styles.active : ''}>Tienda</NavLink>
        <NavLink to="/guia-de-talles" className={({ isActive }) => isActive ? styles.active : ''}>Guía de talles</NavLink>
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

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <NavLink to="/" onClick={() => setMenuOpen(false)} end>Inicio</NavLink>
          <NavLink to="/tienda" onClick={() => setMenuOpen(false)}>Tienda</NavLink>
          <NavLink to="/guia-de-talles" onClick={() => setMenuOpen(false)}>Guía de talles</NavLink>
          <NavLink to="/nosotros" onClick={() => setMenuOpen(false)}>Sobre nosotros</NavLink>
        </div>
      )}
    </nav>
  )
}