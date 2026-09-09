import { Link } from 'react-router-dom'
import { IconWhatsApp, IconMapPin, IconInstagram } from './icons/Icon'
import styles from './Footer.module.css'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>

        <div className={styles.brand}>
          <img src="/logo.png" alt="Estilo Animal RG" className={styles.logo} loading="lazy" />
          <p className={styles.tagline}>Indumentaria y accesorios para mascotas.</p>
          <p className={styles.location}><IconMapPin width={14} height={14} /> Río Grande, Tierra del Fuego</p>
<div className={styles.socials}>
  <a
    href="https://instagram.com/estiloanimalrg"
    target="_blank"
    rel="noreferrer"
    className={styles.socialBtn}
  >
    <IconInstagram />
    @estiloanimalrg
  </a>
  <a
    href={`https://wa.me/${WA}`}
    target="_blank"
    rel="noreferrer"
    className={styles.socialBtn}
  >
    <IconWhatsApp />
    +54 9 2964 62-5843
  </a>
</div>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Comprar</p>
          <Link to="/tienda">Ver productos</Link>
          <Link to="/guia-de-talles">Guía de talles</Link>
<Link to="/tienda?especie=perro">Perros</Link>
<Link to="/tienda?especie=gato">Gatos</Link>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Ayuda</p>
          <Link to="/guia-de-talles">Cómo elegir el talle</Link>
          <Link to="/nosotros">Sobre nosotros</Link>
          <Link to="/como-comprar">Cómo comprar</Link>
          <a
            href={`https://wa.me/${WA}?text=Hola! Tengo una consulta sobre un pedido 🐾`}
            target="_blank"
            rel="noreferrer"
          >
            Consultas y cambios
          </a>
          <a
            href={`https://wa.me/${WA}?text=Hola! Quiero consultar sobre envíos 🚚`}
            target="_blank"
            rel="noreferrer"
          >
            Envíos y entregas
          </a>
        </div>

        <div className={styles.col}>
          <p className={styles.colTitle}>Contacto</p>
          <a
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noreferrer"
            className={styles.socialBtn}
          >
                <IconWhatsApp /> WhatsApp
          </a>
          <a
          className={styles.socialBtn}
            href="https://instagram.com/estiloanimalrg"
            target="_blank"
            rel="noreferrer"
          >
    <IconInstagram />
         @estiloanimalrg
          </a>
          <p className={styles.horario}>Respondemos consultas de lunes a sábado</p>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© 2026 Estilo Animal RG · Todos los derechos reservados</p>
        <p>Hecho en Río Grande, Tierra del Fuego</p>
      </div>
    </footer>
  )
}