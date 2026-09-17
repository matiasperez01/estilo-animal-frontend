import { useState, useEffect } from 'react'
import { adminFetch } from '../../lib/adminAuth'
import { TIPOS_VARIANTE, varianteLabel, varianteLabelPlural } from '../../store/products'
import styles from './AdminTable.module.css'

const API = import.meta.env.VITE_API_URL

const EMPTY_FORM = {
  nombre: '', descripcion: '', precio: '', precioDescuento: '', stock: '',
  stockMinimo: '', codigoBarra: '', especie: 'perro',
  categoriaId: '', proveedorId: '', imagenUrl: '', destacado: false,
  tipoVariante: '',
}

const EJEMPLOS_VARIANTE = {
  Talle: 'ej: 2, XS, M',
  Color: 'ej: Rojo, Azul',
  Sabor: 'ej: Pollo, Carne',
  'Tamaño': 'ej: Chico, Grande',
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
  const [imagenes, setImagenes] = useState([])
  const [tipoPersonalizado, setTipoPersonalizado] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    cargarDatos() 
  }, [])

  async function cargarDatos() {
    setLoading(true)
    const [p, c] = await Promise.all([
      adminFetch(`${API}/api/productos`).then(r => r.json()),
      adminFetch(`${API}/api/categorias`).then(r => r.json()),
    ])
    setProductos(p)
    setCategorias(c)
    setLoading(false)
  }

  function abrirNuevo() {
    setForm(EMPTY_FORM)
    setEditando(null)
    setTipoPersonalizado(false)
    setShowForm(true)
  }

async function abrirEditar(p) {
  setForm({
    nombre: p.nombre ?? '',
    descripcion: p.descripcion ?? '',
    precio: p.precio ?? '',
    precioDescuento: p.precioDescuento ?? '',
    stock: p.stock ?? '',
    stockMinimo: p.stockMinimo ?? '',
    codigoBarra: p.codigoBarra ?? '',
    especie: p.especie ?? 'perro',
    categoriaId: p.categoria?.id ?? '',
    proveedorId: p.proveedor?.id ?? '',
    imagenUrl: p.imagenUrl ?? '',
    destacado: p.destacado ?? false,
    tipoVariante: p.tipoVariante ?? '',
  })
  setTipoPersonalizado(!!p.tipoVariante && !TIPOS_VARIANTE.includes(p.tipoVariante))
  setPreview(p.imagenUrl ?? null)
  setEditando(p.id)
  setImagenes(p.imagenes ?? [])
  const v = await adminFetch(`${API}/api/productos/${p.id}/variantes`).then(r => r.json())
  setVariantes(v)
  setShowForm(true)
}

function cerrarForm() {
  setShowForm(false)
  setEditando(null)
  setForm(EMPTY_FORM)
  setTipoPersonalizado(false)
  setPreview(null)
  setVariantes([])
  setVarianteForm({ talle: '', precio: '', stock: '' })
  setImagenes([])
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

  if (editando) {
    const res = await adminFetch(`${API}/api/imagenes/subir/${editando}`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    setImagenes(prev => [...prev, { id: data.id, url: data.url, orden: data.orden }])
    if (imagenes.length === 0) {
      setForm(prev => ({ ...prev, imagenUrl: data.url }))
      setPreview(data.url)
    }
  } else {
    const res = await adminFetch(`${API}/api/imagenes/subir`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    setForm(prev => ({ ...prev, imagenUrl: data.url }))
    setPreview(data.url)
  }
  setSubiendo(false)
}

async function eliminarImagen(imagenId) {
  await adminFetch(`${API}/api/imagenes/imagen/${imagenId}`, { method: 'DELETE' })
  setImagenes(prev => prev.filter(i => i.id !== imagenId))
}

  async function handleSubmit(e) {
    e.preventDefault()
    setGuardando(true)
    

const body = {
  nombre: form.nombre,
  descripcion: form.descripcion,
  precio: Number(form.precio),
  precioDescuento: form.precioDescuento ? Number(form.precioDescuento) : null,
  stock: Number(form.stock),
  stockMinimo: Number(form.stockMinimo) || 1,
  codigoBarra: form.codigoBarra || null,
  especie: form.especie,
  imagenUrl: form.imagenUrl || null,
  categoria: form.categoriaId ? { id: Number(form.categoriaId) } : null,
  proveedor: form.proveedorId ? { id: Number(form.proveedorId) } : null,
  destacado: form.destacado,
  tipoVariante: form.tipoVariante || null,
}

    const url = editando ? `${API}/api/productos/${editando}` : `${API}/api/productos`
    const method = editando ? 'PUT' : 'POST'

    await adminFetch(url, {
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
    await adminFetch(`${API}/api/productos/${id}`, { method: 'DELETE' })
    cargarDatos()
  }

  async function actualizarVariante(variante) {
  await adminFetch(`${API}/api/productos/${editando}/variantes/${variante.id}`, {
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
    alert(`Guardá el producto primero, luego agregá las opciones de ${varianteLabel(form.tipoVariante).toLowerCase()}.`)
    return
  }
  await adminFetch(`${API}/api/productos/${editando}/variantes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      talle: varianteForm.talle,
      precio: Number(varianteForm.precio),
      stock: Number(varianteForm.stock),
    }),
  })
  const v = await adminFetch(`${API}/api/productos/${editando}/variantes`).then(r => r.json())
  setVariantes(v)
  setVarianteForm({ talle: '', precio: '', stock: '' })
}

async function eliminarVariante(varianteId) {
  await adminFetch(`${API}/api/productos/${editando}/variantes/${varianteId}`, { method: 'DELETE' })
  setVariantes(prev => prev.filter(v => v.id !== varianteId))
}

  const productosFiltrados = busqueda.trim()
    ? productos.filter(p => p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()))
    : productos

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Productos</h1>
        <button className={styles.btnPrimary} onClick={abrirNuevo}>+ Nuevo producto</button>
      </div>

      <div className={styles.searchBar}>
        <input
          type="text"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar productos..."
          className={styles.searchInput}
          aria-label="Buscar productos"
        />
      </div>

      {loading ? (
        <p className={styles.estado}>Cargando...</p>
      ) : (
        <div className={styles.tableWrapper}>
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
            {productosFiltrados.length === 0 && (
              <tr><td colSpan={6} className={styles.estado}>No se encontraron productos.</td></tr>
            )}
            {productosFiltrados.map(p => (
              <tr key={p.id} className={p.stock <= (p.stockMinimo ?? 1) ? styles.rowAlert : ''}>
                <td>{p.nombre}</td>
                <td>{p.categoria?.nombre ?? '—'}</td>
                <td className={styles.capitalize}>{p.especie ?? '—'}</td>
                <td>
                  {p.precioDescuento && Number(p.precioDescuento) < Number(p.precio) ? (
                    <>
                      <span className={styles.precioTachado}>${Number(p.precio).toLocaleString('es-AR')}</span>{' '}
                      <span className={styles.precioOferta}>${Number(p.precioDescuento).toLocaleString('es-AR')}</span>
                    </>
                  ) : (
                    `$${Number(p.precio).toLocaleString('es-AR')}`
                  )}
                </td>
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
        </div>
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
                  <span>Precio de oferta (opcional)</span>
                  <input
                    name="precioDescuento"
                    type="number"
                    value={form.precioDescuento}
                    onChange={handleChange}
                    min="0"
                    placeholder="Dejalo vacío si no está en oferta"
                  />
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
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Tipo de opción</span>
                  <select
                    value={tipoPersonalizado ? 'personalizado' : (form.tipoVariante || 'Talle')}
                    onChange={e => {
                      if (e.target.value === 'personalizado') {
                        setTipoPersonalizado(true)
                        setForm(prev => ({ ...prev, tipoVariante: '' }))
                      } else {
                        setTipoPersonalizado(false)
                        setForm(prev => ({ ...prev, tipoVariante: e.target.value }))
                      }
                    }}
                  >
                    {TIPOS_VARIANTE.map(t => <option key={t} value={t}>{t}</option>)}
                    <option value="personalizado">Personalizado...</option>
                  </select>
                </label>
                {tipoPersonalizado && (
                  <label className={styles.field}>
                    <span>Nombre de la opción</span>
                    <input
                      value={form.tipoVariante}
                      onChange={e => setForm(prev => ({ ...prev, tipoVariante: e.target.value }))}
                      placeholder="ej: Aroma, Material"
                    />
                  </label>
                )}
              </div>
              {editando && (
  <section className={styles.section}>
    <h3 className={styles.sectionTitle}>{varianteLabelPlural(form.tipoVariante)} y precios</h3>

{variantes.length > 0 && (
  <table className={styles.variantesTable}>
    <thead>
      <tr>
        <th>{varianteLabel(form.tipoVariante)}</th>
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
        <span>{varianteLabel(form.tipoVariante)}</span>
        <input
          value={varianteForm.talle}
          onChange={e => setVarianteForm(p => ({ ...p, talle: e.target.value }))}
          placeholder={EJEMPLOS_VARIANTE[varianteLabel(form.tipoVariante)] || 'Escribí una opción'}
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
      + Agregar {varianteLabel(form.tipoVariante).toLowerCase()}
    </button>
  </section>
)}
<label className={styles.field}>
  <span>Imágenes del producto</span>
  <input
    type="file"
    accept="image/*"
    onChange={handleImagen}
    className={styles.fileInput}
  />
  {subiendo && <p className={styles.uploadingText}>Subiendo imagen...</p>}
</label>

{imagenes.length > 0 && (
  <div className={styles.imagenesGrid}>
    {imagenes.map((img, i) => (
      <div key={img.id ?? i} className={styles.imagenThumb}>
        <img src={img.url} alt={`Foto ${i + 1}`} />
        {img.id && (
          <button
            type="button"
            className={styles.imagenRemove}
            onClick={() => eliminarImagen(img.id)}
            aria-label="Eliminar imagen"
          >
            ✕
          </button>
        )}
        {i === 0 && <span className={styles.imagenPrincipal}>Principal</span>}
      </div>
    ))}
  </div>
)}

{!editando && preview && (
  <div className={styles.imagePreview}>
    <img src={preview} alt="Preview" />
  </div>
)}
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