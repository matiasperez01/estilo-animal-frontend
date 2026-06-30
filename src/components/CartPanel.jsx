import { useCart } from '../store/CartContext'
import { formatPrice } from '../store/products'
import { useNavigate } from 'react-router-dom'
import styles from './CartPanel.module.css'

export default function CartPanel() {
  const { state, dispatch, subtotal } = useCart()
  const { items, isOpen } = state
const navigate = useNavigate()
  function close() { dispatch({ type: 'CLOSE_CART' }) }

  function changeQty(productId, size, delta) {
    dispatch({ type: 'CHANGE_QTY', payload: { productId, size, delta } })
  }

  function remove(productId, size) {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } })
  }

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={close} />}

      <aside className={`${styles.panel} ${isOpen ? styles.open : ''}`} role="dialog" aria-label="Carrito de compras">
        <div className={styles.header}>
          <h2 className={styles.title}>Tu carrito</h2>
          <button className={styles.closeBtn} onClick={close} aria-label="Cerrar carrito">✕</button>
        </div>

        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛍️</span>
              <p>Tu carrito está vacío</p>
              <button className={styles.emptyLink} onClick={close}>Ver productos</button>
            </div>
          ) : (
            items.map(({ product, size, qty }) => (
              <div key={`${product.id}-${size}`} className={styles.item}>
                <div className={styles.itemImg}>
                  {product.species === 'gato' ? '🐱' : '🐶'}
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemName}>{product.name}</p>
                  <p className={styles.itemMeta}>
  {size ? `Talle ${size}` : ''}
</p>
                  <div className={styles.qtyRow}>
                    <button className={styles.qtyBtn} onClick={() => changeQty(product.id, size, -1)}>−</button>
                    <span className={styles.qty}>{qty}</span>
                    <button className={styles.qtyBtn} onClick={() => changeQty(product.id, size, +1)}>+</button>
                  </div>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.itemPrice}>{formatPrice(product.price * qty)}</span>
                  <button className={styles.removeBtn} onClick={() => remove(product.id, size)} aria-label="Eliminar">🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.row}>
              <span className={styles.label}>Subtotal</span>
              <span className={styles.value}>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Envío</span>
              <span className={styles.value}>A calcular</span>
            </div>
            <div className={`${styles.row} ${styles.totalRow}`}>
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={() => { dispatch({ type: 'CLOSE_CART' }); navigate('/checkout') }}>

              Finalizar compra →
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
