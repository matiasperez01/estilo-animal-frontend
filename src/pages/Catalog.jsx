import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductos } from '../hooks/useProductos'
import { CATEGORIES } from '../store/products'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import styles from './Catalog.module.css'

function filtrarProductos(productos, filtro) {
  if (filtro === 'todos') return productos
  const filtroEspecie = ['perro', 'gato']
  return productos.filter(p => {
    const especie = p.species ?? ''
    const categoria = p.category ?? ''
    if (filtroEspecie.includes(filtro)) {
      return especie === filtro || especie === 'ambos'
    } else {
      return categoria === filtro
    }
  })
}

function adaptarProducto(p) {
  return {
    id: p.id,
    name: p.nombre,
    description: p.descripcion,
    species: p.especie?.toLowerCase() ?? 'perro',
    category: p.categoria?.nombre?.toLowerCase() ?? '',
    price: Number(p.precio) || 0,
    sizes: [],
    image: p.imagenUrl ?? null,
    badge: p.especie === 'gato' ? 'Gato' : p.especie === 'ambos' ? 'Perros y Gatos' : 'Perro',
    stock: p.stock ?? 0,
    variantes: p.variantes ?? [],
  }
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaUrl = searchParams.get('categoria') ?? 'todos'
  const [activeFilter, setActiveFilter] = useState(categoriaUrl)
  const { productos, loading, error } = useProductos()
  const { toast, showToast } = useToast()

  useEffect(() => {
    setActiveFilter(categoriaUrl)
  }, [categoriaUrl])

  function setFilter(id) {
    setActiveFilter(id)
    if (id === 'todos') {
      setSearchParams({})
    } else {
      setSearchParams({ categoria: id })
    }
  }

  const adaptados = productos.map(adaptarProducto)
  const filtered = filtrarProductos(adaptados, activeFilter)

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tienda</h1>
        <p className={styles.sub}>Ropa y accesorios para tu mascota</p>
      </div>

      <div className={styles.filters}>
        <span className={styles.filterLabel}>Filtrar:</span>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.chip} ${activeFilter === cat.id ? styles.chipActive : ''}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.catalogArea}>
        {loading && <p className={styles.estado}>Cargando productos...</p>}
        {error && <p className={styles.estadoError}>No se pudo conectar con el servidor.</p>}
        {!loading && !error && (
          <>
            <p className={styles.count}>{filtered.length} productos</p>
            <div className={styles.grid}>
              {filtered.map(producto => (
                <ProductCard
                  key={producto.id}
                  product={producto}
                  onAdded={(name) => showToast(`${name} agregado al carrito`)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Toast message={toast} />
    </main>
  )
}