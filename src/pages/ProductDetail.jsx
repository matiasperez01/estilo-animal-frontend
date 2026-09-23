import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { formatPrice, varianteLabel, adaptarProducto } from '../store/products'
import { useProductos } from '../hooks/useProductos'
import { flyToCart } from '../lib/flyToCart'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import {
  IconPaw, IconCat, IconX, IconZap, IconCheck, IconRuler,
  IconShoppingBag, IconWhatsApp, IconTruck, IconRefresh,
} from '../components/icons/Icon'
import styles from './ProductDetail.module.css'

const API = import.meta.env.VITE_API_URL
const WA  = import.meta.env.VITE_WHATSAPP_NUMBER

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { state: cartState, dispatch } = useCart()
  const { toast, showToast } = useToast()
const [imagenActiva, setImagenActiva] = useState(0)
  const [producto, setProducto]               = useState(null)
  const [variantes, setVariantes]             = useState([])
  const [selectedVariante, setSelectedVariante] = useState(null)
  const [loading, setLoading]                 = useState(true)
  const [mostrarBarraFija, setMostrarBarraFija] = useState(false)
  const { productos: todosLosProductos } = useProductos()
  const imgRef = useRef(null)
  const ctasRef = useRef(null)

useEffect(() => {
  async function cargar() {
    const [p, v] = await Promise.all([
      fetch(`${API}/api/productos/${id}`).then(r => r.json()),
      fetch(`${API}/api/productos/${id}/variantes`).then(r => r.json()),
    ])
    setProducto(p)
    setVariantes(v)
    setImagenActiva(0)
    // Si es "próximamente" no hay stock real todavía: se puede elegir
    // cualquier opción igual, ya que es una reserva.
    const disponible = p.proximamente ? v[0] : v.find(x => x.stock > 0)
    if (disponible) setSelectedVariante(disponible)
    setLoading(false)
  }
  cargar()
}, [id])

  // Muestra la barra fija de compra en mobile solo cuando el botón
  // "Agregar al carrito" original ya no está a la vista.
  useEffect(() => {
    const el = ctasRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setMostrarBarraFija(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [producto])

  function addToCart(origenEl) {
    const size = selectedVariante ? selectedVariante.talle : ''
    const yaEnCarrito = cartState.items.find(i => i.product.id === producto.id && i.size === size)

    // Un producto "próximamente" todavía no tiene stock real: se reserva sin
    // tope, en vez de limitarlo al stock (que está en 0 hasta que llegue).
    const stockDisponible = producto.proximamente
      ? null
      : selectedVariante ? selectedVariante.stock : producto.stock

    if (!producto.proximamente && yaEnCarrito && yaEnCarrito.qty >= stockDisponible) {
      showToast(`Ya tenés en el carrito todo el stock disponible (${stockDisponible})`)
      return
    }

    // El descuento es un precio único del producto: solo aplica sin variantes.
    const enOferta = !selectedVariante && producto.precioDescuento > 0 && producto.precioDescuento < Number(producto.precio)
    const precio = selectedVariante
      ? Number(selectedVariante.precio)
      : enOferta
        ? Number(producto.precioDescuento)
        : Number(producto.precio)

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product: {
          id: producto.id,
          name: producto.nombre,
          price: precio,
          species: producto.especie,
          imagenUrl: producto.imagenUrl,
          tipoVariante: producto.tipoVariante,
          stock: stockDisponible,
          reserva: producto.proximamente,
        },
        size,
      },
    })
    flyToCart(origenEl ?? imgRef.current, producto.imagenUrl)
    showToast(producto.proximamente ? `${producto.nombre} reservado` : `${producto.nombre} agregado al carrito`)
  }

  function volver() {
    // Si se entró directo al producto (ej: desde un link compartido) no hay
    // una página previa dentro de la app a la que volver con navigate(-1).
    if (location.key === 'default') {
      navigate('/tienda')
    } else {
      navigate(-1)
    }
  }

  function consultarWA() {
    const talle = selectedVariante ? ` - ${varianteLabel(producto.tipoVariante)} ${selectedVariante.talle}` : ''
    const precio = selectedVariante
      ? formatPrice(Number(selectedVariante.precio))
      : formatPrice(Number(producto.precio))
    const msg = `Hola! Me interesa: ${producto.nombre}${talle} (${precio}) 🐾`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.layout}>
          <div className={`skeleton ${styles.skeletonImg}`} />
          <div className={styles.infoSection}>
            <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '30%', height: 12 }} />
            <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '70%', height: 28 }} />
            <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '100%', height: 14 }} />
            <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '90%', height: 14 }} />
            <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '35%', height: 34 }} />
            <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '100%', height: 48 }} />
          </div>
        </div>
      </main>
    )
  }
  if (!producto) return <div className={styles.loading}>Producto no encontrado</div>

  // Relacionados: primero productos de la misma categoría, y si faltan para
  // completar, se suman de la misma especie. Nunca el producto actual.
  const otros = todosLosProductos.filter(p => p.id !== producto.id)
  const mismaCategoria = otros.filter(p => producto.categoria?.id && p.categoria?.id === producto.categoria.id)
  const mismaEspecie = otros.filter(p => p.especie === producto.especie && !mismaCategoria.includes(p))
  const relacionados = [...mismaCategoria, ...mismaEspecie].slice(0, 4).map(adaptarProducto)

  // El descuento es un precio único cargado en el producto: solo aplica
  // cuando no hay variantes (cada una tiene su propio precio).
  const enOferta = variantes.length === 0 && producto.precioDescuento > 0 && producto.precioDescuento < Number(producto.precio)

  const precioMostrado = selectedVariante
    ? Number(selectedVariante.precio)
    : enOferta
      ? Number(producto.precioDescuento)
      : Number(producto.precio)

  const proximamente = !!producto.proximamente
  const stockMostrado = selectedVariante ? selectedVariante.stock : producto.stock
  const sinStock = stockMostrado === 0 && !proximamente
  const stockBajo = stockMostrado === 1

  return (
    <main className={styles.page}>
      <button className={styles.back} onClick={volver}>← Volver</button>

      <div className={styles.layout}>

<div className={styles.imgSection}>
  {producto.imagenes?.length > 0 ? (
    <>
      <div className={styles.imgMain}>
        <img
          ref={imgRef}
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
              <img src={img.url} alt={`Foto ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </>
  ) : producto.imagenUrl ? (
    <img ref={imgRef} src={producto.imagenUrl} alt={producto.nombre} className={styles.img} />
  ) : (
    <div className={styles.imgPlaceholder}>
      {producto.especie === 'gato' ? <IconCat width={64} height={64} /> : <IconPaw width={56} height={56} />}
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
            {enOferta && (
              <span className={styles.precioTachado}>{formatPrice(Number(producto.precio))}</span>
            )}
            {variantes.length > 0 && !selectedVariante && (
              <span className={styles.desde}>desde </span>
            )}
            <span className={`${styles.precio} ${enOferta ? styles.precioOferta : ''}`}>{formatPrice(precioMostrado)}</span>
          </div>

          {/* STOCK */}
          <div className={styles.stockBadge}>
            {proximamente ? (
              <span className={styles.proximamenteBadge}><IconTruck width={13} height={13} /> Próximamente</span>
            ) : sinStock ? (
              <span className={styles.sinStock}><IconX width={13} height={13} /> Sin stock en este{' '}{varianteLabel(producto.tipoVariante).toLowerCase()}</span>
            ) : stockBajo ? (
              <span className={styles.stockBajo}><IconZap /> Última unidad</span>
            ) : (
              <span className={styles.enStock}><IconCheck width={13} height={13} /> En stock</span>
            )}
          </div>

          {/* VARIANTES */}
          {variantes.length > 0 && (
            <div className={styles.variantesBlock}>
              <div className={styles.variantesHeader}>
                <p className={styles.variantesLabel}>
                  {varianteLabel(producto.tipoVariante)} seleccionado: <strong>{selectedVariante?.talle ?? '—'}</strong>
                </p>
                {varianteLabel(producto.tipoVariante) === 'Talle' && (
                  <a href="/guia-de-talles" className={styles.guiaLink} target="_blank" rel="noreferrer">
                    <IconRuler width={13} height={13} /> Guía de talles
                  </a>
                )}
              </div>
              <div className={styles.variantesGrid}>
                {variantes.map(v => (
                  <button
                    key={v.id}
                    className={`${styles.varianteBtn} ${selectedVariante?.id === v.id ? styles.varianteBtnActive : ''} ${v.stock === 0 && !proximamente ? styles.varianteBtnSinStock : ''}`}
                    onClick={() => (v.stock > 0 || proximamente) && setSelectedVariante(v)}
                    disabled={v.stock === 0 && !proximamente}
                    title={proximamente ? 'Próximamente' : v.stock === 0 ? 'Sin stock' : `${v.stock} disponibles`}
                  >
                    <span className={styles.varianteTalle}>{v.talle}</span>
                    <span className={styles.variantePrecio}>{formatPrice(Number(v.precio))}</span>
                    {v.stock === 0 && !proximamente && <span className={styles.varianteAgotado}>Agotado</span>}
                  </button>
                ))}
              </div>
              <p className={styles.talleHint}>
                {varianteLabel(producto.tipoVariante) === 'Talle' ? (
                  <>
                    ¿No sabés qué talle elegir?{' '}
                    <a href="/guia-de-talles" className={styles.guiaLink}>Consultá la guía de talles</a>
                    {' '}o{' '}
                  </>
                ) : (
                  `¿Tenés dudas sobre las opciones de ${varianteLabel(producto.tipoVariante).toLowerCase()}? `
                )}
                <a
                  href={`https://wa.me/${WA}?text=Hola! Necesito ayuda para elegir ${varianteLabel(producto.tipoVariante).toLowerCase()} de: ${producto.nombre} 🐾`}
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
          <div className={styles.ctas} ref={ctasRef}>
            <button
              className={styles.addBtn}
              onClick={e => addToCart(e.currentTarget)}
              disabled={sinStock || (variantes.length > 0 && !selectedVariante)}
            >
              <IconShoppingBag width={18} height={18} /> {proximamente ? 'Reservar' : 'Agregar al carrito'}
            </button>
            <button className={styles.waBtn} onClick={consultarWA}>
              <IconWhatsApp /> Consultar por WhatsApp
            </button>
          </div>

          {/* CONFIANZA */}
          <div className={styles.trustMini}>
            <div className={styles.trustMiniItem}>
              <IconTruck width={16} height={16} />
              <span>Envío a domicilio en Río Grande</span>
            </div>
            <div className={styles.trustMiniItem}>
              <IconRefresh width={16} height={16} />
              <span>Cambios dentro de las 48hs</span>
            </div>
            <div className={styles.trustMiniItem}>
              <IconWhatsApp />
              <span>Atención personalizada por WhatsApp</span>
            </div>
          </div>

        </div>
      </div>

      {/* Barra fija de compra (solo mobile, cuando el CTA original no está a la vista) */}
      <div className={`${styles.stickyBar} ${mostrarBarraFija ? styles.stickyBarVisible : ''}`}>
        <div className={styles.stickyBarInfo}>
          {producto.imagenUrl && <img src={producto.imagenUrl} alt="" className={styles.stickyBarImg} />}
          <div>
            <p className={styles.stickyBarNombre}>{producto.nombre}</p>
            <p className={styles.stickyBarPrecio}>{formatPrice(precioMostrado)}</p>
          </div>
        </div>
        <button
          className={styles.stickyBarBtn}
          onClick={e => addToCart(e.currentTarget)}
          disabled={sinStock || (variantes.length > 0 && !selectedVariante)}
        >
          {proximamente ? 'Reservar' : 'Agregar'}
        </button>
      </div>

      {relacionados.length > 0 && (
        <section className={styles.relacionados}>
          <h2 className={styles.relacionadosTitle}>También te puede interesar</h2>
          <div className={styles.relacionadosGrid}>
            {relacionados.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAdded={(name) => showToast(`${name} agregado al carrito`)}
              />
            ))}
          </div>
        </section>
      )}

      <Toast message={toast} />
    </main>
  )
}