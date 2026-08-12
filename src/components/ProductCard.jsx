import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../store/products'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const isGato = product.species === 'gato'

  const precioMinimo = product.variantes?.length > 0
    ? Math.min(...product.variantes.map(v => Number(v.precio)))
    : Number(product.price)

  const tieneVariantes = product.variantes?.length > 0
  const sinStock = product.stock === 0 && product.variantes?.every(v => v.stock === 0)

  const imagen = product.imagenes?.length > 0
    ? product.imagenes[0].url
    : product.image

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/producto/${product.id}`)}
    >
      <div className={styles.imgWrapper}>
        {imagen ? (
          <img src={imagen} alt={product.name} className={styles.img} />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span>{isGato ? '🐱' : '🐶'}</span>
          </div>
        )}
        <span className={`${styles.badge} ${isGato ? styles.badgeCat : product.species === 'ambos' ? styles.badgeBoth : styles.badgeDog}`}>
          {product.badge}
        </span>
        {sinStock && (
          <div className={styles.sinStockOverlay}>Sin stock</div>
        )}
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.species}>
          {product.species === 'ambos' ? 'Para perros y gatos' : `Para ${product.species}s`}
        </p>

        {tieneVariantes && (
          <p className={styles.tallesDisponibles}>
            Talles: {product.variantes.filter(v => v.stock > 0).map(v => v.talle).join(', ') || 'Sin stock'}
          </p>
        )}

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            {tieneVariantes && <span className={styles.desde}>desde </span>}
            <span className={styles.price}>{formatPrice(precioMinimo)}</span>
          </div>
          <button
            className={`${styles.addBtn} ${sinStock ? styles.addBtnDisabled : ''}`}
            onClick={e => { e.stopPropagation(); navigate(`/producto/${product.id}`) }}
            aria-label={`Ver ${product.name}`}
          >
            {sinStock ? 'Sin stock' : 'Ver producto'}
          </button>
        </div>
      </div>
    </article>
  )
}