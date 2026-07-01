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

  return (
    <article className={styles.card} onClick={() => navigate(`/producto/${product.id}`)}>
      <div className={styles.imgWrapper}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.img} />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span>{isGato ? '🐱' : '🐶'}</span>
          </div>
        )}
        <span className={`${styles.badge} ${isGato ? styles.badgeCat : styles.badgeDog}`}>
          {product.badge}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.species}>
  {product.species === 'ambos' ? 'Para perros y gatos' : `Para ${product.species}s`}
</p>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            {tieneVariantes && (
              <span className={styles.desde}>desde</span>
            )}
            <span className={styles.price}>{formatPrice(precioMinimo)}</span>
          </div>
          <button
            className={styles.addBtn}
            onClick={e => { e.stopPropagation(); navigate(`/producto/${product.id}`) }}
            aria-label={`Ver ${product.name}`}
          >
            →
          </button>
        </div>
      </div>
    </article>
  )
}