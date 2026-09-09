import { Link } from 'react-router-dom'
import { IconSearch } from '../components/icons/Icon'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <main className={styles.page}>
      <IconSearch className={styles.icon} width={48} height={48} />
      <p className={styles.code}>ERROR 404</p>
      <h1 className={styles.title}>No encontramos esta página</h1>
      <p className={styles.sub}>
        El link puede estar roto o la página ya no existe. Probá volver al inicio o ver nuestros productos.
      </p>
      <div className={styles.ctas}>
        <Link to="/" className={styles.ctaPrimary}>Ir al inicio</Link>
        <Link to="/tienda" className={styles.ctaSecondary}>Ver productos</Link>
      </div>
    </main>
  )
}
