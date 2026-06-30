import styles from './SizeGuide.module.css'

const TALLES = [
  { talle: '0',  largo: '15-18', pecho: '21-25',   cuello: '18-19' },
  { talle: '1',  largo: '19-22', pecho: '26-29',   cuello: '20-21' },
  { talle: '2',  largo: '25-27', pecho: '29-34',   cuello: '22-23' },
  { talle: '3',  largo: '28-30', pecho: '35-40',   cuello: '24-25' },
  { talle: '4',  largo: '31-36', pecho: '41-46',   cuello: '26-29' },
  { talle: '5',  largo: '37-45', pecho: '47-56',   cuello: '30-35' },
  { talle: '6',  largo: '46-55', pecho: '57-66',   cuello: '36-40' },
  { talle: '7',  largo: '56-60', pecho: '67-77',   cuello: '41-46' },
  { talle: '8',  largo: '61-66', pecho: '78-82',   cuello: '47-51' },
  { talle: '9',  largo: '67-72', pecho: '83-92',   cuello: '52-56' },
  { talle: '10', largo: '73-77', pecho: '93-103',  cuello: '57-61' },
  { talle: '11', largo: '78-80', pecho: '104-115', cuello: '62-66' },
]

export default function SizeGuide() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Comprá con confianza</p>
        <h1 className={styles.title}>Guía de talles</h1>
        <p className={styles.sub}>
          Tomá las medidas de tu mascota antes de elegir el talle. Una prenda bien elegida es una mascota feliz y cómoda.
        </p>
      </div>

      {/* Aviso importante */}
      <div className={styles.alertBanner}>
        <span className={styles.alertIcon}>⚠️</span>
        <p>
          <strong>Asegurate de medir a tu mascota antes de realizar la compra.</strong>{' '}
          Cada animal es diferente — el peso es orientativo, pero las medidas son las que determinan el talle correcto.
        </p>
      </div>

      {/* Tabla de talles */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Tabla de talles</h2>
        <p className={styles.sectionSub}>Todas las medidas están en centímetros. Si tu mascota queda entre dos talles, elegí el más grande.</p>
        <div className={styles.tableWrapper}>
            <section className={styles.section}>
  <h2 className={styles.sectionTitle}>¿Cómo tomar las medidas?</h2>
  <p className={styles.sectionSub}>Necesitás una cinta métrica flexible. Tu mascota debe estar parada y relajada.</p>
  <div className={styles.medidasImgWrapper}>
    <img src="./guia-medidas.jpg" alt="Cómo medir a tu mascota" className={styles.medidasImg} />
  </div>
</section>
<table className={styles.table}>
  <thead>
    <tr>
      <th>Talle</th>
      <th>Largo (cm)</th>
      <th>Contorno de pecho (cm)</th>
      <th>Contorno de cuello (cm)</th>
    </tr>
  </thead>
  <tbody>
    {TALLES.map((t, i) => (
      <tr key={t.talle} className={i % 2 === 0 ? styles.rowEven : ''}>
        <td><strong>Talle {t.talle}</strong></td>
        <td>{t.largo}</td>
        <td>{t.pecho}</td>
        <td>{t.cuello}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </section>

      {/* Política de cambios */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Política de cambios</h2>
        <div className={styles.politicaGrid}>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>⏱️</span>
            <h3>Plazo de 48 horas</h3>
            <p>Los cambios se realizan dentro de las 48 horas de recibida la compra. Pasado ese plazo no se aceptan cambios.</p>
          </div>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>📦</span>
            <h3>Estado de la prenda</h3>
            <p>La prenda devuelta debe estar en excelente estado — sin uso, sin manchas, sin olores y con todas sus etiquetas.</p>
          </div>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>🔄</span>
            <h3>Sujeto a stock</h3>
            <p>Los cambios están sujetos a disponibilidad de stock. En caso de no contar con el talle, se ofrecerá una solución alternativa.</p>
          </div>
          <div className={styles.politicaCard}>
            <span className={styles.politicaIcon}>💬</span>
            <h3>Coordinación por WhatsApp</h3>
            <p>Todo cambio se coordina directamente por WhatsApp. Contactanos con tu número de pedido y el motivo del cambio.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className={styles.cta}>
        <p>¿Tenés dudas sobre el talle de tu mascota?</p>
        <a
          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=Hola! Necesito ayuda para elegir el talle correcto para mi mascota 🐾`}
          target="_blank"
          rel="noreferrer"
          className={styles.ctaBtn}
        >
          💬 Consultanos por WhatsApp
        </a>
      </div>
    </main>
  )
}