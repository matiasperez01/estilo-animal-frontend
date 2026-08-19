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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
      Consultar por WhatsApp
    </a>
  </div>
</div>
</section>



{/* BANNER ENVÍO GRATIS */}
<div className={styles.freeShipping}>
  <span>🚚</span>
  <p>Envío gratis a toda la ciudad en compras superiores a $30.000</p>
</div>

<div className={styles.trustStrip}>
  <span>🚚 Envíos a domicilio en Río Grande</span>
  <span className={styles.trustDivider}>·</span>
  <span>🏪 Retira sin costo</span>
  <span className={styles.trustDivider}>·</span>
  <span>💳 Transferencia y efectivo</span>
  <span className={styles.trustDivider}>·</span>
  <span>💬 Atención por WhatsApp</span>
</div>

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
    {[
      { icon: '🧥', label: 'Abrigos',      cat: 'abrigos' },
      { icon: '👕', label: 'Remeras',      cat: 'remeras' },
      { icon: '🎀', label: 'Accesorios',   cat: 'accesorios' },
      { icon: '🎾', label: 'Juguetes',     cat: 'juguetes' },
      { icon: '⚽', label: 'Mundial 2026', cat: 'mundial 2026' },
    ].map(({ icon, label, cat }) => (
      <Link key={cat} to={`/tienda?categoria=${cat}`} className={styles.catCard}>
        <span className={styles.catIcon}>{icon}</span>
        <span>{label}</span>
      </Link>
    ))}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
             WhatsApp
          </a>
        </div>
      </section>

      <Toast message={toast} />
    </main>
  )
}