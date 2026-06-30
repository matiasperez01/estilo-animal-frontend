import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AdminLogin.module.css'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true')
      navigate('/admin')
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>🐾</div>
        <h1 className={styles.title}>Panel de administración</h1>
        <p className={styles.sub}>Ingresá tu contraseña para continuar</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Contraseña"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            autoFocus
          />
          {error && <p className={styles.error}>Contraseña incorrecta</p>}
          <button type="submit" className={styles.btn}>Ingresar</button>
        </form>
      </div>
    </div>
  )
}