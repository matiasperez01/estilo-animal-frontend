import { useNavigate } from 'react-router-dom'
import { formatPrice, varianteLabelPlural } from '../store/products'
import { IconPaw, IconCat } from './icons/Icon'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const isGato = product.species === 'gato'

  const precioMinimo = product.variantes?.length > 0
    ? Math.min(...product.variantes.map(v => Number(v.precio)))
    : Number(product.price)

  const tieneVariantes = product.variantes?.length > 0
  const sinStock = product.stock === 0 && product.variantes?.every(v => v.stock === 0)

  // El descuento es un precio único cargado en el producto, así que solo
  // tiene sentido mostrarlo cuando no hay variantes (cada una con su propio precio).
  const enOferta = !tieneVariantes && product.precioDescuento > 0 && product.precioDescuento < precioMinimo

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
          <img src={imagen} alt={product.name} className={styles.img} loading="lazy" />
        ) : (
          <div className={styles.imgPlaceholder}>
            {isGato ? <IconCat width={40} height={40} /> : <IconPaw width={36} height={36} />}
          </div>
        )}
        <span className={`${styles.badge} ${isGato ? styles.badgeCat : product.species === 'ambos' ? styles.badgeBoth : styles.badgeDog}`}>
          {product.badge}
        </span>
        {enOferta && <span className={styles.badgeOferta}>Oferta</span>}
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
            {varianteLabelPlural(product.tipoVariante)}: {product.variantes.filter(v => v.stock > 0).map(v => v.talle).join(', ') || 'Sin stock'}
          </p>
        )}

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            {enOferta ? (
              <>
                <span className={styles.priceTachado}>{formatPrice(precioMinimo)}</span>
                <span className={`${styles.price} ${styles.priceOferta}`}>{formatPrice(product.precioDescuento)}</span>
              </>
            ) : (
              <>
                {tieneVariantes && <span className={styles.desde}>desde </span>}
                <span className={styles.price}>{formatPrice(precioMinimo)}</span>
              </>
            )}
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