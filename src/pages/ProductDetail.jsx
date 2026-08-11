import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { formatPrice } from '../store/products'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import styles from './ProductDetail.module.css'

const API = import.meta.env.VITE_API_URL
const WA  = import.meta.env.VITE_WHATSAPP_NUMBER

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useCart()
  const { toast, showToast } = useToast()
const [imagenActiva, setImagenActiva] = useState(0)
  const [producto, setProducto]               = useState(null)
  const [variantes, setVariantes]             = useState([])
  const [selectedVariante, setSelectedVariante] = useState(null)
  const [loading, setLoading]                 = useState(true)

useEffect(() => {
  async function cargar() {
    const [p, v] = await Promise.all([
      fetch(`${API}/api/productos/${id}`).then(r => r.json()),
      fetch(`${API}/api/productos/${id}/variantes`).then(r => r.json()),
    ])
    setProducto(p)
    setVariantes(v)
    setImagenActiva(0)
    const disponible = v.find(x => x.stock > 0)
    if (disponible) setSelectedVariante(disponible)
    setLoading(false)
  }
  cargar()
}, [id])

  function addToCart() {
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

  function consultarWA() {
    const talle = selectedVariante ? ` - Talle ${selectedVariante.talle}` : ''
    const precio = selectedVariante
      ? formatPrice(Number(selectedVariante.precio))
      : formatPrice(Number(producto.precio))
    const msg = `Hola! Me interesa: ${producto.nombre}${talle} (${precio}) 🐾`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (loading) return <div className={styles.loading}>Cargando...</div>
  if (!producto) return <div className={styles.loading}>Producto no encontrado</div>

  const precioMostrado = selectedVariante
    ? Number(selectedVariante.precio)
    : Number(producto.precio)

  const stockMostrado = selectedVariante ? selectedVariante.stock : producto.stock
  const sinStock = stockMostrado === 0
  const stockBajo = stockMostrado > 0 && stockMostrado <= 3

  return (
    <main className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Volver</button>

      <div className={styles.layout}>

<div className={styles.imgSection}>
  {producto.imagenes?.length > 0 ? (
    <>
      <div className={styles.imgMain}>
        <img
          src={producto.imagenes[imagenActiva]?.url ?? producto.imagenUrl}
          alt={producto.nombre}
          className={styles.img}
        />
      </div>
      {producto.imagenes.length > 1 && (
        <div className={styles.imgThumbs}>
          {producto.imagenes.map((img, i) => (
            <button
              key={img.id}
              className={`${styles.imgThumb} ${imagenActiva === i ? styles.imgThumbActive : ''}`}
              onClick={() => setImagenActiva(i)}
            >
              <img src={img.url} alt={`Foto ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </>
  ) : producto.imagenUrl ? (
    <img src={producto.imagenUrl} alt={producto.nombre} className={styles.img} />
  ) : (
    <div className={styles.imgPlaceholder}>
      <span>{producto.especie === 'gato' ? '🐱' : '🐶'}</span>
    </div>
  )}
</div>

        {/* INFO */}
        <div className={styles.infoSection}>

          <span className={styles.especie}>
            {producto.especie === 'ambos' ? 'Para perros y gatos' : `Para ${producto.especie}s`}
          </span>

          <h1 className={styles.nombre}>{producto.nombre}</h1>

          {producto.descripcion && (
            <p className={styles.descripcion}>{producto.descripcion}</p>
          )}

          {/* PRECIO */}
          <div className={styles.precioBlock}>
            {variantes.length > 0 && !selectedVariante && (
              <span className={styles.desde}>desde </span>
            )}
            <span className={styles.precio}>{formatPrice(precioMostrado)}</span>
          </div>

          {/* STOCK */}
          <div className={styles.stockBadge}>
            {sinStock ? (
              <span className={styles.sinStock}>✗ Sin stock en este talle</span>
            ) : stockBajo ? (
              <span className={styles.stockBajo}>⚡ Últimas {stockMostrado} unidades</span>
            ) : (
              <span className={styles.enStock}>✓ En stock</span>
            )}
          </div>

          {/* VARIANTES */}
          {variantes.length > 0 && (
            <div className={styles.variantesBlock}>
              <div className={styles.variantesHeader}>
                <p className={styles.variantesLabel}>
                  Talle seleccionado: <strong>{selectedVariante?.talle ?? '—'}</strong>
                </p>
                <a href="/guia-de-talles" className={styles.guiaLink} target="_blank" rel="noreferrer">
                  📏 Guía de talles
                </a>
              </div>
              <div className={styles.variantesGrid}>
                {variantes.map(v => (
                  <button
                    key={v.id}
                    className={`${styles.varianteBtn} ${selectedVariante?.id === v.id ? styles.varianteBtnActive : ''} ${v.stock === 0 ? styles.varianteBtnSinStock : ''}`}
                    onClick={() => v.stock > 0 && setSelectedVariante(v)}
                    disabled={v.stock === 0}
                    title={v.stock === 0 ? 'Sin stock' : `${v.stock} disponibles`}
                  >
                    <span className={styles.varianteTalle}>{v.talle}</span>
                    <span className={styles.variantePrecio}>{formatPrice(Number(v.precio))}</span>
                    {v.stock === 0 && <span className={styles.varianteAgotado}>Agotado</span>}
                  </button>
                ))}
              </div>
              <p className={styles.talleHint}>
                ¿No sabés qué talle elegir?{' '}
                <a href="/guia-de-talles" className={styles.guiaLink}>Consultá la guía de talles</a>
                {' '}o{' '}
                <a
                  href={`https://wa.me/${WA}?text=Hola! Necesito ayuda para elegir el talle de: ${producto.nombre} 🐾`}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.guiaLink}
                >
                  escribinos por WhatsApp
                </a>
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className={styles.ctas}>
            <button
              className={styles.addBtn}
              onClick={addToCart}
              disabled={sinStock || (variantes.length > 0 && !selectedVariante)}
            >
              🛒 Agregar al carrito
            </button>
            <button className={styles.waBtn} onClick={consultarWA}>
              💬 Consultar por WhatsApp
            </button>
          </div>

          {/* CONFIANZA */}
          <div className={styles.trustMini}>
            <div className={styles.trustMiniItem}>
              <span>🚚</span>
              <span>Envío a domicilio en Río Grande</span>
            </div>
            <div className={styles.trustMiniItem}>
              <span>🔄</span>
              <span>Cambios dentro de las 48hs</span>
            </div>
            <div className={styles.trustMiniItem}>
              <span>💬</span>
              <span>Atención personalizada por WhatsApp</span>
            </div>
          </div>

        </div>
      </div>

      <Toast message={toast} />
    </main>
  )
}