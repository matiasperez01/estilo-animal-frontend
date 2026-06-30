import styles from './About.module.css'

export default function About() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Nuestra historia</p>
        <h1 className={styles.title}>Somos Estilo Animal</h1>
        <p className={styles.sub}>
          Nació del amor por los animales y el deseo de verlos cómodos, abrigados y con su propio estilo.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.block}>
          <span className={styles.icon}>🐾</span>
          <h2>Un emprendimiento con corazón</h2>
          <p>
            Somos una familia amantes de los animales. Seleccionamos cada prenda
            pensando en el bienestar y la comodidad de tu mascota, sin sacrificar
            el estilo.
          </p>
        </div>
        <div className={styles.block}>
          <span className={styles.icon}>✂️</span>
          <h2>Calidad en cada detalle</h2>
          <p>
            Te traemos materiales seleccionados, suaves para la piel y
            duraderos. Cada prenda pasa por un control de calidad antes de llegar
            a tu casa.
          </p>
        </div>
        <div className={styles.block}>
          <span className={styles.icon}>🚚</span>
          <h2>Envíos a todo la provincia</h2>
          <p>
            Despachamos a toda la provincia de Tierra del Fuego. Aceptamos transferencia o efectivo. Tu pedido llega directo a la puerta de tu casa.
          </p>
        </div>
      </div>
    </main>
  )
}
