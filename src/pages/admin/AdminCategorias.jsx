import { useState, useEffect } from 'react'
import styles from './AdminTable.module.css'

const API = import.meta.env.VITE_API_URL

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({ nombre: '', descripcion: '' })
  const [guardando, setGuardando] = useState(false)

  useEffect(() => { cargar() }, [])

  async function cargar() {
    setLoading(true)
    const data = await fetch(`${API}/api/categorias`).then(r => r.json())
    setCategorias(data)
    setLoading(false)
  }

  function abrirNuevo() {
    setForm({ nombre: '', descripcion: '' })
    setEditando(null)
    setShowForm(true)
  }

  function abrirEditar(c) {
    setForm({ nombre: c.nombre ?? '', descripcion: c.descripcion ?? '' })
    setEditando(c.id)
    setShowForm(true)
  }

  function cerrar() {
    setShowForm(false)
    setEditando(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setGuardando(true)
    const url = editando ? `${API}/api/categorias/${editando}` : `${API}/api/categorias`
    const method = editando ? 'PUT' : 'POST'
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setGuardando(false)
    cerrar()
    cargar()
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminás esta categoría?')) return
    await fetch(`${API}/api/categorias/${id}`, { method: 'DELETE' })
    cargar()
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Categorías</h1>
        <button className={styles.btnPrimary} onClick={abrirNuevo}>+ Nueva categoría</button>
      </div>

      {loading ? (
        <p className={styles.estado}>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(c => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.descripcion ?? '—'}</td>
                <td>{c.productos?.length ?? 0}</td>
                <td className={styles.actions}>
                  <button className={styles.btnEdit} onClick={() => abrirEditar(c)}>Editar</button>
                  <button className={styles.btnDelete} onClick={() => eliminar(c.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className={styles.modalOverlay} onClick={cerrar}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editando ? 'Editar categoría' : 'Nueva categoría'}</h2>
              <button className={styles.modalClose} onClick={cerrar}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label className={styles.field}>
                <span>Nombre *</span>
                <input name="nombre" value={form.nombre} onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))} required />
              </label>
              <label className={styles.field}>
                <span>Descripción</span>
                <textarea name="descripcion" value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} rows={2} />
              </label>
              <div className={styles.formFooter}>
                <button type="button" className={styles.btnSecondary} onClick={cerrar}>Cancelar</button>
                <button type="submit" className={styles.btnPrimary} disabled={guardando}>
                  {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear categoría'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}