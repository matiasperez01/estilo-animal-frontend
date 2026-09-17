import { IconPaw, IconScissors, IconTruck } from '../components/icons/Icon'
import styles from './About.module.css'

export default function About() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Nuestra historia</p>
        <h1 className={styles.title}>Somos Estilo Animal</h1>
        <p className={styles.sub}>
          Nació del amor por los animales y el deseo de verlos felices, comodos y cancheros.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.block}>
          <IconPaw className={styles.icon} width={28} height={28} />
          <h2>Un emprendimiento con corazón</h2>
          <p>
            Somos una familia amantes de los animales.
            Nuestro logo esta formado por nuestros dos hijos: Milo & Maria.
            Seleccionamos cada producto conociendo el bienestar y la
            comodidad de las mascotas.
          </p>
        </div>
        <div className={styles.block}>
          <IconScissors className={styles.icon} width={28} height={28} />
          <h2>Calidad en cada producto</h2>
          <p>
            Te traemos materiales seleccionados, unicos para tu mascota.
            Cada producto pasa por un control de calidad antes de llegar a
            tu casa.
          </p>
        </div>
        <div className={styles.block}>
          <IconTruck className={styles.icon} width={28} height={28} />
          <h2>Envíos a todo la provincia</h2>
          <p>
            Despachamos a toda la provincia de Tierra del Fuego. Tu pedido
            llega directo a la puerta de tu casa.
          </p>
        </div>
      </div>
    </main>
  )
}
