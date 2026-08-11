import { Link } from 'react-router-dom'
import { useProductosDestacados } from '../hooks/useProductos'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import styles from './Home.module.css'

const TESTIMONIOS = [
  {
    nombre: 'Zoe N.',
    mascota: 'Milo',
    estrellas: 5,
    texto: 'Increíble calidad, mi perrito quedó hermoso con el bucito. La tela es muy suave y el talle fue perfecto siguiendo la guía.',
  },
  {
    nombre: 'Martín R.',
    mascota: 'Teo',
    estrellas: 5,
    texto: 'Muy buena atención y envío rápido. El chaleco impermeable le queda perfecto a Teo, lo usamos en cada paseo lluvioso.',
  },
  {
    nombre: 'Sofía G.',
    mascota: 'Benjamin',
    estrellas: 5,
    texto: 'No pensé que iba a encontrar ropa tan linda para gatos. Benji lo tolera perfectamente, muy cómoda y de excelente calidad.',
  },
]

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

const WA = import.meta.env.VITE_WHATSAPP_NUMBER

export default function Home() {
  const { toast, showToast } = useToast()
  const { productos: destacados } = useProductosDestacados()
  const featuredAdaptados = destacados.map(adaptarProducto)

  return (
    <main>

<section className={styles.hero}>
  <div className={styles.heroVisual}>
    <img src="/heroimagen.png" alt="Estilo Animal" className={styles.heroImg} />
  </div>
  <div className={styles.heroContent}>
    <p className={styles.heroEyebrow}>🐾 Petshop Online 📍 Río Grande, TDF</p>
    <h1 className={styles.heroTitle}>
      Indumentaria, accesorios<br />y juguetes para tu mascota
    </h1>
    <p className={styles.heroSub}>
      Todo lo que tu perro o gato necesita, sin salir de casa. Comprá online y recibilo en la puerta de tu hogar.
    </p>
    <div className={styles.heroCtas}>
      <Link to="/tienda" className={styles.heroCta}>Ver productos →</Link>
      <a
        href={`https://wa.me/${WA}?text=Hola! Quiero consultar sobre sus productos 🐾`}
        target="_blank"
        rel="noreferrer"
        className={styles.heroCtaSecondary}
      >
        💬 Consultar por WhatsApp
      </a>
    </div>
  </div>
</section>



{/* BANNER ENVÍO GRATIS */}
<div className={styles.freeShipping}>
  <span>🚚</span>
  <p>Envío gratis a toda la ciudad en compras superiores a $30.000</p>
</div>

{/* CONFIANZA */}
<section className={styles.trust}>
  <div className={styles.trustGrid}>
    <div className={styles.trustItem}>
      <span className={styles.trustIcon}>🚚</span>
      <div>
        <p className={styles.trustTitle}>Envíos a domicilio</p>
        <p className={styles.trustSub}>A toda Río Grande</p>
      </div>
    </div>
    <div className={styles.trustItem}>
      <span className={styles.trustIcon}>🏪</span>
      <div>
        <p className={styles.trustTitle}>Retiro en puerta</p>
        <p className={styles.trustSub}>Sin costo adicional</p>
      </div>
    </div>
    <div className={styles.trustItem}>
      <span className={styles.trustIcon}>💳</span>
      <div>
        <p className={styles.trustTitle}>Transferencia y efectivo</p>
        <p className={styles.trustSub}>Pagos simples y seguros</p>
      </div>
    </div>
    <div className={styles.trustItem}>
      <span className={styles.trustIcon}>💬</span>
      <div>
        <p className={styles.trustTitle}>Atención por WhatsApp</p>
        <p className={styles.trustSub}>Te ayudamos a elegir el talle</p>
      </div>
    </div>
  </div>
</section>

      {featuredAdaptados.length > 0 && (
        <section className={styles.featured}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Productos destacados</h2>
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
      )}

      <section className={styles.cats}>
        <h2 className={styles.sectionTitle}>¿Qué estás buscando?</h2>
        <div className={styles.catsGrid}>
<Link to="/tienda?categoria=abrigos" className={styles.catCard}>
  <span className={styles.catIcon}>🧥</span>
  <span>Abrigos</span>
</Link>
<Link to="/tienda?categoria=remeras" className={styles.catCard}>
  <span className={styles.catIcon}>👕</span>
  <span>Remeras</span>
</Link>
<Link to="/tienda?categoria=accesorios" className={styles.catCard}>
  <span className={styles.catIcon}>🎀</span>
  <span>Accesorios</span>
</Link>
<Link to="/tienda?categoria=juguetes" className={styles.catCard}>
  <span className={styles.catIcon}>🎾</span>
  <span>Juguetes</span>
</Link>
<Link to="/tienda?categoria=mundial 2026" className={styles.catCard}>
  <span className={styles.catIcon}>⚽</span>
  <span>Mundial 2026</span>
</Link>
        </div>
      </section>

      <section className={styles.sizeGuideSection}>
        <div className={styles.sizeGuideContent}>
          <span className={styles.sizeGuideIcon}>📏</span>
          <div>
            <h2 className={styles.sizeGuideTitle}>¿No sabés qué talle elegir?</h2>
            <p className={styles.sizeGuideSub}>Consultá nuestra guía con medidas detalladas y aprendé a medir a tu mascota en simples pasos.</p>
          </div>
          <Link to="/guia-de-talles" className={styles.sizeGuideBtn}>Ver guía de talles →</Link>
        </div>
      </section>

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
        <p className={styles.bannerEyebrow}>Río Grande, Tierra del Fuego</p>
        <h2 className={styles.bannerTitle}>Compra desde tu casa</h2>
        <p className={styles.bannerSub}>Envíos a domicilio y retiro en local. Aceptamos transferencia y efectivo.</p>
        <div className={styles.bannerCtas}>
          <Link to="/tienda" className={styles.bannerCta}>Ver productos</Link>
          <a
            href={`https://wa.me/${WA}?text=Hola! Quiero consultar sobre sus productos 🐾`}
            target="_blank"
            rel="noreferrer"
            className={styles.bannerCtaSecondary}
          >
            💬 WhatsApp
          </a>
        </div>
      </section>

      <Toast message={toast} />
    </main>
  )
}