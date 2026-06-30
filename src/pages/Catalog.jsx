import { useState } from 'react'
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
      // Filtro por especie: mostrar los de esa especie + los de ambos
      return especie === filtro || especie === 'ambos'
    } else {
      // Filtro por categoría: coincidencia exacta
      return categoria === filtro
    }
  })
}

export default function Catalog() {
  const [activeFilter, setActiveFilter] = useState('todos')
  const { productos, loading, error } = useProductos()
  const { toast, showToast } = useToast()

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
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className={styles.catalogArea}>
        {loading && <p className={styles.estado}>Cargando productos...</p>}
        {error && <p className={styles.estadoError}>No se pudo conectar con el servidor. Verificá que el backend esté corriendo.</p>}
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

function adaptarProducto(p) {
  const cat = p.categoria?.nombre?.toLowerCase() ?? ''
  console.log(p.nombre, '→ categoria:', cat)
  return {
    id: p.id,
    name: p.nombre,
    description: p.descripcion,
    species: p.especie?.toLowerCase() ?? 'perro',
    category: cat,
    price: Number(p.precio),
    sizes: [],
    image: p.imagenUrl ?? null,
    badge: p.especie === 'gato' ? 'Gato' : p.especie === 'ambos' ? 'Perros y Gatos' : 'Perro',
    stock: p.stock,
    variantes: p.variantes ?? [],
  }
}