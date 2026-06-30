import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { dispatch, totalItems } = useCart()

  return (
    <nav className={styles.nav}>
<Link to="/" className={styles.logo}>
  <img src="/logo.png" alt="Estilo Animal" className={styles.logoImg} />
</Link>

      <div className={styles.links}>
        <NavLink to="/"        className={({ isActive }) => isActive ? styles.active : ''} end>Inicio</NavLink>
        <NavLink to="/tienda"  className={({ isActive }) => isActive ? styles.active : ''}>Tienda</NavLink>
        <NavLink to="/guia-de-talles" className={({ isActive }) => isActive ? styles.active : ''}>
  Guía de talles
</NavLink>
        <NavLink to="/nosotros" className={({ isActive }) => isActive ? styles.active : ''}>Sobre nosotros</NavLink>
      </div>

      <button
        className={styles.cartBtn}
        onClick={() => dispatch({ type: 'OPEN_CART' })}
        aria-label="Abrir carrito"
      >
        <span className={styles.cartIcon}>🛍️</span>
        Carrito
        {totalItems > 0 && (
          <span className={styles.badge}>{totalItems}</span>
        )}
      </button>
    </nav>
  )
}
