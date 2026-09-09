import styles from './ProductCard.module.css'

export default function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`skeleton ${styles.imgWrapper}`} />
      <div className={styles.body}>
        <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '80%' }} />
        <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '50%' }} />
        <div className={styles.footer}>
          <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '60px', height: '18px' }} />
          <div className={`skeleton ${styles.skeletonBtn}`} />
        </div>
      </div>
    </div>
  )
}
