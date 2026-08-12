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
    color: '#B8860B',
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
          <span>📏</span>
          <p>Si tenés dudas, <strong>siempre elegí el talle más grande</strong></p>
        </div>
      </section>

      {/* AVISO */}
      <div className={styles.alert}>
        <span>⚠️</span>
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
          <img src="/guia-medidas.jpg" alt="Cómo medir a tu mascota" className={styles.medidasImg} />
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
                <th>
                  <span className={styles.thIcon}>📏</span>
                  Largo lomo
                </th>
                <th>
                  <span className={styles.thIcon}>🫀</span>
                  Pecho
                </th>
                <th>
                  <span className={styles.thIcon}>🔴</span>
                  Cuello
                </th>
                <th>
                  <span className={styles.thIcon}>⚖️</span>
                  Peso aprox.
                </th>
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
          <span>💡</span>
          <p>Si tu mascota tiene el pecho ancho o está entre dos talles, siempre elegí el talle más grande. Es preferible que sobre un poco a que quede ajustado.</p>
        </div>
      </section>

      {/* POLÍTICA DE CAMBIOS */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Política de cambios</h2>
        <div className={styles.politicaGrid}>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>⏱️</span>
            <h3>48 horas</h3>
            <p>Los cambios se realizan dentro de las 48 horas de recibida la compra.</p>
          </div>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>📦</span>
            <h3>Prenda en buen estado</h3>
            <p>La prenda debe estar sin uso, sin manchas, sin olores y con todas sus etiquetas.</p>
          </div>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>🔄</span>
            <h3>Sujeto a stock</h3>
            <p>Los cambios están sujetos a disponibilidad. Si no hay stock, buscamos una solución.</p>
          </div>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
            </span>
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg> Consultanos por WhatsApp
        </a>
      </div>

    </main>
  )
}