import { Link } from 'react-router-dom'
import styles from './HowToBuy.module.css'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER

const PASOS = [
  {
    num: '01',
    icon: '🔍',
    titulo: 'Explorá el catálogo',
    desc: 'Navegá por nuestros productos, filtrá por categoría o especie y encontrá lo  mejor para tu mascota.',
    link: '/tienda',
    linkLabel: 'Ver productos →',
  },
  {
    num: '02',
    icon: '📏',
    titulo: 'Elegí el talle correcto',
    desc: 'Si llevas ropa, asegurate de elegir el talle correcto. Consultá nuestra guía de talles para no equivocarte.',
    link: '/guia-de-talles',
    linkLabel: 'Ver guía de talles →',
  },
  {
    num: '03',
    icon: '🛒',
    titulo: 'Agregá al carrito',
    desc: 'Seleccioná el talle en caso de ropa, la cantidad y agregá el producto al carrito y cuando estés listo, hacé clic en "Hacer pedido".',
  },
  {
    num: '04',
    icon: '💬',
    titulo: 'Confirmamos por WhatsApp',
    desc: 'Se abre WhatsApp con el detalle de tu pedido listo. Coordinamos el pago y la entrega directamente con vos.',
  },
  {
    num: '05',
    icon: '🚚',
    titulo: 'Recibís tu pedido',
    desc: 'Enviamos a domicilio en toda Río Grande o podés retirarlo sin costo adicional.',
  },
]

const MEDIOS_PAGO = [
  { icon: '🏦', nombre: 'Transferencia bancaria', desc: 'Te enviamos el CBU al confirmar el pedido' },
  { icon: '💵', nombre: 'Efectivo', desc: 'Al momento de la entrega o retiro en local' },
]

const ENVIOS = [
  { barrio: 'Intevu / Centro', costo: 'Gratis' },
  { barrio: 'Ch13 / Ch11 / Aeropuerto', costo: '$2.500' },
  { barrio: 'Vapor Amadeo', costo: '$3.000' },
  { barrio: 'Altos de la Estancia / San Martín Norte', costo: '$3.500' },
  { barrio: 'Ch2 / CGT / Ch4', costo: '$3.000' },
  { barrio: 'Barrio Austral', costo: '$3.500' },
]

export default function HowToBuy() {
  return (
    <main className={styles.page}>

      <section className={styles.hero}>
        <p className={styles.eyebrow}>Todo lo que necesitás saber</p>
        <h1 className={styles.title}>¿Cómo comprar?</h1>
        <p className={styles.sub}>
          Comprarle algo a tu mascota es muy fácil. Te explicamos el proceso paso a paso.
        </p>
      </section>

      {/* PASOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>El proceso de compra</h2>
        <div className={styles.pasosList}>
          {PASOS.map((paso, i) => (
            <div key={paso.num} className={styles.paso}>
              <div className={styles.pasoLeft}>
                <div className={styles.pasoNum}>{paso.num}</div>
                {i < PASOS.length - 1 && <div className={styles.pasoLinea} />}
              </div>
              <div className={styles.pasoContent}>
                <div className={styles.pasoIcon}>{paso.icon}</div>
                <div>
                  <h3 className={styles.pasoTitulo}>{paso.titulo}</h3>
                  <p className={styles.pasoDesc}>{paso.desc}</p>
                  {paso.link && (
                    <Link to={paso.link} className={styles.pasoLink}>{paso.linkLabel}</Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEDIOS DE PAGO */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Medios de pago</h2>
        <div className={styles.pagoGrid}>
          {MEDIOS_PAGO.map(p => (
            <div key={p.nombre} className={styles.pagoCard}>
              <span className={styles.pagoIcon}>{p.icon}</span>
              <div>
                <p className={styles.pagoNombre}>{p.nombre}</p>
                <p className={styles.pagoDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.envioGratis}>
          🚚 <strong>Envío gratis</strong> en compras superiores a $30.000
        </div>
      </section>

      {/* ENVÍOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Costos de envío por barrio</h2>
        <p className={styles.sectionSub}>Enviamos a toda Río Grande. El costo varía según la zona.</p>
        <div className={styles.enviosTable}>
          {ENVIOS.map(e => (
            <div key={e.barrio} className={styles.envioRow}>
              <span className={styles.envioBarrio}>📍 {e.barrio}</span>
              <span className={`${styles.envioCosto} ${e.costo === 'Gratis' ? styles.envioGratisTag : ''}`}>
                {e.costo}
              </span>
            </div>
          ))}
        </div>
        <p className={styles.envioNota}>
          También podés retirar sin costo. Coordinamos el punto de retiro por WhatsApp.
        </p>
      </section>

      {/* CAMBIOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Política de cambios</h2>
        <div className={styles.cambiosGrid}>
          <div className={styles.cambioCard}>
            <span>⏱️</span>
            <div>
              <p className={styles.cambioTitulo}>48 horas</p>
              <p className={styles.cambioDesc}>Plazo para solicitar un cambio desde que recibís el pedido.</p>
            </div>
          </div>
          <div className={styles.cambioCard}>
            <span>📦</span>
            <div>
              <p className={styles.cambioTitulo}>Prenda en buen estado</p>
              <p className={styles.cambioDesc}>Sin uso, sin manchas y con etiquetas para aceptar el cambio.</p>
            </div>
          </div>
          <div className={styles.cambioCard}>
            <span>🔄</span>
            <div>
              <p className={styles.cambioTitulo}>Sujeto a stock</p>
              <p className={styles.cambioDesc}>Si no hay stock del talle, buscamos una solución juntos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className={styles.cta}>
        <p>¿Tenés alguna duda antes de comprar?</p>
        <a
          href={`https://wa.me/${WA}?text=Hola! Tengo una consulta antes de comprar 🐾`}
          target="_blank"
          rel="noreferrer"
          className={styles.ctaBtn}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg> Escribinos por WhatsApp
        </a>
        <Link to="/tienda" className={styles.ctaBtnSecondary}>Ver productos →</Link>
      </div>

    </main>
  )
}