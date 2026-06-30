import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { formatPrice } from '../store/products'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import styles from './ProductDetail.module.css'

const API = import.meta.env.VITE_API_URL

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()
  const { toast, showToast } = useToast()

  const [producto, setProducto] = useState(null)
  const [variantes, setVariantes] = useState([])
  const [selectedVariante, setSelectedVariante] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function cargar() {
      const [p, v] = await Promise.all([
        fetch(`${API}/api/productos/${id}`).then(r => r.json()),
        fetch(`${API}/api/productos/${id}/variantes`).then(r => r.json()),
      ])
      setProducto(p)
      setVariantes(v)
      if (v.length > 0) setSelectedVariante(v[0])
      setLoading(false)
    }
    cargar()
  }, [id])

  function addToCart() {
    if (!selectedVariante && variantes.length > 0) return
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product: {
          id: producto.id,
          name: producto.nombre,
          price: selectedVariante ? Number(selectedVariante.precio) : Number(producto.precio),
          species: producto.especie,
          imagenUrl: producto.imagenUrl,
        },
        size: selectedVariante ? selectedVariante.talle : '',
      },
    })
    showToast(`${producto.nombre} agregado al carrito`)
  }

  if (loading) return <div className={styles.loading}>Cargando...</div>
  if (!producto) return <div className={styles.loading}>Producto no encontrado</div>

  const precioMostrado = selectedVariante
    ? Number(selectedVariante.precio)
    : Number(producto.precio)

  const stockMostrado = selectedVariante
    ? selectedVariante.stock
    : producto.stock

  return (
    <main className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Volver</button>

      <div className={styles.layout}>
        <div className={styles.imgSection}>
          {producto.imagenUrl ? (
            <img src={producto.imagenUrl} alt={producto.nombre} className={styles.img} />
          ) : (
            <div className={styles.imgPlaceholder}>
              <span>{producto.especie === 'gato' ? '🐱' : '🐶'}</span>
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <span className={styles.especie}>Para {producto.especie}s</span>
          <h1 className={styles.nombre}>{producto.nombre}</h1>

          {producto.descripcion && (
            <p className={styles.descripcion}>{producto.descripcion}</p>
          )}

          <div className={styles.precio}>
            {variantes.length > 0 && !selectedVariante && (
              <span className={styles.desde}>desde </span>
            )}
            {formatPrice(precioMostrado)}
          </div>

          {variantes.length > 0 && (
            <div className={styles.variantes}>
              <p className={styles.variantesLabel}>Seleccioná el talle:</p>
              <div className={styles.variantesGrid}>
                {variantes.map(v => (
                  <button
                    key={v.id}
                    className={`${styles.varianteBtn} ${selectedVariante?.id === v.id ? styles.varianteBtnActive : ''} ${v.stock === 0 ? styles.varianteBtnSinStock : ''}`}
                    onClick={() => v.stock > 0 && setSelectedVariante(v)}
                    disabled={v.stock === 0}
                  >
                    <span className={styles.varianteTalle}>{v.talle}</span>
                    <span className={styles.variantePrecio}>{formatPrice(Number(v.precio))}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.stockInfo}>
            {stockMostrado > 0
              ? <span className={styles.enStock}>✓ En stock ({stockMostrado} disponibles)</span>
              : <span className={styles.sinStock}>Sin stock</span>
            }
          </div>

          <button
            className={styles.addBtn}
            onClick={addToCart}
            disabled={stockMostrado === 0 || (variantes.length > 0 && !selectedVariante)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      <Toast message={toast} />
    </main>
  )
}