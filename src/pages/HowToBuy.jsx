import { Link } from 'react-router-dom'
import {
  IconSearch, IconRuler, IconShoppingBag, IconWhatsApp, IconTruck,
  IconCreditCard, IconBanknote, IconMapPin, IconClock, IconPackage, IconRefresh,
} from '../components/icons/Icon'
import styles from './HowToBuy.module.css'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER

const PASOS = [
  {
    num: '01',
    icon: IconSearch,
    titulo: 'Explorá el catálogo',
    desc: 'Navegá por nuestros productos, filtrá por categoría o especie y encontrá lo  mejor para tu mascota.',
    link: '/tienda',
    linkLabel: 'Ver productos',
  },
  {
    num: '02',
    icon: IconRuler,
    titulo: 'Elegí el talle correcto',
    desc: 'Si llevas ropa, asegurate de elegir el talle correcto. Consultá nuestra guía de talles para no equivocarte.',
    link: '/guia-de-talles',
    linkLabel: 'Ver guía de talles',
  },
  {
    num: '03',
    icon: IconShoppingBag,
    titulo: 'Agregá al carrito',
    desc: 'Seleccioná el talle en caso de ropa, la cantidad y agregá el producto al carrito y cuando estés listo, hacé clic en "Hacer pedido".',
  },
  {
    num: '04',
    icon: IconWhatsApp,
    titulo: 'Confirmamos por WhatsApp',
    desc: 'Se abre WhatsApp con el detalle de tu pedido listo. Coordinamos el pago y la entrega directamente con vos.',
  },
  {
    num: '05',
    icon: IconTruck,
    titulo: 'Recibís tu pedido',
    desc: 'Enviamos a domicilio en toda Río Grande o podés retirarlo sin costo adicional.',
  },
]

const MEDIOS_PAGO = [
  { icon: IconCreditCard, nombre: 'Transferencia bancaria', desc: 'Te enviamos el CBU al confirmar el pedido' },
  { icon: IconBanknote, nombre: 'Efectivo', desc: 'Al momento de la entrega o retiro en local' },
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
                <div className={styles.pasoIcon}><paso.icon width={20} height={20} /></div>
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
              <p.icon className={styles.pagoIcon} width={24} height={24} />
              <div>
                <p className={styles.pagoNombre}>{p.nombre}</p>
                <p className={styles.pagoDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.envioGratis}>
          <IconTruck width={16} height={16} /> <strong>Envío gratis</strong> en compras superiores a $30.000
        </div>
      </section>

      {/* ENVÍOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Costos de envío por barrio</h2>
        <p className={styles.sectionSub}>Enviamos a toda Río Grande. El costo varía según la zona.</p>
        <div className={styles.enviosTable}>
          {ENVIOS.map(e => (
            <div key={e.barrio} className={styles.envioRow}>
              <span className={styles.envioBarrio}><IconMapPin width={13} height={13} /> {e.barrio}</span>
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
            <IconClock width={22} height={22} />
            <div>
              <p className={styles.cambioTitulo}>48 horas</p>
              <p className={styles.cambioDesc}>Plazo para solicitar un cambio desde que recibís el pedido.</p>
            </div>
          </div>
          <div className={styles.cambioCard}>
            <IconPackage width={22} height={22} />
            <div>
              <p className={styles.cambioTitulo}>Prenda en buen estado</p>
              <p className={styles.cambioDesc}>Sin uso, sin manchas y con etiquetas para aceptar el cambio.</p>
            </div>
          </div>
          <div className={styles.cambioCard}>
            <IconRefresh width={22} height={22} />
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
          <IconWhatsApp /> Escribinos por WhatsApp
        </a>
        <Link to="/tienda" className={styles.ctaBtnSecondary}>Ver productos</Link>
      </div>

    </main>
  )
}