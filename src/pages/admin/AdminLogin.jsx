import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../lib/adminAuth'
import styles from './AdminLogin.module.css'

const API_URL = import.meta.env.VITE_API_URL

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) throw new Error('Credenciales inválidas')
      const { token } = await res.json()
      setToken(token)
      navigate('/admin')
    } catch {
      setError(true)
      setPassword('')
    } finally {
      setEnviando(false)
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
          <button type="submit" className={styles.btn} disabled={enviando}>
            {enviando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}