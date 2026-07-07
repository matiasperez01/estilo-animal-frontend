import { useState, useEffect } from 'react'
import styles from './AdminTable.module.css'

const API = import.meta.env.VITE_API_URL

const EMPTY_FORM = {
  nombre: '', descripcion: '', precio: '', stock: '',
  stockMinimo: '', codigoBarra: '', especie: 'perro',
  categoriaId: '', proveedorId: '', imagenUrl: '', destacado: false,
}

export default function AdminProductos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [guardando, setGuardando] = useState(false)
  const [subiendo, setSubiendo] = useState(false)
  const [preview, setPreview] = useState(null)
  const [variantes, setVariantes] = useState([])
  const [varianteForm, setVarianteForm] = useState({ talle: '', precio: '', stock: '' })

  useEffect(() => {
    cargarDatos()
  }, [])

  async function cargarDatos() {
    setLoading(true)
    const [p, c] = await Promise.all([
      fetch(`${API}/api/productos`).then(r => r.json()),
      fetch(`${API}/api/categorias`).then(r => r.json()),
    ])
    setProductos(p)
    setCategorias(c)
    setLoading(false)
  }

  function abrirNuevo() {
    setForm(EMPTY_FORM)
    setEditando(null)
    setShowForm(true)
  }

async function abrirEditar(p) {
  setForm({
    nombre: p.nombre ?? '',
    descripcion: p.descripcion ?? '',
    precio: p.precio ?? '',
    stock: p.stock ?? '',
    stockMinimo: p.stockMinimo ?? '',
    codigoBarra: p.codigoBarra ?? '',
    especie: p.especie ?? 'perro',
    categoriaId: p.categoria?.id ?? '',
    proveedorId: p.proveedor?.id ?? '',
    imagenUrl: p.imagenUrl ?? '',
    destacado: p.destacado ?? false,
  })
  setPreview(p.imagenUrl ?? null)
  setEditando(p.id)

  // Cargar variantes existentes
  const v = await fetch(`${API}/api/productos/${p.id}/variantes`).then(r => r.json())
  setVariantes(v)

  setShowForm(true)
}

function cerrarForm() {
  setShowForm(false)
  setEditando(null)
  setForm(EMPTY_FORM)
  setPreview(null)
  setVariantes([])
  setVarianteForm({ talle: '', precio: '', stock: '' })
}

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

async function handleImagen(e) {
  const archivo = e.target.files[0]
  if (!archivo) return
  setSubiendo(true)
  const formData = new FormData()
  formData.append('archivo', archivo)
  const res = await fetch(`${API}/api/imagenes/subir`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json()
  setForm(prev => ({ ...prev, imagenUrl: data.url }))
  setPreview(data.url)
  setSubiendo(false)
}

  async function handleSubmit(e) {
    e.preventDefault()
    setGuardando(true)
    

const body = {
  nombre: form.nombre,
  descripcion: form.descripcion,
  precio: Number(form.precio),
  stock: Number(form.stock),
  stockMinimo: Number(form.stockMinimo) || 1,
  codigoBarra: form.codigoBarra || null,
  especie: form.especie,
  imagenUrl: form.imagenUrl || null,
  categoria: form.categoriaId ? { id: Number(form.categoriaId) } : null,
  proveedor: form.proveedorId ? { id: Number(form.proveedorId) } : null,
  destacado: form.destacado,
}

    const url = editando ? `${API}/api/productos/${editando}` : `${API}/api/productos`
    const method = editando ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setGuardando(false)
    cerrarForm()
    cargarDatos()
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminás este producto?')) return
    await fetch(`${API}/api/productos/${id}`, { method: 'DELETE' })
    cargarDatos()
  }

  async function actualizarVariante(variante) {
  await fetch(`${API}/api/productos/${editando}/variantes/${variante.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      talle: variante.talle,
      precio: Number(variante.precio),
      stock: Number(variante.stock),
    }),
  })
}

  async function agregarVariante() {
  if (!varianteForm.talle || !varianteForm.precio || !varianteForm.stock) return
  if (!editando) {
    // Si es producto nuevo, guardarlo primero
    alert('Guardá el producto primero, luego agregá los talles.')
    return
  }
  await fetch(`${API}/api/productos/${editando}/variantes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      talle: varianteForm.talle,
      precio: Number(varianteForm.precio),
      stock: Number(varianteForm.stock),
    }),
  })
  const v = await fetch(`${API}/api/productos/${editando}/variantes`).then(r => r.json())
  setVariantes(v)
  setVarianteForm({ talle: '', precio: '', stock: '' })
}

async function eliminarVariante(varianteId) {
  await fetch(`${API}/api/productos/${editando}/variantes/${varianteId}`, { method: 'DELETE' })
  setVariantes(prev => prev.filter(v => v.id !== varianteId))
}

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Productos</h1>
        <button className={styles.btnPrimary} onClick={abrirNuevo}>+ Nuevo producto</button>
      </div>

      {loading ? (
        <p className={styles.estado}>Cargando...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Especie</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id} className={p.stock <= (p.stockMinimo ?? 1) ? styles.rowAlert : ''}>
                <td>{p.nombre}</td>
                <td>{p.categoria?.nombre ?? '—'}</td>
                <td className={styles.capitalize}>{p.especie ?? '—'}</td>
                <td>${Number(p.precio).toLocaleString('es-AR')}</td>
                <td>
                  <span className={p.stock <= (p.stockMinimo ?? 1) ? styles.badgeLow : styles.badgeOk}>
                    {p.stock}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button className={styles.btnEdit} onClick={() => abrirEditar(p)}>Editar</button>
                  <button className={styles.btnDelete} onClick={() => eliminar(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className={styles.modalOverlay} onClick={cerrarForm}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>{editando ? 'Editar producto' : 'Nuevo producto'}</h2>
              <button className={styles.modalClose} onClick={cerrarForm}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Nombre *</span>
                  <input name="nombre" value={form.nombre} onChange={handleChange} required />
                </label>
                <label className={styles.field}>
                  <span>Especie</span>
<select name="especie" value={form.especie} onChange={handleChange}>
  <option value="perro">Perro</option>
  <option value="gato">Gato</option>
  <option value="ambos">Perros y Gatos</option>
</select>
                </label>
              </div>
              <label className={styles.field}>
                <span>Descripción</span>
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={2} />
              </label>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Precio *</span>
                  <input name="precio" type="number" value={form.precio} onChange={handleChange} required min="0" />
                </label>
                <label className={styles.field}>
                  <span>Stock *</span>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} required min="0" />
                </label>
                <label className={styles.field}>
                  <span>Stock mínimo</span>
                  <input name="stockMinimo" type="number" value={form.stockMinimo} onChange={handleChange} min="0" />
                </label>
              </div>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Categoría</span>
                  <select name="categoriaId" value={form.categoriaId} onChange={handleChange}>
                    <option value="">Sin categoría</option>
                    {categorias.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Código de barra</span>
                  <input name="codigoBarra" value={form.codigoBarra} onChange={handleChange} />
                </label>
                <label className={styles.field} style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
  <input
    type="checkbox"
    name="destacado"
    checked={form.destacado ?? false}
    onChange={e => setForm(prev => ({ ...prev, destacado: e.target.checked }))}
  />
  <span>Mostrar en destacados de la página principal</span>
</label>
              </div>
              {editando && (
  <section className={styles.section}>
    <h3 className={styles.sectionTitle}>Talles y precios</h3>

{variantes.length > 0 && (
  <table className={styles.variantesTable}>
    <thead>
      <tr>
        <th>Talle</th>
        <th>Precio</th>
        <th>Stock</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {variantes.map(v => (
        <tr key={v.id}>
          <td>{v.talle}</td>
          <td>
            <input
              type="number"
              value={v.precio}
              className={styles.varianteInput}
              onChange={e => setVariantes(prev =>
                prev.map(x => x.id === v.id ? { ...x, precio: e.target.value } : x)
              )}
              onBlur={() => actualizarVariante(v)}
            />
          </td>
          <td>
            <input
              type="number"
              value={v.stock}
              className={styles.varianteInput}
              onChange={e => setVariantes(prev =>
                prev.map(x => x.id === v.id ? { ...x, stock: e.target.value } : x)
              )}
              onBlur={() => actualizarVariante(v)}
            />
          </td>
          <td>
            <button className={styles.btnDelete} onClick={() => eliminarVariante(v.id)}>✕</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

    <div className={styles.row3}>
      <label className={styles.field}>
        <span>Talle</span>
        <input
          value={varianteForm.talle}
          onChange={e => setVarianteForm(p => ({ ...p, talle: e.target.value }))}
          placeholder="ej: 2, XS, M"
        />
      </label>
      <label className={styles.field}>
        <span>Precio</span>
        <input
          type="number"
          value={varianteForm.precio}
          onChange={e => setVarianteForm(p => ({ ...p, precio: e.target.value }))}
          placeholder="$"
        />
      </label>
      <label className={styles.field}>
        <span>Stock</span>
        <input
          type="number"
          value={varianteForm.stock}
          onChange={e => setVarianteForm(p => ({ ...p, stock: e.target.value }))}
          placeholder="0"
        />
      </label>
    </div>
    <button type="button" className={styles.btnSecondary} onClick={agregarVariante}>
      + Agregar talle
    </button>
  </section>
)}
              <label className={styles.field}>
  <span>Imagen del producto</span>
  <input
    type="file"
    accept="image/*"
    onChange={handleImagen}
    className={styles.fileInput}
  />
  {subiendo && <p className={styles.uploadingText}>Subiendo imagen...</p>}
  {preview && (
    <div className={styles.imagePreview}>
      <img src={preview} alt="Preview" />
    </div>
  )}
</label>
              <div className={styles.formFooter}>
                <button type="button" className={styles.btnSecondary} onClick={cerrarForm}>Cancelar</button>
                <button type="submit" className={styles.btnPrimary} disabled={guardando}>
                  {guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}