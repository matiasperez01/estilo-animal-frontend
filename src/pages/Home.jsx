import { Link } from 'react-router-dom'
import { useProductosDestacados } from '../hooks/useProductos'
import { adaptarProducto } from '../store/products'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import Toast from '../components/Toast'
import { useToast } from '../hooks/useToast'
import {
  IconTruck, IconStore, IconCreditCard, IconWhatsApp,
  IconRuler, IconStar, IconPaw, IconCat,
} from '../components/icons/Icon'
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

const WA = import.meta.env.VITE_WHATSAPP_NUMBER

export default function Home() {
  const { toast, showToast } = useToast()
  const { productos: destacados, loading: loadingDestacados } = useProductosDestacados()
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
    <Link to="/tienda" className={styles.heroCta}>Ver productos</Link>
    <a
  href={`https://wa.me/${WA}?text=Hola! Quiero consultar sobre sus productos 🐾`}
  target="_blank"
  rel="noreferrer"
  className={styles.heroCtaSecondary}
>
  <IconWhatsApp style={{flexShrink:0}} />
      Consultar por WhatsApp
    </a>
  </div>
</div>
</section>



{/* BANNER ENVÍO GRATIS */}
<div className={styles.freeShipping}>
  <IconTruck width={18} height={18} />
  <p>Envío gratis a toda la ciudad en compras superiores a $30.000</p>
</div>

<div className={styles.trustStrip}>
  <span><IconTruck width={15} height={15} /> Envíos a domicilio en Río Grande</span>
  <span className={styles.trustDivider}>·</span>
  <span><IconStore width={15} height={15} /> Retira sin costo</span>
  <span className={styles.trustDivider}>·</span>
  <span><IconCreditCard width={15} height={15} /> Transferencia y efectivo</span>
  <span className={styles.trustDivider}>·</span>
  <span><IconWhatsApp width={14} height={14} /> Atención por WhatsApp</span>
</div>

      {(loadingDestacados || featuredAdaptados.length > 0) && (
        <section className={styles.featured}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Productos destacados</h2>
            <Link to="/tienda" className={styles.seeAll}>Ver todos</Link>
          </div>
          <div className={styles.grid}>
            {loadingDestacados
              ? Array.from({ length: 5 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : featuredAdaptados.map(product => (
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
    <Link to="/tienda?especie=perro" className={`${styles.catCard} ${styles.catCardDog}`}>
      <IconPaw className={styles.catIcon} width={48} height={48} />
      <span>Perros</span>
    </Link>
    <Link to="/tienda?especie=gato" className={`${styles.catCard} ${styles.catCardCat}`}>
      <IconCat className={styles.catIcon} width={52} height={52} />
      <span>Gatos</span>
    </Link>
  </div>
</section>

      <section className={styles.sizeGuideSection}>
        <div className={styles.sizeGuideContent}>
          <IconRuler className={styles.sizeGuideIcon} width={30} height={30} />
          <div>
            <h2 className={styles.sizeGuideTitle}>¿No sabés qué talle elegir?</h2>
            <p className={styles.sizeGuideSub}>Consultá nuestra guía con medidas detalladas y aprendé a medir a tu mascota en simples pasos.</p>
          </div>
          <Link to="/guia-de-talles" className={styles.sizeGuideBtn}>Ver guía de talles</Link>
        </div>
      </section>

      <section className={styles.testimonios}>
        <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
        <p className={styles.testimoniosSub}>Mascotas felices, dueños contentos</p>
        <div className={styles.testimoniosGrid}>
          {TESTIMONIOS.map((t, i) => (
            <div key={i} className={styles.testimonioCard}>
              <div className={styles.testimonioEstrellas}>
                {Array.from({ length: t.estrellas }).map((_, j) => <IconStar key={j} />)}
              </div>
              <p className={styles.testimonioTexto}>"{t.texto}"</p>
              <div className={styles.testimonioAutor}>
                <span className={styles.testimonioNombre}>{t.nombre}</span>
                <span className={styles.testimonioPet}><IconPaw width={12} height={12} /> {t.mascota}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.banner}>
        <h2 className={styles.bannerTitle}>Compra desde tu casa, en Río Grande</h2>
        <p className={styles.bannerSub}>Envíos a domicilio y retiro en local. Aceptamos transferencia y efectivo.</p>
        <div className={styles.bannerCtas}>
          <Link to="/tienda" className={styles.bannerCta}>Ver productos</Link>
          <a
            href={`https://wa.me/${WA}?text=Hola! Quiero consultar sobre sus productos 🐾`}
            target="_blank"
            rel="noreferrer"
            className={styles.bannerCtaSecondary}
          >
              <IconWhatsApp style={{flexShrink:0}} />
             WhatsApp
          </a>
        </div>
      </section>

      <Toast message={toast} />
    </main>
  )
}