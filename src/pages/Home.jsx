import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import styles from './Home.module.css'
import { useProductosDestacados } from '../hooks/useProductos'

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

export default function Home() {
  const { toast, showToast } = useToast()
const { productos: destacados } = useProductosDestacados()
const featuredAdaptados = destacados.map(adaptarProducto)
  

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Nueva colección</p>
          <h1 className={styles.heroTitle}>
            Moda pensada para ellos,<br />elegida por vos
          </h1>
          <p className={styles.heroSub}>
            Ropa de calidad para perros y gatos. Diseños únicos que combinan
            comodidad y estilo en cada talle.
          </p>
          <Link to="/tienda" className={styles.heroCta}>
            Ver catálogo →
          </Link>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImg}>
            <img src="/heroimagen.png" alt="Colección 2026" />
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Destacados</h2>
          <Link to="/tienda" className={styles.seeAll}>Ver todos →</Link>
        </div>
        <div className={styles.grid}>
          {featuredAdaptados.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdded={(name) => showToast(`${name} agregado al carrito`)}
            />
          ))}
        </div>
      </section>

      <section className={styles.banner}>
        <p className={styles.bannerEyebrow}>Envíos a todo la ciudad</p>
        <h2 className={styles.bannerTitle}>Comprá desde la comodidad de tu casa</h2>
        <p className={styles.bannerSub}>Aceptamos transferencia bancaria y efectivo.</p>
        <Link to="/tienda" className={styles.bannerCta}>Comprar ahora</Link>
      </section>

      <Toast message={toast} />
    </main>
  )
}