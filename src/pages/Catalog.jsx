import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductos } from '../hooks/useProductos'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { IconPaw, IconCat, IconSearch, IconX } from '../components/icons/Icon'
import styles from './Catalog.module.css'

const SUBCATEGORIAS = [
  { id: 'todos', label: 'Todos' },
  { id: 'juguetes', label: 'Juguetes' },
  { id: 'abrigos', label: 'Abrigos' },
  { id: 'accesorios', label: 'Accesorios' },
  { id: 'higiene', label: 'Higiene' },
]

function filtrarProductos(productos, especie, categoria) {
  let resultado = productos
  if (especie !== 'todos') {
    resultado = resultado.filter(p => {
      const s = p.species ?? ''
      return s === especie || s === 'ambos'
    })
  }
  if (categoria !== 'todos') {
    resultado = resultado.filter(p => p.category === categoria)
  }
  return resultado
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
    imagenes: p.imagenes ?? [],
    badge: p.especie === 'gato' ? 'Gato' : p.especie === 'ambos' ? 'Perros y Gatos' : 'Perro',
    stock: p.stock ?? 0,
    variantes: p.variantes ?? [],
    tipoVariante: p.tipoVariante ?? null,
  }
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const especieUrl = searchParams.get('especie') ?? 'todos'
  const categoriaUrl = searchParams.get('categoria') ?? 'todos'
  const [activeFilter, setActiveFilter] = useState(especieUrl)
  const [activeCategory, setActiveCategory] = useState(categoriaUrl)
  const [search, setSearch] = useState('')
  const { productos, loading, error } = useProductos()
  const { toast, showToast } = useToast()

  useEffect(() => {
    setActiveFilter(especieUrl)
    setActiveCategory(categoriaUrl)
  }, [especieUrl, categoriaUrl])

  function setFilter(id) {
    setActiveFilter(id)
    setActiveCategory('todos')
    if (id === 'todos') {
      setSearchParams({})
    } else {
      setSearchParams({ especie: id })
    }
  }

  function setCategory(id) {
    setActiveCategory(id)
    if (id === 'todos') {
      setSearchParams({ especie: activeFilter })
    } else {
      setSearchParams({ especie: activeFilter, categoria: id })
    }
  }

  const adaptados = productos.map(adaptarProducto)
  const filteredPorCategoria = filtrarProductos(adaptados, activeFilter, activeCategory)
  const busqueda = search.trim().toLowerCase()
  const filtered = busqueda
    ? filteredPorCategoria.filter(p => p.name.toLowerCase().includes(busqueda))
    : filteredPorCategoria

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Tienda</h1>
          <p className={styles.sub}>Ropa, accesorios y juguetes para tu mascota</p>
        </div>
        <div className={styles.searchBox}>
          <IconSearch width={17} height={17} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
          />
          {search && (
            <button onClick={() => setSearch('')} aria-label="Limpiar búsqueda" className={styles.searchClear}>
              <IconX width={14} height={14} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'todos' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('todos')}
        >
          <IconPaw width={18} height={18} />
          <span>Todos</span>
        </button>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'perro' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('perro')}
        >
          <IconPaw width={18} height={18} />
          <span>Perros</span>
        </button>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'gato' ? styles.filterBtnActive : ''}`}
          onClick={() => setFilter('gato')}
        >
          <IconCat width={19} height={19} />
          <span>Gatos</span>
        </button>
      </div>

      {activeFilter !== 'todos' && (
        <div className={styles.subfilters}>
          {SUBCATEGORIAS.map(cat => (
            <button
              key={cat.id}
              className={`${styles.subfilterBtn} ${activeCategory === cat.id ? styles.subfilterBtnActive : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.catalogArea}>
        {loading && (
          <div className={styles.grid}>
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        )}
        {error && <p className={styles.estadoError}>No se pudo conectar con el servidor.</p>}
        {!loading && !error && (
          <>
            <p className={styles.count}>{filtered.length} productos</p>
            {filtered.length === 0 ? (
              <p className={styles.estado}>
                No encontramos productos {busqueda ? `para "${search}"` : 'con estos filtros'}.
              </p>
            ) : (
              <div className={styles.grid}>
                {filtered.map(producto => (
                  <ProductCard
                    key={producto.id}
                    product={producto}
                    onAdded={(name) => showToast(`${name} agregado al carrito`)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Toast message={toast} />
    </main>
  )
}