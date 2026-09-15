import {
  IconRuler, IconAlertTriangle, IconLightbulb, IconClock,
  IconPackage, IconRefresh, IconWhatsApp,
} from '../components/icons/Icon'
import styles from './SizeGuide.module.css'

const WA = import.meta.env.VITE_WHATSAPP_NUMBER

const TALLES = [
  { talle: '0',  largo: '15-18', pecho: '21-25',   cuello: '18-19', peso: 'hasta 1 kg' },
  { talle: '1',  largo: '19-22', pecho: '26-29',   cuello: '20-21', peso: '1-2 kg' },
  { talle: '2',  largo: '25-27', pecho: '29-34',   cuello: '22-23', peso: '2-3 kg' },
  { talle: '3',  largo: '28-30', pecho: '35-40',   cuello: '24-25', peso: '3-5 kg' },
  { talle: '4',  largo: '31-36', pecho: '41-46',   cuello: '26-29', peso: '5-7 kg' },
  { talle: '5',  largo: '37-45', pecho: '47-56',   cuello: '30-35', peso: '7-10 kg' },
  { talle: '6',  largo: '46-55', pecho: '57-66',   cuello: '36-40', peso: '10-14 kg' },
  { talle: '7',  largo: '56-60', pecho: '67-77',   cuello: '41-46', peso: '14-18 kg' },
  { talle: '8',  largo: '61-66', pecho: '78-82',   cuello: '47-51', peso: '18-22 kg' },
  { talle: '9',  largo: '67-72', pecho: '83-92',   cuello: '52-56', peso: '22-28 kg' },
  { talle: '10', largo: '73-77', pecho: '93-103',  cuello: '57-61', peso: '28-34 kg' },
  { talle: '11', largo: '78-80', pecho: '104-115', cuello: '62-66', peso: '34-40 kg' },
]

const PASOS = [
  {
    num: '1',
    titulo: 'Largo del lomo',
    desc: 'Medí desde la base del cuello hasta el inicio de la cola, siguiendo la línea del lomo. Tu mascota debe estar parada.',
    color: '#A8720F',
  },
  {
    num: '2',
    titulo: 'Contorno de pecho',
    desc: 'Pasá la cinta por la parte más ancha del pecho, justo detrás de las patas delanteras. Es la medida más importante.',
    color: '#C44A1A',
  },
  {
    num: '3',
    titulo: 'Contorno de cuello',
    desc: 'Medí alrededor de la base del cuello, donde va el collar. Dejá dos dedos de holgura para mayor comodidad.',
    color: '#2E6B2E',
  },
]

export default function SizeGuide() {
  return (
    <main className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Comprá con confianza</p>
          <h1 className={styles.title}>Guía de talles</h1>
          <p className={styles.sub}>
            Tomá las medidas de tu mascota antes de elegir. Una prenda bien elegida es una mascota feliz y cómoda.
          </p>
        </div>
        <div className={styles.heroBadge}>
          <IconRuler width={22} height={22} />
          <p>Si tenés dudas, <strong>siempre elegí el talle más grande</strong></p>
        </div>
      </section>

      {/* AVISO */}
      <div className={styles.alert}>
        <IconAlertTriangle width={20} height={20} />
        <p>
          <strong>Asegurate de medir a tu mascota antes de comprar.</strong> El peso es orientativo — las medidas son las que determinan el talle correcto. Dos perros del mismo peso pueden necesitar talles distintos.
        </p>
      </div>

      {/* CÓMO MEDIR */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>¿Cómo tomar las medidas?</h2>
        <p className={styles.sectionSub}>Usá una cinta métrica flexible. Tu mascota tiene que estar parada y relajada.</p>

        <div className={styles.pasosGrid}>
          {PASOS.map(p => (
            <div key={p.num} className={styles.pasoCard} style={{ borderTopColor: p.color }}>
              <div className={styles.pasoNum} style={{ background: p.color }}>{p.num}</div>
              <h3 className={styles.pasoTitulo}>{p.titulo}</h3>
              <p className={styles.pasoDesc}>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.imgWrapper}>
          <img src="/guia-medidas.jpg" alt="Cómo medir a tu mascota" className={styles.medidasImg} loading="lazy" />
        </div>
      </section>

      {/* TABLA */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tabla de talles</h2>
        <p className={styles.sectionSub}>
          Todas las medidas en centímetros. Si tu mascota queda entre dos talles, <strong>elegí el más grande</strong>.
        </p>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Talle</th>
                <th>Largo lomo</th>
                <th>Pecho</th>
                <th>Cuello</th>
                <th>Peso aprox.</th>
              </tr>
            </thead>
            <tbody>
              {TALLES.map((t, i) => (
                <tr key={t.talle} className={i % 2 === 0 ? styles.rowEven : ''}>
                  <td>
                    <span className={styles.talleBadge}>Talle {t.talle}</span>
                  </td>
                  <td>{t.largo} cm</td>
                  <td>{t.pecho} cm</td>
                  <td>{t.cuello} cm</td>
                  <td className={styles.peso}>{t.peso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.tableTip}>
          <IconLightbulb width={18} height={18} />
          <p>Si tu mascota tiene el pecho ancho o está entre dos talles, siempre elegí el talle más grande. Es preferible que sobre un poco a que quede ajustado.</p>
        </div>
      </section>

      {/* POLÍTICA DE CAMBIOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Política de cambios</h2>
        <div className={styles.politicaGrid}>
          <div className={styles.politicaCard}>
            <IconClock className={styles.politicaIcon} width={26} height={26} />
            <h3>48 horas</h3>
            <p>Los cambios se realizan dentro de las 48 horas de recibida la compra.</p>
          </div>
          <div className={styles.politicaCard}>
            <IconPackage className={styles.politicaIcon} width={26} height={26} />
            <h3>Prenda en buen estado</h3>
            <p>La prenda debe estar sin uso, sin manchas, sin olores y con todas sus etiquetas.</p>
          </div>
          <div className={styles.politicaCard}>
            <IconRefresh className={styles.politicaIcon} width={26} height={26} />
            <h3>Sujeto a stock</h3>
            <p>Los cambios están sujetos a disponibilidad. Si no hay stock, buscamos una solución.</p>
          </div>
          <div className={styles.politicaCard}>
            <IconWhatsApp className={styles.politicaIcon} width={22} height={22} />
            <h3>Por WhatsApp</h3>
            <p>Coordinamos todo por WhatsApp. Escribinos con tu número de pedido.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className={styles.cta}>
        <p>¿Seguís con dudas sobre el talle de tu mascota?</p>
        <a
          href={`https://wa.me/${WA}?text=Hola! Necesito ayuda para elegir el talle correcto para mi mascota 🐾`}
          target="_blank"
          rel="noreferrer"
          className={styles.ctaBtn}
        >
          <IconWhatsApp /> Consultanos por WhatsApp
        </a>
      </div>

    </main>
  )
}