import { NavLink, Outlet } from 'react-router-dom'
import styles from './Admin.module.css'

export default function Admin() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <p className={styles.sidebarTitle}>Panel Admin</p>
        <nav className={styles.sidebarNav}>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
            📦 Productos
          </NavLink>
          <NavLink to="/admin/categorias" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
            🏷️ Categorías
          </NavLink>
          <NavLink to="/admin/pedidos" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
  📋 Pedidos
</NavLink>
        </nav>
        <a href="/" className={styles.backLink}>← Volver a la tienda</a>
<button
  className={styles.logoutBtn}
  onClick={() => { sessionStorage.removeItem('adminAuth'); window.location.href = '/admin/login' }}
>
  Cerrar sesión
</button>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}