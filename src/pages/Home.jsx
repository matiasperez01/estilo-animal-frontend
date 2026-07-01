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

const TESTIMONIOS = [
  {
    nombre: 'Laura M.',
    mascota: 'Chihuahua',
    estrellas: 5,
    texto: 'Increíble calidad, mi perrita quedó hermosa con el sweater. La tela es muy suave y el talle fue perfecto siguiendo la guía.',
  },
  {
    nombre: 'Martín R.',
    mascota: 'Bulldog Francés',
    estrellas: 5,
    texto: 'Muy buena atención y envío rápido. El piloto impermeable le queda perfecto a Pancho, lo usamos en cada paseo lluvioso.',
  },
  {
    nombre: 'Sofía G.',
    mascota: 'Gato Persa',
    estrellas: 5,
    texto: 'No pensé que iba a encontrar ropa tan linda para gatos. Luna la tolera perfectamente, muy cómoda y de excelente calidad.',
  },
]

export default function Home() {
  const { toast, showToast } = useToast()
const { productos: destacados } = useProductosDestacados()
const featuredAdaptados = destacados.map(adaptarProducto)
  

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
<p className={styles.heroEyebrow}>El primer petshop online de Río Grande</p>
<h1 className={styles.heroTitle}>
  Indumentaria, accesorios<br />y juguetes para tu mascota
</h1>
<p className={styles.heroSub}>
  Todo lo que tu perro o gato necesita, sin salir de casa. Comprá online y recibilo en la puerta de tu hogar.
</p>
<p className={styles.bannerEyebrow}>Río Grande, Tierra del Fuego</p>
<h2 className={styles.bannerTitle}>El primer petshop online de la ciudad</h2>
<p className={styles.bannerSub}>Envíos a domicilio y retiro en local. Aceptamos transferencia y efectivo.</p>
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

      {/* Guía de talles */}
<section className={styles.sizeGuideSection}>
  <div className={styles.sizeGuideContent}>
    <span className={styles.sizeGuideIcon}>📏</span>
    <div>
      <h2 className={styles.sizeGuideTitle}>¿No sabés qué talle elegir?</h2>
      <p className={styles.sizeGuideSub}>Consultá nuestra guía con medidas detalladas y aprendé a medir a tu mascota en simples pasos.</p>
    </div>
    <Link to="/guia-de-talles" className={styles.sizeGuideBtn}>
      Ver guía de talles →
    </Link>
  </div>
</section>

{/* Testimonios */}
<section className={styles.testimonios}>
  <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
  <p className={styles.testimoniosSub}>Mascotas felices, dueños contentos 🐾</p>
  <div className={styles.testimoniosGrid}>
    {TESTIMONIOS.map((t, i) => (
      <div key={i} className={styles.testimonioCard}>
        <div className={styles.testimonioEstrellas}>{'⭐'.repeat(t.estrellas)}</div>
        <p className={styles.testimonioTexto}>"{t.texto}"</p>
        <div className={styles.testimonioAutor}>
          <span className={styles.testimonioNombre}>{t.nombre}</span>
          <span className={styles.testimonioPet}>🐶 {t.mascota}</span>
        </div>
      </div>
    ))}
  </div>
</section>

      <section className={styles.banner}>
        <p className={styles.bannerEyebrow}>Envíos a toda la ciudad</p>
        <h2 className={styles.bannerTitle}>Comprá desde la comodidad de tu casa</h2>
        <p className={styles.bannerSub}>Aceptamos transferencia bancaria y efectivo.</p>
        <Link to="/tienda" className={styles.bannerCta}>Comprar ahora</Link>
      </section>

      <Toast message={toast} />
    </main>
  )
}